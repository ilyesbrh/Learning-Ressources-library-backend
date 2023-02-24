import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';


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
class UserDto {
    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    subscription: string;

    @IsBoolean()
    @ApiProperty()
    isActive: boolean;
}

// Fri Feb 24 2023 15:42:29 GMT+0100 (West Africa Standard Time)
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
        const user = req.userObj;
        return {
            access_token: await this.authService.generateToken(user),
        };
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async me(@Request() req): Promise<User> {
        const user: User = req.userObj;

        debugger;

        return user;
    }


}
