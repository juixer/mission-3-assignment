import httpStatus from "http-status";
import AppError from "../../errors/AppError";

export const calculateTotalCost = (
  start: Date,
  current: Date,
  pricePerHour: number
) => {

  const startTime = new Date(start).getTime();
  const currentTime = new Date(current).getTime();

  // checking if start time bigger then return time
  if(startTime > currentTime) {
    throw new AppError(httpStatus.CONFLICT, `startTime must be smaller than returnTime`)
  }

  // calculating total cost
  const getHours = (currentTime - startTime) / (1000 * 60 * 60);
  return (getHours * pricePerHour).toFixed(2);
};
