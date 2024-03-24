import { ExportReader } from './exportReader';

describe('ExportReader', () => {
  it('should emit CSV data from the provided array', (done) => {
    const csvData = [
      ['Title1', 'Username1', 'Password1', 'Note1'],
      ['Title2', 'Username2', 'Password2', 'Note2'],
      ['Title3', 'Username3', 'Password3', 'Note3'],
    ];

    const reader = new ExportReader(csvData);

    const chunks: string[] = [];

    reader.on('data', (chunk) => {
      chunks.push(chunk);
    });

    reader.on('end', () => {
      const csvContent = chunks.join('');
      expect(csvContent).toContain('Title1,Username1,Password1,Note1');
      expect(csvContent).toContain('Title2,Username2,Password2,Note2');
      expect(csvContent).toContain('Title3,Username3,Password3,Note3');
      done();
    });

    reader.on('error', (err) => {
      done.fail(err);
    });
  });

  //   it('should emit null when all data has been read', async (done) => {
  //     const csvData = [['Title1', 'Username1', 'Password1', 'Note1']];
  //     const reader = new ExportReader(csvData);

  //     const chunks: string[] = [];
  //     reader.on('data', (chunk) => {
  //       chunks.push(chunk);
  //     });

  //     reader.on('end', () => {
  //       const csvContent = chunks.join('');
  //       expect(csvContent).toContain('Title1,Username1,Password1,Note1');

  //       reader.push(null); // Simulate reaching end of data
  //     });

  //     reader.on('close', () => {
  //       done();
  //     });

  //     reader.on('error', (err) => {
  //       done.fail(err);
  //     });
  //   });

  it('should handle errors gracefully', (done) => {
    const csvData = [['Title1', 'Username1', 'Password1', 'Note1']];
    const reader = new ExportReader(csvData);

    reader.on('error', (err) => {
      expect(err).toBeTruthy();
      done();
    });

    // Trigger an error by emitting an error event
    reader.emit('error', new Error('Test error'));
  });
});
