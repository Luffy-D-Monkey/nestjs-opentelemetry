import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
export declare class TracingInterceptor implements NestInterceptor {
    intercept(executionContext: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}
