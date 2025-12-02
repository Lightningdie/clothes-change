import React, { useState, useRef, useEffect } from 'react';
import { Image, Button } from 'antd';
import { CloseOutlined, RotateRightOutlined } from '@ant-design/icons';
import { DraggableImage as DraggableImageType } from '../types';
import './DraggableImage.css';

interface DraggableImageProps {
  image: DraggableImageType;
  onUpdate: (image: DraggableImageType) => void;
  onRemove: (id: string) => void;
}

export default function DraggableImage({ image, onUpdate, onRemove }: DraggableImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [rotateStart, setRotateStart] = useState({ angle: 0, centerX: 0, centerY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('ResizeHandle') || 
        (e.target as HTMLElement).classList.contains('RotateHandle')) {
      return;
    }
    setIsDragging(true);
    setDragStart({
      x: e.clientX - image.x,
      y: e.clientY - image.y
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onUpdate({
        ...image,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(50, resizeStart.width + deltaX);
      const newHeight = Math.max(50, resizeStart.height + deltaY);
      onUpdate({
        ...image,
        width: newWidth,
        height: newHeight
      });
    } else if (isRotating) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
        onUpdate({
          ...image,
          rotation: angle - rotateStart.angle + image.rotation
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: image.width,
      height: image.height,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
      setRotateStart({
        angle: startAngle - image.rotation,
        centerX,
        centerY
      });
    }
  };

  useEffect(() => {
    if (isDragging || isResizing || isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, isRotating, dragStart, resizeStart, rotateStart, image]);

  return (
    <div
      ref={containerRef}
      className="DraggableImageContainer"
      style={{
        left: image.x,
        top: image.y,
        width: image.width,
        height: image.height,
        transform: `rotate(${image.rotation}deg)`
      }}
      onMouseDown={handleMouseDown}
    >
      <Image
        src={image.src}
        alt=""
        preview={false}
        width="100%"
        height="100%"
        style={{ objectFit: 'contain', pointerEvents: 'none' }}
      />
      <Button
        type="text"
        icon={<CloseOutlined />}
        className="RemoveImageButton"
        onClick={() => onRemove(image.id)}
      />
      <div className="ResizeHandle" onMouseDown={handleResizeStart} />
      <div className="RotateHandle" onMouseDown={handleRotateStart}>
        <RotateRightOutlined />
      </div>
    </div>
  );
}

