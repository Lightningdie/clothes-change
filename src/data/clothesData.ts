// 服装数据模型
import { ClothType, ClothConfig, CategoryConfig, CategoryType } from '../types';

export const CLOTHES_TYPES = {
  QIUYI: '内搭' as ClothType,
  WAITAO: '外套' as ClothType,
  KUZI: '下装' as ClothType,
  XIEZI: '鞋子' as ClothType,
  MAOZI: '配饰' as ClothType,
  WAZI: '袜子' as ClothType,
  // 配饰子项
  MAOZI_ITEM: '帽子' as ClothType,
  BAOBAO: '包包' as ClothType,
  FAJIA: '发夹' as ClothType,
  MOJING: '墨镜' as ClothType,
  ERHUAN: '耳环' as ClothType,
  XIANGLIAN: '项链' as ClothType,
  // 下装子项
  QUNZI: '裙子' as ClothType,
  KUZI_ITEM: '裤子' as ClothType,
};

// 服装数据配置
export const clothesConfig: ClothConfig[] = [
  {
    id: CLOTHES_TYPES.QIUYI,
    name: '内搭',
    imagePath: '/img/内搭.jpg',
    category: '上装',
    description: '舒适的秋季上衣'
  },
  {
    id: CLOTHES_TYPES.WAITAO,
    name: '外套',
    imagePath: '/img/外套.jpg',
    category: '上装',
    description: '保暖的外套'
  },
  {
    id: CLOTHES_TYPES.XIEZI,
    name: '鞋子',
    imagePath: '/img/鞋子.jpg',
    category: '鞋类',
    description: '时尚的鞋子'
  },
  {
    id: CLOTHES_TYPES.WAZI,
    name: '袜子',
    imagePath: '/img/袜子.jpg',
    category: '配饰',
    description: '温暖的袜子'
  },
  // 配饰子项
  {
    id: CLOTHES_TYPES.MAOZI_ITEM,
    name: '帽子',
    imagePath: '/img/帽子.jpg',
    category: '配饰',
    description: '可爱的帽子'
  },
  {
    id: CLOTHES_TYPES.BAOBAO,
    name: '包包',
    imagePath: '/img/包包.jpg',
    category: '配饰',
    description: '时尚的包包'
  },
  {
    id: CLOTHES_TYPES.FAJIA,
    name: '发夹',
    imagePath: '/img/发夹.jpg',
    category: '配饰',
    description: '精美的发夹'
  },
  {
    id: CLOTHES_TYPES.MOJING,
    name: '墨镜',
    imagePath: '/img/墨镜.jpg',
    category: '配饰',
    description: '酷炫的墨镜'
  },
  {
    id: CLOTHES_TYPES.ERHUAN,
    name: '耳环',
    imagePath: '/img/耳环.jpg',
    category: '配饰',
    description: '精致的耳环'
  },
  {
    id: CLOTHES_TYPES.XIANGLIAN,
    name: '项链',
    imagePath: '/img/项链.jpg',
    category: '配饰',
    description: '优雅的项链'
  },
  // 下装子项
  {
    id: CLOTHES_TYPES.QUNZI,
    name: '裙子',
    imagePath: '/img/裙子.jpg',
    category: '下装',
    description: '优雅的裙子'
  },
  {
    id: CLOTHES_TYPES.KUZI_ITEM,
    name: '裤子',
    imagePath: '/img/裤子.jpg',
    category: '下装',
    description: '舒适的裤子'
  }
];

// 分类配置
export const categoryConfigs: CategoryConfig[] = [
  {
    category: '上装',
    name: '上装',
    items: [
      {
        id: CLOTHES_TYPES.QIUYI,
        name: '内搭',
        imagePath: '/img/内搭.jpg',
        description: '舒适的秋季上衣'
      },
      {
        id: CLOTHES_TYPES.WAITAO,
        name: '外套',
        imagePath: '/img/外套.jpg',
        description: '保暖的外套'
      }
    ],
    hasSubMenu: false
  },
  {
    category: '下装',
    name: '下装',
    items: [
      {
        id: CLOTHES_TYPES.QUNZI,
        name: '裙子',
        imagePath: '/img/裙子.jpg',
        description: '优雅的裙子'
      },
      {
        id: CLOTHES_TYPES.KUZI_ITEM,
        name: '裤子',
        imagePath: '/img/裤子.jpg',
        description: '舒适的裤子'
      }
    ],
    hasSubMenu: true
  },
  {
    category: '配饰',
    name: '配饰',
    items: [
      {
        id: CLOTHES_TYPES.MAOZI_ITEM,
        name: '帽子',
        imagePath: '/img/帽子.jpg',
        description: '可爱的帽子'
      },
      {
        id: CLOTHES_TYPES.BAOBAO,
        name: '包包',
        imagePath: '/img/包包.jpg',
        description: '时尚的包包'
      },
      {
        id: CLOTHES_TYPES.FAJIA,
        name: '发夹',
        imagePath: '/img/发夹.jpg',
        description: '精美的发夹'
      },
      {
        id: CLOTHES_TYPES.MOJING,
        name: '墨镜',
        imagePath: '/img/墨镜.jpg',
        description: '酷炫的墨镜'
      },
      {
        id: CLOTHES_TYPES.ERHUAN,
        name: '耳环',
        imagePath: '/img/耳环.jpg',
        description: '精致的耳环'
      },
      {
        id: CLOTHES_TYPES.XIANGLIAN,
        name: '项链',
        imagePath: '/img/项链.jpg',
        description: '优雅的项链'
      }
    ],
    hasSubMenu: true
  },
  {
    category: '鞋类',
    name: '鞋类',
    items: [
      {
        id: CLOTHES_TYPES.XIEZI,
        name: '鞋子',
        imagePath: '/img/鞋子.jpg',
        description: '时尚的鞋子'
      },
      {
        id: CLOTHES_TYPES.WAZI,
        name: '袜子',
        imagePath: '/img/袜子.jpg',
        description: '温暖的袜子'
      }
    ],
    hasSubMenu: false
  }
];

// 获取服装配置
export function getClothConfig(clothType: ClothType): ClothConfig {
  return clothesConfig.find(item => item.id === clothType) || clothesConfig[0];
}

// 获取所有服装类型（不包括分类项）
export function getAllClothTypes(): ClothType[] {
  return clothesConfig
    .filter(item => !['配饰', '下装'].includes(item.name))
    .map(item => item.id);
}

// 获取所有分类
export function getAllCategories(): CategoryConfig[] {
  return categoryConfigs;
}

// 获取分类下的所有子项
export function getCategoryItems(category: CategoryType): ClothType[] {
  const config = categoryConfigs.find(c => c.category === category);
  return config ? config.items.map(item => item.id) : [];
}

// 图片预加载
export function preloadImages(): Promise<PromiseSettledResult<HTMLImageElement>[]> {
  const imagePromises = clothesConfig.map(config => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = config.imagePath;
    });
  });
  return Promise.allSettled(imagePromises);
}
