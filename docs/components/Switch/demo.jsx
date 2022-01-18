import { useCallback, useState } from 'react'
import { Titlebar, Switch } from 'rong-ui-react'

// import './demo.less'
let style = document.createElement("style");
style.appendChild(document.createTextNode(`
.mt-20 {
  margin-top: 20px;
}
.fs-12 {
  font-size: 12px;
}
.fs-14 {
  font-size: 14px;
}
.pl-15 {
  padding-left: 15px;
}
.flex {
  display: flex;
}
.ai-c {
  align-items: center;
}
`))

let head = document.getElementsByTagName("head")[0];
head.appendChild(style);


const styles = {}

const SwitchDemo = () => {
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(true)

  const goHome = useCallback(() => {}, [])
  const onSwitchChange = useCallback((checked) => {
    setChecked(checked)
  }, [])

  return <div className='switch-page'>
    <Titlebar theme='b' onBack={goHome}>Switch</Titlebar>

    <div className='fs-14'>1,默认</div>
    <div className='flex ai-c'>
      <Switch defaultChecked={checked} onChange={onSwitchChange} />
      <div className='fs-12 pl-15'>
        {checked ? '已勾选' : '未勾选'}
      </div>
    </div>

    <div className='fs-14 mt-20'>2,文字或图标</div>
    <Switch checkedChildren='开' unCheckedChildren='关' />

    <div className='fs-14 mt-20'>3，禁用</div>
    <Switch disabled={true} />
  </div>
}

export default SwitchDemo
