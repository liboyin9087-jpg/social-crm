import { supabase } from '../services/supabaseClient';

export const testDatabaseConnection = async () => {
  const results = {
    connection: false,
    auth: false,
    modulesTable: false,
    userModulesTable: false,
    moduleCount: 0,
    errors: []
  };

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      results.errors.push(`認證錯誤: ${authError.message}`);
    } else if (user) {
      results.auth = true;
      console.log('✓ 用戶已認證:', user.email);
    } else {
      results.errors.push('用戶未登入');
    }

    const { data: modules, error: modulesError } = await supabase
      .from('oakmega_modules')
      .select('*')
      .limit(1);

    if (modulesError) {
      results.errors.push(`模組表錯誤: ${modulesError.message}`);
      console.error('✗ 無法讀取 oakmega_modules 表:', modulesError);
    } else {
      results.modulesTable = true;
      console.log('✓ oakmega_modules 表可訪問');
    }

    const { count, error: countError } = await supabase
      .from('oakmega_modules')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      results.moduleCount = count;
      console.log(`✓ 找到 ${count} 個模組`);
    }

    if (user) {
      const { data: userModules, error: userModulesError } = await supabase
        .from('user_modules')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (userModulesError) {
        results.errors.push(`用戶模組表錯誤: ${userModulesError.message}`);
        console.error('✗ 無法讀取 user_modules 表:', userModulesError);
      } else {
        results.userModulesTable = true;
        console.log('✓ user_modules 表可訪問');
      }
    }

    results.connection = results.auth && results.modulesTable;

  } catch (error) {
    results.errors.push(`系統錯誤: ${error.message}`);
    console.error('✗ 測試失敗:', error);
  }

  return results;
};
