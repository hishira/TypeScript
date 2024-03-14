import { Test } from '@nestjs/testing';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import { ImportRequestRepository } from 'src/repository/importrequest.repository';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportRequestBuilder } from 'src/schemas/utils/builders/importRequest.builder';
import { ImporRequestMock } from '../../../../test/mock/ImportRequestMock';
import { GetImportQueryHandler } from './getImportsHandler';

describe('GetImportQueryHandler', () => {
  let handler: GetImportQueryHandler;
  let repository: Repository<ImportRequest>; // Mock your repository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetImportQueryHandler,
        {
          provide: 'IMPORT_REQUEST_MODEL',
          useValue: ImporRequestMock,
        },
        { provide: Repository, useClass: ImportRequestRepository },
      ],
    }).compile();

    handler = module.get<GetImportQueryHandler>(GetImportQueryHandler);
    repository = module.get<Repository<ImportRequest>>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return import requests with specified parameters', async () => {
    // Arrange
    const queryInput = {
      id: 'importRequestId',
      state: ImportRequestState.Complete,
      userId: 'userId123',
    };
    const spy = jest.spyOn(repository, 'find');
    const query = new GetImportQuery(queryInput);

    // Act
    await handler.execute(query);

    expect(spy).toHaveBeenCalledWith({
      getOption: expect.any(Function), // You may adjust this based on your actual implementation
    });
  });

  it('Should return promise', () => {
    const queryInput = {
      id: 'importRequestId',
      state: ImportRequestState.Complete,
      userId: 'userId123',
    };
    const query = new GetImportQuery(queryInput);

    // Act
    const response = handler.execute(query);
    expect(response).toBeInstanceOf(Promise);
  });

  it('Should use ImportRequestBuilder -> getOption', async () => {
    const queryInput = {
      id: 'importRequestId',
      state: ImportRequestState.Complete,
      userId: 'userId123',
    };
    const query = new GetImportQuery(queryInput);
    const spy = jest.spyOn(ImportRequestBuilder.prototype, 'getOption');
    // Act
    await handler.execute(query);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
