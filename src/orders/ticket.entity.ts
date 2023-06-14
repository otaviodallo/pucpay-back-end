import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Ticket with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Ticket with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Ticket with id', this.id);
    }
}