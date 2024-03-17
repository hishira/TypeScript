import {
  ImportEntrySchema,
  ImportRequest,
} from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportRequestBuilder } from './importRequest.builder';

describe('ImportRequestBuilder', () => {
  it('should construct import request with provided options', () => {
    // Arrange
    const importRequestId = '123';
    const userid = '456';
    const createDate = new Date();
    const entriesToImport: ImportEntrySchema[] = [
      {
        email: 'test-email',
        password: 'test-password',
        title: 'test-title',
        url: 'http://test-url.com',
        username: 'test-username',
      },
    ];
    const state = ImportRequestState.Active;

    const expectedImportRequest: Partial<ImportRequest> = {
      _id: importRequestId,
      userid,
      created: createDate,
      entriesToImport,
      state,
    };

    // Act
    const importRequest = new ImportRequestBuilder()
      .setId(importRequestId)
      .setUserId(userid)
      .setCreateDate(createDate)
      .setEntriesToImport(entriesToImport)
      .setState(state)
      .getOption();

    // Assert
    expect(importRequest).toEqual({
      getOption: expect.any(Function),
    });

    const actualImportRequest = importRequest.getOption();
    expect(actualImportRequest).toEqual(expectedImportRequest);
  });
});
