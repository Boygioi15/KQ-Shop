import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        const ip = req.ip;

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength || '0'} - ${userAgent} ${ip}`
            );
        });

        next();
    }
}
