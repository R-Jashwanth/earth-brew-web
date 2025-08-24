import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Leaf, Recycle, Droplets, Sun, TreePine, Users } from 'lucide-react';

const Sustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: "Carbon Neutral Operations",
      description: "We've achieved carbon neutrality through renewable energy and verified offset programs.",
      progress: 100,
      metric: "100% Carbon Neutral"
    },
    {
      icon: Recycle,
      title: "Zero Waste Goal",
      description: "Comprehensive recycling and composting programs to minimize landfill waste.",
      progress: 95,
      metric: "95% Waste Diverted"
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description: "Advanced water filtration and recycling systems reduce consumption by 40%.",
      progress: 85,
      metric: "40% Water Saved"
    },
    {
      icon: Sun,
      title: "Renewable Energy",
      description: "Solar panels and wind energy power all our café locations.",
      progress: 100,
      metric: "100% Renewable"
    }
  ];

  const partnerships = [
    {
      name: "Rainforest Alliance",
      description: "Supporting biodiversity conservation and sustainable farming practices",
      impact: "500+ farmers supported"
    },
    {
      name: "Fair Trade USA",
      description: "Ensuring fair wages and working conditions for coffee producers",
      impact: "25 certified farms"
    },
    {
      name: "Local Food Bank",
      description: "Donating surplus food and supporting community nutrition programs",
      impact: "10,000+ meals donated"
    },
    {
      name: "Tree Planting Initiative",
      description: "Reforestation projects to offset carbon emissions and restore habitats",
      impact: "5,000 trees planted"
    }
  ];

  const impactStats = [
    { number: "50,000+", label: "Plastic cups saved", icon: Recycle },
    { number: "25", label: "Fair trade partnerships", icon: Users },
    { number: "100%", label: "Renewable energy", icon: Sun },
    { number: "5,000", label: "Trees planted", icon: TreePine }
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
                Our Environmental Impact
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Leading the way in sustainable coffee practices and environmental stewardship
              </p>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactStats.map((stat, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="h-8 w-8 text-hsl(var(--earth-green))" />
                      </div>
                      <div className="text-3xl font-bold text-hsl(var(--earth-green))">{stat.number}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Sustainability Initiatives */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Our Sustainability Initiatives
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive programs to minimize our environmental footprint
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {initiatives.map((initiative, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-hsl(var(--earth-green))/10 rounded-full flex items-center justify-center">
                          <initiative.icon className="h-6 w-6 text-hsl(var(--earth-green))" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{initiative.title}</CardTitle>
                          <Badge variant="secondary">{initiative.metric}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{initiative.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{initiative.progress}%</span>
                        </div>
                        <Progress value={initiative.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Partnerships */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Our Partners
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Collaborating with organizations that share our commitment to sustainability
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partnerships.map((partner, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-hsl(var(--earth-green))">{partner.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{partner.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{partner.impact}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Future Goals */}
          <section className="py-16 bg-hsl(var(--earth-green)) text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
                  2025 Goals
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Our commitment to continuous improvement and greater impact
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">Zero</div>
                  <p className="text-lg">Waste to Landfill</p>
                  <p className="text-sm opacity-80 mt-2">Achieve 100% waste diversion through enhanced recycling and composting</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">50</div>
                  <p className="text-lg">New Farm Partnerships</p>
                  <p className="text-sm opacity-80 mt-2">Expand our network of sustainable coffee producers worldwide</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">10,000</div>
                  <p className="text-lg">More Trees Planted</p>
                  <p className="text-sm opacity-80 mt-2">Continue reforestation efforts to offset our carbon footprint</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Sustainability;