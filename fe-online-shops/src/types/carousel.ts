export interface CarouselSlide {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  isActive: boolean;
  order: number;
  linkUrl?: string;
  linkText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarouselApiResponse {
  success: boolean;
  message: string;
  slides?: CarouselSlide[];
  slide?: CarouselSlide;
  error?: string;
}
