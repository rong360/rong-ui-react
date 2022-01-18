---
title: Titlebar 标题
order: 1
group:
  title: 通用
  order: 2
---

### 组件引入
```js
import { Titlebar } from 'rong-ui-react';
```

### 调用方式
```js
const title = useMemo(() => `标题${age}`, [age])
const r = useMemo(() => <strong>home</strong>, [])
const backArrowStyle = useMemo(() => ({ color: '#333' }), [])
const onBack = useCallback((e) => { }, [])

<Titlebar>Titlebar</Titlebar>

or

<Titlebar
  theme='a'
  title={title}
  r={r}
  showBackto={true}
  onBack={onBack}
  backArrowStyle={backArrowStyle}
/>
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:----------  |:-------- |
| title  | 标题文案   | ReactNode   |   | |
| theme  | 标题栏背景主题    | string   | `a` `b` `c` `d` `e` `f` | `a` |
| showBackto  | 是否显示返回按钮    | Boolean   |  | true  |
| backArrowStyle  | 箭头自定义样式    | CSSProperties   | |  |
| l  | 左侧插槽   | ReactNode   |   | |
| r  | 右侧插槽   | ReactNode   |   | |
| onBack  | 点击返回按钮回调    | function   | |  |


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
