import { Injectable, Logger, Scope } from '@nestjs/common';
import { LogEntry } from 'src/core/dtos/log-level.dto';

@Injectable({ scope: Scope.DEFAULT })
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  private readonly environment: string;
  private readonly application: string;

  constructor() {
    this.environment = 'dev';
    this.application = 'starwars-weather-service';
  }

  private async writeLog(entry: LogEntry): Promise<void> {
    try {
      this.logger.verbose(
        `[${entry.environment}:${entry.application}] ${entry.level} - ${entry.context} - ${entry.message}`,
        JSON.stringify(entry.meta),
      );
    } catch (error) {
      this.logger.error('Failed to write log entry', (error as Error).stack);
    }
  }

  async logInfo(
    context: string,
    message: string,
    meta?: any,
    id?: string | number,
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      context,
      message,
      meta,
      id,
      environment: this.environment,
      application: this.application,
    };
    await this.writeLog(entry);
    this.logger.log(message, context);
  }

  async logWarning(
    context: string,
    message: string,
    meta?: any,
    id?: string | number,
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARNING',
      context,
      message,
      meta,
      id,
      environment: this.environment,
      application: this.application,
    };
    await this.writeLog(entry);
    this.logger.warn(message, context);
  }

  async logError(
    context: string,
    message: string,
    meta?: any,
    id?: string | number,
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      context,
      message,
      meta,
      id,
      environment: this.environment,
      application: this.application,
    };
    await this.writeLog(entry);
    this.logger.error(message, context);
  }

  async logDebug(
    context: string,
    message: string,
    meta?: any,
    id?: string | number,
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'DEBUG',
      context,
      message,
      meta,
      id,
      environment: this.environment,
      application: this.application,
    };
    await this.writeLog(entry);
    this.logger.debug(message, context);
  }
}
