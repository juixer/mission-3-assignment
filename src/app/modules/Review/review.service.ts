import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { User } from "../user/user.model";

const writeReviewIntoDB = async (token: JwtPayload, payload: TReview) => {
  // destructing email from token
  const { email } = token;
  // finding user by email
  const user = await User.findOne({ email });

  const reviewData: Partial<TReview> = {
    name: user?.name as string,
    bikeName: payload.bikeName,
    image: user?.profile_picture as string,
    comment: payload.comment,
    rating: payload.rating,
  };
  const result = await Review.create(reviewData);
  return result;
};



const getNotVerifiedReviewsFromDB = async () => {
  const result = await Review.find({ verified: false });
  return result;
};

const getVerifiedReviewsFromDB = async () => {
  const result = await Review.find({ verified: true });
  return result;
};

const verifyReviewIntoDB = async (id: string) => {
  const result = await Review.findByIdAndUpdate(id, { verified: true });
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

const getLatestReviewsFromDB = async () => {
  const result = await Review.find({ verified: true })
    .sort({ createdAt: -1 })
    .limit(10);
  return result;
};

export const reviewServices = {
  writeReviewIntoDB,
  getNotVerifiedReviewsFromDB,
  getVerifiedReviewsFromDB,
  verifyReviewIntoDB,
  deleteReviewFromDB,
  getLatestReviewsFromDB,
};
