#使用node作为基础镜像
FROM node:18-alpine AS build
#设置工作目录
WORKDIR /app
# 拷贝 package.json 和 package-lock.json 到工作目录
COPY package*.json ./
# 安装项目依赖
RUN npm install
# 拷贝所有文件到工作目录
COPY . .
# 构建生产环境代码
RUN npm run build
# 暴露容器的 5173 端口
EXPOSE 5173
# 使用 Nginx 作为基础镜像
FROM nginx:alpine
# 拷贝 Nginx 配置文件到容器中
COPY nginx.conf /etc/nginx/nginx.conf
# 拷贝构建后的文件到 Nginx 服务器的默认目录
COPY --from=build /app/dist /usr/share/nginx/html/app