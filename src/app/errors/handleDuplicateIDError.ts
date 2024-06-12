/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extracted_message = match && match[1];

  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: `${extracted_message} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate error",
    errorMessages,
  };
};
export default handleDuplicateError;
