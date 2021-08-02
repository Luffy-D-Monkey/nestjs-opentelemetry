import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TracingInterceptor } from './tracing/tracing.interceptor';
import { TracingExceptionFilter } from './tracing/tracing-exception.filter';
import { NodeSDK, NodeSDKConfiguration } from '@opentelemetry/sdk-node';
import { TracingService } from './tracing/tracing.service';
import { Constants } from './tracing/constants';

@Module({})
export class TracingModule {
  static async register(
    configuration?: Partial<NodeSDKConfiguration>,
  ): Promise<DynamicModule> {
    return {
      global: true,
      module: TracingModule,
      providers: [
        await this.createProvider(configuration),
        {
          provide: APP_INTERCEPTOR,
          useClass: TracingInterceptor,
        },
        {
          provide: APP_FILTER,
          useClass: TracingExceptionFilter,
        },
        TracingService,
      ],
      exports: [TracingService],
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
