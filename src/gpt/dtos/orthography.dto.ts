import { IsString, IsOptional, IsInt } from 'class-validator';

export class OrthographyDto {
  @IsString()
  readonly prompt: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}
