import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Test1Dto } from './dtos/test1.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test1')
  async test1(@Body() body: Test1Dto): Promise<Test1Dto> {
    return body;
  }
}
