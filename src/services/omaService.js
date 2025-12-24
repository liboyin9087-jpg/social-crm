import { supabase } from './supabaseClient';

export const omaService = {
  async getOMAEvents(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('oma_events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async getUserOMAEvents(userId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('oma_events')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async createOMAEvent(event) {
    try {
      const { data, error } = await supabase
        .from('oma_events')
        .insert([event])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async getOMAEventsByLocation(locationName) {
    try {
      const { data, error } = await supabase
        .from('oma_events')
        .select('*')
        .eq('location_name', locationName)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async getOMAEventsByActionType(actionType, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('oma_events')
        .select('*')
        .eq('action_type', actionType)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
};
