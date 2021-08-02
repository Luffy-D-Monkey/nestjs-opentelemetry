## usage example
```javascripts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationModule } from './validation/validation.module';
import { GuardModule } from './guard/guard.module';
import { TracingModule } from './tracing/tracing.module';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { CompositePropagator } from '@opentelemetry/core';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { ConsoleSpanExporter } from '@opentelemetry/tracing';

@Module({
  imports: [
    ValidationModule,
    GuardModule,
    TracingModule.register({
      spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
      contextManager: new AsyncLocalStorageContextManager(),
      textMapPropagator: new CompositePropagator({
        propagators: [
          new B3Propagator(),
          new B3Propagator({
            injectEncoding: B3InjectEncoding.MULTI_HEADER,
          }),
        ],
      }),
      instrumentations: [new HttpInstrumentation()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```