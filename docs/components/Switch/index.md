---
title: Switch 开关
order: 11
group:
  title: 数据录入
---


### 组件引入
```js
import { Switch } from 'rong-ui-react';
```


### 调用方式
```js
<Switch defaultChecked={checked} onChange={onSwitchChange} />
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| defaultChecked  | 默认勾选状态 | boolean | | false |
| disabled | 禁用 | boolean | | false |
| checkedChildren | 选中时的内容 | ReactNode | | |
| unCheckedChildren | 非选中时的内容| ReactNode | | |
| onChange | 变化时回调函数| function(checked: boolean, event: Event) | | |


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
