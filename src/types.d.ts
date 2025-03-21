import type { Schema, Types } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ISubscription {
  name: string;
  price: number;
  currency: "USD" | "EUR" | "GBP";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  category:
    | "sports"
    | "news"
    | "entertainment"
    | "lifestyle"
    | "education"
    | "technology"
    | "finance"
    | "politics"
    | "travel"
    | "other";
  paymentMethod: string;
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  renewalDate: Date;
  user: Schema.Types.ObjectId;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser & {
        _id: Types.ObjectId;
      };
    }
  }
}

declare global {
  interface Error {
    statusCode?: number;
  }
}

export { Express, IUser, ISubscription };
