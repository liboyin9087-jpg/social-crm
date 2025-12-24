import { supabase } from './supabaseClient';

export const couponService = {
  async getUserCoupons(userId) {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .or(`user_id.eq.${userId},user_id.is.null`)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async getUserCouponHistory(userId) {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'used')
        .order('used_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async claimCoupon(userId, couponId) {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .update({ user_id: userId })
        .eq('id', couponId)
        .eq('user_id', null)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async useCoupon(couponId) {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .update({ status: 'used', used_at: new Date().toISOString() })
        .eq('id', couponId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  async createCoupon(coupon) {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .insert([coupon])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
};
