/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extracted_message = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extracted_message} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate error',
    errorSources,
  };
};
export default handleDuplicateError;
