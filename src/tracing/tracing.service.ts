import { context, trace, Span } from '@opentelemetry/api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TracingService {
  public getSpan(): Span {
    return trace.getSpan(context.active());
  }

  public startSpan(name: string): Span {
    const tracer = trace.getTracer('default');
    return tracer.startSpan(name);
  }
}
