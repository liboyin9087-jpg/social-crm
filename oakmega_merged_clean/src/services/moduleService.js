import { supabase } from './supabaseClient';

export const moduleService = {
  async getAllModules() {
    try {
      const { data, error } = await supabase
        .from('oakmega_modules')
        .select('*')
        .eq('is_active', true)
        .order('id');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching modules:', error);
      return { data: null, error: error.message };
    }
  },

  async getModulesByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('oakmega_modules')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('id');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching modules by category:', error);
      return { data: null, error: error.message };
    }
  },

  async getUserEnabledModules(userId) {
    try {
      const { data, error } = await supabase
        .from('user_modules')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user enabled modules:', error);
        return { data: [], error: null };
      }
      return { data: data || [], error: null };
    } catch (error) {
      console.error('Error fetching user enabled modules:', error);
      return { data: [], error: null };
    }
  },

  async getUserModuleStatus(userId, moduleId) {
    try {
      const { data, error } = await supabase
        .from('user_modules')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user module status:', error);
      return { data: null, error: error.message };
    }
  },

  async enableModule(userId, moduleId) {
    try {
      const { data: existingStatus } = await this.getUserModuleStatus(userId, moduleId);

      if (existingStatus) {
        const { data, error } = await supabase
          .from('user_modules')
          .update({
            is_enabled: true,
            enabled_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('module_id', moduleId)
          .select()
          .single();

        if (error) throw error;
        return { data, error: null };
      } else {
        const { data, error } = await supabase
          .from('user_modules')
          .insert({
            user_id: userId,
            module_id: moduleId,
            is_enabled: true,
            enabled_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        return { data, error: null };
      }
    } catch (error) {
      console.error('Error enabling module:', error);
      return { data: null, error: error.message };
    }
  },

  async disableModule(userId, moduleId) {
    try {
      const { data, error } = await supabase
        .from('user_modules')
        .update({
          is_enabled: false,
          enabled_at: null
        })
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error disabling module:', error);
      return { data: null, error: error.message };
    }
  },

  async toggleModule(userId, moduleId) {
    try {
      const { data: status } = await this.getUserModuleStatus(userId, moduleId);

      if (status && status.is_enabled) {
        return await this.disableModule(userId, moduleId);
      } else {
        return await this.enableModule(userId, moduleId);
      }
    } catch (error) {
      console.error('Error toggling module:', error);
      return { data: null, error: error.message };
    }
  },

  async getModuleStats() {
    try {
      const { data, error } = await supabase
        .from('oakmega_modules')
        .select('category', { count: 'exact' })
        .eq('is_active', true);

      if (error) throw error;

      const stats = {
        total: data.length,
        engagement: data.filter(m => m.category === 'engagement').length,
        automation: data.filter(m => m.category === 'automation').length,
        analytics: data.filter(m => m.category === 'analytics').length,
        integration: data.filter(m => m.category === 'integration').length
      };

      return { data: stats, error: null };
    } catch (error) {
      console.error('Error fetching module stats:', error);
      return { data: null, error: error.message };
    }
  }
};
