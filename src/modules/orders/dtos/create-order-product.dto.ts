import { IsNumber } from "class-validator";

export class CreateOrderProductDto {
  @IsNumber()
  id: number;
  
  @IsNumber()
  quantity: number;

  @IsNumber()
  idComprador: number;
}