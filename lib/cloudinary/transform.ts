export function withCloudinaryTransform(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

export function getBlurredBackgroundUrl(url: string) {
  return withCloudinaryTransform(
    url,
    "c_fill,w_1200,e_blur:1500,q_auto,f_auto",
  );
}
