import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config/env.config';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';
import { PendingPolicyModule } from './pending-policy/pending-policy.module';
import { PlanModule } from './plan/plan.module';
import { PolicyModule } from './policy/policy.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Use true if you have a proper SSL certificate
        },
      },
    }),
    UserModule,
    ProductCategoryModule,
    ProductModule,
    PendingPolicyModule,
    PlanModule,
    PolicyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
