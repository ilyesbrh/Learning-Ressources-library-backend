import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { ApiBody,ApiProperty,ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}
class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}


@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<User> {
        return this.authService.createUser(body.email, body.password);
    }

    @ApiBody({ type: LoginDto, required: true })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<{ access_token: string }> {
        const user = req.user;
        return {
            access_token: await this.authService.generateToken(user),
        };
    }
}
