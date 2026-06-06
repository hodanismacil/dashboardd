import { Schema, model, Document } from 'mongoose';

// 1. Qaab-dhismeedka xogta Dashboard-ka (TypeScript Interface)
export interface IUserAnalytics extends Document {
  name: string;
  email: string;
  role: string;          // Tusaale: Admin, Editor, User
  status: string;        // Tusaale: Active, Inactive
  monthlySpending: number; // Dakhliga ka soo xarooday qofkan mishiinka
}

// 2. Mongoose Schema
const userAnalyticsSchema = new Schema<IUserAnalytics>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'User' },
  status: { type: String, default: 'Active' },
  monthlySpending: { type: Number, default: 0 }
}, {
  timestamps: true
});

// 3. Dhoofi Model-ka
export const UserAnalytics = model<IUserAnalytics>('UserAnalytics', userAnalyticsSchema);