---
title: Loading 加载中
order: 2
group:
  title: 弹窗
---

### 组件引入
```js
import { Loading } from 'rong-ui-react';
```

### 调用方式
直接使用Modal.create({options})

```js
let loading = Loading.create()

setTimeout(() => loading.remove(), 2000)
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:- |:- |:- |:-  |:- |
| icon | 图标 | ReactNode| | |
| text | 文字 | ReactNode| | |
| textStyle | 文字样式 | CSSProperties  | | |


### Method
* loading.remove()
* loading.update({text: ''})


### 全局配置Loaing icon

```js
import { Loading } from 'rong-ui2';

Loading.config({
  icon: <span style={{fontSize: '45px', color: 'pink', lineHeight: '0px'}}>
    <svg viewBox="64 64 896 896"  width="1em" height="1em" fill="currentColor">
      <path d="M864 736c0-111.6-65.4-208-160-252.9V317.3c0-15.1-5.3-29.7-15.1-41.2L536.5 95.4C530.1 87.8 521 84 512 84s-18.1 3.8-24.5 11.4L335.1 276.1a63.97 63.97 0 00-15.1 41.2v165.8C225.4 528 160 624.4 160 736h156.5c-2.3 7.2-3.5 15-3.5 23.8 0 22.1 7.6 43.7 21.4 60.8a97.2 97.2 0 0043.1 30.6c23.1 54 75.6 88.8 134.5 88.8 29.1 0 57.3-8.6 81.4-24.8 23.6-15.8 41.9-37.9 53-64a97 97 0 0043.1-30.5 97.52 97.52 0 0021.4-60.8c0-8.4-1.1-16.4-3.1-23.8H864zM762.3 621.4c9.4 14.6 17 30.3 22.5 46.6H700V558.7a211.6 211.6 0 0162.3 62.7zM388 483.1V318.8l124-147 124 147V668H388V483.1zM239.2 668c5.5-16.3 13.1-32 22.5-46.6 16.3-25.2 37.5-46.5 62.3-62.7V668h-84.8zm388.9 116.2c-5.2 3-11.2 4.2-17.1 3.4l-19.5-2.4-2.8 19.4c-5.4 37.9-38.4 66.5-76.7 66.5-38.3 0-71.3-28.6-76.7-66.5l-2.8-19.5-19.5 2.5a27.7 27.7 0 01-17.1-3.5c-8.7-5-14.1-14.3-14.1-24.4 0-10.6 5.9-19.4 14.6-23.8h231.3c8.8 4.5 14.6 13.3 14.6 23.8-.1 10.2-5.5 19.6-14.2 24.5zM464 400a48 48 0 1096 0 48 48 0 10-96 0z"></path>
    </svg>
  </span>
})
```

#### 默认
```js
let loading = Loading.create()

setTimeout(() => loading.remove(), 3000)
```


#### 添加文案
```js
let loading = Loading.create({ text: '灰太狼快跑' })

setTimeout(() => loading.remove(), 3000)
```

#### 倒计时
```js
let count = 3
let loading = Loading.create({ text: `${count}s` })
let timer = setInterval(() => {
	count--
	if (count === 0) {
		clearInterval(timer)
		loading.remove()
	} else {
		loading.update({ text: `${count}s` })
	}
}, 1000);
```


#### 改变大小、颜色、文字等
```js
let loading = Loading.create({ text: 'Hello World，disappear in 3', textStyle: { color: '#e0a711'}})

setTimeout(() => loading.remove(), 3000)
```

#### 自定义loading
```js
let loading = Loading.create({
	icon: <span style={{ fontSize: '45px', color: 'yellow', lineHeight: '0px' }}>
		<svg viewBox="64 64 896 896" data-icon="smile" width="1em" height="1em" fill="currentColor">
			<path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path>
		</svg>
	</span>,
	text: 'Hello'
})

setTimeout(() => loading.remove(), 3000)
```

### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
