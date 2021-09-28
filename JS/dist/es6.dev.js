"use strict";

var a = ['a', 's', 'd', 'f', 'g', 'h', 'j'];

for (var val, ret, it = a[Symbol.iterator](); (ret = it.next()) && !ret.done;) {
  val = ret.value;
  console.log(val);
}