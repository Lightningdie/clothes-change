// 图片加载工具函数

// 加载单个图片
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// 批量加载图片
export function loadImages(srcs: string[]): Promise<PromiseSettledResult<HTMLImageElement>[]> {
  return Promise.allSettled(
    srcs.map(src => loadImage(src))
  );
}

// 检查图片是否存在
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

// 图片缓存
const imageCache = new Map<string, HTMLImageElement>();

export function getCachedImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src);
    if (cached) {
      return Promise.resolve(cached);
    }
  }
  
  return loadImage(src).then(img => {
    imageCache.set(src, img);
    return img;
  });
}

