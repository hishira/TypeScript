export enum ErrorTypes {
  Email = 'email',
  EmailMatch = 'emailmatch',
  Required = 'required',
}
export type ErrorMessage = {
  [key in ErrorTypes]: string;
};
export const ErrorMessages = {
  [ErrorTypes.Required]: 'Required',
  [ErrorTypes.Email]: 'Must be email',
  [ErrorTypes.EmailMatch]: "Email's must be same"
};
