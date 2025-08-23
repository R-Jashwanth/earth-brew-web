import { Leaf, Heart, Globe, Recycle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Mission = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description: "Direct partnerships with eco-conscious farmers who practice regenerative agriculture and fair trade principles."
    },
    {
      icon: Recycle,
      title: "Zero Waste Goal",
      description: "Compostable cups, reusable packaging, and a comprehensive recycling program to minimize our environmental footprint."
    },
    {
      icon: Globe,
      title: "Carbon Neutral",
      description: "Powered by 100% renewable energy and offset our carbon emissions through verified environmental projects."
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Supporting local communities, providing living wages, and creating spaces that bring people together."
    }
  ];

  return (
    <section className="py-20 bg-soft-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-earth-brown mb-6">
            Our Eco Mission
          </h2>
          <p className="text-lg text-earth-brown/80 max-w-3xl mx-auto leading-relaxed">
            We believe that great coffee and environmental responsibility go hand in hand. 
            Every decision we make is guided by our commitment to sustainability and community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-off-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-green/20 transition-colors">
                  <value.icon className="h-8 w-8 text-earth-green" />
                </div>
                <h3 className="text-xl font-semibold text-earth-brown mb-4">
                  {value.title}
                </h3>
                <p className="text-earth-brown/70 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="mt-20 bg-earth-green rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold font-playfair text-off-white mb-8">
            Our Impact This Year
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-sage-green mb-2">50,000+</div>
              <div className="text-off-white/80">Plastic cups saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sage-green mb-2">25</div>
              <div className="text-off-white/80">Fair trade partnerships</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sage-green mb-2">100%</div>
              <div className="text-off-white/80">Renewable energy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;