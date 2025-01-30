import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PendingPolicy } from './models/pending-policy.model';

@Injectable()
export class PendingPolicyService {
  constructor(
    @InjectModel(PendingPolicy)
    private readonly pendingPolicyModel: typeof PendingPolicy,
  ) {}

  async findAll() {
    try {
      return this.pendingPolicyModel.findAll({
        where: { status: 'unused' },
        include: ['product', 'plan'],
      });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findAllByPlan(planId: number) {
    try {
      return await this.pendingPolicyModel.findAll({
        where: { planId, status: 'unused' },
        include: ['product', 'plan'],
      });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
