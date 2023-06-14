import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { OrderProduct } from './pedido-produto.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, OrderProduct, User])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
