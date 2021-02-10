/*
* 3.2.4 高阶函数的其他应用
前面我们已经学习过高阶函数，本节我们再挑选一些常见的高阶函数应用进行介绍。
1. currying
首先我们讨论的是函数柯里化（function currying）。currying 的概念最早由俄国数学家 Moses
Schönfinkel 发明，而后由著名的数理逻辑学家 Haskell Curry 将其丰富和发展，currying 由此得名。
currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，
该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保
存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
从字面上理解 currying 并不太容易，我们来看下面的例子。
*
*
假设我们要编写一个计算每月开销的函数。在每天结束之前，我们都要记录今天花掉了多少
钱。代码如下
* */

/*
*
* var monthlyCost = 0;
var cost = function( money ){
 monthlyCost += money;
};
cost( 100 ); // 第 1 天开销
cost( 200 ); // 第 2 天开销
cost( 300 ); // 第 3 天开销
//cost( 700 ); // 第 30 天开销
alert ( monthlyCost );
* */

/*
var monthlyCost = 0;
var cost = function (money) {
  monthlyCost += money
  console.log(monthlyCost);
}


cost(100) // 100
cost(100) // 200
cost(100) // 300

 */

/*
通过这段代码可以看到，每天结束后我们都会记录并计算到今天为止花掉的钱。但我们其实
并不太关心每天花掉了多少钱，而只想知道到月底的时候会花掉多少钱。也就是说，实际上只需
要在月底计算一次。
如果在每个月的前 29 天，我们都只是保存好当天的开销，直到第 30 天才进行求值计算，这
样就达到了我们的要求。虽然下面的 cost 函数还不是一个 currying 函数的完整实现，但有助于
我们了解其思想：
 */
/*
var cost = (function(){
  var args = [];
  return function(){
    if ( arguments.length === 0 ){
      var money = 0;
      for ( var i = 0, l = args.length; i < l; i++ ){
        money += args[ i ];
      }
      return money;
    }else{
      [].push.apply( args, arguments );
    }
  }
})();
cost( 100 ); // 未真正求值
cost( 200 ); // 未真正求值
cost( 300 ); // 未真正求值
console.log( cost() ); // 求值并输出：600
 */

/*
至此，我们完成了一个 currying 函数的编写。当调用 cost()时，如果明确地带上了一些参数，
表示此时并不进行真正的求值计算，而是把这些参数保存起来，此时让 cost 函数返回另外一个
函数。只有当我们以不带参数的形式执行 cost()时，才利用前面保存的所有参数，真正开始进行
求值计算。

2. uncurrying
在 JavaScript 中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为
拥有这个方法，这是动态类型语言的特点，也是常说的鸭子类型思想。
同理，一个对象也未必只能使用它自身的方法，那么有什么办法可以让对象去借用一个原本
不属于它的方法呢？
答案对于我们来说很简单，call 和 apply 都可以完成这个需求：
 */

/*
var obj1 = {
  name: 'sven'
}

var obj2 = {
  name: 'join',
  getName: function () {
    return this.name
  }
}

console.log(obj2.getName.call(obj1)); // sven
*/

/*
* 我们常常让类数组对象去借用 Array.prototype 的方法，这是 call 和 apply 最常见的应用场
景之一：
* */
/*
(function () {
  [].push.call(arguments, 4)
  console.log(arguments);
})(1, 2, 3)

 */
/*
在我们的预期中，Array.prototype 上的方法原本只能用来操作 array 对象。但用 call 和 apply
可以把任意对象当作 this 传入某个方法，这样一来，方法中用到 this 的地方就不再局限于原来
规定的对象，而是加以泛化并得到更广的适用性。
Array.prototype 上的方法可以操作任何对象的原理可参阅 2.2 节。
那么有没有办法把泛化 this 的过程提取出来呢？本小节讲述的 uncurrying 就是用来解决这
个问题的。uncurrying 的话题来自 JavaScript 之父 Brendan Eich 在 2011 年发表的一篇 Twitter。以
下代码是 uncurrying 的实现方式之一：
 */
/*
Function.prototype.uncurrying = function () {
  var self = this;
  return function() {
    var obj = Array.prototype.shift.call( arguments );
    return self.apply( obj, arguments );
  };
};

 */
/*
在讲解这段代码的实现原理之前，我们先来瞧瞧它有什么作用。
在类数组对象 arguments 借用 Array.prototype 的方法之前，先把 Array.prototype.push.call
这句代码转换为一个通用的 push 函数：
 */
/*
var push = Array.prototype.push.uncurrying();
(function(){
 push( arguments, 4 );
 console.log( arguments ); // 输出：[1, 2, 3, 4]
})( 1, 2, 3 );
 */

/*
通过 uncurrying 的方式，Array.prototype.push.call 变成了一个通用的 push 函数。这样一来，
push 函数的作用就跟 Array.prototype.push 一样了，同样不仅仅局限于只能操作 array 对象。而
对于使用者而言，调用 push 函数的方式也显得更加简洁和意图明了。
我们还可以一次性地把 Array.prototype 上的方法“复制”到 array 对象上，同样这些方法可
操作的对象也不仅仅只是 array 对象
 */

/*
for ( var i = 0, fn, ary = [ 'push', 'shift', 'forEach' ]; fn = ary[ i++ ]; ){
 Array[ fn ] = Array.prototype[ fn ].uncurrying();
};
var obj = {
 "length": 3,
 "0": 1,
 "1": 2,
 "2": 3
};
Array.push( obj, 4 ); // 向对象中添加一个元素
console.log( obj.length ); // 输出：4
var first = Array.shift( obj ); // 截取第一个元素
console.log( first ); // 输出：1
console.log( obj ); // 输出：{0: 2, 1: 3, 2: 4, length: 3}
Array.forEach( obj, function( i, n ){
 console.log( n ); // 分别输出：0, 1, 2
});
 */

/*
除了刚刚提供的代码实现，下面的代码是 uncurrying 的另外一种实现方式：
Function.prototype.uncurrying = function(){
 var self = this;
 return function(){
 return Function.prototype.call.apply( self, arguments );
 }
};
 */
/*
3. 函数节流
JavaScript 中的函数大多数情况下都是由用户主动调用触发的，除非是函数本身的实现不合
理，否则我们一般不会遇到跟性能相关的问题。但在一些少数情况下，函数的触发不是由用户直
接控制的。在这些场景下，函数有可能被非常频繁地调用，而造成大的性能问题。下面将列举一
些这样的场景。
(1) 函数被频繁调用的场景
 window.onresize 事件。我们给 window 对象绑定了 resize 事件，当浏览器窗口大小被拖动
而改变的时候，这个事件触发的频率非常之高。如果我们在 window.onresize 事件函数里
有一些跟 DOM 节点相关的操作，而跟 DOM 节点相关的操作往往是非常消耗性能的，这
时候浏览器可能就会吃不消而造成卡顿现象。
 mousemove 事件。同样，如果我们给一个 div 节点绑定了拖曳事件（主要是 mousemove），当
div 节点被拖动的时候，也会频繁地触发该拖曳事件函数。
 上传进度。微云的上传功能使用了公司提供的一个浏览器插件。该浏览器插件在真正开
始上传文件之前，会对文件进行扫描并随时通知 JavaScript 函数，以便在页面中显示当前
的扫描进度。但该插件通知的频率非常之高，大约一秒钟 10 次，很显然我们在页面中不
需要如此频繁地去提示用户3. 函数节流
JavaScript 中的函数大多数情况下都是由用户主动调用触发的，除非是函数本身的实现不合
理，否则我们一般不会遇到跟性能相关的问题。但在一些少数情况下，函数的触发不是由用户直
接控制的。在这些场景下，函数有可能被非常频繁地调用，而造成大的性能问题。下面将列举一
些这样的场景。

(1) 函数被频繁调用的场景
 window.onresize 事件。我们给 window 对象绑定了 resize 事件，当浏览器窗口大小被拖动
而改变的时候，这个事件触发的频率非常之高。如果我们在 window.onresize 事件函数里
有一些跟 DOM 节点相关的操作，而跟 DOM 节点相关的操作往往是非常消耗性能的，这
时候浏览器可能就会吃不消而造成卡顿现象。
 mousemove 事件。同样，如果我们给一个 div 节点绑定了拖曳事件（主要是 mousemove），当
div 节点被拖动的时候，也会频繁地触发该拖曳事件函数。
 上传进度。微云的上传功能使用了公司提供的一个浏览器插件。该浏览器插件在真正开
始上传文件之前，会对文件进行扫描并随时通知 JavaScript 函数，以便在页面中显示当前
的扫描进度。但该插件通知的频率非常之高，大约一秒钟 10 次，很显然我们在页面中不
需要如此频繁地去提示用户

(2) 函数节流的原理
我们整理上面提到的三个场景，发现它们面临的共同问题是函数被触发的频率太高。
比如我们在 window.onresize 事件中要打印当前的浏览器窗口大小，在我们通过拖曳来改变
窗口大小的时候，打印窗口大小的工作 1 秒钟进行了 10 次。而我们实际上只需要 2 次或者 3 次。
这就需要我们按时间段来忽略掉一些事件请求，比如确保在 500ms 内只打印一次。很显然，我们
可以借助 setTimeout 来完成这件事情。
(3) 函数节流的代码实现
关于函数节流的代码实现有许多种，下面的 throttle 函数的原理是，将即将被执行的函数用
setTimeout 延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。
throttle 函数接受 2 个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时
间。具体实现代码如下:

 */

/*
var throttle = function (fn, interval) {
  var __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用
  return function () {
    var args = arguments,
      __me = this;
    if (firstTime) { // 如果是第一次调用，不需延迟执行
      __self.apply(__me, args);
      return firstTime = false;
    }
    if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
      return false;
    }
    timer = setTimeout(function () { // 延迟一段时间执行
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);
  };
};
window.onresize = throttle(function () {
  console.log(1);
}, 500);
 */

/*
var throttle2 = function (fn, interval) {
  var prevTime = Date.now()
  return function () {
    var currentTime = Date.now()
    var timeDiff = currentTime - prevTime
    if (timeDiff > interval) {
      fn.apply(this, arguments)
      prevTime = Date.now()
    }
  }
}

 */
/*
var debounce = function (fn, interval) {
  var timer
  return function () {
    clearTimeout(timer)
    var self = this
    var args = arguments
    timer = setTimeout(function () {
      fn.apply(self, args)
    }, interval)
  }
}

var testFn = function () {
  console.log(parseInt(Date.now() / 1000) * 1000);
}

setInterval(debounce(testFn, 1000), 2000)
 */

/*
4. 分时函数
在前面关于函数节流的讨论中，我们提供了一种限制函数被频繁调用的解决方案。下面我们
将遇到另外一个问题，某些函数确实是用户主动调用的，但因为一些客观的原因，这些函数会严
重地影响页面性能。
一个例子是创建 WebQQ 的 QQ 好友列表。列表中通常会有成百上千个好友，如果一个好友
用一个节点来表示，当我们在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千
个节点。
在短时间内往页面中大量添加 DOM 节点显然也会让浏览器吃不消，我们看到的结果往往就
是浏览器的卡顿甚至假死。代码如下：
 */
/*
var ary = [];
for ( var i = 1; i <= 1000; i++ ){
 ary.push( i ); // 假设 ary 装载了 1000 个好友的数据
};
var renderFriendList = function( data ){
 for ( var i = 0, l = data.length; i < l; i++ ){
 var div = document.createElement( 'div' );
 div.innerHTML = i;
 document.body.appendChild( div );
 }
};
renderFriendList( ary );
 */
/*
这个问题的解决方案之一是下面的 timeChunk 函数，timeChunk 函数让创建节点的工作分批进
行，比如把 1 秒钟创建 1000 个节点，改为每隔 200 毫秒创建 8 个节点。
timeChunk 函数接受 3 个参数，第 1 个参数是创建节点时需要用到的数据，第 2 个参数是封装
了创建节点逻辑的函数，第 3 个参数表示每一批创建的节点数量。代码如下
 */

/*
var timeChunk = function (ary, fn, count) {
  var obj,
    t;
  var len = ary.length;
  var start = function () {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift();
      fn(obj);
    }
  };
  return function () {
    t = setInterval(function () {
      if (ary.length === 0) { // 如果全部节点都已经被创建好
        return clearInterval(t);
      }
      start();
    }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
  };
};
 */
/*
var timeChunk = function (ary, fn, count) {
  var obj, t;
  var len = ary.length;
  var start = function () {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift();
      fn(obj);
    }
  }
  return function () {
    t = setInterval(function () {
      if (ary.length === 0) {
        return clearInterval(t);
      }
      start()
    }, 200)
  }
}
 */
/*
最后我们进行一些小测试，假设我们有 1000 个好友的数据，我们利用 timeChunk 函数，每一
批只往页面中创建 8 个节点：
*/
/*
 var ary = [];
 for ( var i = 1; i <= 1000; i++ ){
 ary.push( i );
 };
 var renderFriendList = timeChunk( ary, function( n ){
 var div = document.createElement( 'div' );
 div.innerHTML = n;
 document.body.appendChild( div );
 }, 8 );
 renderFriendList();
 */
/*
5. 惰性加载函数
在 Web 开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。比如我们需要
一个在各个浏览器中能够通用的事件绑定函数 addEvent，常见的写法如下：

var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    return elem.addEventListener(type, handler, false);
  }
  if (window.attachEvent) {
    return elem.attachEvent('on' + type, handler);
  }
};
 */
