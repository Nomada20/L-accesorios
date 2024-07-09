export function getPromotionIdFromURL() {
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  }
  return null;
}
