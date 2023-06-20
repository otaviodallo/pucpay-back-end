import {IsString, IsNotEmpty, IsNumber} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString({message: 'preço precisa ser string'})
    @IsNotEmpty()
    price: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    idRestaurant: number;
}