import { PersonalInformation } from "../../../../../api/types/user.types"
import { Gender } from "../../../../shared/types/enums"
import { ExtractFormControl } from "../../../../shared/types/shared"
import { CreateModalGroup } from "./create-user-model.types"

export const  preparePersonalInformation = (formValue: ExtractFormControl<CreateModalGroup>): PersonalInformation => ({
    return {
      firstName: formValue.generalInformation.firstName,
      lastName: formValue.generalInformation.secondName,
      brithday: formValue.generalInformation.birthDate,
      gender: formValue.generalInformation.gender as unknown as Gender,
      contacts: {},
      email: formValue.accessConfiguration.email,
    }
  }