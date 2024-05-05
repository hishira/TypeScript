import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../../test/mock/UserModelMock';
import { BaseCommandHandler } from './BaseCommandHandler';
import { Logger } from 'src/utils/Logger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUser } from 'src/schemas/Interfaces/user.interface';

describe('BaseCommandHandler', () => {
  let baseCommandHandler: BaseCommandHandler<IEntry>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Repository,
          useClass: UserRepository,
        },
        {
          provide: 'USER_MODEL',
          useValue: UserModelMock,
        },
        Logger,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        BaseCommandHandler<IEntry>,
      ],
    }).compile();
    baseCommandHandler = module.get<BaseCommandHandler<IEntry>>(
      BaseCommandHandler<IEntry>,
    );
  });
  it('Command should be defined', () => {
    expect(baseCommandHandler).toBeDefined();
  });
  it('Repository should be proper instance of', () => {
    // Quick fix for checking repository
    expect(
      (baseCommandHandler as unknown as { repository: Record<string, unknown> })
        .repository,
    ).toBeInstanceOf(UserRepository);
  });
});
