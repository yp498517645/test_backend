import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, params, query } = request;
    const now = Date.now();

    this.logger.info(`Incoming Request: ${method} ${url}`, {
      method,
      url,
      body,
      params,
      query,
    });

    return next.handle().pipe(
      tap((response) => {
        const timeTaken = Date.now() - now;
        this.logger.info(`Response: ${method} ${url}`, {
          method,
          url,
          response,
          timeTaken: `${timeTaken}ms`,
        });
      }),
    );
  }
}
