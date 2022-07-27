## Linux 中清空或删除大文件内容的 5 种方法

### 1.通过重定向到空来清空文件内容

`> access.log`

### 2.使用’true’命令重定向清空文件

`：> access.log `
`true > access.log `

### 3.使用带/dev/null 的 cat/ cp/ dd 实用程序清空文件

`cat /dev/null > access.log`
`cp /dev/null access.log`
`dd if=/dev/null of=access.log`

### 4.使用 echo 命令清空文件

`echo “” > access.log`
`echo > access.log`
`echo -n “”> access.log`

### 5.使用truncate命令清空文件
`truncate -s 0 access.log`
