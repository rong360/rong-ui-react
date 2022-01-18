---
title: Form 表单
order: 1
group:
  title: 数据录入
  order: 4
---

### 组件引入
```js
import { Form } from 'rong-ui-react';
```

### 调用方式
```js
<Form>
  <Input {...user}/>
  <Select {...term}/>
  ......
  <Button>提交</Button>
</Form>
```

### API
| 属性      | 说明    | 类型      |  可选值      |默认值       |
|:---------- |:-------- |:---------- |:-------------  |:-------------  |
| placeholder | 占位文本 | string |  | -|
| labelWidth | lebel标签宽度 | string | 如 `150px` `10rem`等 ||
| labelPosition | label标签对齐方式 | string | `left` `right` `top`  | left |
| textPosition | input文字对齐方式 | string | `left` `center` `right`  | left |
| inputClearStyle | 清空按钮样式 | CSSProperties |  |  |
| selectArrowStyle | 清空按钮样式 | CSSProperties |  | |
| selectCancelBtnText | select取消按钮文案 | string |  | 取消 |
| selectConfirmBtnText | select确定按钮文案 | string |  | 确定 |
| datePickerCancelBtnText | datepicker取消按钮文案 | string || 取消 |
| datePickerConfirmBtnText | datepicker确定按钮文案 | string || 确定|
| showMessage | 显示错误信息 | boolean |  | true |
| mode | title添加css效果 | string | `default` `to-top` | default |
| className | 自定义 CSS class | string | | |
| onChange | 表单数据更新时回调 | function({ event, component, value }) | | |
| onComplete | 表单项填写完成时回调 | function({ isCompleted }) | | |



### methods
| 名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| validate | 校验所有表单项 | （result, message） |
| validateOneByOne | 逐项校验表单项 |（result, message）|
| getValue | 获取当前组件表单数据 | {name: name, value: value} |
| getSerializeValue | 获取当前组件表单数据 |a=0&b=1 |
| getObjectValue | 获取当前组件表单数据 | {a: 0, b: 1} |
| resetFields | 重置表单 | |


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>

