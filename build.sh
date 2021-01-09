#/bin/bash
echo "开始了哦..."
git pull
git add .
git commit -m $1
git push
echo "提交完成"

git clone -b gh-pages https://github.com/Dyanwen/books.git book_end
rm -rf book_end/*
echo “克隆完成”

gitbook build ./ 
echo "构建成功"

mv _book/* book_end/
rm -rf _book
cd book_end

git add .
git commit -m $1 
git push -f

cd -
rm -rf book_end
echo "执行完毕"
