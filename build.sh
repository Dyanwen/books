#/bin/bash
git pull

cd ../book_end

rm -rf *



gitbook build

git add .
git commit -m  “init”
git push
