import { supabase } from './supabaseClient';

/**
 * RealtimeService - 即時通訊服務
 * Handles real-time messaging and notifications using Supabase Realtime
 */

/**
 * Subscribe to real-time messages for a specific channel
 * @param {string} channelId - The channel/conversation ID
 * @param {Function} onNewMessage - Callback when new message received
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToMessages = (channelId, onNewMessage) => {
  const channel = supabase
    .channel(`messages:${channelId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `channel_id=eq.${channelId}`,
      },
      (payload) => {
        onNewMessage(payload.new);
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
 * Subscribe to user presence in a channel
 * @param {string} channelId - The channel ID
 * @param {Object} user - Current user object
 * @param {Function} onPresenceChange - Callback when presence changes
 * @returns {Object} Subscription object with unsubscribe method
 */
export const subscribeToPresence = (channelId, user, onPresenceChange) => {
  const channel = supabase.channel(`presence:${channelId}`, {
    config: {
      presence: {
        key: user.id,
      },
    },
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      onPresenceChange(state);
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('User joined:', key, newPresences);
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('User left:', key, leftPresences);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          user_id: user.id,
          online_at: new Date().toISOString(),
          display_name: user.display_name || user.email,
        });
      }
    });

  return {
    unsubscribe: async () => {
      await channel.untrack();
      supabase.removeChannel(channel);
    },
  };
};

/**
 * Send a message to a channel
 * @param {string} channelId - The channel ID
 * @param {string} message - Message text
 * @param {string} userId - Sender user ID
 * @returns {Promise<Object>} Message object
 */
export const sendMessage = async (channelId, message, userId) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        channel_id: channelId,
        user_id: userId,
        message,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }

  return data;
};

/**
 * Get message history for a channel
 * @param {string} channelId - The channel ID
 * @param {number} limit - Maximum number of messages to fetch
 * @returns {Promise<Array>} Array of message objects
 */
export const getMessageHistory = async (channelId, limit = 50) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*, user:users(*)')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching message history:', error);
    throw error;
  }

  return data.reverse();
};

/**
 * Subscribe to broadcast events (for typing indicators, etc.)
 * @param {string} channelId - The channel ID
 * @param {Function} onBroadcast - Callback when broadcast received
 * @returns {Object} Subscription object
 */
export const subscribeToBroadcast = (channelId, onBroadcast) => {
  const channel = supabase
    .channel(`broadcast:${channelId}`)
    .on('broadcast', { event: 'typing' }, (payload) => {
      onBroadcast('typing', payload);
    })
    .on('broadcast', { event: 'stop-typing' }, (payload) => {
      onBroadcast('stop-typing', payload);
    })
    .subscribe();

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    },
    sendTyping: (userId) => {
      channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { userId, timestamp: Date.now() },
      });
    },
    sendStopTyping: (userId) => {
      channel.send({
        type: 'broadcast',
        event: 'stop-typing',
        payload: { userId, timestamp: Date.now() },
      });
    },
  };
};

export default {
  subscribeToMessages,
  subscribeToPresence,
  sendMessage,
  getMessageHistory,
  subscribeToBroadcast,
};
