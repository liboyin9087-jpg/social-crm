import React, { useState, useEffect } from 'react';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification,
  subscribeToNotifications,
  getUnreadCount,
  requestNotificationPermission
} from '../../services/pushNotificationService';
import { Loading } from '../ui/Loading';

/**
 * NotificationCenter - 通知中心組件
 * Notification center with real-time updates
 */
export const NotificationCenter = ({ userId, onError }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  // Load notifications on mount
  useEffect(() => {
    if (!userId) return;

    const loadNotifications = async () => {
      try {
        const [notifs, count] = await Promise.all([
          getUserNotifications(userId),
          getUnreadCount(userId)
        ]);
        setNotifications(notifs);
        setUnreadCount(count);
      } catch (error) {
        console.error('Error loading notifications:', error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, [userId, onError]);

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!userId) return;

    const subscription = subscribeToNotifications(userId, (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      onError?.(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead(userId);
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
      onError?.(error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      const notification = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      if (!notification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      onError?.(error);
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const getNotificationIcon = (type) => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      message: '💬',
      coupon: '🎁',
      system: '⚙️',
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-soft hover:bg-oak-canvas transition-all"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-oak-warmth text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 max-h-[600px] bg-white rounded-card shadow-soul border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-oak-soul/5 to-oak-warmth/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-brand font-semibold text-oak-text text-lg">
                通知中心 Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-oak-subtext hover:text-oak-text"
              >
                ✕
              </button>
            </div>
            
            {/* Filter and Actions */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-soft text-sm font-sans transition-all ${
                    filter === 'all'
                      ? 'bg-oak-soul text-white'
                      : 'bg-gray-100 text-oak-subtext hover:bg-gray-200'
                  }`}
                >
                  全部 All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-soft text-sm font-sans transition-all ${
                    filter === 'unread'
                      ? 'bg-oak-soul text-white'
                      : 'bg-gray-100 text-oak-subtext hover:bg-gray-200'
                  }`}
                >
                  未讀 Unread
                </button>
              </div>
              
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-oak-soul hover:text-oak-warmth font-sans font-semibold"
                >
                  全部標為已讀
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loading size="md" color="soul" />
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-oak-soul/10 flex items-center justify-center mb-4">
                  <span className="text-3xl">🔔</span>
                </div>
                <p className="text-oak-subtext font-sans">
                  {filter === 'unread' ? '沒有未讀通知 No unread notifications' : '沒有通知 No notifications'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-oak-canvas/50 transition-all ${
                      !notification.read ? 'bg-oak-soul/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 text-2xl">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-sans font-semibold text-oak-text text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-oak-warmth flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-oak-subtext text-sm font-sans mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-oak-subtext">
                            {new Date(notification.created_at).toLocaleString()}
                          </span>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-xs text-oak-soul hover:text-oak-warmth font-sans"
                              >
                                標為已讀
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="text-xs text-red-500 hover:text-red-600 font-sans"
                            >
                              刪除
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
