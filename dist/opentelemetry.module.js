"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TracingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const tracing_interceptor_1 = require("./tracing/tracing.interceptor");
const tracing_exception_filter_1 = require("./tracing/tracing-exception.filter");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const tracing_service_1 = require("./tracing/tracing.service");
const constants_1 = require("./tracing/constants");
let TracingModule = TracingModule_1 = class TracingModule {
    static async register(configuration) {
        return {
            global: true,
            module: TracingModule_1,
            providers: [
                await this.createProvider(configuration),
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: tracing_interceptor_1.TracingInterceptor,
                },
                {
                    provide: core_1.APP_FILTER,
                    useClass: tracing_exception_filter_1.TracingExceptionFilter,
                },
                tracing_service_1.TracingService,
            ],
            exports: [tracing_service_1.TracingService],
        };
    }
    static async createProvider(configuration) {
        const sdk = new sdk_node_1.NodeSDK(configuration);
        await sdk.start();
        return {
            provide: constants_1.Constants.SDK,
            useValue: sdk,
        };
    }
};
TracingModule = TracingModule_1 = __decorate([
    common_1.Module({})
], TracingModule);
exports.TracingModule = TracingModule;
//# sourceMappingURL=opentelemetry.module.js.map