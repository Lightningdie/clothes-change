// 应用常量配置
import { ClothType } from '../types';

export const DEFAULT_CLOTH_TYPE: ClothType = '内搭';

export const ANIMATION_DURATION: number = 300; // 动画持续时间（毫秒）

export const IMAGE_DISPLAY_COUNT: number = 10; // 默认显示的图片数量

export const IMAGE_SIZE = {
  width: 100,
  height: 100
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440
} as const;

