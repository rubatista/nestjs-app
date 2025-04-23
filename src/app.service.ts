import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(request: any): string {
    return 'Hello World!' + request;
  }
}
