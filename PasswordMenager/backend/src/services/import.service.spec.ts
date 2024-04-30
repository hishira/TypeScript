import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { ImportRequestDeleteCommand } from 'src/commands/importRequest/ImportRequestDeleteCommand';
import { ImportRequestEditCommand } from 'src/commands/importRequest/ImportRequestEditCommand';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { importRequestMock } from '../../test/mock/ImportRequestMock';
import { ImportService } from './import.service';
import { Logger } from 'src/utils/Logger';

describe('ImportService', () => {
  let service: ImportService;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportService,
        {
          provide: EventEmitter2,
          useValue: {
            emitAsync: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    service = module.get<ImportService>(ImportService);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('activateImportRequest', () => {
    it('should activate import request', async () => {
      // Arrange
      const importRequestId = 'testImportRequestId';
      const userId = 'testUserId';
      const importRequest = [importRequestMock()];
      const spy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValueOnce(importRequest);
      const spy1 = jest
        .spyOn(service as any, 'retrieveFirstImportRequest')
        .mockReturnValueOnce(importRequest[0]);
      const spy2 = jest.spyOn(service as any, 'handleActivateImportRequest');
      // Act
      await service.activateImportRequest(importRequestId, userId);

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new GetImportQuery({ id: importRequestId }),
      );
      expect(spy1).toHaveBeenCalledWith(importRequest);
      expect(spy2).toHaveBeenCalledWith(importRequest[0], userId);
    });
  });

  describe('getUserImportRequest', () => {
    it('should get user import request', async () => {
      // Arrange
      const userId = 'testUserId';
      const importRequest = [importRequestMock()];

      const spy = jest
        .spyOn(queryBus, 'execute')
        .mockResolvedValueOnce(importRequest);

      // Act
      const result = await service.getUserImportRequest(userId);

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new GetImportQuery({ userId, state: ImportRequestState.Active }),
      );
      expect(result).toEqual(importRequest);
    });
  });

  describe('importEntriesFromFile', () => {
    // Test similar to the others, mocking appropriate methods
  });

  describe('deleteImportRequest', () => {
    it('should get deleted import request', async () => {
      // Arrange
      const userId = 'testUserId';
      const importRequest = [importRequestMock()];

      const spy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(importRequest);

      // Act
      const result = await service.deleteImportRequest(userId);

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new ImportRequestDeleteCommand({
          _id: 'testUserId',
          state: ImportRequestState.Deleted,
        }),
      );
      expect(result).toEqual(importRequest);
    });
  });

  describe('editImportRequest', () => {
    it('should get edited import request', async () => {
      // Arrange
      const userId = 'testUserId';
      const importRequest = [importRequestMock()];

      const spy = jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(importRequest);

      const editDto = {
        userid: 'testuserid',
        state: ImportRequestState.Active,
        entriesToImport: [],
      };
      // Act
      const result = await service.editImpoerRequest(userId, {
        ...editDto,
      });

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new ImportRequestEditCommand({
          _id: 'testUserId',
          ...editDto,
        }),
      );
      expect(result).toEqual(importRequest);
    });
  });

  // Additional tests for private methods handleActivateImportRequest and retrieveFirstImportRequest
});
