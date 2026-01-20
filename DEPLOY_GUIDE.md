# 部署指南 (Deployment Guide)

本网站基于 React + Vite 构建，非常适合部署在 Vercel、Netlify 或 GitHub Pages 等静态托管平台上。以下是使用 **Vercel**（推荐）的部署步骤。

## 准备工作

1.  **注册 GitHub 账号**：如果您还没有，请访问 [github.com](https://github.com/) 注册。
2.  **注册 Vercel 账号**：访问 [vercel.com](https://vercel.com/)，建议直接使用 GitHub 账号登录。
3.  **安装 Git**：确保您的电脑上安装了 Git。

## 步骤一：将代码推送到 GitHub

1.  解压您下载的 `zhaoli_portfolio.zip` 文件。
2.  在解压后的文件夹根目录打开终端（Terminal）或命令行。
3.  初始化 Git 仓库并提交代码：
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
4.  在 GitHub 上创建一个新的**空仓库**（Repository），例如命名为 `my-portfolio`。
5.  将本地代码推送到 GitHub（将下面的 URL 替换为您刚才创建的仓库地址）：
    ```bash
    git remote add origin https://github.com/您的用户名/my-portfolio.git
    git branch -M main
    git push -u origin main
    ```

## 步骤二：在 Vercel 上部署

1.  登录 Vercel 控制台。
2.  点击 **"Add New..."** -> **"Project"**。
3.  在 "Import Git Repository" 列表中，找到您刚才创建的 `my-portfolio` 仓库，点击 **"Import"**。
4.  **配置项目**（通常保持默认即可）：
    *   **Framework Preset**: Vite
    *   **Root Directory**: `./` (默认)
    *   **Build Command**: `npm run build` (或者 `pnpm build`)
    *   **Output Directory**: `dist`
5.  点击 **"Deploy"**。

等待一分钟左右，Vercel 会自动构建并发布您的网站。完成后，您会获得一个类似 `https://my-portfolio.vercel.app` 的访问链接。

## 步骤三：绑定自定义域名（可选）

如果您购买了域名（如 `zhaolicao.com`）：

1.  在 Vercel 的项目页面，点击 **"Settings"** -> **"Domains"**。
2.  输入您的域名，点击 **"Add"**。
3.  Vercel 会提示您在域名注册商（如 GoDaddy、阿里云）处添加一条 DNS 记录（通常是 A 记录或 CNAME 记录）。
4.  按照提示去域名注册商后台添加记录，等待生效即可（通常几分钟到几小时）。

## 本地开发（可选）

如果您想在本地修改代码：

1.  安装依赖：
    ```bash
    npm install
    # 或者如果您使用 pnpm
    pnpm install
    ```
2.  启动开发服务器：
    ```bash
    npm run dev
    ```
3.  访问 `http://localhost:5173` 查看效果。
