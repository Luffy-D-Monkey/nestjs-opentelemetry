import { Test, TestingModule } from '@nestjs/testing';
import { TraceService } from './trace.service';

describe('TracingService', () => {
  let service: TraceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraceService],
    }).compile();

    service = module.get<TraceService>(TraceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
