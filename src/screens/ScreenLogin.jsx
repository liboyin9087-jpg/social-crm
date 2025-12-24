import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { IconUser, IconLock, IconArrowRight, IconRefresh, IconWarning, IconOakMega } from '../components/icons';

export const ScreenLogin = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: 'demo@oakmega.com',
    password: 'demo123456',
    displayName: 'Demo User'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.includes('Invalid login credentials')) {
            setError('自動建立測試帳號中...');
            const signUpResult = await signUp(formData.email, formData.password, formData.displayName);
            if (signUpResult.error) {
              setError('註冊失敗：' + signUpResult.error);
            } else {
              setError('帳號已建立，正在登入...');
              setTimeout(async () => {
                await signIn(formData.email, formData.password);
              }, 1000);
            }
          } else {
            setError(error);
          }
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.displayName);
        if (error) {
          setError(error);
        } else {
          setMode('login');
          setError('註冊成功！請登入');
        }
      }
    } catch (err) {
      setError('發生錯誤：' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full relative overflow-hidden flex flex-col justify-between bg-[#0f0f1a]">
      {/* 背景光暈效果 */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00E5A0] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute top-60 -left-32 w-80 h-80 bg-[#7E57FF] rounded-full mix-blend-screen filter blur-[100px] opacity-30" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#FFB74D] rounded-full mix-blend-screen filter blur-[80px] opacity-15" />

      <div className="px-8 pt-20 z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 mb-8">
          <IconOakMega size={48} />
        </div>
        <h1 className="text-4xl font-black text-white mb-2 leading-tight">
          {mode === 'login' ? 'Welcome\nBack' : 'Create\nAccount'}
        </h1>
        <p className="text-white/50">{mode === 'login' ? '登入以管理你的模組化 CRM' : '註冊新帳號開始使用'}</p>
      </div>

      <div className="bg-[#1a1a2e]/80 backdrop-blur-xl rounded-t-[40px] p-8 border-t border-white/10 z-20 pb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="bg-[#0f0f1a] p-4 rounded-2xl border border-white/10 flex items-center gap-3 transition-all focus-within:border-[#00E5A0]/50">
              <IconUser size={20} className="text-[#00E5A0]" />
              <input
                type="text"
                placeholder="Display Name"
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="bg-transparent outline-none flex-1 text-white placeholder-white/30"
              />
            </div>
          )}

          <div className="bg-[#0f0f1a] p-4 rounded-2xl border border-white/10 flex items-center gap-3 transition-all focus-within:border-[#00E5A0]/50">
            <IconUser size={20} className="text-[#00E5A0]" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="bg-transparent outline-none flex-1 text-white placeholder-white/30"
            />
          </div>

          <div className="bg-[#0f0f1a] p-4 rounded-2xl border border-white/10 flex items-center gap-3 transition-all focus-within:border-[#00E5A0]/50">
            <IconLock size={20} className="text-[#00E5A0]" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              minLength={6}
              className="bg-transparent outline-none flex-1 text-white placeholder-white/30"
            />
          </div>

          {error && (
            <div className={`flex items-center gap-2 p-3 rounded-xl ${
              error.includes('成功') || error.includes('建立')
                ? 'bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              <IconWarning size={16} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-gradient-to-r from-[#00E5A0] to-[#00B87A] hover:from-[#00FFB4] hover:to-[#00D48A] disabled:opacity-70 text-[#0f0f1a] py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#00E5A0]/30 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <IconRefresh size={20} className="animate-spin" />
            ) : (
              <>
                {mode === 'login' ? '立即登入' : '註冊帳號'}
                <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

        </form>

        <div className="flex justify-center mt-6 text-sm font-medium">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="text-[#00E5A0] hover:text-[#00FFB4] transition-colors"
          >
            {mode === 'login' ? '還沒有帳號？立即註冊' : '已有帳號？返回登入'}
          </button>
        </div>

        <div className="mt-4 p-4 bg-[#7E57FF]/10 rounded-xl border border-[#7E57FF]/20">
          <p className="text-sm text-[#9F7AEA] font-medium text-center">
            測試帳號：demo@oakmega.com / demo123456
          </p>
        </div>
      </div>
    </div>
  );
};
