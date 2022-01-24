---
title: Select3 选择器
order: 7
group:
  title: 数据录入
---

<Alert>
  <p>用于"男、女" "有、无"等选择，行内展示选择项</p>
</Alert>

#### 组件引入
```js
import { Select3 } from 'rong-ui-react';
```

### 调用方式
```js
<Select3
  title="职位" 
  name="free_type"
  value="2"
  data={[
    {
      text: "主任医师",
      value: "1"
    },
    {
      text: "副主任医师",
      value: "2"
    }
  ]}
/>
```

### API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:--------|:--------|:--------|:--------|:--------|
| className | 自定义 CSS class | string | | |
| title | 表单label | string | | |
| name | 表单name | string | | |
| value | 默认值 | string | | |
| placeholder | 输入框提示文案 | string | | |
| disabled | 输入框是否禁用 | boolean| `disabled` `1` `0` `true` `false` | false |
| readonly | 输入框是否只读 | boolean | `readonly` `1` `0` `true` `false` | false |
| required | 是否必填 | boolean | | true |
| rules | 类iview风格的校验规则 | array | | [{required: true, message:'xxx不能为空', trigger:'blur'}] |
| showMessage | 显示校验结果 | boolean | | true |
| labelWidth | lebel标签宽度 | string | 如 `150px` `10rem`等 ||
| labelPosition | label标签对齐方式 | string | `left` `right` `top`  | left |
| textPosition | input文字对齐方式 | string | `left` `center` `right`  | left |
| mode | title添加css效果 | string | `default` `to-top` | default |
| onChange | 输入框内容变化时的回调 | function({ event, component, value}) | | |


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
