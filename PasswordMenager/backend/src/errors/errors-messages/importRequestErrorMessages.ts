export enum ImportRequestErrorMessages {
  Create = 'ImportRequest repository: create method',
  Find = 'ImportRequest repository: find method',
  FindById = 'ImportRequest repository: findById method',
  Update = 'ImportRequest repository: update method',
  Delete = 'ImportRequest repository: delete method',
}
export enum ImportServiceMessage {
  Activate = 'ImportService; activateImportRequest method',
  ActivateError = 'Activate importrequest not pass',
  ActivateSuccess = 'Activate importrequest pass',
  TryToImport = 'Try to import entries for user = ',
  ImportEntriesFile = 'ImportService; importEntriesFromFile method',
  ImportEntriesFilePass = 'Import entries from file pass',
  ImportEntriesFail = 'Import entries from file fail',
  Delete = 'ImportService: deleteImportRequest method',
  Update = 'ImportService: editImpoerRequest method',
}
