
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarouselSlide } from "@/types/carousel";
import axios from "axios";

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch carousel slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllCarousel");
        if (response.data.success) {
          setSlides(response.data.slides || []);
        } else {
          setError("Failed to load carousel slides");
        }
      } catch (err) {
        console.error("Error fetching carousel slides:", err);
        setError("Failed to load carousel slides");
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading carousel...</div>
      </div>
    );
  }

  // Show error state
  if (error && slides.length === 0) {
    return (
      <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  // Show empty state
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">No carousel slides available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide._id} className="w-full h-full relative flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className="w-full h-full object-cover"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-start items-start text-left px-8 py-8 z-20">
              <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-black drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm lg:text-lg opacity-90 text-black drop-shadow-lg max-w-fit">
                {slide.subtitle}
              </p>
              {slide.linkUrl && slide.linkText && (
                <a 
                  href={slide.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors inline-block"
                >
                  {slide.linkText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>


      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};