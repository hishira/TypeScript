import {IEntry} from "../../schemas/Interfaces/entry.interface";

type DeleteEntryResponse = {
    status: boolean,
    respond: IEntry | null,
}

type EditEntryResponse = {
    status: boolean,
    respond: IEntry | null
}