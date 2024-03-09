import { Test, TestingModule } from '@nestjs/testing';
import { CreateImportRequestCommand } from 'src/commands/importRequest/ImportRequestCreateCommand';
import { ImportRequestRepository } from 'src/repository/importrequest.repository';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ImporRequestMock } from '../../../../test/mock/ImportRequestMock';
import { CreateImportRequestHandler } from './createImportRequestHandler';

describe('CreateImportRequestHandler', () => {
  let handler: CreateImportRequestHandler;
  let repository: Repository<ImportRequest>; // Replace with the actual type of your repository

  const exampleCrerateCommand = new CreateImportRequestCommand({
    userid: 'test',
    entriesToImport: [],
    toObject: () => ({ userid: 'test', entriesToImport: [] }),
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateImportRequestHandler,
        {
          provide: 'IMPORT_REQUEST_MODEL',
          useValue: ImporRequestMock,
        },
        { provide: Repository, useClass: ImportRequestRepository }, // Provide the mock repository
      ],
    }).compile();

    handler = module.get<CreateImportRequestHandler>(
      CreateImportRequestHandler,
    );
    repository = module.get<Repository<ImportRequest>>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return promise', async () => {
    // Act
    const response = handler.execute(exampleCrerateCommand);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });

  it('should create an import request', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'create');

    // Act
    await handler.execute(exampleCrerateCommand);

    // Assert
    expect(spy).toHaveBeenCalledWith(exampleCrerateCommand.objectDto);
  });

  // Add more test cases as needed
});
