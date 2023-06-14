import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        PassportModule,
        JwtModule.register({
            privateKey: 'abcd1234',
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController]
}) 
export class AuthModule {}