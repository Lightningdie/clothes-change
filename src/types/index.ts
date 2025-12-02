// 类型定义文件

export type ClothType = '内搭' | '外套' | '下装' | '鞋子' | '配饰' | '袜子' | 
  '帽子' | '包包' | '发夹' | '墨镜' | '耳环' | '项链' | 
  '裙子' | '裤子';

export type CategoryType = '上装' | '下装' | '配饰' | '鞋类';

export interface CategoryItem {
  id: ClothType;
  name: string;
  imagePath: string;
  description: string;
}

export interface CategoryConfig {
  category: CategoryType;
  name: string;
  items: CategoryItem[];
  hasSubMenu: boolean;
}

export interface ClothConfig {
  id: ClothType;
  name: string;
  imagePath: string;
  category: string;
  description: string;
}

export interface ImagePosition {
  x: number;
  y: number;
}

export interface ClonedImage {
  src: string;
  x: number;
  y: number;
  placing: boolean;
}

export interface PlacedImage {
  src: string;
  x: number;
  y: number;
}

export interface DraggableImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  clothType: ClothType;
}

export interface ShowWindowState {
  side: string;
  clothPosition: number;
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  clonedImage: ClonedImage | null;
  mousePosition: ImagePosition;
  imageLoading: boolean;
  imageError: boolean;
  placedImages: PlacedImage[];
  selectedCloth: ClothType | null;
}

export interface ShowWindowProps {
  clothType: ClothType;
  side?: string;
  clothPosition?: number;
  onPlacedImagesChange?: (images: PlacedImage[]) => void;
  onClothSelect?: (clothType: ClothType) => void;
  showUploadButton?: boolean;
  onUploadClick?: () => void;
}

export interface MenubarProps {
  onClothChange?: (clothType: ClothType) => void;
  defaultCloth?: ClothType;
}

export interface MenuButtonProps {
  onClothChange?: (clothType: ClothType) => void;
  defaultCloth?: ClothType;
}

export interface MenuButtonState {
  clothStyle: ClothType;
  openSubMenus: Set<string>;
}

export interface MenubarState {
  [key: string]: never;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  className?: string;
}

export interface ErrorInfo {
  message: string;
  stack?: string | null;
}

export enum ErrorTypes {
  IMAGE_LOAD_ERROR = 'IMAGE_LOAD_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface ErrorDetails {
  message: string;
  type: ErrorTypes;
}

// 穿搭相关类型
export interface OutfitItem {
  clothType: ClothType;
  position: ImagePosition;
}

export interface SavedOutfit {
  id: string;
  name: string;
  items: OutfitItem[];
  placedImages: PlacedImage[];
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface UserInfo {
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface UploadedCloth {
  id: string;
  name: string;
  imagePath: string;
  category: CategoryType;
  clothType: ClothType;
  uploadedAt: string;
}
