import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, Leaf, Heart } from "lucide-react";

const FeaturedDrinks = () => {
  const drinks = [
    {
      name: "Earth Blend Espresso",
      description: "Rich, full-bodied espresso sourced from Ethiopian highlands with notes of dark chocolate and caramel.",
      price: "$4.50",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      badges: ["Organic", "Fair Trade"],
      isPopular: true
    },
    {
      name: "Golden Turmeric Latte",
      description: "Warming blend of organic turmeric, ginger, and coconut milk with a touch of local honey.",
      price: "$5.25",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      badges: ["Vegan", "Anti-inflammatory"],
      isPopular: false
    },
    {
      name: "Rainforest Cold Brew",
      description: "Smooth, chocolatey cold brew supporting rainforest conservation. Served with reusable glass.",
      price: "$4.75",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      badges: ["Conservation Partner", "Organic"],
      isPopular: true
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-earth-brown mb-6">
            Featured Eco Drinks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-crafted beverages that support sustainable farming and taste incredible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {drinks.map((drink, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card">
              <div className="relative">
                <img 
                  src={drink.image} 
                  alt={drink.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {drink.isPopular && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-earth-green text-off-white">
                      <Heart className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-off-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{drink.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-earth-brown mb-2">
                  {drink.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {drink.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {drink.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-earth-green">
                    {drink.price}
                  </span>
                  <Button size="sm" className="group-hover:bg-earth-green/90">
                    Add to Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/menu">
              View Full Menu
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDrinks;