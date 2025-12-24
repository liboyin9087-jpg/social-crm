import { supabase } from './supabaseClient';

export const notificationService = {
  async getUserNotifications(userId, unreadOnly = false) {
    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId);

      if (unreadOnly) {
        query = query.eq('is_read', false);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async createNotification(userId, type, title, body, metadata = null) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: userId,
            type,
            title,
            body,
            metadata,
            is_read: false
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async markAsRead(notificationId) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async markAllAsRead(userId) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  },

  async deleteNotification(notificationId) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }
};
