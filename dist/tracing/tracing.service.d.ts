import { Span } from '@opentelemetry/api';
export declare class TracingService {
    getSpan(): Span;
    startSpan(name: string): Span;
}
