import type { Schema } from "mongoose";

interface ErrorT extends Error {
  statusCode?: number;
}

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ISchema {
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
