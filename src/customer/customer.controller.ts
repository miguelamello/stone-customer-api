import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  @Get()
  hello(): string {
    return 'Hello Worlddd!';
  }
}
