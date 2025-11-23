FROM nginx:latest

# HTML, CSS, JS ファイルを配置
COPY ./html/ /usr/share/nginx/html/

# Nginx のデフォルト設定を使用
CMD ["nginx", "-g", "daemon off;"]