import { couponService, notificationService } from './index';

export const initService = {
  async createWelcomeCoupons(userId) {
    const welcomeCoupons = [
      {
        code: 'WELCOME50',
        title: '新會員優惠',
        description: '全館 50 元折扣',
        type: 'fixed',
        value: 50,
        min_purchase: 0,
        color_scheme: 'purple',
        status: 'active',
        user_id: userId,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        code: 'FREESHIP',
        title: '免運券',
        description: '滿 $500 免運',
        type: 'shipping',
        value: 60,
        min_purchase: 500,
        color_scheme: 'emerald',
        status: 'active',
        user_id: userId,
        expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        code: 'COFFEE2024',
        title: '免費咖啡券',
        description: '門市兌換',
        type: 'freebie',
        value: 1,
        min_purchase: 0,
        color_scheme: 'orange',
        status: 'active',
        user_id: userId,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const results = [];
    for (const coupon of welcomeCoupons) {
      const { data, error } = await couponService.createCoupon(coupon);
      if (data) results.push(data);
    }

    return { coupons: results, error: null };
  },

  async sendWelcomeNotification(userId, displayName) {
    await notificationService.createNotification(
      userId,
      'reward_earned',
      '歡迎加入 OakMega！',
      `${displayName}，歡迎你！我們已為你準備了 3 張優惠券，快去查看吧！`
    );
  },

  async initializeNewUser(userId, displayName) {
    try {
      const { coupons } = await this.createWelcomeCoupons(userId);
      await this.sendWelcomeNotification(userId, displayName);

      return { success: true, coupons };
    } catch (error) {
      console.error('Error initializing user:', error);
      return { success: false, error: error.message };
    }
  }
};
