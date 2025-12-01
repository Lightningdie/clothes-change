import React, { useState, useEffect, useRef } from 'react';
import { Image, Spin } from 'antd';
import { IMAGE_SIZE } from '../utils/constants';
import { getCachedImage } from '../utils/imageLoader';
import { LazyImageProps } from '../types';

// 懒加载图片组件
export default function LazyImage({ 
  src, 
  alt, 
  onClick, 
  onMouseDown, 
  onMouseMove, 
  onMouseUp, 
  onTouchStart, 
  onTouchMove, 
  onTouchEnd, 
  className 
}: LazyImageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (inView && src) {
      const loadImage = async () => {
        try {
          await getCachedImage(src);
          setLoading(false);
        } catch (err) {
          console.error('图片加载失败:', err);
          setError(true);
          setLoading(false);
        }
      };
      loadImage();
    }
  }, [inView, src]);

  if (error) {
    return (
      <div className="ImageError" ref={imgRef}>
        <span>加载失败</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={className}>
      {loading && inView ? (
        <div className="ImageLoader">
          <Spin size="small" />
        </div>
      ) : inView ? (
        <Image
          width={IMAGE_SIZE.width}
          height={IMAGE_SIZE.height}
          preview={false}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          src={src}
          alt={alt}
          className="ClothImage"
        />
      ) : (
        <div className="ImagePlaceholder" />
      )}
    </div>
  );
}

