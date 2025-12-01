import { useState, useEffect } from 'react';
import { getCachedImage } from '../utils/imageLoader';
import { getClothConfig } from '../data/clothesData';
import { ClothType } from '../types';

// 图片加载 Hook
export function useImageLoader(clothType: ClothType) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const config = getClothConfig(clothType);
        await getCachedImage(config.imagePath);
        setLoading(false);
      } catch (err) {
        console.error('图片加载失败:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadImage();
  }, [clothType]);

  return { loading, error };
}

