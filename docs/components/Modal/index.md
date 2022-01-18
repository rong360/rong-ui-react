---
title: Modal 对话框
order: 1
group:
  title: 弹窗
  order: 1
nav:
  title: 组件
  order: 2
---


### 组件引入

```js
import { Modal } from 'rong-ui-react';
```


### 调用方式
1、直接使用Modal.create({options})

```js
Modal.create('风吹柳花满店香，吴姬压酒劝客尝')

or

Modal.create({
    content: <span>生如夏花之绚烂，死如秋叶之静美<br />泰戈尔《生如夏花》</span>
})
```


2、template模板中插入Modal
```js
const [visible, setVisible] = useState(false)
const [visible2, setVisible2] = useState(false)

return (
    <div>
      <Modal content={<Hello />} onConfirm={function () { setVisible(false) }} visible={visible} ><input /></Modal>
      <Modal target={document.getElementById('modal')} onConfirm={function () { setVisible2(false) }} visible={visible2} ><input /></Modal>
    </div>
  )
```


### API

| 参数 | 说明    | 类型      | 可选值       | 默认值   |
|:- | :- | :- |:- |:-|
| title  | 标题  | ReactNode   |  |  |
| titleStyle  | 标题样式 | CSSProperties   |  |  |
| showClose  | 是否显示关闭按钮| boolean   | | false |
| closeStyle  | 标题样式 | CSSProperties   |  |  |
| content  | 弹框内容  | ReactNode | |  |
| contentStyle  | 内容样式 | CSSProperties   |  |  |
| showCancel  | 是否显示取消按钮| boolean   |  | true |
| cancelText  | 取消按钮文字| ReactNode   | | 取消 |
| cancelStyle  | 取消按钮样式| CSSProperties   |  | |
| showConfirm  | 是否显示确认按钮| boolean   | | true |
| confirmText  | 确认按钮文字| ReactNode   |  | 确认 |
| confirmStyle  | 确认按钮样式    | CSSProperties   |  |  |
| cliperStyle  | 遮罩样式    | CSSProperties   |  |  |
| dlgStyle  | 弹框样式    | CSSProperties   |  |  |
| position  | 弹框位置    | object   |x:left/center/right<br/>y:top/center/bottom| {x: 'center', y: 'center'} |
| removeModalOnHashChange | hash变化时是否移除dialog | boolean |  | true |
| className | 自定义样式 | string | | |
| onCancel  | 点击取消回调 | function | | |
| onConfirm  | 点击确认回调 | function | | |
| onClose  | 点击右上角关闭回调 | function | | |
| --- |  |  | | |
| target | 指定 Modal 挂载的 HTML 节点 | HTMLElement | | document.getElementById<br/>('portal-target')|
| visible | 对话框是否可见<br/><font size=1 color='red'>(仅模板插入Modal时可用)</font> | boolean | | |


### Method
* modal.remove()


### 特别提示
<Alert type="warning">
  弹框里插入滚动区域时，需在滚动区域上添加"scroll-area"样式，如:
</Alert>

```html
<div class="scroll-area"></div>
```


#### 常规
```js
Modal.create('风吹柳花满店香，吴姬压酒劝客尝')

or

Modal.create({
 content: <span>生如夏花之绚烂，死如秋叶之静美<br />泰戈尔《生如夏花》</span>
})

or

Modal.create({
    content: <span>生如夏花之绚烂，死如秋叶之静美<br />泰戈尔《生如夏花》</span>,
    onCancel () {
        console.log('打点')
        this.remove()
    },
    onConfirm () {
        console.log('打点')
        this.remove()
    }
})

or

const modal = Modal.create({
    content: <span>生如夏花之绚烂，死如秋叶之静美<br />泰戈尔《生如夏花》</span>,
})
setTimeout(() => modal.remove(), 3000)
```


#### 所有配置项
```js
Modal.create({
    // 标题
    title: '标题',
    titleStyle: { color: 'green' },
    // 右上角关闭按钮
    showClose: true,
    onClose (e) {
    this.remove()
    },
    // 内容
    content: <Hello />,
    contentStyle: {},
    // 取消按钮
    showCancel: true,
    cancelText: <strong>cancel</strong>,
    cancelStyle: { color: 'red' },
    onCancel () {
    this.remove()
    },
    // 确认按钮
    showConfirm: true,
    confirmText: 'confirm',
    confirmStyle: { color: 'blue' },
    onConfirm () {
    this.remove()
    },
    // 遮罩
    cliperStyle: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
    // dialog框
    dlgStyle: { boxShadow: '10px 10px 5px #888888' },
    // 显示位置
    position: { x: 'center', y: 'center' },
    // 动画
    animate: false
})
```

#### 配置title
```js
Modal.create({
    title: '飞鸟集',
    titleStyle: { color: 'green' },
    content: "当你为错过太阳而哭泣的时候，你也要再错过群星了。"
})
```

#### 配置右上角关闭按钮
```js
Modal.create({
    showClose: true,
    content: <div style={{ padding: '30px 0' }}>我们把世界看错，反说它欺骗了我们。</div>,
    onClose () {
        this.remove()
    }
})
```

#### 配置内容
```js
Modal.create({
    content: '飞鸟集节选',
    contentStyle: { fontSize: '14px', color: "#4080e8", padding: '30px 0' }
})
```

#### 自定义content
```js
function Hello () {
  return <div style={{ height: '100px', overflow: 'scroll', backgroundColor: 'aliceblue' }} 
        className='scroll-area'
    >
    <p><strong>Hello Component</strong></p>
    <p>sdf 1</p>
    <p>sdf 2</p>
    <p>sdf 3</p>
    <p>sdf 4</p>
    <p>sdf 5</p>
  </div>
}

Modal.create({
    content: <Hello />,
    contentStyle: {}
})
```

#### 配置btn
```js
Modal.create({
    content: '眼睛为她下着雨，心却为她打着伞，这就是爱情',
    // 取消按钮
    cancelText: "取消",
    showCancel: true,
    cancelStyle: { color: 'white', background: '#4080e8' },
    // 确认按钮
    confirmText: "已阅",
    showConfirm: true,
    confirmStyle: { color: 'white', background: '#4080e8' },
    onConfirm () {
    this.remove()
    },
    onCancel () {
    this.remove()
    }
})
```

#### 位置变化
```js
Modal.create({
    content: 'Eyes are raining for her,heart is holding umbrella for her,this is love.',
    dlgStyle: { width: '100%', borderRadius: 0 },
    position: { x: 'center', y: 'bottom' }
})
```

#### Modal 拓展
```js
Modal.tip('风吹柳花满店香，吴姬压酒劝客尝')
```


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>

