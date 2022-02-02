let a = ['q','w','e','r','t'];
for(var val,ret,it=a[Symbol.iterator]();(ret=it.next())&&!ret.done;){
    val = ret.value;
    console.log(val);
}