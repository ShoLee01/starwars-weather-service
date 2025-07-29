import { IsNumber, IsString } from "class-validator";

export class ConditionDto {
  @IsString() text: string;
  @IsString() icon: string;
  @IsNumber() code: number;
}
