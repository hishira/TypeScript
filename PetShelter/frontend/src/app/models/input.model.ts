export enum ErrorTypes  {
    Email =  'email',
    Required = 'required',
}
export type ErrorMessage = {
    [key in ErrorTypes]: string
}
export const ErrorMessages = {
    [ErrorTypes.Required]: 'Required',
    [ErrorTypes.Email]: 'Must be email'
} 