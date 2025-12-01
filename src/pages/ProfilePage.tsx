import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Avatar, Upload, message } from 'antd';
import { UserOutlined, HomeOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, saveUserInfo } from '../utils/storage';
import { UserInfo } from '../types';
import type { UploadProps } from 'antd';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      form.setFieldsValue(userInfo);
      if (userInfo.avatar) {
        setAvatar(userInfo.avatar);
      }
    }
  }, [form]);

  const handleSubmit = (values: UserInfo) => {
    const userInfo: UserInfo = {
      ...values,
      avatar: avatar || values.avatar
    };
    saveUserInfo(userInfo);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB！');
        return false;
      }
      
      // 转换为 base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
      };
      reader.readAsDataURL(file);
      
      return false; // 阻止自动上传
    },
  };

  return (
    <div className="ProfilePage">
      <div className="ProfileHeader">
        <Button 
          icon={<HomeOutlined />} 
          onClick={() => navigate('/')}
          className="BackButton"
        >
          返回首页
        </Button>
        <h1 className="ProfileTitle">个人信息</h1>
        <div style={{ width: 100 }}></div>
      </div>

      <div className="ProfileContent">
        <Card className="ProfileCard">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="ProfileForm"
          >
            <Form.Item label="头像" className="AvatarItem">
              <div className="AvatarWrapper">
                <Upload {...uploadProps}>
                  {avatar ? (
                    <Avatar size={100} src={avatar} icon={<UserOutlined />} />
                  ) : (
                    <div>
                      <UploadOutlined style={{ fontSize: 24 }} />
                      <div style={{ marginTop: 8 }}>上传头像</div>
                    </div>
                  )}
                </Upload>
                {showSuccessMessage && (
                  <div className="SaveSuccessMessage">
                    <CheckCircleOutlined />
                    <span>保存成功</span>
                  </div>
                )}
              </div>
            </Form.Item>

            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                保存信息
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

