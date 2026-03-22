import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReferralsModule } from './referrals/referrals.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_Euc32MbTCVkB@ep-aged-cell-ah5n6b3v-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    UsersModule,
    ReferralsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
