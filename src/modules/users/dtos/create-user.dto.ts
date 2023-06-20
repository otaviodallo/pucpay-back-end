import { IsEmail, IsString, IsOptional, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  cnpj: string;

  @IsOptional()
  @IsString()
  block: string;

  @IsOptional()
  @IsString()
  image: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}
