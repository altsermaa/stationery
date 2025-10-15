import { Schema, model } from "mongoose";

export type CarouselSlide = {
  _id: Schema.Types.ObjectId;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  isActive: boolean;
  order: number;
  linkUrl?: string;
  linkText?: string;
  createdAt: Date;
  updatedAt: Date;
};

const CarouselSlideSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, required: true, default: 0 },
  linkUrl: { type: String },
  linkText: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index for ordering and active status
CarouselSlideSchema.index({ order: 1, isActive: 1 });

// Update the updatedAt field before saving
CarouselSlideSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const CarouselSlideModel = model<CarouselSlide>("CarouselSlide", CarouselSlideSchema);
