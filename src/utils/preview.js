/**
 * src/utils/preview.js
 * 用於判斷目前是否處於預覽模式 (Preview Mode)
 */
export const isPreviewMode = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('preview') === 'true';
  } catch (e) {
    return false;
  }
};