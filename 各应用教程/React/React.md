# React

#### React的使用方法

+ 方法一：在官网 <http://facebook.github.io/react/> 下载最新版。 



+ 方法二：你也可以直接使用W3Cschool教程的 React CDN 库，地址如下： 

  ~~~html
  <script src="//www.w3cschool.cn/statics/assets/react/react.min.js"></script>
  <script src="//www.w3cschool.cn/statics/assets/react/react-dom.min.js"></script>
  <script src="//www.w3cschool.cn/statics/assets/react/babel.min.js"></script>
  
  ~~~

**实例解析：**

实例中我们引入了三个库： react.min.js 、react-dom.min.js 和 babel.min.js：

+ react.min.js    --React 的核心库
+ react-dom.min.js  --提供与DOM相关的功能
+ babel.min.js   --Babel可以将ES6代码转为ES5代码，这样我们就能在目前不支持ES6浏览器上执行 React 代码。

![1536926445051](C:\Users\RANJIA~1\AppData\Local\Temp\1536926445051.png)

---

#### HTML Parse: 

html parser是一个纯的java写的html解析的库，它不依赖于其它的java库文件，主要用于改造或提取html。它能超高速解析html，而且不会出错。

#### CSS Parse:

Webkit CSS 解析器 



##### 什么是DOM树

HTML DOM 将 HTML 文档视作树结构。这种结构被称为**节点树**



## 创建DOM树

- 一旦浏览器接收到一个HTML文件，渲染引擎（`render engine`）就开始解析它，并根据HTML元素（`elements`）一一对应地生成DOM 节点（`nodes`），组成一棵DOM树。

## 创建渲染树

- 同时，浏览器也会解析来自外部CSS文件和元素上的inline样式。通常浏览器会为这些样式信息，连同包含样式信息的DOM树上的节点，再创建另外一个树，一般被称作渲染树（`render tree`）

## 创建渲染树背后的故事

- WebKit内核的浏览器上，处理一个节点的样式的过程称为`attachment`。DOM树上的每个节点都有一个`attach`方法，它接收计算好的样式信息，返回一个`render`对象（又名`renderer`）
- **Attachment的过程是同步的，新节点插入DOM树时，会调用新节点的attach方法。**
- 构建渲染树时，由于包含了这些`render`对象，每个`render`对象都需要计算视觉属性（`visual properties`）；这个过程通过计算每个元素的样式属性来完成。

## 布局 `Layout` 

又被简称为`Reflow`[2]

- 构造了渲染树以后，浏览器引擎开始着手布局（`layout`）。布局时，渲染树上的每个节点根据其在屏幕上应该出现的精确位置，分配一组屏幕坐标值。

## 绘制 `Painting` 

- 接着，浏览器将会通过遍历渲染树，调用每个节点的`paint`方法来绘制这些render对象。`paint`方法根据浏览器平台，使用不同的UI后端API（`agnostic UI backend API`）。
   通过绘制，最终将在屏幕上展示内容。

 

 #### 再来看Virtual DOM

好啦，现在你已经简单过了一遍浏览器引擎的渲染流程，你可以看到，从创建渲染树，到布局，一直到绘制，只要你在这过程中进行一次DOM更新，整个渲染流程都会重做一遍。尤其是创建渲染树，它需要重新计算所有元素上的所有样式。

在一个复杂的单页面应用中，经常会涉及到大量的DOM操作，这将引起多次计算，使得整个流程变得低效，这应该尽量避免。

Virtual DOM这个抽象层真正的闪光点正在于此：每当你想对视图进行一次更新，那些本该直接作用于真实DOM的改动，都会先作用于Virtual DOM，然后再将要改动的部分通知到真实DOM。这样可以大幅减少DOM操作带来的重计算步骤。

 

 #### Vue和React对比

##### Vue的优势

+ 模板和渲染函数的弹性选择
+ 简单的语法及项目创建
+ 更快的渲染速度和更小的体积

##### React的优势

+ 更适用于大型应用和更好的可测试性 
+ 同时适用于Web端和原生App 
+ 更大的生态圈带来的更多支持和工具 

#### 相通之处

+ 利用虚拟DOM实现快速渲染
+ 轻量级
+ 响应式组件
+ 易于集成路由工具，打包工具以及状态管理工具
+ 优秀的支持和社区

## 一.React的使用

#### 将元素渲染到 DOM 中

##### 元素是构成 React 应用的最小单位，它用于描述屏幕上输出的内容。 



首先我们在一个 HTML 页面中添加一个 id="example" 的 <div>:

~~~html
<div id="example"></div> //根DOM节点
~~~

##### 要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上： 

~~~js
const element = <h1>Hello, world!</h1>;
ReactDOM.render(
    element,
    document.getElementById('example')
);
~~~

##### 以上代码将一个 h1 标题，插入 id="example" 节点中

#### 更新元素渲染

##### React元素都是不可变的，当元素被创建之后，你是无法改变其内容或属性。

目前更新界面的唯一办法是创建一个新的元素，然后将它传入 `ReactDOM.render()` 方法： 

~~~html
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
~~~

以上实例通过 `setInterval() `方法，每秒钟调用一次` ReactDOM.render()`。 

我们可以将要展示的部分封装起来，以下实例用一个函数来表示： 

~~~html
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
 
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
~~~

##### 除了函数外我们还可以创建一个 React.Component 的 ES6 类，该类封装了要展示的元素，需要注意的是在 render() 方法中，需要使用 this.props 替换 props： 

~~~html
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
~~~

#### React 只会更新必要的部分

​	值得注意的是React DOM 首先会比较元素内容先后的不同，而在渲染的过程中只会更新改变了部分



## 注意

如果我们需要使用 JSX，则 <script> 标签的 type 属性需要设置为 text/babel。

### 什么是jsx

+ React 使用 JSX 来替代常规的 JavaScript。 

+ JSX 是一个看起来很像 XML `指可扩展标记语言（*EX*tensible *M*arkup *L*anguage）`的 JavaScript 语法扩展。 

   + XML 与 HTML 的主要差异

      +	XML 不是 HTML 的替代。 
      		XML 和 HTML 为不同的目的而设计： 
      	​	XML 被设计为传输和存储数据，其焦点是数据的内容。 
      	​	HTML 被设计用来显示数据，其焦点是数据的外观。 
      	​	HTML 旨在显示信息，而 XML 旨在传输信息。 

  +   没有任何行为的XML，XML是不作为的

      + 也许这有点难以理解，但是 XML 不会做任何事情。XML 被设计用来结构化、存储以及传输信息。 

      + 下面是 John 写给 George 的便签，存储为 XML： 

        ~~~html
        <note>
        <to>George</to>
        <from>John</from>
        <heading>Reminder</heading>
        <body>Don't forget the meeting!</body>
        </note>
        ~~~

        上面的这条便签具有自我描述性。它拥有标题以及留言，同时包含了发送者和接受者的信息。 

         但是，这个 XML 文档仍然没有做任何事情。它仅仅是包装在 XML 标签中的纯粹的信息。我们需要编写软件或者程序，才能传送、接收和显示出这个文档。 

+ 我们不需要一定使用 JSX，但它有以下优点： 

  + JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化。
  + 它是类型安全的，在编译过程中就能发现错误。
  + 使用 JSX 编写模板更加简单快速。

 ## 使用JSX

#####JSX看起来类似HTML，我们可以看下实例

 ~~~html
ReactDOM.render(
    <h1>Hello,world!</h1>,
    document,getElementById('example');
);
 ~~~

 h1元素标签就会被渲染到example根DOM节点上  

我们可以在以上代码中嵌套多个 HTML 标签，需要使用一个 div 元素包裹它，多个元素有且只有一个父节点。

~~~html

ReactDOM.render(
    <div>
        <h1>我是谁</h1>
        <h2>你是 React</h2>
        <p>这是一个很不错的 JavaScript 库!</p>
    </div>
    ,
    document.getElementById('example')
);
~~~

## 不使用JSX

~~~jsx
var child1 =  React.createElement('h1',null,'我是谁');
var child2 =  React.createElement('h2',null,'你是 React');
var child3 =  React.createElement('p',null,'这是一个很不错的 JavaScript 库!');
var content = React.createElement('div', { className: 'teststyle' }, [child1, child2,child3]);	
ReactDOM.render(
   content,
    document.getElementById('example')
);
~~~

**下面写个实例感受一下**：

~~~~jsx
//JSX写法

class Hello extends React.Compent {
    render() {
        return <div>Hello,{this.props.haha}</div>
    }
}

ReactDOM.render(
	<Hello haha='world'>,
    document.getElementById('app');
)
~~~~

~~~jsx
//转化为原生js后的写法

class Hello extends React.Component {
    render() {
        return React.createElement('div',null,`Hello,${this.props.haha}`)
	}
}

ReactDOM.render(
	React.createElement('Hello',{haha:'world'},null);
    document.getElementById(‘app’)
)
~~~





#### 独立文件

React JSX 代码可以放在一个独立文件上，例如我们创建一个 `helloworld_react.js` 文件，代码如下： 

~~~js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
~~~

然后在 HTML 文件中引入该 JS 文件： 

~~~html
<body>
  <div id="example"></div>
<script type="text/babel" src="helloworld_react.js"></script>
</body>
~~~



 #### JavaScript

我们可以在 JSX 中使用 JavaScript 表达式。表达式写在花括号 **{}** 中。实例如下： 

~~~js
ReactDOM.render(
    <div>
      <h1>{1+1}</h1>
    </div>
    ,
    document.getElementById('example')
);
~~~

在 JSX 中不能使用 **if else** 语句，但可以使用 **conditional (三元运算)** 表达式来替代。以下实例中如果变量 **i** 等于 **1** 浏览器将输出 **true**, 如果修改 i 的值，则会输出 **false**. 

~~~js
var i = 1;
ReactDOM.render(
<div>
  <h1>{i == 1 ? 'True!' : 'False'}</h1>
</div>
,
document.getElementById('example')
);
~~~

#### 样式

React 推荐使用内联样式。我们可以使用 `camelCase(驼峰命名法) `语法来设置内联样式. React 会在指定元素数字后自动添加 **px** 。 

 ~~~jsx
var myStyle = {
    fontSize: 100,
    color: '#FF0000'
};
ReactDOM.render(
    <h1 style = {myStyle}>菜鸟教程</h1>,
    document.getElementById('example')
);
 ~~~

#### 注释

注释需要写在花括号中，实例如下： 

~~~jsx
ReactDOM.render(
    <div>
        <h1>菜鸟教程</h1>
        {/*注释...*/}
     </div>,
    document.getElementById('example')
);
~~~

#### 数组

JSX 允许在模板中插入数组，数组会自动展开所有成员： 

~~~jsx
var arr = [
  <h1>hello,world</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
  <h3>学的不仅是技术，更是梦想！</h3>,
  <h3>学的不仅是技术，更是梦想！</h3>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
~~~



 ## React 组件

##### 定义一个组件

**方法一**

接下来我们封装一个组件(函数方法)

~~~js
//使用函数定义了一个组件
function HelloMessage(props) {
    return <h1>Hello World!</h1>;
}
//把组件赋值给一个元素
const element = <HelloMessage />;

//ReactDOM.render() 方法调用元素并渲染
ReactDOM.render(
    element,
    document.getElementById('example')
);
~~~

**方法二**

使用 ES6 class 来定义一个组件: 

~~~js
class Welcome extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}
~~~



#### 复合组件

我们可以通过创建多个组件来合成一个组件，即把组件的不同功能点进行分离。

以下实例我们实现了输出网站名字和网址的组件：

~~~js
function Name(props) {
    return <h1>网站名称：{props.name}</h1>;
}
function Url(props) {
    return <h1>网站地址：{props.url}</h1>;
}
function Nickname(props) {
    return <h1>网站小名：{props.nickname}</h1>;
}
function App() {
    return (
    <div>
        <Name name="你是谁？" />
        <Url url="http://www.baidu.com" />
        <Nickname nickname="baidu" />
    </div>
    );
}
 
ReactDOM.render(
     <App />,
    document.getElementById('example')
);
~~~

## React State(状态)

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。 

React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。 

现在是一个静态的时钟，数据没有实时更新

~~~js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);
~~~

接下来，我们将使Clock设置自己的计时器并每秒更新一次。 

#### 将生命周期方法添加到类中

在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。 

~~~js
class Clock extends React.Component {
  constructor(props) {
    super(props); //如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;  如果你在constructor中要使用this.props,就必须给super加参数：super(props)；
    this.state = {date: new Date()};
  }
 //挂载函数（生命周期函数钩子）
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),  
      1000
    );
  }
 //卸载函数（生命周期函数钩子）
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);
~~~

##### 代码执行顺序

+ 1. 当 `<Clock />` 被传递给 `ReactDOM.render()` 时，React 调用 `Clock` 组件的构造函数。 由于 `Clock` 需要显示当前时间，所以使用包含当前时间的对象来初始化 `this.state` 。 我们稍后会更新此状态。 
  2. React 然后调用 `Clock` 组件的 `render()` 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 `Clock` 的渲染输出。 
  3. 当 `Clock` 的输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子。 在其中，`Clock` 组件要求浏览器设置一个定时器，每秒钟调用一次 `tick()`。 
  4. 浏览器每秒钟调用 `tick()` 方法。 在其中，`Clock` 组件通过使用包含当前时间的对象调用 `setState()` 来调度UI更新。 通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()`方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新 DOM。 
  5. 一旦 `Clock` 组件被从 DOM 中移除，React 会调用 `componentWillUnmount()` 这个钩子函数，定时器也就会被清除 



