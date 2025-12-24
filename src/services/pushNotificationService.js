import { supabase } from './supabaseClient';

/**
 * PushNotificationService - 推播通知服務
 * Handles push notifications, in-app notifications, and notification preferences
 */

/**
 * Request notification permission from the browser
 * @returns {Promise<string>} Permission status ('granted', 'denied', 'default')
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
};

/**
 * Show a browser notification
 * @param {string} title - Notification title
 * @param {Object} options - Notification options
 * @returns {Notification} Notification instance
 */
export const showNotification = (title, options = {}) => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return null;
  }

  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/vite.svg',
      badge: '/vite.svg',
      ...options,
    });

    notification.onclick = (event) => {
      event.preventDefault();
      window.focus();
      if (options.url) {
        window.location.href = options.url;
      }
      notification.close();
    };

    return notification;
  }

  return null;
};

/**
 * Save notification to database
 * @param {string} userId - Target user ID
 * @param {Object} notificationData - Notification data
 * @returns {Promise<Object>} Created notification
 */
export const createNotification = async (userId, notificationData) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert([
      {
        user_id: userId,
        type: notificationData.type || 'info',
        title: notificationData.title,
        message: notificationData.message,
        data: notificationData.data || {},
        read: false,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating notification:', error);
    throw error;
  }

  return data;
};

/**
 * Get user's notifications
 * @param {string} userId - User ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of notifications
 */
export const getUserNotifications = async (userId, options = {}) => {
  const {
    limit = 50,
    offset = 0,
    unreadOnly = false,
  } = options;

  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (unreadOnly) {
    query = query.eq('read', false);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }

  return data;
};

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise<Object>} Updated notification
 */
export const markNotificationAsRead = async (notificationId) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('id', notificationId)
    .select()
    .single();

  if (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }

  return data;
};

/**
 * Mark all notifications as read for a user
 * @param {string} userId - User ID
 * @returns {Promise<number>} Number of notifications updated
 */
export const markAllNotificationsAsRead = async (userId) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('read', false)
    .select();

  if (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }

  return data.length;
};

/**
 * Delete a notification
 * @param {string} notificationId - Notification ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteNotification = async (notificationId) => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);

  if (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }

  return true;
};

/**
 * Subscribe to real-time notifications for a user
 * @param {string} userId - User ID
 * @param {Function} onNewNotification - Callback when new notification received
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToNotifications = (userId, onNewNotification) => {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          showNotification(payload.new.title, {
            body: payload.new.message,
            data: payload.new.data,
          });
        }
        
        // Call callback
        onNewNotification(payload.new);
      }
    )
    .subscribe();

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    },
  };
};

/**
 * Get unread notification count
 * @param {string} userId - User ID
 * @returns {Promise<number>} Unread count
 */
export const getUnreadCount = async (userId) => {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('read', false);

  if (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }

  return count;
};

export default {
  requestNotificationPermission,
  showNotification,
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  subscribeToNotifications,
  getUnreadCount,
};
