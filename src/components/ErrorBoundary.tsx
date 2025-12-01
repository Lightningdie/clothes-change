import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Result, Button } from 'antd';
import { formatErrorForUI } from '../utils/errorHandler';
import { ErrorInfo as ErrorInfoType } from '../types';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorInfoType | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error: formatErrorForUI(error) };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="应用出现错误"
          subTitle={this.state.error?.message || '发生了未知错误'}
          extra={[
            <Button type="primary" key="reload" onClick={this.handleReset}>
              重新加载
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
}

