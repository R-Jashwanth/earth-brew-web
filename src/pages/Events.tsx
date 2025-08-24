import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  duration_minutes: number;
  max_attendees: number;
  current_attendees: number;
  price: number;
  image_url?: string;
  location: string;
  is_active: boolean;
}

interface EventBooking {
  id: string;
  event_id: string;
  status: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userBookings, setUserBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const fetchUserBookings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('event_bookings')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching user bookings:', error);
    } else {
      setUserBookings(data || []);
    }
  };

  const handleBookEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to book events",
        variant: "destructive"
      });
      return;
    }

    // Check if already booked
    const existingBooking = userBookings.find(booking => booking.event_id === eventId);
    if (existingBooking) {
      toast({
        title: "Already booked",
        description: "You have already booked this event",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('event_bookings')
      .insert({
        user_id: user.id,
        event_id: eventId
      });

    if (error) {
      toast({
        title: "Booking failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Event booked!",
        description: "Your booking has been confirmed"
      });
      fetchUserBookings();
      fetchEvents(); // Refresh to update attendee counts
    }
  };

  const isEventBooked = (eventId: string) => {
    return userBookings.some(booking => booking.event_id === eventId);
  };

  const isEventFull = (event: Event) => {
    return event.max_attendees && event.current_attendees >= event.max_attendees;
  };

  if (loading) {
    return (
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen bg-background">
          <Header />
          <div className="pt-20 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading events...</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-hsl(var(--earth-green)) to-hsl(var(--sage-green)) text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                Café Events & Workshops
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Join our community events and learn about sustainable coffee culture
              </p>
            </div>
          </section>

          {/* Events Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-hsl(var(--earth-green))/20 to-hsl(var(--sage-green))/20 flex items-center justify-center">
                      {event.image_url ? (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl">🎉</div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        {event.price > 0 && (
                          <span className="text-xl font-bold text-hsl(var(--earth-green))">
                            ${event.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(event.event_date), 'PPP')}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {format(new Date(event.event_date), 'p')} ({event.duration_minutes} min)
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        {event.max_attendees && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {event.current_attendees}/{event.max_attendees} attendees
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {event.price === 0 && (
                          <Badge variant="secondary">Free</Badge>
                        )}
                        {isEventFull(event) && (
                          <Badge variant="destructive">Full</Badge>
                        )}
                        {isEventBooked(event.id) && (
                          <Badge variant="default">
                            <Star className="h-3 w-3 mr-1" />
                            Booked
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleBookEvent(event.id)}
                        className="w-full"
                        disabled={isEventBooked(event.id) || isEventFull(event)}
                      >
                        {isEventBooked(event.id) ? 'Already Booked' : 
                         isEventFull(event) ? 'Event Full' : 'Book Event'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {events.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No upcoming events at the moment. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Events;