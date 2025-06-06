import { Controller, Post, Body, Headers, RawBodyRequest, Req, UseGuards, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SimulatePaymentDto } from './dto/simulate-payment.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    roles: string[];
  };
}

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // Creează o sesiune de checkout Stripe pentru plată reală
  @UseGuards(JwtAuthGuard)
  @Post('create-checkout-session')
  async createCheckoutSession(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.paymentService.createCheckoutSession(userId);
  }

  // Creează un Payment Intent pentru plăți directe
  @UseGuards(JwtAuthGuard)
  @Post('create-payment-intent')
  async createPaymentIntent(@Req() req: AuthenticatedRequest, @Body() body: CreatePaymentIntentDto) {
    const userId = req.user.userId;
    const amount = body.amount || 50;
    return this.paymentService.createPaymentIntent(userId, amount);
  }

  // Confirmă o plată prin Payment Intent ID
  @UseGuards(JwtAuthGuard)
  @Post('confirm-payment')
  async confirmPayment(@Body() body: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(body.paymentIntentId);
  }

  // Endpoint simplu pentru simularea unei plăți fără Stripe (pentru testare)
  @UseGuards(JwtAuthGuard)
  @Post('simulate-payment')
  async simulatePayment(@Req() req: AuthenticatedRequest, @Body() body: SimulatePaymentDto) {
    const userId = req.user.userId;
    return this.paymentService.simulatePayment(userId, body.amount);
  }

  // Activează manual premium pentru un utilizator (pentru testare)
  @UseGuards(JwtAuthGuard)
  @Post('activate-premium')
  async activatePremium(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.paymentService.activatePremium(userId);
  }

  // Dezactivează premium pentru un utilizator (pentru testare)
  @UseGuards(JwtAuthGuard)
  @Post('deactivate-premium')
  async deactivatePremium(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.paymentService.deactivatePremium(userId);
  }

  // Verifică statusul premium al utilizatorului
  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getPaymentStatus(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.paymentService.getPaymentStatus(userId);
  }

  // Testează o plată cu card de test Stripe (DOAR pentru dezvoltare!)
  @UseGuards(JwtAuthGuard)
  @Post('test-card-payment')
  async testCardPayment(@Req() req: AuthenticatedRequest, @Body() body: CreatePaymentIntentDto) {
    const userId = req.user.userId;
    const amount = body.amount || 50;
    return this.paymentService.testCardPayment(userId, amount);
  }

  // Webhook pentru Stripe (nu necesită autentificare)
  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    return this.paymentService.handleWebhook(signature, req.rawBody);
  }
} 