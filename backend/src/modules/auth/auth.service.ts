import User from "./auth.model";
import { Subscription } from "../subscription/subscription.model";
import generateToken from "../../utils/token";

export const registerUser = async (userData: any) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  await Subscription.create({
    userId: user._id,
    plan: "FREE",
    usage: {
      count: 0,
      resetAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
  });

  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as any),
    };
  } else {
    throw new Error("Invalid user data");
  }
};

export const loginUser = async (credentials: any) => {
  const { email, password } = credentials;

  const user: any = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as string),
    };
  } else {
    throw new Error("Invalid email or password");
  }
};

export const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId);

  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
};
