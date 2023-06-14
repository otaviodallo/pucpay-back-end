import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { ProductsModule } from 'src/products/products.module';
import { OrderProduct } from 'src/orders/pedido-produto.entity';
import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OrderProduct, Product, Order]), ProductsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
