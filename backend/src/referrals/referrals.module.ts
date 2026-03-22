import { Module } from '@nestjs/common';
import { ReferralsService } from './referrals.service';

@Module({
  providers: [ReferralsService]
})
export class ReferralsModule {}
