# AI聊天机器人前端

基于React + Vite + Tailwind CSS构建的响应式AI聊天机器人前端界面。

## 功能特性

- ✅ 响应式设计，支持手机、平板、电脑
- ✅ 简洁现代的UI界面，类似豆包/ChatGPT风格
- ✅ 用户登录功能（用户名/密码）
- ✅ 会话列表管理
- ✅ 实时聊天界面
- ✅ API接口集成

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **状态管理**: React Context

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── LoginForm.tsx   # 登录表单
│   ├── ChatInterface.tsx # 聊天主界面
│   ├── SessionList.tsx # 会话列表
│   ├── MessageItem.tsx # 消息项
│   └── ChatInput.tsx   # 聊天输入框
├── context/            # 状态上下文
│   ├── AuthContext.tsx # 认证上下文
│   └── ChatContext.tsx # 聊天上下文
├── types/              # TypeScript类型定义
│   └── index.ts
├── utils/              # 工具函数
│   └── api.ts          # API客户端
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## API接口

项目配置了以下后端API接口：

- `POST /api/user/login` - 用户登录
- `GET /api/session/getsessions` - 获取会话列表
- `GET /api/session/getmessages` - 获取会话消息
- `POST /api/chat/question` - 发送聊天消息

## 开发环境搭建

1. **安装Node.js**: 从 https://nodejs.org/ 下载安装

2. **安装依赖**:
   ```bash
   npm install
   ```

3. **启动开发服务器**:
   ```bash
   npm run dev
   ```

4. **构建生产版本**:
   ```bash
   npm run build
   ```

## 配置说明

### 环境变量配置

项目使用环境变量管理配置，复制 `.env.example` 为 `.env` 文件：

```bash
cp .env.example .env
```

然后编辑 `.env` 文件配置您的API地址：

```env
VITE_API_BASE_URL=http://your-api-server.com/api
```

支持的环境变量：
- `VITE_API_BASE_URL`: API基础地址（默认: http://localhost:3001/api）
- `VITE_APP_TITLE`: 应用标题
- `VITE_APP_VERSION`: 应用版本

### 开发环境
开发时使用Vite代理配置，后端API默认指向 `http://localhost:3001`

### 响应式断点
- 移动端: < 768px
- 平板: 768px - 1024px  
- 桌面端: > 1024px

## 使用说明

1. 启动项目后访问 http://localhost:3000
2. 使用任意用户名/密码登录（目前为模拟登录）
3. 选择或创建会话开始聊天
4. 界面会自动适配不同设备尺寸

## 注意事项

- 当前版本使用模拟数据，需要连接真实后端API
- 确保后端服务运行在端口3001
- 生产环境需要配置正确的API地址