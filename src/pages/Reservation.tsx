import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/use-toast';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Phone, Mail, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    time: '',
    location: '',
    specialRequests: ''
  });

  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const locations = [
    { id: 'downtown', name: 'Downtown Café', address: '123 Green Street' },
    { id: 'university', name: 'University Branch', address: '456 Campus Avenue' },
    { id: 'waterfront', name: 'Waterfront Location', address: '789 Harbor View' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setReservationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !reservationData.time || !reservationData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reservation Confirmed!",
      description: `Your table for ${reservationData.partySize} on ${format(selectedDate, 'PPP')} at ${reservationData.time} has been reserved.`
    });

    // Reset form
    setReservationData({
      name: '',
      email: '',
      phone: '',
      partySize: '',
      time: '',
      location: '',
      specialRequests: ''
    });
    setSelectedDate(undefined);
  };

  const handleOrderSubmit = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: `Your order total of $${getTotalPrice().toFixed(2)} has been placed for pickup.`
    });

    clearCart();
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-hsl(var(--earth-green)) to-hsl(var(--sage-green)) text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                Reserve & Order
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Book your table or order your favorite drinks for pickup
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="reservation" className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="reservation" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Table Reservation
                  </TabsTrigger>
                  <TabsTrigger value="order" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Online Order
                  </TabsTrigger>
                </TabsList>

                {/* Table Reservation Tab */}
                <TabsContent value="reservation">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Reservation Form */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Reserve Your Table</CardTitle>
                        <p className="text-muted-foreground">
                          Book a table at one of our sustainable café locations
                        </p>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleReservationSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name *</Label>
                              <Input
                                id="name"
                                value={reservationData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={reservationData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={reservationData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="partySize">Party Size *</Label>
                              <Select value={reservationData.partySize} onValueChange={(value) => handleInputChange('partySize', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select party size" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                                    <SelectItem key={size} value={size.toString()}>
                                      {size} {size === 1 ? 'person' : 'people'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Date *</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="time">Time *</Label>
                            <Select value={reservationData.time} onValueChange={(value) => handleInputChange('time', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map(time => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Select value={reservationData.location} onValueChange={(value) => handleInputChange('location', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                {locations.map(location => (
                                  <SelectItem key={location.id} value={location.id}>
                                    {location.name} - {location.address}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="specialRequests">Special Requests</Label>
                            <Textarea
                              id="specialRequests"
                              placeholder="Any dietary restrictions, accessibility needs, or special occasions..."
                              value={reservationData.specialRequests}
                              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                              rows={3}
                            />
                          </div>

                          <Button type="submit" className="w-full" size="lg">
                            Reserve Table
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    {/* Location Info */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Our Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {locations.map(location => (
                            <div key={location.id} className="p-4 border rounded-lg">
                              <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                              <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {location.address}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  (555) 123-BREW
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  Mon-Fri: 6:30 AM - 8:00 PM
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Reservation Policy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <p>• Reservations can be made up to 30 days in advance</p>
                          <p>• Tables are held for 15 minutes past reservation time</p>
                          <p>• Cancellations accepted up to 2 hours before reservation</p>
                          <p>• Large parties (8+) may require a deposit</p>
                          <p>• We accommodate dietary restrictions with advance notice</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Online Order Tab */}
                <TabsContent value="order">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Your Order</CardTitle>
                        <p className="text-muted-foreground">
                          Review your items and place your order for pickup
                        </p>
                      </CardHeader>
                      <CardContent>
                        {cartItems.length === 0 ? (
                          <div className="text-center py-8">
                            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
                            <Button asChild>
                              <a href="/menu">Browse Menu</a>
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                  <h3 className="font-medium">{item.menu_items.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    ${item.menu_items.price.toFixed(2)} each
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}

                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total:</span>
                                <span>${getTotalPrice().toFixed(2)}</span>
                              </div>
                            </div>

                            <Button onClick={handleOrderSubmit} className="w-full" size="lg">
                              Place Order for Pickup
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Order Info */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Pickup Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h3 className="font-semibold mb-2">Estimated Pickup Time</h3>
                            <p className="text-sm text-muted-foreground">
                              Orders are typically ready in 10-15 minutes during regular hours.
                              We'll send you a notification when your order is ready.
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="font-semibold">Pickup Locations:</h3>
                            {locations.map(location => (
                              <div key={location.id} className="text-sm">
                                <p className="font-medium">{location.name}</p>
                                <p className="text-muted-foreground">{location.address}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Sustainability Note</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                <Leaf className="h-3 w-3 mr-1" />
                                Eco-Friendly
                              </Badge>
                            </div>
                            <p>
                              All our takeout containers are compostable, and we encourage 
                              bringing your own reusable cups for a 10% discount!
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Reservation;