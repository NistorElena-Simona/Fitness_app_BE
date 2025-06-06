import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MusclesModule } from './modules/muscles/muscles.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailModule,
    UserModule,
    AuthModule,
    AdminModule,
    MusclesModule,
    ExercisesModule,
    ChallengesModule,
    FavoritesModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
