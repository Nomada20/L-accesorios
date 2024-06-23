export function URLParams(): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get('id');
}
