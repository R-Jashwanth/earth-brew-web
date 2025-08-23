import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Sarah Martinez",
      role: "Environmental Scientist",
      content: "Finally, a café that aligns with my values! The coffee is exceptional and knowing it's sustainably sourced makes every sip even better. The compostable cups are a game-changer.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Michael Chen",
      role: "Local Artist",
      content: "Eco Brews has become my daily ritual. The atmosphere is perfect for creative work, and their fair trade Ethiopian blend is absolutely divine. Plus, I love earning rewards for being eco-conscious!",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Emma Thompson",
      role: "University Student",
      content: "As a student on a budget, I appreciate that choosing sustainable options doesn't break the bank here. The Golden Turmeric Latte is my go-to study fuel, and the baristas are incredibly knowledgeable.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "David Rodriguez",
      role: "Tech Entrepreneur",
      content: "The convenience of their app combined with the quality of their coffee is unmatched. I love being able to see the exact impact of my purchases - transparency at its finest!",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="py-20 bg-sage-green/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-earth-brown mb-6">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who are passionate about sustainable coffee
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-off-white relative overflow-hidden">
            <div className="absolute top-8 left-8 text-sage-green/20">
              <Quote className="w-16 h-16" />
            </div>
            
            <CardContent className="p-12 relative">
              <div className="text-center mb-8">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-earth-brown font-medium leading-relaxed italic mb-8">
                  "{reviews[currentReview].content}"
                </blockquote>
              </div>

              <div className="flex items-center justify-center gap-4">
                <img 
                  src={reviews[currentReview].avatar}
                  alt={reviews[currentReview].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-sage-green/20"
                />
                <div className="text-center">
                  <div className="font-semibold text-earth-brown text-lg">
                    {reviews[currentReview].name}
                  </div>
                  <div className="text-muted-foreground">
                    {reviews[currentReview].role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview 
                    ? 'bg-earth-green scale-125' 
                    : 'bg-earth-green/30 hover:bg-earth-green/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Customer count */}
        <div className="text-center mt-16">
          <div className="text-4xl font-bold text-earth-green mb-2">10,000+</div>
          <div className="text-muted-foreground">Happy eco-conscious customers</div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;