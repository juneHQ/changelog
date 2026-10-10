/**Helper function to string together classnames */
export function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter((cn) => !!cn).join(' ');
}

export const SITE_URL = "https://changelog.june.so";

/** Images are served from public/images by root-relative URLs; feeds and social previews need full URLs. */
export function absoluteUrl(url: string) {
  return url?.startsWith("/") ? `${SITE_URL}${url}` : url;
}
