import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './tracing/trace.interceptor';
import { TraceExceptionFilter } from './tracing/trace-exception.filter';
import { NodeSDK, NodeSDKConfiguration } from '@opentelemetry/sdk-node';
import { TraceService } from './tracing/trace.service';
import { Constants } from './tracing/constants';

@Module({})
export class OpentelemetryModule {
  static async register(
    configuration?: Partial<NodeSDKConfiguration>,
  ): Promise<DynamicModule> {
    return {
      global: true,
      module: OpentelemetryModule,
      providers: [
        await this.createProvider(configuration),
        {
          provide: APP_INTERCEPTOR,
          useClass: TraceInterceptor,
        },
        {
          provide: APP_FILTER,
          useClass: TraceExceptionFilter,
        },
        TraceService,
      ],
      exports: [TraceService],
    };
  }

  private static async createProvider(
    configuration?: Partial<NodeSDKConfiguration>,
  ): Promise<Provider> {
    const sdk = new NodeSDK(configuration);
    await sdk.start();
    return {
      provide: Constants.SDK,
      useValue: sdk,
    };
  }
}
