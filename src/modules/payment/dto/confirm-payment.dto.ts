import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty({ message: 'Payment Intent ID este obligatoriu' })
  paymentIntentId: string;
} 