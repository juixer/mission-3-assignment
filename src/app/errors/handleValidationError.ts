import mongoose from "mongoose";
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = Object.values(err.errors).map(
    (validation: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: validation.path,
        message: validation.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation error",
    errorMessages,
  };
};

export default handleValidationError;
