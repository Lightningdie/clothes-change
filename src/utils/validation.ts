// 数据验证工具函数

import { getAllClothTypes } from '../data/clothesData';
import { ClothType } from '../types';

// 验证服装类型是否有效
export function isValidClothType(clothType: unknown): clothType is ClothType {
  if (!clothType || typeof clothType !== 'string') {
    return false;
  }
  const validTypes = getAllClothTypes();
  return validTypes.includes(clothType as ClothType);
}

// 验证图片路径
export function isValidImagePath(path: unknown): path is string {
  if (!path || typeof path !== 'string') {
    return false;
  }
  // 检查是否是有效的图片路径格式
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const lowerPath = path.toLowerCase();
  return imageExtensions.some(ext => lowerPath.endsWith(ext));
}

// 验证索引是否在有效范围内
export function isValidIndex(index: unknown, maxLength: number): index is number {
  return typeof index === 'number' && 
         index >= 0 && 
         index < maxLength && 
         Number.isInteger(index);
}

// 验证事件对象
export function isValidEvent(event: unknown): event is MouseEvent | TouchEvent {
  if (!event) return false;
  const e = event as MouseEvent | TouchEvent;
  return 'clientX' in e || (e as TouchEvent).touches?.[0]?.clientX !== undefined;
}

