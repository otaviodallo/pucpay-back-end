import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { create } from 'domain';

@Controller('order')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Post()
  async createOrderProducts(@Body() body: any) {
    const { produtos } = body;
    const products = produtos.map((produto: any) => {
      const { id, quantity } = produto;
      return { id, quantity };
    });

    const createdProducts = await this.ordersService.createOrderProducts(body.idComprador, body.idRestaurant, products);
    console.log(createdProducts);
  }

  @Get('/:id')
  findUserOrders(@Param('id') id: string){
    return this.ordersService.getAllUserOrders(parseInt(id))
  }

  @Get('/products/:id')
  findUserOrderProducts(@Param('id') id: string){
    return this.ordersService.getUserOrdersProducts(parseInt(id))
  }

  @Get('/id/:id')
  findOrder(@Param('id') id: string){
    return this.ordersService.getOrderById(parseInt(id))
  }

  @Get('restaurant/:id')
  findRestaurantOrders(@Param('id') id: string){
    return this.ordersService.getAllRestaurantOrders(parseInt(id))
  }
}
