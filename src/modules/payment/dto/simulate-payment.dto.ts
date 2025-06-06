import { IsNumber, IsPositive, Min } from 'class-validator';

export class SimulatePaymentDto {
  @IsNumber()
  @IsPositive()
  @Min(1, { message: 'Suma trebuie să fie cel puțin 1 RON' })
  amount: number;
} 