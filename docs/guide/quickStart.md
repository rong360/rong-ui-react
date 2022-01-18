---
title: 快速上手
---

# 第一个例子

> 基于React UI组件库.

```js
import React from "react";
import ReactDOM from "react-dom";
import {Button, Modal } from "rong-ui-react";
import "./index.css";

const onBtnClick = () => {
  Modal.create('Hello')
}

ReactDOM.render(
  <div className="App">
    <h1>Modal弹窗</h1>
    <Button style={{ marginLeft: 8 }} onClick={onBtnClick}>
      Primary Button
    </Button>
  </div>,
  document.getElementById("root")
);
```
