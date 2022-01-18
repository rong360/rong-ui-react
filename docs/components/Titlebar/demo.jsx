import { useState, useMemo, useCallback } from 'react'
import { Titlebar, history, match, ViewSource } from 'rong-ui-react'

function TitlebarDemo () {
  const [count, setCount] = useState(0)
  const [age] = useState(18)

  const title = useMemo(() => `标题${age}`, [age])
  const r = useMemo(() => <strong>home</strong>, [])
  const backArrowStyle = useMemo(() => ({ color: '#333' }), [])
  const onBack = useCallback((e) => { console.log(e) }, [])
  const goHome = useCallback((e) => {}, [])

  return (
    <div>
      <Titlebar theme='b' onBack={goHome}>Titlebar</Titlebar>
      <Titlebar
        theme='a'
        title={title}
        r={r}
        showBackto={true}
        onBack={onBack}
        backArrowStyle={backArrowStyle}
      />
      <br />
      <Titlebar theme='b' title='标题' />
      <br />
      <Titlebar theme='c' title='标题' />
      <br />
      <Titlebar theme='d' title='标题' />
      <br />
      <Titlebar theme='e' title='标题' />
      <br />
      <Titlebar theme='f' title='标题' />

    </div>
  )
}

export default TitlebarDemo
