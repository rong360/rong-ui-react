---
title: Input 输入框
order: 4
group:
  title: 数据录入
---


### 组件引入
```js
import { Input } from 'rong-ui-react';
```

### 调用方式
```js
<Input placeholder="Basic usage"/>
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--------|:--------|:--------|:--------|:--------|
| className | 自定义 CSS class | string | | |
| type | input类型 | string | `text` `number` `tel` `email` `IDCard` | text |
| title | 表单label | string | | |
| name | 表单name | string | | |
| value | 默认值 | string | | |
| placeholder | 输入框提示文案 | string | | |
| maxlength | 输入框最大输入长度 | number | | |
| fixed | 保留几位小数 | number | | |
| disabled | 输入框是否禁用 | boolean| `disabled` `1` `0` `true` `false` | false |
| readonly | 输入框是否只读 | boolean | `readonly` `1` `0` `true` `false` | false |
| required | 是否必填 | boolean | | true |
| rules | 类iview风格的校验规则 | array | | [{required: true, message:'xxx不能为空', trigger:'blur'}] |
| showMessage | 显示校验结果 | boolean | | true |
| showEdit | 显示可编辑icon | boolean | | false |
| emailList | 邮件后缀列表<br/><font size=1>(type='email'可用)</font> | array | | |
| labelWidth | lebel标签宽度 | string | 如 `150px` `10rem`等 ||
| labelPosition | label标签对齐方式 | string | `left` `right` `top`  | left |
| textPosition | input文字对齐方式 | string | `left` `center` `right`  | left |
| mode | title添加css效果 | string | `default` `to-top` | default |
| onChange | 输入框内容变化时的回调 | function({ event, component, value}) | | |
| onFocus | 获取焦点时的回调 | function({ event, component, value}) | | |
| onBlur | 获取焦点时的回调 | function({ event, component, value}) | | |


<Alert>
  <p>提示：rules校验规则文档详见https://www.npmjs.com/package/async-validator</p>
</Alert>


### methods
| 名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| getValue | 获取当前组件表单数据 | {name: name, value: value} |
| resetField | 重置表单 | |


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
