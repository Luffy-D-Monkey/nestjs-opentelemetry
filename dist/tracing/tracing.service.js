"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingService = void 0;
const api_1 = require("@opentelemetry/api");
const common_1 = require("@nestjs/common");
let TracingService = class TracingService {
    getSpan() {
        return api_1.trace.getSpan(api_1.context.active());
    }
    startSpan(name) {
        const tracer = api_1.trace.getTracer('default');
        return tracer.startSpan(name);
    }
};
TracingService = __decorate([
    common_1.Injectable()
], TracingService);
exports.TracingService = TracingService;
//# sourceMappingURL=tracing.service.js.map