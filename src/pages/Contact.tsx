import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon."
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setLoading(false);
  };

  const locations = [
    {
      name: "Downtown Café",
      address: "123 Green Street, Eco City, EC 12345",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 6:30 AM - 8:00 PM\nSat-Sun: 7:00 AM - 9:00 PM"
    },
    {
      name: "University Branch",
      address: "456 Campus Avenue, Student District, EC 67890",
      phone: "(555) 987-6543",
      hours: "Mon-Thu: 6:00 AM - 10:00 PM\nFri-Sun: 7:00 AM - 11:00 PM"
    },
    {
      name: "Waterfront Location",
      address: "789 Harbor View, Marina District, EC 54321",
      phone: "(555) 456-7890",
      hours: "Daily: 7:00 AM - 8:00 PM"
    }
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
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-hsl(var(--earth-brown))">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-hsl(var(--earth-brown))">
                        Get In Touch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-hsl(var(--earth-green))" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">hello@ecobrews.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-hsl(var(--earth-green))" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">(555) 123-BREW</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-hsl(var(--earth-green)) mt-1" />
                        <div>
                          <p className="font-medium">Headquarters</p>
                          <p className="text-sm text-muted-foreground">
                            123 Sustainable Street<br />
                            Green City, GC 12345
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* FAQ Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-hsl(var(--earth-brown))">
                        Quick Questions?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-medium text-sm">Catering inquiries</p>
                        <p className="text-sm text-muted-foreground">catering@ecobrews.com</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Partnership opportunities</p>
                        <p className="text-sm text-muted-foreground">partners@ecobrews.com</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Press & media</p>
                        <p className="text-sm text-muted-foreground">press@ecobrews.com</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Locations */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-playfair text-hsl(var(--earth-brown)) mb-4">
                  Our Locations
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Visit us at any of our eco-friendly café locations
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {locations.map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg text-hsl(var(--earth-green))">
                        {location.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-hsl(var(--earth-green)) mt-1" />
                        <p className="text-sm">{location.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-hsl(var(--earth-green))" />
                        <p className="text-sm">{location.phone}</p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 text-hsl(var(--earth-green)) mt-1" />
                        <div className="text-sm">
                          {location.hours.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

export default Contact;