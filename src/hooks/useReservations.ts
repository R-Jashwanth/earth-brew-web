import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface Reservation {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  location_id: string;
  special_requests?: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  party_size: string;
  date: Date;
  time: string;
  location: string;
  special_requests: string;
}

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchReservations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', user.id)
        .order('reservation_date', { ascending: false });

      if (error) throw error;
      setReservations((data as Reservation[]) || []);
    } catch (error: any) {
      toast({
        title: "Error loading reservations",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (formData: ReservationForm) => {
    setLoading(true);
    try {
      const reservationData = {
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        party_size: parseInt(formData.party_size),
        reservation_date: formData.date.toISOString().split('T')[0],
        reservation_time: formData.time,
        location_id: formData.location,
        special_requests: formData.special_requests || null,
        status: 'confirmed' as const
      };

      const { data, error } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Reservation Confirmed!",
        description: `Your table for ${formData.party_size} on ${formData.date.toLocaleDateString()} at ${formData.time} has been reserved.`
      });

      if (user) {
        fetchReservations();
      }

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Reservation Failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', reservationId);

      if (error) throw error;

      toast({
        title: "Reservation Cancelled",
        description: "Your reservation has been cancelled successfully."
      });

      fetchReservations();
    } catch (error: any) {
      toast({
        title: "Error cancelling reservation",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  return {
    reservations,
    loading,
    createReservation,
    cancelReservation,
    refetch: fetchReservations
  };
};