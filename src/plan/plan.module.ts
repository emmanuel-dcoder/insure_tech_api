import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from './models/plan.model';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { User } from 'src/user/models/user.model';
import { PendingPolicy } from 'src/pending-policy/models/pending-policy.model';

@Module({
  imports: [SequelizeModule.forFeature([Plan, User, PendingPolicy])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
