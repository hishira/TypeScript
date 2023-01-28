import { PetFilterType } from "./FilterType.model";

export interface PetFilterEvent {
    filterType: PetFilterType
    id: number;
}