import { Test, TestingModule } from '@nestjs/testing';
import { ImportRequestDeleteCommand } from 'src/commands/importRequest/ImportRequestDeleteCommand';
import { ImportRequestRepository } from 'src/repository/importrequest.repository';
import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportRequestBuilder } from 'src/schemas/utils/builders/importRequest.builder';
import { ImporRequestMock } from '../../../../test/mock/ImportRequestMock';
import { DeleteImportRequestHandler } from './deleteImportRequestHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';
describe('DeleteImportRequestHandler', () => {
  let handler: DeleteImportRequestHandler;
  let repository: ImportRequestRepository; // Replace with the actual type of your repository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteImportRequestHandler,
        {
          provide: 'IMPORT_REQUEST_MODEL',
          useValue: ImporRequestMock,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
        { provide: Repository, useClass: ImportRequestRepository }, // Provide the mock repository
      ],
    }).compile();

    handler = module.get<DeleteImportRequestHandler>(
      DeleteImportRequestHandler,
    );
    repository = module.get<ImportRequestRepository>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should delete an import request, and use delete function', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'delete');
    const command = new ImportRequestDeleteCommand({
      _id: 'testId',
      userid: 'testUserId',
      created: new Date(Date.now()),
      state: ImportRequestState.Active,
      entriesToImport: [
        new ImportEntrySchema(
          'test',
          'test',
          'www.google.com',
          'test,',
          'test@test.com',
        ),
        new ImportEntrySchema(
          'test2',
          'test2',
          'www.google2.com',
          'test2,',
          'tes2t@te2st.com',
        ),
      ],
    });

    // Act
    await handler.execute(command);
    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('Should return promise', async () => {
    // Arrange
    const command = new ImportRequestDeleteCommand({
      _id: 'testId',
      userid: 'testUserId',
      created: new Date(Date.now()),
      state: ImportRequestState.Active,
      entriesToImport: [
        new ImportEntrySchema(
          'test',
          'test',
          'www.google.com',
          'test,',
          'test@test.com',
        ),
        new ImportEntrySchema(
          'test2',
          'test2',
          'www.google2.com',
          'test2,',
          'tes2t@te2st.com',
        ),
      ],
    });

    // Act
    const response = handler.execute(command);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });

  it('Should use builder', async () => {
    // Arrange
    const command = new ImportRequestDeleteCommand({
      _id: 'testId',
      userid: 'testUserId',
      created: new Date(Date.now()),
      state: ImportRequestState.Active,
      entriesToImport: [
        new ImportEntrySchema(
          'test',
          'test',
          'www.google.com',
          'test,',
          'test@test.com',
        ),
        new ImportEntrySchema(
          'test2',
          'test2',
          'www.google2.com',
          'test2,',
          'tes2t@te2st.com',
        ),
      ],
    });
    const spy = jest.spyOn(ImportRequestBuilder.prototype, 'getOption');
    //Act
    await handler.execute(command);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
