// src/storage/storage.service.ts
import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient, GetCommand, PutCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { CreateCustomDto, LoginDto, PlanetResultDto } from 'src/core/dtos/index';
import { uuid } from 'uuidv4';
import { Fusion } from 'src/core/entities/fusion.entity';
import { RegisterDto } from 'src/core/dtos/register.dto';
import * as bcrypt from 'bcrypt';

const TABLE_PLANET = 'PlanetCache';
const TABLE_CUSTOM = 'CustomCache';
const TABLE_FUSION = 'FusionCache';
const TABLE_USER = 'UserCache';

@Injectable()
export class StorageService {
  private readonly docClient: DynamoDBDocumentClient;

  constructor(
    private readonly config: ConfigService,
  ) {
    const client = new DynamoDBClient({
      region: this.config.get<string>('aws.region')!,
    });
    this.docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        convertClassInstanceToMap: true,
        removeUndefinedValues: true
      },
    });
  }

  async createUser(user: RegisterDto): Promise<void> {
    const timestamp = new Date().toISOString();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.docClient.send(
      new PutCommand({
        TableName: TABLE_USER,
        Item: {
          key: uuid(),
          email: user.email,
          password: hashedPassword,
          name: user.name,
          createdAt: timestamp,
        },
      }),
    );
  }

  async getUserByEmailAndPassword(login: LoginDto): Promise<RegisterDto | null> {
    const { Item } = await this.docClient.send(new GetCommand({
      TableName: TABLE_USER,
      Key: { email: login.email },
    }));
    if (!Item) return null;
    const user = Item as RegisterDto;
    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  /** Recupera del caché (si existe y no expiró) */
  async getPlanetCached(planetId: string): Promise<PlanetResultDto | null> {
    const { Item } = await this.docClient.send(new GetCommand({
      TableName: TABLE_PLANET,
      Key: { planetId },
    }));

    if (!Item || !Item.data) {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    if (typeof Item.ttl === 'number' && Item.ttl <= now) {
      return null;
    }

    // Cache válido
    return Item.data as PlanetResultDto;
  }

  async savePlanet(planetId: string, data: PlanetResultDto): Promise<void> {
    const ttl = Math.floor(Date.now() / 1000) + 30 * 60; // ahora + 30min en Epoch
    await this.docClient.send(new PutCommand({
      TableName: TABLE_PLANET,
      Item: {
        planetId,
        data,
        ttl,
      },
    }));
  }

 async createCustomData(dto: CreateCustomDto): Promise<void> {
    const timestamp = new Date().toISOString();
    await this.docClient.send(
      new PutCommand({
        TableName: TABLE_CUSTOM,
        Item: {
          key: dto.key,
          data: dto.data,
          createdAt: timestamp,
        },
      }),
    );
  }

  async createFusion(fusion: Fusion): Promise<void> {
    const timestamp = new Date().toISOString();
    await this.docClient.send(
      new PutCommand({
        TableName: TABLE_FUSION,
        Item: {
          key: uuid(),
          weather: fusion.weather,
          planet: fusion.planet,
          createdAt: timestamp,
        },
      }),
    );
  }

  async getHistory(
    page  = 1,
    limit = 10,
  ): Promise<{
    items: Fusion[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { Items } = await this.docClient.send(
      new ScanCommand({ TableName: TABLE_FUSION }),
    );

    const sorted = (Items || [])
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime(),
      );

    const total = sorted.length;
    const start = (page - 1) * limit;
    const slice = sorted.slice(start, start + limit);

    const items = slice.map((i) => i as Fusion);

    return { items, total, page, limit };
  }
}
