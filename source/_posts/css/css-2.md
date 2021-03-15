---
title: CSS(二) 动画
date: 2021-01-24 16:48:26
tags: css
---

# animation

简写属性形式,每个动画定义中的属性值的顺序很重要：可以被解析为 <time> 的第一个值被分配给animation-duration， 第二个分配给 animation-delay

```
animation: [animation-name][animation-duration][animation-timing-function]
[animation-delay][animation-iteration-count][animation-direction] 
[animation-fill-mode][animation-play-state]

animation: 动画名字 动画时长 速度曲线 延迟开始时间 运行次数 是否反向运行 动画播放前后应用的样式 定义动画运行或暂停
```

#### 一、`animation-name` 动画名
animation-name属性指定应用的一系列动画，每个名称代表一个由@keyframes定义的动画序列。

#### 关键帧`@keyframes` 可以控制动画序列的中间步骤

如果一个关键帧规则没有指定动画的开始或结束状态（也就是，0%/from 和100%/to，浏览器将使用元素的现有样式作为起始/结束状态。这可以用来从初始状态开始元素动画，最终返回初始状态。
如果在关键帧的样式中使用了不能用作动画的属性，那么这些属性会被忽略掉，支持动画的属性仍然是有效的，不受波及。

#### 二、`animation-duration` `animation-delay`

animation-duration属性指定一个动画周期的时长。默认值为0s，表示无动画。
animation-delay CSS属性定义动画于何时开始，即从动画应用在元素上到动画开始的这段时间的长度。0s是该属性的默认值，代表动画在应用到元素上后立即开始执行。

#### 三、`animation-timing-function`属性定义CSS动画在每一动画周期中执行的节奏。
可能值为一或多个 <timing-function>
<timing-function> CSS 数据类型表示一个数学函数，它描述了在一个过渡或动画中一维数值的改变速度

##### 定时函数<timing-function>

###### (1) cubic-bezier() 定时函数
cubic-bezier() 定义了一条 立方贝塞尔曲线（cubic Bézier curve）这些曲线是连续的，一般用于动画的平滑变换，也被称为缓动函数（easing functions）。

语法
```
cubic-bezier(x1, y1, x2, y2)
// x1, y1, x2, y2是<number>类型的值，它们代表当前定义立方贝塞尔曲线中的P1 和 P2点的横坐标和纵坐标，X1和X2必须在[0，1]范围内，否则当前值无效。
```
###### (2) 步长 `The steps() class of timing-functions`
steps() 定义了一个以等距步长划分值域的步长函数。这个阶跃函数的子类有时也称为阶梯函数。

语法
```
steps(number_of_steps, direction)
```

###### (3) 常用定时函数关键字
```
linear 
动画会以恒定的速度从初始状态过渡到结束状态
此关键字表示定时函数cubic-bezier(0.0, 0.0, 1.0, 1.0)
ease
开始时加速地更快，但在接近中间中，加速已经开始变慢了
此关键字表示定时函数 cubic-bezier(0.25, 0.1, 0.25, 1.0)类似于 ease-in-out
ease-in
加速
此关键字表示定时函数cubic-bezier(0.42, 0.0, 1.0, 1.0)
ease-in-out
快-慢-快
此关键字表示定时函数 cubic-bezier(0.42, 0.0, 0.58, 1.0)
ease-out
减速
此关键字表示定时函数 cubic-bezier(0.0, 0.0, 0.58, 1.0)
step-start
动画会立刻跳转到结束状态，并一直停留在结束状态直到动画结束
此关键字表示定时函数 steps(1, start)
step-end
动画会一直保持初始状态直到动画结束，然后立刻跳转到结束状态。
此关键字表示定时函数 steps(1, end)
```

#### 四、`animation-iteration-count` 运行的次数
`animation-iteration-count` CSS 属性   定义动画在结束前运行的次数 可以是1次 无限循环.
`infinite`
关键字时表示无限循环
`<number>`
数字时表示动画播放的次数；可以用小数定义循环，来播放动画周期的一部分：例如，0.5 将播放到动画周期的一半。不可为负值。


#### 五、`animation-direction`
`animation-direction` CSS 属性指示动画是否反向播放，它通常在简写属性animation中设定

语法
`normal`默认属性
每个循环内动画向前循环，换言之，每个动画循环结束，动画重置到起点重新开始
`alternate`
动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，ease-in 在反向时成为ease-out。计数取决于开始时是奇数迭代还是偶数迭代
`reverse`
反向运行动画，每周期结束动画由尾到头运行。
`alternate-reverse`
反向交替， 反向开始交替
动画第一次运行时是反向的，然后下一次是正向，后面依次循环。决定奇数次或偶数次的计数从1开始

#### 六、`animation-fill-mode`
`animation-fill-mode` 设置CSS动画在执行之前和之后如何将样式应用于其目标。

语法
`none`默认值
当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素
`forwards`
目标将保留由执行期间遇到的最后一个关键帧计算值。 最后一个关键帧取决于animation-direction和animation-iteration-count的值
`backwards`
动画将在应用于目标时立即应用第一个关键帧中定义的值，并在animation-delay期间保留此值。 第一个关键帧取决于animation-direction的值
`both`
动画将遵循forwards和backwards的规则，从而在两个方向上扩展动画属性

#### 七、animation-play-state
animation-play-state CSS 属性定义一个动画是否运行或者暂停。可以通过查询它来确定动画是否正在运行。另外，它的值可以被设置为暂停和恢复的动画的重放
恢复一个已暂停的动画，将从它开始暂停的时候，而不是从动画序列的起点开始在动画。
`running`
当前动画正在运行。
`paused`
当前动画已被停止
## 二、示例动画

#### 一、波纹动画

```less
.dot {
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  border-radius: 50%;

  &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
  }

}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
    
  }
  
  80%,
  100% {
    opacity: 0;
  }
}
```



## 参考链接

> https://juejin.cn/post/6844904033405108232

