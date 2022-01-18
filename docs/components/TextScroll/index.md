---
title: TextScroll 文字滚动
order: 2
group:
  title: 布局
  order: 3
---


### 组件引入
```js
import { TextScroll } from 'rong-ui-react';
```

#### 调用方式
```js
<TextScroll list={list}/>
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:----------  |:-------- |
| list  | 文案列表   | Array   |   | || l  | 左侧插槽   | ReactNode   |   | |
| prepend  | scrollbar前插槽   | ReactNode   |   | |
| append  | scrollbar后插槽   | ReactNode   |   | |



#### 默认
```js
const [list] = useState([
  '让子弹飞一会儿，网络流行词，是2010年末上映的电影《让子弹飞》中的一句对白。'
])

<TextScroll list={list}/>
```

#### 插槽
```js
const [list] = useState([
  '让子弹飞一会儿，网络流行词，是2010年末上映的电影《让子弹飞》中的一句对白。'
])

<TextScroll list={list} prepend={<span style={{padding: '0 10px', color: 'red'}}>Tips:</span>}/>
```


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
