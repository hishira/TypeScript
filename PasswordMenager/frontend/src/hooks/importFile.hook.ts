import { useEffect } from "react";

export const ImportFileEffect = (
  fileChangeHandle: (...args: File[]) => void,
  file: File | undefined
): void => {
  useEffect(() => {
    file && fileChangeHandle(file);
    //eslint-disable-next-line
  }, [file]);
};
