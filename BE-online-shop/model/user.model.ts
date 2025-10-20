import { Schema, model } from "mongoose";

export type User = {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: "User" | "Admin";
  orderedProducts: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

enum UserRole {
  USER = "User",
  ADMIN = "Admin",
}

const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: UserRole.USER,
    required: true,
  },
  orderedProducts: [{ 
    type: Schema.Types.ObjectId, 
    ref: "ProductOrder" 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now, 
    immutable: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const UserModel = model<User>("User", UserSchema);

