export const PREVIEW_KEY = 'CANOPY_PREVIEW';

export const isPreviewMode = () => {
  if (typeof window === 'undefined') return false;

  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('preview') === '1') {
      window.localStorage.setItem(PREVIEW_KEY, '1');
      return true;
    }
  } catch {
    // ignore
  }

  try {
    if (window.localStorage.getItem(PREVIEW_KEY) === '1') return true;
  } catch {
    // ignore
  }

  return import.meta?.env?.VITE_CANOPY_PREVIEW === '1';
};

export const enablePreviewMode = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PREVIEW_KEY, '1');
};

export const disablePreviewMode = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PREVIEW_KEY);
};
