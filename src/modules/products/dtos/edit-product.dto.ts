import { IsOptional, IsString, IsBoolean, IsNumber } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;
  
    @IsString()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsOptional()
    price: string;

    @IsNumber()
    @IsOptional()
    quantity: number

    @IsString()
    @IsOptional()
    image: string;

  }
  