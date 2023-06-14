import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/products.entity';
import { OrderProduct } from './pedido-produto.entity';
import { CreateOrderProductDto } from './dtos/create-order.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private produtoRepo: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async createOrderProducts(idComprador: number, idRestaurant: number, orderProducts: CreateOrderProductDto[]): Promise<Order> {
    const order = new Order();
    order.pendente = true;
    order.idComprador = idComprador;
    order.date = new Date();
    order.idRestaurante = idRestaurant;
  
    const createdOrder = await this.orderRepo.save(order);

    const createdOrderProducts: OrderProduct[] = [];
    for (const productDto of orderProducts) {
      const product = new OrderProduct();
      product.idProduto = productDto.id;
      product.quantity = productDto.quantity;
      product.order = createdOrder;
      console.log(product);
  
      const createdProduct = await this.orderProductRepo.save(product);
      createdOrderProducts.push(createdProduct);
    }
  
    createdOrder.orderProducts = createdOrderProducts;
  
    return createdOrder;
  }

  async getUserOrdersProducts(idComprador: number) {
    const userOrders = await this.orderRepo.find({
      where: { idComprador },
      relations: ['orderProducts', 'orderProducts.product'],
    });
    const userOrderProducts = userOrders.map((order) => {
      const filteredOrderProducts = order.orderProducts.filter(
        (orderProduct) => orderProduct.idOrder === order.id
      );
      return {
        orderProducts: filteredOrderProducts,
      };
    });

    return userOrderProducts;
  }

  async getAllUserOrders(idComprador: number): Promise<Order[]> {
    const userOrders = await this.orderRepo.find({
      where: { idComprador },
      relations: ['orderProducts', 'orderProducts.product'],
    });
    return userOrders;
  }

  async getAllRestaurantOrders(idRestaurante: number): Promise<Order[]> {
    const restaurantOrders = await this.orderRepo.find({
      where: { idRestaurante },
      relations: ['orderProducts', 'orderProducts.product'],
    });
    return restaurantOrders;
  }

  async getOrderById(id: number): Promise<Order[]>{
    const order = await this.orderRepo.find({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product']
    });
    return order
  }

}