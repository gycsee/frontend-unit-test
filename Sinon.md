# Sinon

> Standalone test spies, stubs and mocks for JavaScript. Works with any unit testing framework

Sinon.js是个测试辅助工具，在为Node程序写测试时可能可以派上用场。 在测试领域有这么几个基本名词：spy, stub, mock，这三个概念都是测试所用到的手段。Sinon.js就提供了相应的工具来实现这三种测试手段。

---

## 目录

- [Sinon](#sinon)
  - [目录](#%e7%9b%ae%e5%bd%95)
  - [spy](#spy)
  - [stub](#stub)
  - [mock](#mock)
  - [all api](#all-api)

## spy

spy的作用在于可以监视一个函数被调用的情况。spy相当于给我们感兴趣的函数加了一层wrapper，于是记录下了这个函数被调用过几次，每次传入的参数是什么以及每次返回的结果是什么，或是抛出了怎样的异常。

```js
var sinon = require("sinon");

// 三种方式
var spy = sinon.spy();
var spy = sinon.spy(myFunc);
var spy = sinon.spy(object, "method");

sinon.spy(crawler, "launch"); // 监视crawler.launch，这是个function

// 对crawler.launch进行调用

crawler.launch.callCount > 1; // 该函数的调用次数
crawler.launch.withArgs("...").calledOnce; // 该函数是否以...参数调用过一次

crawler.launch.restore(); // 消除监视(测完换回去)
```

---

## stub

> stub 其实就是有着预定义行为的 spy，支持所有 spy 的 api， 区别就是当它替换一个已知函数时原函数不会执行

测试中有可能遇到这样的情形：测试函数f1，f1依赖于函数f2，我们需要测试f1在f2的不同表现之下有怎样的表现。但是让f2有不同的表现可能会很不容易，有可能需要复杂的配置或是精巧的捏造，或是f2出现某种表现的几率很小等等。这时stub就可派上用场，stub就是人为设定的f2的替代品。我们可以设定stub在怎样的输入下有怎样特定的表现，从而不再阻碍对f1的测试。

```js
var sinon = require("sinon");

var stub = sinon.stub(); // 创建一个stub
var stub = sinon.stub(ab, "f"); // 将ab.f替换成一个stub，使用完毕后需要调用stub.restore()或ab.f.restore()来复原
var stub = sinon.stub(ab, "f"， function(...) {...}); // 将ab.f替换成指定的函数

stub.returns(10);
stub(); // stub()总是返回10

stub.throws("...");
stub(); // stub()总是抛出"..."

stub.withArgs(1).returns(10);
stub(1); // stub(1)会返回10

stub.restore();
```

---

## mock

> Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations.

mock在Sinon.js中用于对一个object的活动进行监视。一个object被mock以后，就可以设定我们对这个object有怎样的预期。这里的预期例如：某方法被调用了多少次（或至少至多多少次）、某方法一定没被调用、某方法被输入怎样的参数来调用、等等。可以看出mock对一个object的监视类似于spy对一个函数的监视。两者的关键区别在于使用场景，spy客观地监视了一个函数的表现，对这个函数的调用都真正执行了。而mock出的object收到了数据或是调用并没有真正执行，一切针对mock的调用都是假的。所以mock可以用来测试具有side effect的函数，这里的side effect泛指和外部对象有数据交互或者是调用，比如调用外部对象的方法、向server发送数据、和UI对象有交互、写日志等等。

```js
var sinon = require("sinon");

var obj = {
  ...
};

var mock = sinon.mock(obj); // Does not change the object, but returns a mock object to set expectations on the object’s methods
mock.expect("f").atLeast(2).withArgs(10); // obj.f(10)调用至少出现过2次

...

mock.verify(); // 测试此时的obj是否满足上面的mock设定条件
mock.restore();

// Typical usage of expectation
sinon.mock(jQuery).expects("ajax").atLeast(2).atMost(5);
jQuery.ajax.verify();
```

## all api

- General setup
- Fakes
- Spies
- Stubs
- Mocks
- Spy calls
- Fake timers
- Fake XHR and server
- JSON-P
- Assertions
- Matchers
- Sandboxes
- Utils
