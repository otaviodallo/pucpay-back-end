import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/products.entity';
import { MulterModule } from '@nestjs/platform-express';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderProduct } from './modules/orders/order-product.entity';
import { Order } from './modules/orders/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bd.sqlite',
      entities: [User, Product, Order, OrderProduct],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
