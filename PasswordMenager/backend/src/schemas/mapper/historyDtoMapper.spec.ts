import { HistoryDTOMapper } from './historyDtoMapper';

describe('HistoryDTOMapper', () => {
  describe('CreateHistoryDTO', () => {
    it('should return a DTO object with the provided userid', () => {
      const userid = '123456789';
      const historyDTO = HistoryDTOMapper.CreateHistoryDTO(userid);

      expect(historyDTO).toBeDefined();
      expect(historyDTO).toHaveProperty('toObject');
      expect(typeof historyDTO.toObject).toBe('function');

      const dtoObject = historyDTO.toObject();
      expect(dtoObject).toEqual({
        userid: userid,
        groups: [],
        entities: [],
      });
    });
  });
});
