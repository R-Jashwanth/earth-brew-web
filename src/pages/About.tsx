import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Leaf, Heart, Users, Award, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Coffee,
      title: "Premium Quality",
      description: "We source only the finest coffee beans from sustainable farms around the world."
    },
    {
      icon: Leaf,
      title: "Environmental Focus",
      description: "Every decision we make considers our impact on the planet and future generations."
    },
    {
      icon: Heart,
      title: "Community Care",
      description: "We believe in supporting local communities and creating meaningful connections."
    },
    {
      icon: Users,
      title: "Fair Trade",
      description: "We ensure fair wages and working conditions for all our farming partners."
    }
  ];

  const team = [
    {
      name: "Sarah Martinez",
      role: "Founder & CEO",
      bio: "Environmental scientist turned coffee entrepreneur, passionate about sustainable business practices.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Marcus Chen",
      role: "Head Roaster",
      bio: "20+ years of coffee roasting experience with expertise in bringing out unique flavor profiles.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Elena Rodriguez",
      role: "Sustainability Director",
      bio: "Leading our environmental initiatives and partnerships with eco-conscious suppliers.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const achievements = [
    { icon: Award, title: "B-Corp Certified", description: "Certified for social and environmental performance" },
    { icon: Globe, title: "Carbon Neutral", description: "100% carbon neutral operations since 2020" },
    { icon: Leaf, title: "Zero Waste", description: "Diverted 95% of waste from landfills" },
    { icon: Heart, title: "Community Impact", description: "Supported 50+ local initiatives" }
  ];

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-hsl(var(--earth-green)) to-hsl(var(--sage-green)) text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Brewing a better future, one cup at a time
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-8">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Founded in 2019, Eco Brews Café was born from a simple belief: exceptional coffee and environmental 
                  responsibility should go hand in hand. We're more than just a coffee shop – we're a community of 
                  conscious consumers, dedicated farmers, and passionate baristas working together to create positive change.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every cup we serve tells a story of sustainability, from the organic farms where our beans are grown 
                  to the compostable cups in your hands. We're committed to proving that businesses can be profitable 
                  while being a force for good in the world.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  These core principles guide everything we do
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-8 w-8 text-hsl(var(--earth-green))" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Meet Our Team
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The passionate people behind Eco Brews Café
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <Badge variant="secondary">{member.role}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="py-16 bg-hsl(var(--earth-green)) text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
                  Our Achievements
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Recognition for our commitment to sustainability and community
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm opacity-80">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default About;