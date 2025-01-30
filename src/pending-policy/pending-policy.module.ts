import { Module } from '@nestjs/common';
import { PendingPolicyService } from './pending-policy.service';
import { PendingPolicyController } from './pending-policy.controller';
import { PendingPolicy } from './models/pending-policy.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([PendingPolicy])],
  controllers: [PendingPolicyController],
  providers: [PendingPolicyService],
})
export class PendingPolicyModule {}
