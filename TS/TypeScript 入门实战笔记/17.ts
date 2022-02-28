// type T = Readonly<T>;

// type JSON1 =
//   | string
//   | number
//   | boolean
//   | null
//   | JSON1[]
//   | { [key: string]: JSON }

// function toString(x: number | undefined): string {
//   if (x === undefined) {
//     return ''
//   }
//   return x.toString()
// }
// toString()
// toString(undefined)
// toString(1)

// new Promise((resolve) => {
//   resolve() // TS2794: Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
// })

// interface obj{
//   [key in 'id' | 'name']: any;
// }

// const symbol: unique symbol = Symbol()
// interface Obj {
//   [key: string]: any
//   [key: number]: any
//   [key: symbol]: any
// }

// type Obj = {
//   [key in 'id' | 'name']: any
// }

// enum A {
//   x = 'x',
//   y = 'y',
//   z = 'z',
// }
// enum B {
//   x = 'x',
//   y = 'y',
//   z = 'z',
// }
// function fn(val: A) {}
// fn((B as unknown) as A)

// type RepeactX<N extends number, T extends any[] = []> = T['length'] extends N
//   ? T
//   : RepeactX<N, [...T, 'X']>

// type t1 = RepeactX<5>
// type t2 = RepeactX<3, ['u', 'a']>

// interface CSSProperties {
//   display: 'block' | 'flex' | 'grid'
// }
// const style: CSSProperties = {
//   display: 'flex',
// }

// const cssStyle: CSSProperties = style

// let x: string | undefined
// if (x) {
//   x.trim()
//   setTimeout(() => {
//     x.trim()
//   });
// }
// type ExpectTrue<T extends true> = T;
// type t1 = ExpectTrue<true>
// type t2 = ExpectTrue<1>

