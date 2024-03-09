import { Test, TestingModule } from '@nestjs/testing';
import { ImportRequestEditCommand } from 'src/commands/importRequest/ImportRequestEditCommand';
import { ImportRequestRepository } from 'src/repository/importrequest.repository';
import {
  ImportEntrySchema,
  ImportRequest,
} from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportRequestBuilder } from 'src/schemas/utils/builders/importRequest.builder';
import { ImporRequestMock } from '../../../../test/mock/ImportRequestMock';
import { EditImportRequestHandler } from './editImportRequestHandler';

describe('EditImportRequestHandler', () => {
  let handler: EditImportRequestHandler;
  let repository: Repository<ImportRequest>; // Replace with the actual type of your repository

  const command: ImportRequestEditCommand = new ImportRequestEditCommand({
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
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditImportRequestHandler,
        {
          provide: 'IMPORT_REQUEST_MODEL',
          useValue: ImporRequestMock,
        },
        { provide: Repository, useClass: ImportRequestRepository },
      ],
    }).compile();

    handler = module.get<EditImportRequestHandler>(EditImportRequestHandler);
    repository = module.get<Repository<ImportRequest>>(Repository);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update an import request', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'update');

    // Act
    await handler.execute(command);

    // Assert
    expect(spy).toBeCalledTimes(1);
  });

  it('should return promise', () => {
    // Act
    const response = handler.execute(command);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });

  it('should use import promise builder', async () => {
    // Act
    const spy = jest.spyOn(
      ImportRequestBuilder.prototype,
      'getPartialImportRequest',
    );
    await handler.execute(command);

    // Assert
    expect(spy).toBeCalledTimes(1);
  });
});
