import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/products.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UserEntity } from './users/usertype.entity';
import { OrdersModule } from './orders/orders.module';
import { Ticket } from './orders/ticket.entity';
import { Order } from './orders/order.entity';
import { OrderProduct } from './orders/pedido-produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bd.sqlite',
      entities: [User, Product, UserEntity, Ticket, Order, OrderProduct],
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
