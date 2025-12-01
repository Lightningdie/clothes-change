// 错误处理工具函数
import { ErrorTypes, ErrorDetails, ErrorInfo } from '../types';

// 错误处理函数
export function handleError(error: unknown, errorType: ErrorTypes = ErrorTypes.UNKNOWN_ERROR): ErrorDetails {
  console.error(`[${errorType}]`, error);
  
  // 可以根据错误类型进行不同的处理
  switch (errorType) {
    case ErrorTypes.IMAGE_LOAD_ERROR:
      return {
        message: '图片加载失败，请稍后重试',
        type: errorType
      };
    case ErrorTypes.NETWORK_ERROR:
      return {
        message: '网络连接失败，请检查网络设置',
        type: errorType
      };
    default:
      return {
        message: '发生未知错误，请刷新页面重试',
        type: errorType
      };
  }
}

// 错误边界组件使用的错误信息格式化
export function formatErrorForUI(error: unknown): ErrorInfo {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack
    };
  }
  return {
    message: String(error),
    stack: null
  };
}

