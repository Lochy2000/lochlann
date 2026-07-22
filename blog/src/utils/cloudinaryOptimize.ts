// Injects Cloudinary delivery transformations into /upload/ URLs so assets
// are served resized and compressed instead of at raw upload size. Cloudinary
// generates the transformed version on first request and caches it at the
// CDN edge, so this is safe to apply purely on the read side.
const CLOUDINARY_UPLOAD_RE = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/)(.*)$/;

function isAlreadyTransformed(pathAfterUpload: string): boolean {
  const firstSegment = pathAfterUpload.split('/')[0];
  return /^[a-z]_[^/]+(,[a-z]_[^/]+)*$/.test(firstSegment);
}

function withTransform(url: string, transform: string): string {
  const match = url.match(CLOUDINARY_UPLOAD_RE);
  if (!match) return url; // not a Cloudinary upload URL (hotlinked, data URI, etc.) - leave untouched
  const [, prefix, rest] = match;
  if (isAlreadyTransformed(rest)) return url;
  return `${prefix}${transform}/${rest}`;
}

export function optimizeImageUrl(url?: string, width = 800): string {
  if (!url || url.startsWith('data:')) return url ?? '';
  return withTransform(url, `f_auto,q_auto,w_${width}`);
}

export function optimizeVideoUrl(url?: string, width = 1280): string {
  if (!url) return url ?? '';
  return withTransform(url, `q_auto,f_auto,w_${width}`);
}
