# Virtual Dom(虚拟dom)

## 1.为什么需要虚拟DOM

### (1)浏览器加载页面的过程

浏览器加载一个HTML文件需要做哪些事？，帮助我们理解为什么我们需要虚拟DOM。webkit（网页渲染引擎）的处理流程， 

![1537116745113](C:\Users\SHIXUE~1\AppData\Local\Temp\1537116745113.png)

所有浏览器的引擎工作流程都差不多，如上图大致分5步：创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting

第一步，用HTML分析器，分析HTML元素，构建一颗`DOM`树 (html的标签结构)。

第二步：用CSS分析器，分析CSS文件和元素上的内联样式，生成`CSSOM`树（页面的样式表）。

第三步：将上面的DOM树和样式表，关联起来。这一过程又称为Attachment。每个DOM节点都有attach方法，接受样式信息，返回一个render对象。这些render对象最终会被构建成一颗`Render`(html添加css结合)   树    。

***第四步***  (排版)：有了Render树后，浏览器开始`布局`，会为每个Render树上的节点确定一个在显示屏上出现的精确坐标值。

***第五步***（绘制）：Render树有了，节点显示的位置坐标也有了，最后就是调用每个节点的`paint`(绘制)方法，让它们显示出来。

**操作dom会产生几种动作，极大的影响渲染的效率。其中 layout（布局）和paint（绘制）是最大的 。**

- layout 就是布局变动造成重新计算（耗CPU，有时也很耗内存）
- paint 就是调用浏览器UI引擎进行渲染展示页面（耗CPU和内存）

**导致重排(layout)与重绘(paint)的常见情况：**

1、通过js获取DOM属性

2、增/删/DOM节点

3、改变浏览器窗口大小

4、改变字体

5、激活css伪类

6、修改DOM的属性，涉及到大小、位置等（该颜色不会激活提前的layout）

7、其他js操作。。。

当你在`一次`操作时，需要更新10个DOM节点时。

~~~
如：
node1.style.marginTop=50+'px';	
node2.style.width=50+'px';
node3.style.height=50+'px';
.......10次
~~~



DOM操作严重影响页面的性能,为了能让网页一次性渲染，提高性能，，

出现了一个DOM操作的设计思想（虚拟DOM）

~~~
虚拟DOM就是为了解决这个浏览器性能问题而被设计出来的。例如前面的例子，假如一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的内容保存到本地的一个js对象中，最终将这个js对象一次性attach到DOM树上，通知浏览器去执行绘制工作，这样可以避免大量的无谓的计算量
~~~



##2.认识DOM与虚拟DOM，及设计思路

### (1)真实dom(真实节点node的集合)

![1537364823028](C:\Users\SHIXUE~1\AppData\Local\Temp\1537364823028.png)

### (2)虚拟dom(虚拟节点vnode的集合)

![1537364179237](C:\Users\SHIXUE~1\AppData\Local\Temp\1537364179237.png)

为什么叫虚拟dom?

如上图所示：因为我们思想是把创建的节点保存在js变量中，而js变量保存在内存中，并不在真实的文档对象中，故称虚拟节点，这些节点的集合就叫虚拟dom

### (3)虚拟DOM设计思路

**1，`初始化dom`,用js的对象表示dom树中的节点，然后用这个对象的结构构建一个真正的 DOM 树，插入到文档中 ** 

**2,当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异**

**3,把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了**

## 3.实现虚拟DOM

构建虚拟dom,就要先构建虚拟节点vnode

那么一个节点由哪些组成呢？

1，  type : 元素类型，如 div , h1 , p 标签。。。

2，props :元素属性，如  id,  class , src .......

3，children:子元素

由此虚拟节点结构可设计为：{'元素类型', { '属性名': '属性值', ...},[子元素]}

~~~js
  {'元素类型', { '属性名': '属性值', ...}, [
            
          '子元素1类型', { '属性名': '属性值', ...},[
                 .......  
           ],
           '子元素2类型', { '属性名': '属性值', ...},[
                 .......  
           ]
                   
    ]};
~~~

如下DOM结构：

~~~html
<div id="container">
    <h1 style="color:red">virtual dom</h1>
    <p>hello world</p>
    <ul>
        <li>item1</li>
        <li>item2</li>
    </ul>   
</div>
~~~

上述dom结构可以构建成虚拟节点:

~~~js
{
    type:'div', 
    props:{ 'id': 'container'}, 
    children[
        { 
            type:'h1',
            props:{ style: 'color:red' },
            children:'virtual dom'
        },

        { 
            type:'p',
            children:'hello world'
        },

        { 
            type:'ul',
            children:[
                    	{
                            type:'li',
                            children:'item1'
                        } ,
                	    
                        {
                            type:'li', 
                            children:'item2'
                        }
                	] 
        },
	]
};
~~~

#### 实现前准备

~~~js
ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，有的浏览器可能并不支持es6语法，所以我们需要一个转码工具，把es6的语法转换成浏览器支持的javascript，Babel是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码。
~~~

在代码中使用了ES6的语法，所以要下载相关插件

ES6(下载插件如下)

- babel-core
- babel-preset-env

~~~
根据这个设计思想的第一步，我们不应该直接写html , 而是由js对象生成虚拟的dom , 然后再把这个dom挂载到文档中
但是像上一步 “构建成虚拟节点vnode”,要是整个纯手写很麻烦，也不可能纯手写，既然虚拟dom这么火，这种小问题肯定已经有人解决好了，我们只需要npm一个插件就可以把html自动编译成js对象格式了。
jsx中的一个工具就可以实现
~~~

JSX - transform html（下载插件如下）

- babel-plugin-transform-react-jsx

~~~
上述依赖于打包工具，以前用的都是Webpack,  而Rollup是一个新出的打包工具，我们就下载这个
~~~

Rollup

- rollup
- Rollup-plugin-babel

~~~js
//在项目中初始化一个packge.json文件
npm init
//下载插件
npm install --save-dev rollup rollup-plugin-babel babel-core
npm install --save-dev babel-plugin-transform-react-jsx babel-preset-env
~~~

**下载完成后配置**一下  ，先要创建一个rollup.config.js文件在里面写一个打包的配置

![1537460613607](C:\Users\SHIXUE~1\AppData\Local\Temp\1537460613607.png)

配置完后，我们的HTML是这样的

![1537461206088](C:\Users\SHIXUE~1\AppData\Local\Temp\1537461206088.png)

npm run build执行打包后，我们所需要的就是这个被编译过来的js对象格式的html

![1537461006345](C:\Users\SHIXUE~1\AppData\Local\Temp\1537461006345.png)



### (1)一个生产虚拟节点的函数（用于构建完整的js对象）

~~~js
function vnode(type, props, ...children) {
    return { type:type, props:props, children:children };
}
~~~

###(2)一个创建虚拟DOM的函数（把js对象格式的节点信息构建成虚拟dom树的方法）

下面的图片展示了每个节点是如何添加上去的。 用到createElement，appendChild

![1537494047079](C:\Users\shixuewen\Desktop\vriturl_dom\虚拟DOM.assets\1537494047079.png)

~~~js
function createElement(node) {
    if (typeof node === 'string') {			//判断是否是文本节点，若是直接返回
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);  //创建元素
    setProps($el, node.props);		//设置属性，下方内容有各种判断属性的方法
    node.children							//得到一个子元素的对象
        .map(createElement)		//map()方法让子元素对象再调用createElement方法，实现递归,
        .forEach($el.appendChild.bind($el));  //把递归返回的节点绑定到自己的上一层节点上
    return $el;			//返回整个由节点组合成的虚拟dom
}
~~~

### (3)一个更新虚拟DOM的方法  (核心)

![1537106219769](C:\Users\shixuewen\Desktop\vriturl_dom\虚拟DOM.assets\1537106219769.png)

**dom更新有哪些变化?**

![1537501819591](C:\Users\shixuewen\Desktop\vriturl_dom\虚拟DOM.assets\1537501819591.png)

- 增加节点	     方法：appendChild()
- 更新节点      方法：replaceChild()
- 删除节点      方法：removeChild()

核心是找到两个新旧节点的差异（差量更新）



~~~js
//$parent:父节点  newNode:新节点名称 oldNode:旧节点名称  index:当前比较的是第几个节点 
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {			//如果没有旧节点(旧DOM中不存在这个节点),就把这个新节点添加到父节点
        $parent.appendChild(
            createElement(newNode)
        );
    } else if (!newNode) {	//如果没有新节点(新DOM中这个节点没有了),就把旧节点删除
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) {  //判断当前比较的节点是否发生变化,若是更新这个节点
        $parent.replaceChild(
            createElement(newNode),
            $parent.childNodes[index]
        );
    } else if (newNode.type) {  //如果不是文本节点（文本节点是没有type的）
        updateProps(			//更新属性
            $parent.childNodes[index],
            newNode.props,
            oldNode.props
        );
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {  
            //循环子节点，递归调用updateElement()
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}

~~~

### (4)一个比较当前节点是否有变化的方法

~~~js
function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}
~~~



**设置属性的方法**

~~~js
//set props
function setProps($target, props) {		//
    props && Object.keys(props).forEach(name => {  //Object.keys()获取props对象的所有属性
        setProp($target, name, props[name]);
    });
}
function setProp($target, name, value) {
    if (typeof value === "boolean") {
        if (value) {
            $target.setAttribute(name, value);
            $target[name] = true;
        } else {
            $target[name] = false;
        }
    } else {
        $target.setAttribute(name, value);
    }
}
function removeProp($target, name, value) {
    if (typeof value === "boolean") {
         $target.removeAttribute(name);
         $target[name] = false;
    } else {
        $target.removeAttribute(name);
    }
}
function updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}
function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}

~~~

### (5)测试

创建index.html,,,引入实现虚拟dom的js代码

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>fed123 - vdom</title>
</head>
<body>
    <div id="content"></div>
    <script src="./node.js"></script>
</body>
</html>
~~~

在js中更新虚拟dom,查看结果

~~~js
let content = document.querySelector("#content")
updateElement(content, vdom);
setTimeout(() => {
    updateElement(content, vdom1, vdom);
}, 3000)
~~~

## 4.虚拟DOM总结

虚拟的DOM的核心思想是：对复杂的文档DOM结构，提供一种方便的工具，进行最小化地DOM操作。

~~~
(1) 提供一种方便的工具，使得开发效率得到保证
(2) 保证最小化的DOM操作，使得执行效率得到保证
~~~

