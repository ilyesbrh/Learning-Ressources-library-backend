import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { ApiTags, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiTags('Default')
  @ApiBearerAuth()
  @Get('ping')
  getHello(): string {
    return this.appService.getHello();
  }

}
