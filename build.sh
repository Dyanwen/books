#/bin/bash
git pull
git add .
git commit -m $1
git push

gitbook build ./ 

cd ../book_end

rm -rf *
cp -r ../books/_book/ ./ 

git add .
git commit -m $1 
git push
cd -
echo "执行完毕"
