import React, { useState, useRef, useEffect } from 'react';

/**
 * OptimisticChat - A chat interface simulating React 19's useOptimistic hook
 * Provides instant message feedback with optimistic UI updates
 * 
 * @param {Object} props
 * @param {Array} props.initialMessages - Initial chat messages
 * @param {Function} props.onSendMessage - Async function to send message
 * @param {string} props.userName - Current user's name
 * @param {string} props.userAvatar - Current user's avatar URL
 * @returns {JSX.Element}
 */
export const OptimisticChat = ({ 
  initialMessages = [], 
  onSendMessage,
  userName = 'You',
  userAvatar
}) => {
  // Simulate useOptimistic with useState
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Simulate useOptimistic hook behavior
   * Adds message optimistically and handles async sending
   */
  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const messageText = inputValue.trim();
    setInputValue('');
    setIsSending(true);

    // Optimistic update - add message immediately
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      sender: userName,
      timestamp: new Date().toISOString(),
      isOptimistic: true,
      status: 'sending'
    };

    setMessages(prev => [...prev, optimisticMessage]);

    try {
      // Call the provided send function
      const result = await onSendMessage?.(messageText);
      
      // Replace optimistic message with confirmed message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === optimisticMessage.id 
            ? { 
                ...msg, 
                id: result?.id || optimisticMessage.id,
                isOptimistic: false,
                status: 'sent',
                timestamp: result?.timestamp || msg.timestamp
              }
            : msg
        )
      );
    } catch (error) {
      // Mark message as failed
      setMessages(prev => 
        prev.map(msg => 
          msg.id === optimisticMessage.id 
            ? { ...msg, status: 'failed', isOptimistic: false }
            : msg
        )
      );
      console.error('Failed to send message:', error);
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
              Chat
            </h3>
            <p className="font-sans text-xs text-white/80">
              Optimistic UI Demo
            </p>
          </div>
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
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.sender === userName;
            const isOptimistic = message.isOptimistic;
            const isFailed = message.status === 'failed';

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {isUser && userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={message.sender}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isUser 
                        ? 'bg-gradient-to-br from-oak-soul to-oak-warmth' 
                        : 'bg-oak-subtext/20'
                    }`}>
                      <span className="text-white font-brand font-bold text-xs">
                        {message.sender.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`
                      px-4 py-3 rounded-card font-sans text-sm break-words
                      transition-all duration-200
                      ${isUser 
                        ? 'bg-oak-soul text-white rounded-br-none' 
                        : 'bg-white text-oak-text rounded-bl-none border border-gray-200'
                      }
                      ${isOptimistic ? 'opacity-60 animate-pulse' : ''}
                      ${isFailed ? 'bg-red-100 border-red-300 text-red-700' : ''}
                    `}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <span className="text-xs text-oak-subtext font-sans">
                      {isOptimistic && '⏳ Sending...'}
                      {isFailed && '❌ Failed'}
                      {!isOptimistic && !isFailed && new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
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
            placeholder="Type a message..."
            disabled={isSending}
            className="flex-1 px-4 py-3 rounded-soft border border-gray-300 focus:border-oak-soul focus:ring-2 focus:ring-oak-soul/20 outline-none transition-all font-sans text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            className="px-6 py-3 bg-oak-soul text-white rounded-soft font-brand font-semibold hover:bg-oak-soul/90 hover:animate-growth disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-soul"
          >
            {isSending ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimisticChat;
