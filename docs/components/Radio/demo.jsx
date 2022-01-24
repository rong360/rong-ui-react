import React, { useCallback, useState } from 'react'
import { Titlebar, Radio } from 'rong-ui-react'

// import './demo.less'
let style = document.createElement("style");
style.appendChild(document.createTextNode(`
.long-checkbox {
  background-color: #e5e5e5;
  width: 80px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  font-size: 12px;
}
.long-checkbox .rc-checkbox {
  display: none;
}
.long-checkbox.r-checkbox-checked{
  background-color: #666;
  color: #fff;
}
.mt-5 {
  margin-top: 5px;
}
.mr-5 {
  margin-right: 5px;
}
.p-15 {
  padding: 15px;
}
.pt-10 {
  padding-top: 10px;
}
.pt-15 {
  padding-top: 15px;
}
.pt-30 {
  padding-top: 30px;
}
.pr-10 {
  padding-right: 10px;
}
.fs-12 {
  font-size: 12px;
}
.fs-14 {
  font-size: 14px;
}
`))

let head = document.getElementsByTagName("head")[0];
head.appendChild(style);


const styles = {}

const plainOptions = ['Apple', 'Pear', 'Orange']
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]

const RadioDemo = () => {
  const goHome = useCallback(() => {}, [])
  const [count, setCount] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [value, setValue] = useState(1)

  const [value1, setValue1] = useState('Apple')
  const [value2, setValue2] = useState('Apple')
  const [value3, setValue3] = useState('Apple')

  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const onChange1 = useCallback(e => setValue1(e.target.value), [])
  const onChange2 = useCallback(e => setValue2(e.target.value), [])
  const onChange3 = useCallback(e => setValue3(e.target.value), [])

  return <div className='radio-page'>
    <Titlebar theme='b' onBack={goHome}>Radio</Titlebar>
    <div className='p-15 fs-14'>
      <div>1,基本用法 <span className='fs-12'>(最简单的用法)</span></div>
      <div className='pt-10'><Radio>Radio</Radio></div>


      <div className='pt-30'>2,不可用 <span className='fs-12'>(Radio 不可用)</span></div>
      <div className='pt-10'>
        <Radio disabled={disabled}>Disabled</Radio>
        <Radio defaultChecked disabled={disabled}>Disabled</Radio>
      </div>
      <div className='pt-10'>
        <button onClick={() => { setDisabled(!disabled) }}>Toggle disabled</button>
      </div>


      <div className='pt-30'>3,单选组合 <span className='fs-12'>(一组互斥的 Radio 配合使用)</span></div>
      <div className='pt-10'>
        <Radio.Group value={value} onChange={onChange}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </div>
      <div className='pt-10'>
        {value}
      </div>


      <div className='pt-30'>
        4,Radio.Group 组合 <span className='fs-12'>(配置方式)</span>
        <p className='fs-12'>通过配置 options 参数来渲染单选框。也可通过 optionType 参数来设置 Radio 类型</p>
      </div>
      <div className='pt-10'>
        <Radio.Group value={value1} options={plainOptions} onChange={onChange1}/>
      </div>
      <div className='pt-10'>
        {value1}
      </div>

      <div className='pt-15'>
        <Radio.Group value={value2} options={optionsWithDisabled} onChange={onChange2}/>
      </div>
      <div className='pt-10'>
        {value2}
      </div>

      <div className='pt-15'>
        <Radio.Group value={value3} options={options} optionType='button' onChange={onChange3}/>
      </div>
      <div className='pt-10'>
        {value3}
      </div>

    </div>

  </div>
}

export default RadioDemo
