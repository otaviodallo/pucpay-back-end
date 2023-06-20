import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cpf: string;

  @Expose()
  cnpj: string;

  @Expose()
  block: string;

  @Expose()
  balance: number
  
  @Expose()
  peso: string;

  @Expose()
  image: string;

  @Expose()
  isAdmin: boolean;
}
