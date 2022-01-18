---
title: DatePicker 日期选择
order: 8
group:
  title: 数据录入
---


### 组件引入
```js
import { Datepicker } from 'rong-ui-react';
```

### 调用方式
```js
<Datepicker value='2021/10/22' placeholder='请选择' />
```

### API

| 参数     | 说明    | 类型     | 可选值   | 默认值   |
|:--------|:--------|:--------|:--------|:--------|
| value | 默认显示日期 | string | | |
| valueFormat | value日期格式 | `string` `function` | `yyyy` `yyyy/mm` `yyyy-mm-dd` `yyyy年` `yyyy年mm月dd日`等 |  yyyy/mm/dd |
| textFormat | placeholder区域日期显示格式 | `string` `function` | `yyyy` `yyyy/mm` `yyyy-mm-dd` `yyyy年` `yyyy年mm月dd日`等 |  yyyy/mm/dd |
| placeholder | 日期选择默认文本 | string | | 请选择日期 |
| disabled | 是否禁用 | boolean | `disabled` `1` `0` `true` `false` | false |
| startYear | 起始年份 | number | | this year |
| endYear | 截止年份 | number | | |
| offsetYear | startYear的偏移量 | number | | 0 |
| yearsLength | 年份跨度 | number | | 10 |
| columnsOrder | 年月日顺序 | array | | `['year', 'month', 'day']` |
| language | 语言(月份可显示英文等) | string | `zh` `en` `id` | `zh` |
| pickerTitle | picker标题 | string | | |
| pickerCancelBtnText | picker取消按钮文案 | string | | `取消` |
| pickerConfirmBtnText | picker确定按钮文案 | string | | `确定` |
| pickerFormatter | 可设置picker上年月日单位等 | function(type, val) | | |
| onConfirm | 点击确定回调 | function({ year, month, day, date, text, value }) | | |
| onCancel | 点击取消回调 | function | | |


### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>
