export enum HistoryErrorMapper {
  Create = 'History repository: create method',
  Update = 'History repository: update method',
  Delete = 'History reposityry: delete method',
}
export enum HistoryServiceMessage {
  Create = 'History service; create method',
  CreateMessage = 'History created for user = ',
  UpdateGroupToHistory = 'History service; appendGroupToHistory method',
  UpdateEntietiesToHistory = 'History service; appendEntityToHistory method',
  UpdateGroupMessage = 'Group appended to history with userid = ',
  UpdateEntitiesMessage = 'Entieties appended to history with userid = ',
}
