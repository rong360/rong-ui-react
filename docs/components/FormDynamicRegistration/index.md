---
title: Form 表单 --- 动态注册
order: 2
group:
  title: 数据录入
---

<Alert>
  数据结构不定时动态注册，参数同form。
</Alert>

### 组件引入
```js
import { Form } from 'rong-ui-react';
```

### 调用方式
```js
<Form textPosition='right' onComplete={onComplete} onChange={handleChange}>
  {
    firstLevel.map((item, index) => {
      return <item.component {...item} data-index={index} item={item} key={item.name} />
    })
  }
</Form>
```

### 代码演示 <Badge> 右侧手机 → </Badge>
<code src="./demo.jsx"></code>

