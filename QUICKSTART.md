# 快速开始指南

## 环境要求
- Node.js 16+ 
- npm 或 yarn

## 安装步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问应用
打开浏览器访问: http://localhost:3000

## 测试登录
- 用户名: 任意输入
- 密码: 任意输入
- 点击登录即可进入聊天界面

## 功能测试
1. 登录后可以看到模拟的会话列表
2. 点击任意会话可以查看历史消息
3. 在输入框中输入消息并发送
4. 系统会模拟AI回复

## 连接真实后端
要连接真实的后端API，请配置环境变量：

1. 复制环境变量文件：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，设置您的API地址：
   ```env
   VITE_API_BASE_URL=http://your-api-server.com/api
   ```

3. 在 `src/utils/api.ts` 中：
   - 取消注释实际的API调用代码
   - 注释掉模拟数据代码

4. 确保后端服务正常运行

## 常见问题

### Q: 启动时出现端口占用错误？
A: 修改 `vite.config.ts` 中的端口配置

### Q: 样式没有生效？
A: 确保Tailwind CSS已正确安装，运行 `npm install`

### Q: TypeScript报错？
A: 这是正常的，因为缺少Node.js环境。安装Node.js后错误会自动消失。

## 生产部署
```bash
npm run build
```
构建完成后，将 `dist` 目录部署到Web服务器。