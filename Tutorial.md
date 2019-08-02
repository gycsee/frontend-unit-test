# 教程

> 基于 Create-react-app, Jest, Enzyme, Redux 的前端单元测试实战项目

## 目录

- [教程](#%e6%95%99%e7%a8%8b)
  - [目录](#%e7%9b%ae%e5%bd%95)
  - [项目构建](#%e9%a1%b9%e7%9b%ae%e6%9e%84%e5%bb%ba)
  - [启用测试](#%e5%90%af%e7%94%a8%e6%b5%8b%e8%af%95)
  - [编写测试用例](#%e7%bc%96%e5%86%99%e6%b5%8b%e8%af%95%e7%94%a8%e4%be%8b)
    - [基本结构](#%e5%9f%ba%e6%9c%ac%e7%bb%93%e6%9e%84)
    - [示例](#%e7%a4%ba%e4%be%8b)
  - [组件测试](#%e7%bb%84%e4%bb%b6%e6%b5%8b%e8%af%95)
    - [烟雾测试示例](#%e7%83%9f%e9%9b%be%e6%b5%8b%e8%af%95%e7%a4%ba%e4%be%8b)
    - [Enzyme](#enzyme)
    - [react-testing-library](#react-testing-library)
  - [使用第三方断言库或测试工具](#%e4%bd%bf%e7%94%a8%e7%ac%ac%e4%b8%89%e6%96%b9%e6%96%ad%e8%a8%80%e5%ba%93%e6%88%96%e6%b5%8b%e8%af%95%e5%b7%a5%e5%85%b7)
  - [初始化测试环境](#%e5%88%9d%e5%a7%8b%e5%8c%96%e6%b5%8b%e8%af%95%e7%8e%af%e5%a2%83)
  - [Debugging Tests](#debugging-tests)
    - [浏览器中 debugging](#%e6%b5%8f%e8%a7%88%e5%99%a8%e4%b8%ad-debugging)
    - [Debugging Tests in Visual Studio Code](#debugging-tests-in-visual-studio-code)
  - [测试覆盖率分析](#%e6%b5%8b%e8%af%95%e8%a6%86%e7%9b%96%e7%8e%87%e5%88%86%e6%9e%90)
  - [Snapshot Testing](#snapshot-testing)

## 项目构建

```node
yarn create react-app cra-example
```

## 启用测试

Jest will look for test files with any of the following popular naming conventions:

- Files with .js suffix in __tests__ folders.
- Files with .test.js suffix.
- Files with .spec.js suffix.

launch Jest in watch mode

```js
npm test
```

## 编写测试用例

### 基本结构

- describe() 非必须，不提倡
- it() (or test())
- expect()

### 示例

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

## 组件测试

### 烟雾测试示例

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
```

### Enzyme

> Enzyme documentation uses Chai and Sinon for assertions but you don’t have to use them because Jest provides built-in expect() and jest.fn() for spies

```js
yarn add enzyme enzyme-adapter-react-16 react-test-renderer
```

配置 src/setupTests.js

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

shallow rendering 示例

```js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});
```

full rendering 示例（use mocha and chai）

```js
import { mount } from 'enzyme';
import sinon from 'sinon';
import Foo from './Foo';

describe('<Foo />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((
      <Foo onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
```

static rendering 示例（use mocha and chai）,使用 Cheerio 遍历 dom

```js
import React from 'react';
import { render } from 'enzyme';
import PropTypes from 'prop-types';

describe('<Foo />', () => {
  it('renders three `.foo-bar`s', () => {
    const wrapper = render(<Foo />);
    expect(wrapper.find('.foo-bar')).to.have.lengthOf(3);
  });

  it('rendered the title', () => {
    const wrapper = render(<Foo title="unique" />);
    expect(wrapper.text()).to.contain('unique');
  });

  it('renders a div', () => {
    const wrapper = render(<div className="myClass" />);
    expect(wrapper.html()).to.contain('div');
  });

  it('can pass in context', () => {
    function SimpleComponent(props, context) {
      const { name } = context;
      return <div>{name}</div>;
    }
    SimpleComponent.contextTypes = {
      name: PropTypes.string,
    };

    const context = { name: 'foo' };
    const wrapper = render(<SimpleComponent />, { context });
    expect(wrapper.text()).to.equal('foo');
  });
});
```

enzyme Selectors

- A Valid CSS Selector

  - class syntax (.foo, .foo-bar, etc.)
  - element tag name syntax (input, div, span, etc.)
  - id syntax (#foo, #foo-bar, etc.)
  - attribute syntax ([href="foo"], [type="text"]
  - universal syntax (*)

- A React Component Constructor

this kind of selector only checks the component type; it ignores props and children

```js
function MyComponent() {
  return <div />;
}

// find instances of MyComponent
const myComponents = wrapper.find(MyComponent);
```

- A React Component’s displayName

its displayName is set and has its first character as a capital letter

```js
function MyComponent() {
  return <div />;
}
MyComponent.displayName = 'My Component';

// find instances of MyComponent
const myComponents = wrapper.find('My Component');
```

- Object Property Selector

```js
const wrapper = mount((
  <div>
    <span foo={3} bar={false} title="baz" />
  </div>
));

wrapper.find({ foo: 3 });
wrapper.find({ bar: false });
wrapper.find({ title: 'baz' });
```

使用 jest-enzyme 增强断言可读性

```js
yarn add jest-enzyme
```

```js
expect(wrapper).toContainReact(welcome);
```

在 src/setupTests.js 全局引入

```js
import 'jest-enzyme';
```

### react-testing-library

> As an alternative or companion to enzyme, you may consider using react-testing-library. react-testing-library is a library for testing React components in a way that resembles the way the components are used by end users. It is well suited for unit, integration, and end-to-end testing of React components and applications. It works more directly with DOM nodes, and therefore it's recommended to use with jest-dom for improved assertions.

## 使用第三方断言库或测试工具

```js
import sinon from 'sinon';
import { expect } from 'chai';
```

## 初始化测试环境

> If your app uses a browser API that you need to mock in your tests or if you just need a global setup before running your tests, add a src/setupTests.js to your project. It will be automatically executed before running your tests

模拟浏览器 localStorage

```js
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

## Debugging Tests

### 浏览器中 debugging

package.json

```js
"scripts": {
    "test:debug": "react-scripts --inspect-brk test --runInBand --no-cache"
  }
```

### Debugging Tests in Visual Studio Code

launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": [
        "test",
        "--runInBand",
        "--no-cache",
        "--watchAll=false"
      ],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

replace it() with xit() to temporarily exclude a test from being executed.
Similarly, fit() lets you focus on a specific test without running any other tests

## 测试覆盖率分析

```js
npm test -- --coverage
```

## Snapshot Testing

```js
yarn add --dev react-test-renderer
```

```js
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}
```

```js
// Link.react.test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```

```js
// __tests__/__snapshots__/Link.react.test.js.snap
exports[`Link changes the class when hovered 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 2`] = `
<a
  className="hovered"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 3`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;
```
