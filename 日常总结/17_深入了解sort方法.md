在开发中经常会遇到各种排序，例如只包含数值型的数组，往往直接调用`sort`排序是最正常不过的了，可是你真的知道`sort`排序是如何实现的吗？接下来，我将就`sort()`方法的实现以及参数对比函数是什么意思进行一一分析

## sort方法的基本使用

引用MDN上面的定义：
> **sort()** 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的`UTF-16`代码单元值序列时构建的
```
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);  // ["Dec", "Feb", "Jan", "March"]
```
我们先看一下它的基本用法：
```js
arr.sort([compareFunction])
```

### 参数
其中`compareFunction`用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的`Unicode`位点进行排序

`firstEl`第一个用于比较的元素。

`secondEl`第二个用于比较的元素。

### 返回值
排序后的数组。请注意，数组已原地排序，并且不进行复制。

代码如下：
```js
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);  // [1, 100000, 21, 30, 4]
```
从上面的执行结果可以看出，如果不加参数，在第二段代码中，21 会排到 4 的前面。这样按照从小到大的逻辑是行不通的，如果想要按照从小到大排序或者从大到小排序，那么上面的代码就需要调整为下面这样
```js
const array1 = [1, 30, 4, 21, 100000];
array1.sort((a,b) => b - a);
console.log(array1);    // [100000, 30, 21, 4, 1]
const array1 = [1, 30, 4, 21, 100000];
array1.sort((a,b) => a - b);
console.log(array1);    // [1, 4, 21, 30, 100000]
```
### 描述
如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值排序。即 `a` 和 `b` 是两个将要被比较的元素：

- 如果 `compareFunction(a, b)`小于0，那么`a`会被排列到`b`之前；
- 如果 `compareFunction(a, b)`等于0，`a`和`b`的相对位置不变。备注： `ECMAScript` 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
- 如果 `compareFunction(a, b)`大于0，`b`会被排列到`a`之前。

`compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

## sort 方法的底层实现
```js
utils.InstallFunctions(GlobalArray.prototype, DONT_ENUM, [
  ...
  "sort", getFunction("sort", ArraySort),
  ...
]);

function ArraySort(comparefn) {
    CHECK_OBJECT_COERCIBLE(this,"Array.prototype.sort");
    var array = TO_OBJECT(this);
    var length = TO_LENGTH(array.length);
    return InnerArraySort(array, length, comparefn);
}

function InnerArraySort(array, length, comparefn) {
  // 比较函数未传入
  if (!IS_CALLABLE(comparefn)) {
      comparefn = function (x, y) {
        if (x === y) return 0;
        if (%_IsSmi(x) && %_IsSmi(y)) {
          return %SmiLexicographicCompare(x, y);
        }
        x = TO_STRING(x);
        y = TO_STRING(y);
        if (x == y) return 0;
        else return x < y ? -1 : 1;
	 };
}

  function InsertionSort(a, from, to) {
    // 插入排序
    for (var i = from + 1; i < to; i++) {
        var element = a[i];
        for (var j = i - 1; j >= from; j--) {
          var tmp = a[j];
          var order = comparefn(tmp, element);
          if (order > 0) {
            a[j + 1] = tmp;
          } else {
            break;
          }
        }
      a[j + 1] = element;
	 }
  }

function GetThirdIndex(a, from, to) {   
    // 元素个数大于1000时寻找哨兵元素
    var t_array = new InternalArray();
    var increment = 200 + ((to - from) & 15);
    var j = 0;
    from += 1;
    to -= 1;
    for (var i = from; i < to; i += increment) {
       t_array[j] = [i, a[i]];
       j++;
    }
    t_array.sort(function(a, b) {
       return comparefn(a[1], b[1]);
    });
    var third_index = t_array[t_array.length >> 1][0];
    return third_index;
}

function QuickSort(a, from, to) {  // 快速排序实现
    //哨兵位置
    var third_index = 0;
    while (true) {
      if (to - from <= 10) {
        InsertionSort(a, from, to); // 数据量小，使用插入排序，速度较快
        return;
      }
      if (to - from > 1000) {
        third_index = GetThirdIndex(a, from, to);
      } else {
          // 小于1000 直接取中点
        third_index = from + ((to - from) >> 1);
      }
      // 下面开始快排
      var v0 = a[from];
      var v1 = a[to - 1];
      var v2 = a[third_index];
      var c01 = comparefn(v0, v1);
      if (c01 > 0) {
        var tmp = v0;
        v0 = v1;
        v1 = tmp;
      }
      var c02 = comparefn(v0, v2);
      if (c02 >= 0) {
        var tmp = v0;
        v0 = v2;
        v2 = v1;
        v1 = tmp;
      } else {
        var c12 = comparefn(v1, v2);
        if (c12 > 0) {
          var tmp = v1;
          v1 = v2;
          v2 = tmp;
        }
      }
      a[from] = v0;
      a[to - 1] = v2;
      var pivot = v1;
      var low_end = from + 1; 
      var high_start = to - 1;
      a[third_index] = a[low_end];
      a[low_end] = pivot;
      partition: for (var i = low_end + 1; i < high_start; i++) {
        var element = a[i];
        var order = comparefn(element, pivot);
        if (order < 0) {
          a[i] = a[low_end];
          a[low_end] = element;
          low_end++;
        } else if (order > 0) {
          do {
            high_start--;
            if (high_start == i) break partition;
            var top_elem = a[high_start];
            order = comparefn(top_elem, pivot);
          } while (order > 0);
          a[i] = a[high_start];
          a[high_start] = element;
          if (order < 0) {
            element = a[i];
            a[i] = a[low_end];
            a[low_end] = element;
            low_end++;
          }
        }
      }
        // 快排的核心思路，递归调用快速排序方法
      if (to - high_start < low_end - from) {
        QuickSort(a, high_start, to);
        to = low_end;
      } else {
        QuickSort(a, from, low_end);
        from = high_start;
      }
    }
  }

utils.Export(function(to) {
  ...
  to.InnerArraySort = InnerArraySort;
  ...
});
```

通过查看源码我们先直接看一下结论，如果要排序的元素个数是 n 的时候，那么就会有以下几种情况：
1. 当 `n<=10` 时，采用插入排序；
2. 当 `n>10` 时，采用三路快速排序；
3. `10<n<=1000`，采用中位数作为哨兵元素；
4. `n>1000`，每隔 `200~215` 个元素挑出一个元素，放到一个新数组中，然后对它排序，找到中间位置的数，以此作为中位数。


