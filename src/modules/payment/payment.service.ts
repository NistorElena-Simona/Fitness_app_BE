import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-05-28.basil',
    });
  }

  // Creează o sesiune de checkout Stripe pentru premium
  async createCheckoutSession(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilizatorul nu a fost găsit');
    }

    if (user.isPremium) {
      throw new Error('Utilizatorul are deja cont premium activ');
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Premium Subscription - Fitness App',
                description: 'Access to all premium exercises and exclusive challenges',
                images: ['https://via.placeholder.com/300x200?text=Premium+Fitness'],
              },
              unit_amount: 1000, 
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel`,
        customer_email: user.email,
        metadata: {
          userId: userId,
          type: 'premium_activation',
        },
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['RO'],
        },
        locale: 'en',
      });

      return {
        sessionId: session.id,
        url: session.url,
        amount: 10,
        currency: 'USD',
        message: 'Sesiunea de plată a fost creată cu succes',
      };
    } catch (error) {
      throw new Error(`Eroare la crearea sesiunii de plată: ${error.message}`);
    }
  }

  // Creează un Payment Intent pentru plăți directe
  async createPaymentIntent(userId: string, amount: number = 10) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilizatorul nu a fost găsit');
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Convertește RON în bani
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          userId: userId,
          type: 'premium_activation',
        },
        description: `Activare Premium pentru ${user.email}`,
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: amount,
        currency: 'USD',
        status: paymentIntent.status,
      };
    } catch (error) {
      throw new Error(`Eroare la crearea payment intent: ${error.message}`);
    }
  }

  // Confirmă plata și activează premium
  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        const userId = paymentIntent.metadata.userId;
        
        await this.prisma.user.update({
          where: { id: userId },
          data: { isPremium: true },
        });

        return {
          success: true,
          message: 'Payment confirmed and premium activated',
          paymentIntentId: paymentIntentId,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
        };
      } else {
        return {
          success: false,
          message: 'Payment failed',
          status: paymentIntent.status,
        };
      }
    } catch (error) {
      throw new Error(`Payment confirmation error: ${error.message}`);
    }
  }

  // Verifică statusul unei plăți
  async getPaymentStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isPremium: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium,
      memberSince: user.createdAt,
      subscriptionType: user.isPremium ? 'Premium' : 'Free',
    };
  }

  // Simulează o plată pentru testare (fără Stripe real)
  async simulatePayment(userId: string, amount: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    console.log('Debugging payment:', { amount, type: typeof amount, comparison: amount >= 10 });

    // Simulează procesarea plății
    const paymentResult = {
      userId,
      amount,
      currency: 'USD',
      status: 'success',
      transactionId: `sim_${Date.now()}`,
      timestamp: new Date(),
    };

    
    if (amount >= 10) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { isPremium: true },
      });

      return {
        ...paymentResult,
        message: 'Payment processed successfully! Premium account activated.',
        premiumActivated: true,
      };
    }

    return {
      ...paymentResult,
      message: 'Payment processed, but amount is insufficient for premium (minimum 10 USD).',
      premiumActivated: false,
    };
  }

  // Activează manual premium pentru testare
  async activatePremium(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilizatorul nu a fost găsit');
    }

    if (user.isPremium) {
      return {
        message: 'Utilizatorul are deja contul premium activat',
        isPremium: true,
      };
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isPremium: true },
    });

    return {
      message: 'Premium account activated successfully',
      isPremium: true,
      activatedAt: new Date(),
    };
  }

  // Dezactivează premium pentru testare
  async deactivatePremium(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilizatorul nu a fost găsit');
    }

    if (!user.isPremium) {
      return {
        message: 'Utilizatorul nu are cont premium activat',
        isPremium: false,
      };
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isPremium: false },
    });

    return {
      message: 'Contul premium a fost dezactivat',
      isPremium: false,
      deactivatedAt: new Date(),
    };
  }

  // Webhook pentru procesarea automată a plăților Stripe
  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

      console.log('Webhook event received:', event.type);

      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata.userId;

          if (session.payment_status === 'paid') {
            await this.prisma.user.update({
              where: { id: userId },
              data: { isPremium: true },
            });

            console.log(`Premium activated for user: ${userId}`);
          }
          break;

        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const userIdFromPI = paymentIntent.metadata.userId;

          await this.prisma.user.update({
            where: { id: userIdFromPI },
            data: { isPremium: true },
          });

          console.log(`Premium activated via PaymentIntent for user: ${userIdFromPI}`);
          break;

        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return { received: true };
    } catch (err) {
      console.error('Webhook error:', err.message);
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }

  // Testează o plată directă cu date de card (DOAR pentru testare!)
  async testCardPayment(userId: string, amount: number = 10) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilizatorul nu a fost găsit');
    }

    try {
      // Creează Payment Intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          userId: userId,
          type: 'premium_activation',
        },
        description: `Test plată premium pentru ${user.email}`,
      });

      // Pentru testare, confirmă direct cu o metodă de plată de test
      const confirmedPayment = await this.stripe.paymentIntents.confirm(
        paymentIntent.id,
        {
          payment_method: 'pm_card_visa', // Card de test Stripe
        }
      );

      if (confirmedPayment.status === 'succeeded') {
        await this.prisma.user.update({
          where: { id: userId },
          data: { isPremium: true },
        });

        return {
          success: true,
          message: 'Plata de test a fost procesată cu succes!',
          paymentIntentId: confirmedPayment.id,
          amount: amount,
          currency: 'USD',
          cardLast4: '4242', // Visa test card
          status: confirmedPayment.status,
        };
      }

      return {
        success: false,
        message: 'Plata de test a eșuat',
        status: confirmedPayment.status,
      };

    } catch (error) {
      throw new Error(`Eroare la testarea plății: ${error.message}`);
    }
  }
} 