---
title: 简介
nav:
  title: 简介
  order: 1
---

# rong-ui-react

> 基于React UI组件库.


### 安装

```bash

npm install rong-ui-react --save

```


```js
import {Titlebar, Button, Modal} from 'rong-ui-react';
```

#### 按需引用

```js
npm install babel-plugin-import --save-dev

// .babelrc
{
  "plugins": [["import", {
    "libraryName": "rong-ui-react",
    "libraryDirectory": "es",
    "style": "css"
  }]]
}

or 
// package.json
"babel": {
  "plugins": [
    [
      "import",
      {
        "libraryName": "rong-ui-react",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ]
},

or
// webpack.config.js
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  options: {
    plugins: [
      ["import", {
        "libraryName": "rong-ui-react",
        "libraryDirectory": "es",
        "style": "css"
      }]
    ]
  }
}
```


### 使用

Modal提示框、Toast弹框、Loading加载中、引入后，直接使用Modal.create(options),Toast.create(options),Loading.create(options)

其他组件名均已UpperCamelCase命名

如Title标题组件，html如下：

```html

<Titlebar theme="a">Title标题</Titlebar>

```
