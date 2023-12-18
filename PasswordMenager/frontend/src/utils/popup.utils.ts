import { PopUpStoreType } from "../models/General";

export const SuccessPopUpObject = (message: string): PopUpStoreType => ({
  open: true,
  type: "success",
  message,
});

export const ErrorPopUpObject = (message: string): PopUpStoreType => ({
  open: true,
  type: "error",
  message,
});

export const InfoPopUpObject = (message: string): PopUpStoreType => ({
  open: true,
  type: "info",
  message,
});
