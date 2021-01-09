#/bin/bash
git pull
git add .
git commit -m $1
git push

echo "提交完成"

rm -rf ../book_end/*
gitbook build ./ ../book_end

echo "构建成功"
cd ../book_end

git add .
git commit -m $1 
git push
cd -
echo "执行完毕"
