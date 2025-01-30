import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plan } from './models/plan.model';
import { User } from 'src/user/models/user.model';
import { PendingPolicy } from 'src/pending-policy/models/pending-policy.model';
import { PlanDto } from './dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan) private readonly planModel: typeof Plan,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(PendingPolicy)
    private readonly pendingPolicyModel: typeof PendingPolicy,
  ) {}

  async buyPlan(planDto: PlanDto) {
    try {
      const user = await this.userModel.findByPk(planDto.userId);
      if (!user) throw new NotFoundException('User not found');

      //check if user has a plan already
      const isPlanExist = await this.planModel.findOne({
        where: { userId: user.id },
      });

      if (isPlanExist)
        throw new BadRequestException('User has an existing policy');

      const totalAmount = planDto.quantity * 10000;
      if (user.wallet < totalAmount)
        throw new BadRequestException('Insufficient wallet balance');

      user.wallet -= totalAmount;
      await user.save();

      const plan = await this.planModel.create({
        userId: user.id,
        totalAmount,
      });

      for (let i = 0; i < planDto.quantity; i++) {
        await this.pendingPolicyModel.create({
          planId: plan.id,
          productId: planDto.productId,
        });
      }

      return plan;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findAll() {
    try {
      return this.planModel.findAll({ include: ['pendingPolicies', 'user'] });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
