# canvas

1.  _前言_
    canvas 一般就是用来绘制图像的

2.  _基本知识_
    上下文对象

    ```js
    var canvas = doucment.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "color"; // 填充样式
    ctx.strokeStyle = "color"; //边框样式

    ctx.fill(); //填充区域
    ctx.stroke(); //绘制边框
    ```

3.  _绘制矩形_

    1、设置填充样式或者边框样式(ctx.fillStyle = "color";或者 ctx.strokeStyle = "color";)

    2、绘制矩形区域(如果采用 fillRect 或者 strokeRect 绘制矩形，可以省略第 3 步);

    3、填充或者加上边框(ctx.fill();或者 ctx.stroke();)

4.  _清除矩形区域_

    作用：就像刚交完工的房子，有很多垃圾，你需要清理，清理除一块区域，以后将作为你的卧室。

    ```js
    ctx.clearRect(x, y, w, h);
    ```

5.  _圆弧_

    - 设置填充样式或者边框样式(ctx.fillStyle = "color";或者 ctx.strokeStyle = "color";)
    - 绘制原型区域
      ```js
      ctx.arc(x, y, r, startAngle, endAngle, boolean);
      ```
      r 代表半径，startAngle,endAngle 分别代表开始角度和结束角度，最后一个参数表示 true(逆时针),false(顺时针)
    - 填充或者加上边框(ctx.fill();或者 ctx.stroke();)

          注：1、在绘制圆弧的时候，必须使用ctx.beginPath()开始和ctx.closePath()结束，当然，前提条件时你要画规则的图形
          	2、这里的开始角度和结束角度不是deg，而是Math.PI*(相应的值)。

6.  _路径_

    ```js
    ctx.beginPath();
    ctx.closePath();
    ```

    注：如果不加的话，就会出现“灵异事件”（它将你的上一个结束点作为接下来的开始点）；变得不是你想要的图形。

7.  _绘制线段_

    ```js
    ctx.moveTo(x, y); //这里必须以 moveTo 开头，其实是将你的原点移动了位置
    ctx.lineTo(x, y); //绘制接下来的点。
    ```

    注：一般情况下、只需要一个 moveTo 即可。

8.  _绘制贝塞尔曲线_

    context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)
    绘制二次样条曲线 context.quadraticCurveTo(qcpx,qcpy,qx,qy)

    cp1x:第一个控制点 x 坐标 cp1y:第一个控制点 y 坐标 cp2x:第二个控制点 x 坐标 cp2y:第二个控制点 y 坐标

    x:终点 x 坐标 y:终点 y 坐标 qcpx:二次样条曲线控制点 x 坐标 qcpy:二次样条曲线控制点 y 坐标
    qx:二次样条曲线终点 x 坐标 qy:二次样条曲线终点 y 坐标

    注：context.quadraticCurveTo(qcpx,qcpy,qx,qy)还可以换成
    context.bezierCurveTo(x,y,cp2x,cp2y,x,y),第一组的 x 和 y 表示的是第一条曲线的终点

9.  _线性渐变_

    ```js
    var lg= context.createLinearGradient(xStart,yStart,xEnd,yEnd)
    lg.addColorStop(offset,color);
    // eg:
    (lg.addColorStop(0,"red");lg.addColorStop(0.5,"green");lg.addColorStop(1,"blue"))
    ctx.fillStyle = lg;
    ```

10. _径向渐变（发散）_
    ```js
    var rg=context.createRadialGradient(xStart,yStart,radiusStart,xEnd,yEnd,radiusEnd)
    ```
    径向渐变（发散）颜色 rg.addColorStop(offset,color)
    xStart:发散开始圆心 x 坐标
    yStart:发散开始圆心 y 坐标 radiusStart:发散开始圆的半径 xEnd:发散结束圆心的 x 坐标 yEnd:发散结束圆心的 y 坐标
    radiusEnd:发散结束圆的半径 offset:设定的颜色离渐变结束点的偏移量(0~1)
    color:绘制时要使用的颜色

    用法同上：9、线性渐变

11. _图形组合_
    - 在绘制完成第一个图形之后，加context.globalCompositeOperation=type
    - 再接着绘制第二个图形
    > type：
    > - source-over（默认值）:在原有图形上绘制新图形
    > - destination-over:在原有图形下绘制新图形
    > - source-in:显示原有图形和新图形的交集，新图形在上，所以颜色为新图形的颜色
    > - destination-in:显示原有图形和新图形的交集，原有图形在上，所以颜色为原有图形的颜色
    > - source-out:只显示新图形非交集部分
    > - destination-out:只显示原有图形非交集部分,是将交集的部分转化为透明
    > - source-atop:显示原有图形和交集部分，新图形在上，所以交集部分的颜色为新图形的颜色
    > - destination-atop:显示新图形和交集部分，新图形在下，所以交集部分的颜色为原有图形的颜色
    > - lighter:原有图形和新图形都显示，交集部分做颜色叠加
    > - xor:重叠飞部分不现实
    > - copy:只显示新图形
12. _给图形绘制阴影_

    ```js
    ctx.shadowOffsetX = "5";
    ctx.shadowOffsetY = "5";
    ctx.shadowBlur = "5";
    ctx.shadowColor = "red";
    ```

    绘制需要的图形

13. 绘制文字
    - ctx.font="italic 30px 微软雅黑";//顺序不能改
    - ctx.fillStyle = "color";或者 ctx.strokeStyle = "color";
    - ctx.textBaseline = "";设置垂直对齐方式
    - ctx.textAlign = "";设置水平对齐方式
    - ctx.fillText("文本",x,y)（实心字）或者 ctx.strokeText("文本",x,y)（字的轮廓）;
    注：上面带*的那个设置，其实设置的时字体的颜色
14. 图形变形（平移、旋转、缩放）
    - ctx.translate(x,y);
    - ctx.rotate(Math.PI\*(angleValue));
    - ctx.scale(x,y);
    注：平移 2 个值，缩放 2 个值，旋转角度是弧度
15. 保存和恢复状态（context）

    - ctx.save();//保存当前的绘制状态，
    - ctx.restore();//恢复到离他最近的那个 save 的状态
16. 保存文件
    ```js
    var w = window.open(canvas.toDataURL("image/jpeg"),"smallwin","width=400,height=350");
    ```
17. 结合 setInterval 制作动画
    ```js
    window.setInterval(function(){
    	//执行的方法体
    },10)；
    ```
