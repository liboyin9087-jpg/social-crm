export const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString('zh-TW');
};

export const formatDaysUntil = (date) => {
  const now = new Date();
  const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return '已過期';
  if (diff === 1) return '明天到期';
  return `${diff}天後過期`;
};

export const simulateApiCall = (data, delay = 1200) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};
