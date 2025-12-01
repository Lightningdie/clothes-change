// 本地存储工具函数
import { SavedOutfit, UserInfo, UploadedCloth } from '../types';

const STORAGE_KEYS = {
  OUTFITS: 'clothes_change_outfits',
  USER_INFO: 'clothes_change_user_info',
  UPLOADED_CLOTHS: 'clothes_change_uploaded_cloths'
};

// 穿搭存储
export function saveOutfit(outfit: SavedOutfit): void {
  const outfits = getSavedOutfits();
  const existingIndex = outfits.findIndex(o => o.id === outfit.id);
  
  if (existingIndex >= 0) {
    outfits[existingIndex] = outfit;
  } else {
    outfits.push(outfit);
  }
  
  localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(outfits));
}

export function getSavedOutfits(): SavedOutfit[] {
  const data = localStorage.getItem(STORAGE_KEYS.OUTFITS);
  return data ? JSON.parse(data) : [];
}

export function deleteOutfit(outfitId: string): void {
  const outfits = getSavedOutfits();
  const filtered = outfits.filter(o => o.id !== outfitId);
  localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(filtered));
}

export function getOutfitById(outfitId: string): SavedOutfit | null {
  const outfits = getSavedOutfits();
  return outfits.find(o => o.id === outfitId) || null;
}

// 用户信息存储
export function saveUserInfo(userInfo: UserInfo): void {
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  return data ? JSON.parse(data) : null;
}

// 上传服饰存储
export function saveUploadedCloth(cloth: UploadedCloth): void {
  const cloths = getUploadedCloths();
  cloths.push(cloth);
  localStorage.setItem(STORAGE_KEYS.UPLOADED_CLOTHS, JSON.stringify(cloths));
}

export function getUploadedCloths(): UploadedCloth[] {
  const data = localStorage.getItem(STORAGE_KEYS.UPLOADED_CLOTHS);
  return data ? JSON.parse(data) : [];
}

export function deleteUploadedCloth(clothId: string): void {
  const cloths = getUploadedCloths();
  const filtered = cloths.filter(c => c.id !== clothId);
  localStorage.setItem(STORAGE_KEYS.UPLOADED_CLOTHS, JSON.stringify(filtered));
}
