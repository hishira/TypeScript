import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../../test/mock/UserModelMock';
import { BaseQueryHandler } from './BaseQueryHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';

describe('BaseCommandHandler', () => {
  let baseCommandHandler: BaseQueryHandler<IEntry>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Repository,
          useClass: UserRepository,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
        {
          provide: 'USER_MODEL',
          useValue: UserModelMock,
        },
        BaseQueryHandler<IEntry>,
      ],
    }).compile();
    baseCommandHandler = module.get<BaseQueryHandler<IEntry>>(
      BaseQueryHandler<IEntry>,
    );
  });
  it('Command should be defined', () => {
    expect(baseCommandHandler).toBeDefined();
  });
  it('Repository should be proper instance of', () => {
    // Quick fix for checking repository
    expect((baseCommandHandler as any).repository).toBeInstanceOf(
      UserRepository,
    );
  });
});
