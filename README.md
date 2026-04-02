# qiankun-demo

一个基于 `Vite + qiankun + React` 的微前端示例，包含：

- 主应用：`main`
- 子应用 1：`micro-app-1`（SPA）
- 子应用 2：`micro-app-2`（SPA）

使用 `pnpm workspace` 管理，并提供本地 `express` 静态部署方式。

## 环境要求

- Node.js 18+
- pnpm 10+

## 安装依赖

```bash
pnpm install --no-frozen-lockfile --store-dir .pnpm-store/v10
```

## 开发模式（3 个应用同时启动）

```bash
pnpm dev
```

启动后访问：

- 主应用：`http://localhost:7099`
- 子应用 1（独立）：`http://localhost:7101`
- 子应用 2（独立）：`http://localhost:7102`

主应用中子应用挂载路由：

- `http://localhost:7099/app1`
- `http://localhost:7099/app2`

## 本地静态部署（模拟生产）

先构建，再用 `express` 启动静态服务：

```bash
pnpm start
```

或分两步：

```bash
pnpm build
pnpm serve
```

默认访问地址：

- `http://localhost:8080`

主应用在生产模式下会从以下路径加载子应用：

- `/micro-app-1/`
- `/micro-app-2/`

服务中已处理 SPA 路由回退，可直接刷新以下地址：

- `/app1`
- `/app2`
- `/micro-app-1/about`
- `/micro-app-2/about`

## 可选环境变量

主应用支持覆盖子应用入口：

- `VITE_MICRO_APP_1_ENTRY`
- `VITE_MICRO_APP_2_ENTRY`

示例：

```bash
VITE_MICRO_APP_1_ENTRY=https://example.com/micro-app-1/ \
VITE_MICRO_APP_2_ENTRY=https://example.com/micro-app-2/ \
pnpm --filter main build
```
