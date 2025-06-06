import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(10, { message: 'Suma minimă este 10 RON' })
  amount?: number = 50;
} 