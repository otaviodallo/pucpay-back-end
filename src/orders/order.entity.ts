import { AfterInsert, AfterRemove, AfterUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./pedido-produto.entity";
import { User } from "src/users/user.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idComprador: number
    
    @Column()
    idRestaurante: number

    @Column()
    pendente: boolean;

    @Column({ type: "datetime" })
    date: Date
    
    @OneToMany(() => OrderProduct, orderproduct => orderproduct.order)
    orderProducts: OrderProduct[];

    @ManyToOne(() => User, user => user.order)
    @JoinColumn({ name: "idComprador", referencedColumnName: "id" })
    user: User;

    @ManyToOne(() => User, user => user.order)
    @JoinColumn({ name: "idRestaurante", referencedColumnName: "id" })
    restaurant: User;
    
    @AfterInsert()
    logInsert() {
        console.log('Inserted Order with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Order with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Order with id', this.id);
    }
}