import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private morganMiddleware;

  constructor() {
    this.morganMiddleware = morgan('dev');
    this.use = this.use.bind(this);
  }
  
    use(req: Request, res: Response, next: NextFunction) {
      this.morganMiddleware(req as any, res as any, next);
    }
}
