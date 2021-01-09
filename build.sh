#/bin/bash
git pull
git add .
git commit -m $1
git push

echo "提交完成"

git clone -b gh-pages https://github.com/Dyanwen/books.git book_end
# rm -rf ./book_end/*

echo "代码clone成功"

gitbook build ./ ./book_end

echo "构建成功"

# cd ./book_end
# git add .
# git commit -m $1 
# git push
# # cd -
# echo "执行完毕"
