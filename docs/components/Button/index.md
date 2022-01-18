---
title: Button 按钮
order: 2
group:
  title: 通用
---

### 组件引入
```js
import { Button } from 'rong-ui-react';
```


### 调用方式
```js
<Button>提交</Button>
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| type  | 按钮类型   | string   | `default` `warning` `disabled`  | `default` |
| radius  | 按钮是否有圆角    | boolean   |  | false |
| fill  | 背景是否填充    | boolean   |  | true |
| className | 自定义 CSS class | string | | |
| style  | 自定义样式    | CSSProperties   | |  |
| onClick  | 点击button回调  | function   | |  |


#### 默认
```js
const onBtnClick = useCallback((e) => {}, [])

<Button onClick={onBtnClick}>提交</Button>
```

#### 空心默认圆角按钮
```js
<Button fill={false} radius={true}>提交</Button>
```
#### 示警按钮
```js
<Button type='warning'>提交</Button>
```
#### 空心示警按钮
```js
<Button type='warning' fill={false} radius={true}>提交</Button>
```
#### 不可用按钮
```js
<Button type='disabled'>提交</Button>
```
#### 空心圆角不可用按钮
```js
<Button type='disabled' fill={false} radius={true}>提交</Button>
```
#### 自定义
如：type="dark-yellow", 样式表里定义.r--button-dark-yellow相关样式
```js
<Button type='dark-yellow'  className="custom-button" style={{color:'red'}}>提交</Button>
```

### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
