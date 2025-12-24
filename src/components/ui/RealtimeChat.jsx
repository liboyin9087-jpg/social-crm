import React, { useState, useEffect, useRef } from 'react';
import { subscribeToMessages, sendMessage, getMessageHistory, subscribeToPresence } from '../../services/realtimeService';
import { Loading } from '../ui/Loading';

/**
 * RealtimeChat - 即時聊天組件
 * Real-time chat component with presence indicators
 */
export const RealtimeChat = ({ 
  channelId, 
  currentUser,
  onError 
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState({});
  const messagesEndRef = useRef(null);

  // Load message history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getMessageHistory(channelId);
        setMessages(history);
      } catch (error) {
        console.error('Error loading message history:', error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [channelId, onError]);

  // Subscribe to real-time messages
  useEffect(() => {
    const subscription = subscribeToMessages(channelId, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [channelId]);

  // Subscribe to user presence
  useEffect(() => {
    if (!currentUser) return;

    const presenceSubscription = subscribeToPresence(
      channelId,
      currentUser,
      (presenceState) => {
        setOnlineUsers(presenceState);
      }
    );

    return () => {
      presenceSubscription.unsubscribe();
    };
  }, [channelId, currentUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending || !currentUser) return;

    const messageText = inputValue.trim();
    setInputValue('');
    setIsSending(true);

    try {
      await sendMessage(channelId, messageText, currentUser.id);
    } catch (error) {
      console.error('Error sending message:', error);
      onError?.(error);
      setInputValue(messageText); // Restore input on error
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading size="lg" color="soul" />
      </div>
    );
  }

  const onlineUserCount = Object.keys(onlineUsers).length;

  return (
    <div className="flex flex-col h-full bg-oak-canvas rounded-card shadow-glass overflow-hidden border border-white/50">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-oak-soul to-oak-warmth border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-brand font-bold text-lg">💬</span>
          </div>
          <div>
            <h3 className="font-brand font-semibold text-white text-lg">
              即時聊天 Real-time Chat
            </h3>
            <p className="font-sans text-xs text-white/80">
              {onlineUserCount} {onlineUserCount === 1 ? 'user' : 'users'} online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-white text-sm font-sans">Connected</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-oak-soul/10 flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <p className="text-oak-subtext font-sans">
              開始對話吧！Start a conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.user_id === currentUser?.id;

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrentUser 
                      ? 'bg-gradient-to-br from-oak-soul to-oak-warmth' 
                      : 'bg-oak-subtext/20'
                  }`}>
                    <span className="text-white font-brand font-bold text-xs">
                      {message.user?.display_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`
                      px-4 py-3 rounded-card font-sans text-sm break-words
                      ${isCurrentUser 
                        ? 'bg-oak-soul text-white rounded-br-none' 
                        : 'bg-white text-oak-text rounded-bl-none border border-gray-200'
                      }
                    `}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-oak-subtext font-sans mt-1 px-2">
                    {new Date(message.created_at).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="輸入訊息... Type a message..."
            disabled={isSending || !currentUser}
            className="flex-1 px-4 py-3 rounded-soft border border-gray-300 focus:border-oak-soul focus:ring-2 focus:ring-oak-soul/20 outline-none transition-all font-sans text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending || !currentUser}
            className="px-6 py-3 bg-oak-soul text-white rounded-soft font-brand font-semibold hover:bg-oak-soul/90 hover:animate-growth disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-soul"
          >
            {isSending ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealtimeChat;
