export const MOCK_DATA = {
  user: {
    id: 'usr_oakmega_001',
    email: 'admin@oakmega.com',
    displayName: 'OakMega',
    avatarUrl: null,
    memberLevel: 'platinum',
    totalPoints: 12850,
    createdAt: new Date('2023-01-15'),
    lastActiveAt: new Date(),
  },
  dashboardStats: {
    todayFriends: 128,
    conversionRate: 4.2,
    activeModules: 5,
    pendingRewards: 3,
  },
  notifications: [
    { id: 'notif_1', type: 'coupon_expiry', title: '優惠券即將到期', body: '你的 85 折優惠券將於 3 天後到期', isRead: false, createdAt: new Date() },
    { id: 'notif_2', type: 'oma_alert', title: 'OMA 偵測異常', body: '偵測到異常流量模式', isRead: false, createdAt: new Date() },
    { id: 'notif_3', type: 'reward_earned', title: '獎勵已發送', body: '每日簽到獎勵 50 點已入帳', isRead: true, createdAt: new Date() },
  ],
  omaEvents: [
    { id: 'oma_1', userId: 'usr_001', actionType: 'qr_scan', locationName: '台北信義店', coordinates: { lat: 25.033, lng: 121.564 }, timestamp: new Date(Date.now() - 10000) },
    { id: 'oma_2', userId: 'usr_002', actionType: 'coupon_redeem', locationName: '線上商店', coordinates: { lat: 0, lng: 0 }, timestamp: new Date(Date.now() - 32000) },
    { id: 'oma_3', userId: 'usr_003', actionType: 'signup', locationName: '台中公益店', coordinates: { lat: 24.147, lng: 120.673 }, timestamp: new Date(Date.now() - 60000) },
  ],
  coupons: [
    { id: 'cpn_1', code: 'SAVE15', title: '85 折優惠', description: '全館通用', type: 'percentage', value: 15, minPurchase: 0, status: 'active', expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), colorScheme: 'purple' },
    { id: 'cpn_2', code: 'BDAY2024', title: '免費咖啡', description: '生日好禮', type: 'freebie', value: 1, minPurchase: 0, status: 'active', expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), colorScheme: 'yellow' },
    { id: 'cpn_3', code: 'FREESHIP', title: '免運券', description: '滿 $500', type: 'shipping', value: 60, minPurchase: 500, status: 'active', expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), colorScheme: 'emerald' },
  ],
  couponHistory: [
    { id: 'cpn_h1', code: 'WELCOME50', title: '迎新折價券 $50', usedAt: new Date('2023-12-20'), value: 50 },
    { id: 'cpn_h2', code: 'SUMMER20', title: '夏季特惠 20% OFF', usedAt: new Date('2023-11-15'), value: 120 },
    { id: 'cpn_h3', code: 'NEWYEAR', title: '新年好禮 $100', usedAt: new Date('2024-01-01'), value: 100 },
  ],
};
