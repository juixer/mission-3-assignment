import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

const writeReview = catchAsync(async (req, res) => {
  const token = req.user;
  const result = await reviewServices.writeReviewIntoDB(token, req.body);
  // sending response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews added successfully",
    data: result,
  });
});


const getVerifiedReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getVerifiedReviewsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Verified reviews retrieved successfully",
    data: result,
  });
});

const getNotVerifiedReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getNotVerifiedReviewsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Non-verified reviews retrieved successfully",
    data: result,
  });
});

const verifyReview = catchAsync(async (req, res) => {
  const result = await reviewServices.verifyReviewIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review verified successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await reviewServices.deleteReviewFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

const getLatestReviews = catchAsync(async (req,res) => {
    const result = await reviewServices.getLatestReviewsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Latest review retrieved successfully",
        data: result,
      });
})

export const reviewControllers = {
  writeReview,
  getVerifiedReviews,
  getNotVerifiedReviews,
  verifyReview,
  deleteReview,
  getLatestReviews
};
