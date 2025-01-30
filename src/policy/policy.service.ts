import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Policy } from './models/policy.model';
import { PendingPolicy } from 'src/pending-policy/models/pending-policy.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PolicyService {
  constructor(
    @InjectModel(Policy)
    private readonly policyModel: typeof Policy,
    @InjectModel(PendingPolicy)
    private readonly pendingPolicyModel: typeof PendingPolicy,
  ) {}

  async activatePolicy(pendingPolicyId: string) {
    try {
      const pendingPolicy = await this.pendingPolicyModel.findByPk(
        Number(pendingPolicyId),
        {
          include: ['plan'],
        },
      );

      if (!pendingPolicy || pendingPolicy.status !== 'unused') {
        throw new BadRequestException('Invalid or already used policy slot');
      }

      let policyNumber = `POL-${uuidv4()}`;

      //validate policy
      let validatePolicy = await this.policyModel.findOne({
        where: { policyNumber },
      });

      do {
        policyNumber = `POL-${uuidv4()}`;
        validatePolicy = await this.policyModel.findOne({
          where: { policyNumber },
        });
      } while (validatePolicy);

      const policy = await this.policyModel.create({
        userId: pendingPolicy.plan.userId,
        productId: pendingPolicy.productId,
        policyNumber,
      });

      pendingPolicy.status = 'used';
      await pendingPolicy.save();

      return policy;
    } catch (error) {}
  }

  async findAll() {
    try {
      return await this.policyModel.findAll({ include: 'user' });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
