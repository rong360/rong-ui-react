---
title: Toast 提示
order: 3
group:
  title: 弹窗
---


### 组件引入
```js
import { Toast } from 'rong-ui-react';
```

### 调用方式
直接使用Toast.create({options})

```js
Toast.create('长文本形式为文字超过十个时使用，宽度固定')
```

### API
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:- |:- |:- |:-  |:- |
| content | 内容 | ReactNode| | |
| type | icon类型 | String| long/positive/negetive | long |
| time | 时长 | number| | 2000 |
| callback | 回调 | function  | | |


### Method
* Toast.positive('')
* Toast.negetive('')


### 全局配置Toast
```js
import { Toast } from 'rong-ui-react';

Toast.config({ time: 3000 })
```



#### 默认
```js
Toast.create('长文本形式为文字超过十个时使用，宽度固定')
```


#### 积极文案（type="positive"）
```js
Toast.positive('积极文案不超过十个字')

or

Toast.create({
  content: '消极文案不超过十个字',
  type: 'positive'
})
```


#### 积极文案（type="negetive"）
```js
Toast.negetive('消极文案不超过十个字')

or

Toast.create({
  content: '消极文案不超过十个字',
  type: 'negetive'
})
```


#### 消失时回调
```js
Toast.create({
  content: '消失时回调，出alert',
  callback () {
    alert(0)
  }
})
```

### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
