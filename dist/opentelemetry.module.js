"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OpentelemetryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpentelemetryModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const trace_interceptor_1 = require("./tracing/trace.interceptor");
const trace_exception_filter_1 = require("./tracing/trace-exception.filter");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const trace_service_1 = require("./tracing/trace.service");
const constants_1 = require("./tracing/constants");
let OpentelemetryModule = OpentelemetryModule_1 = class OpentelemetryModule {
    static async register(configuration) {
        return {
            global: true,
            module: OpentelemetryModule_1,
            providers: [
                await this.createProvider(configuration),
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: trace_interceptor_1.TraceInterceptor,
                },
                {
                    provide: core_1.APP_FILTER,
                    useClass: trace_exception_filter_1.TraceExceptionFilter,
                },
                trace_service_1.TraceService,
            ],
            exports: [trace_service_1.TraceService],
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
OpentelemetryModule = OpentelemetryModule_1 = __decorate([
    common_1.Module({})
], OpentelemetryModule);
exports.OpentelemetryModule = OpentelemetryModule;
//# sourceMappingURL=opentelemetry.module.js.map