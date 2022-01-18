import {useCallback, useState} from 'react'
import { Titlebar, FlexFixed, Button } from 'rong-ui-react'

const list = new Array(50).fill('').map((item, index) => <p className='lh-30 fs-14' key={index}>{Math.random()}</p>)

const FlexFixedDemo = () => {
  const [count, setCount] = useState(0)
  const [scrollInfo, setScrollInfo] = useState({})
  const [scrollInfo2, setScrollInfo2] = useState({})

  const goHome = useCallback(() => {}, [])
  const onScroll = useCallback((scrollInfo) => setScrollInfo(scrollInfo), [])
  const onScrollDebounce = useCallback((scrollInfo) => setScrollInfo2(scrollInfo), [])

  const header = <Titlebar theme='b' onBack={goHome}>FlexFixed</Titlebar>
  const footer = <Button>提交</Button>
  const extra = <div style={{
    padding: '15px',
    backgroundColor: 'lightgray',
    fontSize:'14px',
    margin: '15px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'rgba(0,0,0, 0.7)',
    color: '#fff', margin: 0
  }}>
    <p>测试子组件是否频繁更新</p>
    <p>count: {count}</p>
    <p><button type="button" onClick={() => setCount(count + 1)}>add</button></p>
    <br/>
    <p><input type="text"/></p>
  </div>

  return <FlexFixed header={header} footer={footer} extra={extra} onScroll={onScroll} onScrollDebounce={onScrollDebounce}>
    <div style={{ position: 'fixed', top:'49px', color: '#fff',  right:0,  textAlign: 'left', padding: '10px', fontSize: '14px', lineHeight: '16px', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <p>on-scroll</p>
      <p>scrollTop： {scrollInfo.scrollTop}</p>
      <p>maxScrollTop：{scrollInfo.maxScrollTop}</p>
      <p>direction：{scrollInfo.direction}</p>
      <br/>
      <p>on-scroll-debounce</p>
      <p>scrollTop：{scrollInfo2.scrollTop}</p>
      <p>maxScrollTop：{scrollInfo2.maxScrollTop}</p>
      <p>direction：{scrollInfo2.direction}</p>
    </div>
    {list}
  </FlexFixed>
}

export default FlexFixedDemo
