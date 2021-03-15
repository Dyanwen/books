/**
 * Hello TypeScript
 * TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错
 */

// function sayHello(person:string) {
//     return `hi,${person}`
// }

// let user = "lisa";
// console.log(sayHello(user));

// let a1:any;

// a1.setName('Jerry');
// a1 = 3;
// a1 = "name";

// enum Days{
//     Sum = 7,
//     Mon = 1,
//     Tue,Wed,Thu,Fri,Sat
// }
// console.log(Days['Sum'] === 7) // true

function copyFields<T extends U, U>(target: T, source: U): T {
  for (const id in source) {
    target[id] = (<T>source)[id]
  }
  return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 })
