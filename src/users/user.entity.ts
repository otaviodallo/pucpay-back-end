import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Product } from 'src/products/products.entity';
import { Order } from 'src/orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  cpf: string;

  @Column({ nullable: true, default: null })
  cnpj: string;

  @Column({ nullable: true, default: null })
  block: string;
  
  @Column({ nullable: true, default: null })
  image: string;

  @Column( { default: 0 } )
  balance: number;

  @Column()
  password: string;

  @Column( { default: false } )
  isAdmin: boolean;
  
  @OneToMany(() => Product, product => product.restaurant)
  products: Product[]

  @OneToMany(() => Order, order => order.user)
  order: Order[];

  @OneToMany(() => Order, order => order.restaurant)
  orderRes: Order[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
