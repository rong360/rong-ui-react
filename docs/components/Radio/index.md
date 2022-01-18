---
title: Radio 单选框
order: 10
group:
  title: 数据录入
---


### 组件引入
```js
import { Radio } from 'rong-ui-react';
```

### 调用方式
```js
<Radio />
```
### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--------|:--------|:--------|:--------|:--------|
| className | 自定义 CSS class | string | | |
| style | 自定义样式 | CSSProperties | | |
| name | 名称 | string | | |
| value | 值 | string | | |
| defaultChecked | 初始是否选中 | boolean | | false |
| disabled | 失效状态 | boolean | | false |
| onChange | 变化时回调函数 | function(e) | | |


#### Radio Group

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--------|:--------|:--------|:--------|:--------|
| className | 自定义 CSS class | string | | |
| style | 自定义样式 | CSSProperties | | |
| name | 名称 | string | | |
| value | 值 | string | | |
| defaultChecked | 初始是否选中 | boolean | | false |
| options | 指定可选项 | array | | |
| onChange | 变化时回调函数 | function(e) | | |


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
