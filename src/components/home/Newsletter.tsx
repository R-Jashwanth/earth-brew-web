import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Gift, Leaf, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate subscription
    setIsSubscribed(true);
    toast({
      title: "Welcome to our eco community! 🌱",
      description: "Check your email for a welcome gift and sustainability tips.",
    });
    setEmail("");
  };

  const benefits = [
    { icon: Coffee, text: "Weekly sustainable coffee tips" },
    { icon: Leaf, text: "First access to new eco products" },
    { icon: Gift, text: "Exclusive member discounts" }
  ];

  return (
    <section className="py-20 bg-earth-green">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-off-white overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Content Side */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-6 h-6 text-earth-green" />
                    <Badge className="bg-sage-green/10 text-earth-green">
                      Join 5,000+ eco warriors
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold font-playfair text-earth-brown mb-4">
                    Stay Brewing Green
                  </h3>
                  
                  <p className="text-earth-brown/70 mb-6 leading-relaxed">
                    Get sustainability tips, exclusive offers, and be the first to know about 
                    our environmental initiatives. Plus, receive a 15% welcome discount!
                  </p>

                  <div className="space-y-3 mb-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sage-green/10 rounded-full flex items-center justify-center">
                          <benefit.icon className="w-4 h-4 text-earth-green" />
                        </div>
                        <span className="text-earth-brown/80 text-sm">{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                          required
                        />
                        <Button type="submit" className="px-6">
                          Subscribe
                        </Button>
                      </div>
                      <p className="text-xs text-earth-brown/60">
                        We respect your privacy. Unsubscribe anytime.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center p-6 bg-sage-green/10 rounded-lg">
                      <div className="w-12 h-12 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-off-white" />
                      </div>
                      <h4 className="font-semibold text-earth-brown mb-2">You're all set! 🎉</h4>
                      <p className="text-sm text-earth-brown/70">
                        Welcome to our sustainable community. Check your email for goodies!
                      </p>
                    </div>
                  )}
                </div>

                {/* Visual Side */}
                <div className="bg-gradient-to-br from-sage-green/20 to-clay/20 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-earth-green rounded-full flex items-center justify-center mx-auto mb-6">
                      <Leaf className="w-12 h-12 text-off-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-earth-brown mb-3">
                      15% Welcome Discount
                    </h4>
                    <p className="text-earth-brown/70 text-sm">
                      Use code ECOWELCOME on your first order
                    </p>
                    <div className="mt-6 p-4 bg-off-white rounded-lg border-2 border-dashed border-sage-green/30">
                      <code className="text-earth-green font-mono text-lg font-bold">
                        ECOWELCOME
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;