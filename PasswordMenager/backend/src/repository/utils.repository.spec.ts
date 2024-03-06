import { Paginator } from 'src/utils/paginator';
import { entryMock } from '../../test/mock/EntryMock';
import { UtilsRepository } from './utils.repository';

describe('UtilsRepository', () => {
  describe('getEntryPaginatorDateAsPromise', () => {
    it('should return promise', () => {
      const response = UtilsRepository.getEntryPaginatorDateAsPromise(
        [entryMock()],
        { page: 0 },
      );
      expect(response).toBeInstanceOf(Promise);
    });
    it('Should has paginator data', async () => {
      const response = await UtilsRepository.getEntryPaginatorDateAsPromise(
        [entryMock()],
        { page: 0 },
      );
      expect(response).toHaveProperty('pageInfo');
      expect(response.pageInfo).toBeInstanceOf(Paginator);
    });

    it('Should has entries', async () => {
      const response = await UtilsRepository.getEntryPaginatorDateAsPromise(
        [entryMock()],
        { page: 0 },
      );
      expect(response).toHaveProperty('data');
      expect(response.data).toBeInstanceOf(Array);
    });
  });
});
