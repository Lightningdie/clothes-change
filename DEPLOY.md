# 部署指南

本项目支持多种部署方式，推荐使用 **Vercel**（最简单快速）。

## 方案一：Vercel 部署（推荐）⭐

### 优点
- 完全免费
- 自动 HTTPS
- 全球 CDN 加速
- 自动部署（每次 git push 自动更新）
- 支持自定义域名
- 对 React 项目支持最好

### 部署步骤

1. **访问 Vercel 官网**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 `Lightningdie/clothes-change` 仓库
   - Vercel 会自动检测到 React 项目

3. **配置项目**
   - Framework Preset: 选择 "Create React App"
   - Build Command: `npm run build`（通常自动填充）
   - Output Directory: `build`（通常自动填充）
   - Install Command: `npm install`（通常自动填充）

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常 1-2 分钟）
   - 部署成功后，会获得一个类似 `https://clothes-change.vercel.app` 的网址

5. **访问**
   - 在手机上打开部署后的网址即可访问
   - 后续每次 push 代码到 GitHub，Vercel 会自动重新部署

### 自定义域名（可选）
- 在 Vercel 项目设置中可以添加自定义域名
- 支持免费 SSL 证书

---

## 方案二：Netlify 部署

### 部署步骤

1. **访问 Netlify 官网**
   - 打开 https://www.netlify.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add new site" -> "Import an existing project"
   - 选择 GitHub，然后选择 `Lightningdie/clothes-change` 仓库

3. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `build`
   - 点击 "Deploy site"

4. **访问**
   - 部署完成后会获得一个类似 `https://clothes-change.netlify.app` 的网址

---

## 方案三：Cloudflare Pages

### 部署步骤

1. **访问 Cloudflare Pages**
   - 打开 https://pages.cloudflare.com
   - 使用 GitHub 账号登录

2. **创建项目**
   - 点击 "Create a project"
   - 选择 `Lightningdie/clothes-change` 仓库

3. **配置构建**
   - Framework preset: Create React App
   - Build command: `npm run build`
   - Build output directory: `build`

4. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成

---

## 本地构建测试

在部署前，建议先在本地测试构建：

```bash
# 安装依赖（如果还没安装）
npm install

# 构建项目
npm run build

# 本地预览构建结果（需要安装 serve）
npx serve -s build
```

访问 http://localhost:3000 查看效果。

---

## 注意事项

1. **确保 "一二.png" 文件存在**
   - 确保 `public/一二.png` 文件存在
   - 如果不存在，需要添加该文件

2. **环境变量（如果需要）**
   - 如果项目需要环境变量，在部署平台的项目设置中添加

3. **路由配置**
   - 项目已配置好路由重定向，所有路由都会指向 `index.html`
   - 这是单页应用（SPA）的标准配置

4. **移动端访问**
   - 部署后，在手机浏览器中打开部署的网址即可
   - 建议添加到手机主屏幕，体验更好

---

## 推荐方案

**强烈推荐使用 Vercel**，因为：
- 部署最简单
- 对 React 项目支持最好
- 自动优化和 CDN
- 完全免费且稳定

部署完成后，将获得的网址分享给需要访问的人即可！

