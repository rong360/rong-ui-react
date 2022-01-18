---
title: FlexFixed 固定
order: 1
group:
  title: 布局
  order: 3
---

### 组件引入
```js
import { Flexfixed } from 'rong-ui-react';
```

### 调用方式
```js
return <FlexFixed>content</FlexFixed>
```


### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:----------  |:-------- |
| className  | 自定义 CSS class    | string   | |  |
| header  | 页头 | ReactNode |  |  |
| footer  | 页尾 | ReactNode |  |  |
| extra  | 额外插槽</br>位置在footer之后 | ReactNode |  |  |
| onScroll  | 页面滚动回调    | function({scrollTop, maxScrollTop, direction})  |  |   |
| onScrollDebounce  | 页面滚动停止之后回调 | function({scrollTop, maxScrollTop, direction})   | |  |
| hideFooterOnKeyboardShow  | 键盘弹起之后隐藏footer   | boolean   |   | true |


### 特别提示
<Alert type="warning">
  嵌套overflow-x:scroll 或 overflow-y:scroll滚动元素时需在滚动元素上添加scroll-area样式，如：
</Alert>

```html
<div style="overflow-x:scroll" class="scroll-area"></div>
```


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
