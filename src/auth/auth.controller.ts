import { Controller, UseGuards, Post, Body, Session } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth2')
@Serialize(UserDto)
export class AuthController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService,) {}


}
