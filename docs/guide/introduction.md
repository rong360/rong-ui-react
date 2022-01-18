---
title: 简介
nav:
  title: 简介
  order: 1
---

# rong-ui-react

> 基于React UI组件库.


## 示例

#### 链接

[点击链接查看示例](https://rong360.github.io/rong-ui-react/demo/index.html)

#### 扫描二维码体验

<img :src="$withBase('/images/ewm.png')" />

## 使用说明

### 安装

```bash

npm install rong-ui-react --save

```

### 引入

```js
import {Titlebar, Button, Modal} from 'rong-ui-react';
```

#### 按需引用

```js
npm install babel-plugin-import --save-dev

// .babelrc
{
  "plugins": [["import", {
    "libraryName": "rong-ui-react"
  }]]
}

or
// webpack.config.js
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  options: {
    plugins: [
      ["import", {
        "libraryName": "rong-ui-react"
      }]
    ]
  }
}

注意：项目需要安装less文件：
npm install less less-loader --save-dev （低版本可以用less@^2.7.2 less-loader@^4.0.3）
```


### 使用

Modal提示框、Toast弹框、Loading加载中、引入后，直接使用Modal.create(options),Toast.create(options),Loading.create(options)

其他组件名均已UpperCamelCase命名

如Title标题组件，html如下：

```html

<Titlebar theme="a">Title标题</Titlebar>

```
