import { MenuItem } from 'primeng/api';

const GeneralInformation: MenuItem = {
  label: 'General information',
};

const Authorization: MenuItem = {
  label: 'Authorization',
};

const AddressConfiguration: MenuItem = {
  label: 'Address configuration',
};

const Summary: MenuItem = {
  label: 'Summary',
};

export const CreateUserSteps: MenuItem[] = [
  GeneralInformation,
  Authorization,
  AddressConfiguration,
  Summary,
];
