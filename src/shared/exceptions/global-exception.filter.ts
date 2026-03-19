import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'object' ? (message as any).message || message : message,
      error: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : (message as any).error || 'Error',
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
            `[${request.method}] ${request.url} - Error: ${exception instanceof Error ? exception.stack : exception}`,
        );
    } else {
        this.logger.warn(
            `[${request.method}] ${request.url} - Status: ${status} - Message: ${JSON.stringify(message)}`,
        );
    }

    response.status(status).json(errorResponse);
  }
}
