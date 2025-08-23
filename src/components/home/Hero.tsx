import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-coffee-plants.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-earth-brown/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Coffee className="h-8 w-8 text-sage-green animate-pulse" />
          <Leaf className="h-8 w-8 text-sage-green animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-playfair text-off-white mb-6 leading-tight">
          Sip Sustainably
        </h1>
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <Coffee className="h-6 w-6 text-sage-green" />
          <span className="text-xl md:text-2xl text-off-white font-medium">
            Eco Brews Café
          </span>
          <Leaf className="h-6 w-6 text-sage-green" />
        </div>

        <p className="text-lg md:text-xl text-soft-beige mb-8 max-w-2xl mx-auto leading-relaxed">
          Where every cup tells a story of sustainability, fair trade, and environmental consciousness. 
          Join us in brewing a better future, one sip at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="group" asChild>
            <Link to="/menu">
              View Menu
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-off-white/10 border-off-white/30 text-off-white hover:bg-off-white hover:text-earth-brown" asChild>
            <Link to="/reservation">
              Order Online
            </Link>
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center">
            <Coffee className="h-8 w-8 text-sage-green" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-clay/20 rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-clay" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-off-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-off-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;