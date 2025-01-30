import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { Policy } from './models/policy.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { PendingPolicy } from 'src/pending-policy/models/pending-policy.model';

@Module({
  imports: [SequelizeModule.forFeature([Policy, PendingPolicy])],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
