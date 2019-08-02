# Jest 入门

Jest 是 Facebook 出品的一个测试框架，相对其他测试框架，其一大特点就是就是内置了常用的测试工具，比如自带断言、测试覆盖率工具，实现了开箱即用

而作为一个面向前端的测试框架， Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见框架的自动测试。

此外， Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度。

## 目录

- [Jest 入门](#jest-%e5%85%a5%e9%97%a8)
  - [目录](#%e7%9b%ae%e5%bd%95)
  - [结构](#%e7%bb%93%e6%9e%84)
  - [安装](#%e5%ae%89%e8%a3%85)
  - [基本使用](#%e5%9f%ba%e6%9c%ac%e4%bd%bf%e7%94%a8)
    - [用例的表示](#%e7%94%a8%e4%be%8b%e7%9a%84%e8%a1%a8%e7%a4%ba)
    - [用例的预处理或后处理](#%e7%94%a8%e4%be%8b%e7%9a%84%e9%a2%84%e5%a4%84%e7%90%86%e6%88%96%e5%90%8e%e5%a4%84%e7%90%86)
    - [测试异步代码](#%e6%b5%8b%e8%af%95%e5%bc%82%e6%ad%a5%e4%bb%a3%e7%a0%81)
  - [全局变量](#%e5%85%a8%e5%b1%80%e5%8f%98%e9%87%8f)
  - [断言](#%e6%96%ad%e8%a8%80)
  - [Mock Functions](#mock-functions)
    - [mockFn.mock.calls](#mockfnmockcalls)
    - [Mock Return Values](#mock-return-values)
  - [The Jest Object](#the-jest-object)
    - [Timer Mocks](#timer-mocks)

## 结构

```js
--describe //作用域
  --test //测试用例
    --expect // 断言
```


## 安装

```js
yarn add --dev jest
```

```js
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

## 基本使用

### 用例的表示

表示测试用例是一个测试框架提供的最基本的 API ， Jest 内部使用了 Jasmine 2 来进行测试，故其用例语法与 Jasmine 相同。test()函数来描述一个测试用例

```js
// hello.test.js
let hello = require('hello.js')

test('should get "Hello world"', () => {
    expect(hello()).toBe('Hello world') // 测试成功
    // expect(hello()).toBe('Hello') // 测试失败
})
```

其中toBe('Hello world')便是一句断言, Jest 管它叫 “matcher”

### 用例的预处理或后处理

测试文件中所有的用例进行统一的预处理，可以使用 beforeAll() 函数；而如果想在每个用例开始前进行都预处理，则可使用 beforeEach() 函数。至于后处理，也有对应的 afterAll() 和 afterEach() 函数

如果只是想对某几个用例进行同样的预处理或后处理，可以将先将这几个用例归为一组。使用 describe() 函数即可表示一组用例，再将上面提到的四个处理函数置于 describe() 的处理回调内，就实现了对一组用例的预处理或后处理

```js
describe('test testObject', () => {
  beforeAll(() => {
      // 预处理操作
  })

  test('is foo', () => {
      expect(testObject.foo).toBeTruthy()
  })

  test('is not bar', () => {
      expect(testObject.bar).toBeFalsy()
  })

  afterAll(() => {
      // 后处理操作
  })
})
```

### 测试异步代码

Callback

```js
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```

Promises

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

Async/Await

```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```

## 全局变量

每一个测试文件中，Jest 会将下面方法和对象注册到全局环境中，可直接使用

* afterAll(fn, timeout)
* afterEach(fn, timeout)
* beforeAll(fn, timeout)
* beforeEach(fn, timeout)
* describe(name, fn)
* describe.each(table)(name, fn, timeout)
* describe.only(name, fn)
* describe.only.each(table)(name, fn)
* describe.skip(name, fn)
* describe.skip.each(table)(name, fn)
* test(name, fn, timeout)
* test.each(table)(name, fn, timeout)
* test.only(name, fn, timeout)
* test.only.each(table)(name, fn)
* test.skip(name, fn)
* test.skip.each(table)(name, fn)
* test.todo(name)

## 断言

expect(value)
expect.extend(matchers)
expect.anything()
expect.any(constructor)
expect.arrayContaining(array)
expect.assertions(number)
expect.hasAssertions()
expect.not.arrayContaining(array)
expect.not.objectContaining(object)
expect.not.stringContaining(string)
expect.not.stringMatching(string | regexp)
expect.objectContaining(object)
expect.stringContaining(string)
expect.stringMatching(string | regexp)
expect.addSnapshotSerializer(serializer)
.not
.resolves
.rejects
.toBe(value)
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
.toHaveReturned()
.toHaveReturnedTimes(number)
.toHaveReturnedWith(value)
.toHaveLastReturnedWith(value)
.toHaveNthReturnedWith(nthCall, value)
.toHaveLength(number)
.toHaveProperty(keyPath, value?)
.toBeCloseTo(number, numDigits?)
.toBeDefined()
.toBeFalsy()
.toBeGreaterThan(number)
.toBeGreaterThanOrEqual(number)
.toBeLessThan(number)
.toBeLessThanOrEqual(number)
.toBeInstanceOf(Class)
.toBeNull()
.toBeTruthy()
.toBeUndefined()
.toBeNaN()
.toContain(item)
.toContainEqual(item)
.toEqual(value)
.toMatch(regexpOrString)
.toMatchObject(object)
.toMatchSnapshot(propertyMatchers?, hint?)
.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
.toStrictEqual(value)
.toThrow(error?)
.toThrowErrorMatchingSnapshot(hint?)
.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)

自定义断言

```js
// 定义
expect.extend({
  yourMatcher(x, y, z) {
    return {
      pass: true,
      message: () => '',
    };
  },
});

// 使用
expect(x).yourMatcher(y, z);
expect(x).not.yourMatcher(y, z);
```

除此之后还有一些基于 Mock Function 的断言

```js
// The mock function was called at least once
expect(mockFunc).toBeCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toBeCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).lastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
```

## Mock Functions

> 模拟函数可以通过擦除函数的实际实现，捕获对函数的调用（以及在这些调用中传递的参数），在使用new实例化时捕获构造函数的实例，并允许测试时间来轻松测试代码之间的链接，返回值的配置。
> 模拟函数有两种方法：通过创建在测试代码中使用的模拟函数，或编写手动模拟来覆盖模块依赖项。

mockFn.getMockName()
mockFn.mock.calls
mockFn.mock.results
mockFn.mock.instances
mockFn.mockClear()
mockFn.mockReset()
mockFn.mockRestore()
mockFn.mockImplementation(fn)
mockFn.mockImplementationOnce(fn)
mockFn.mockName(value)
mockFn.mockReturnThis()
mockFn.mockReturnValue(value)
mockFn.mockReturnValueOnce(value)
mockFn.mockResolvedValue(value)
mockFn.mockResolvedValueOnce(value)
mockFn.mockRejectedValue(value)
mockFn.mockRejectedValueOnce(value)

两个栗子🌰🌰

### mockFn.mock.calls

> 所有模拟函数都有这个特殊的.mock属性，该属性是关于如何调用函数以及保留返回函数的数据。mock属性还会跟踪每次调用的值

```js
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

### Mock Return Values

虚拟的执行结果

```js
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(filterTestFn);

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]
```

## The Jest Object

jest对象自动在每个测试文件的范围内。 jest对象中的方法有助于创建模拟并让您控制Jest的整体行为

一个栗子🌰

### Timer Mocks

```js
// timerGame.js
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```js
// __tests__/timerGame-test.js
'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

```
