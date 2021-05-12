#!usr/bin/env bash
npm config get registry 
npm config set registry =  http://registry.npmjs.org
echo 'please login'
npm login 
echo '-----publish-----'
npm publish 
npm config set registry =  http://registry.npm.taobao.org
echo 'publish over'
exit