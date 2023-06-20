import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

import { User } from '../users/user.entity';
import { OrderProduct } from '../orders/order-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @Column()
  idRestaurant: number

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: "idRestaurant", referencedColumnName: "id" })
  restaurant: User;

  @OneToMany(() => OrderProduct, OrderProduct => OrderProduct.product)
  orderProducts: OrderProduct[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted Product with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Product with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Product with id', this.id);
  }
}