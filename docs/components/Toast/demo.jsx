
import { useCallback } from 'react'
import { Titlebar, Toast } from 'rong-ui-react'

const styles = {
  pageView: {},
  exampleList: {
    padding: '15px'
  },
  exampleItem: {
    backgroundColor: '#20b2aa',
    marginBottom: '10px',
    fontSize: '14px',
    lineHeight: '45px',
    paddingLeft: '10px',
  }
}

const ToastDemo = () => {
  const goHome = useCallback(() => {}, [])
  const onDefaultClick = () => {
    Toast.create('长文本形式为文字超过十个时使用，宽度固定')
  }
  const onPositiveClick = () => {
    Toast.positive('积极文案不超过十个字')
  }
  const onNegetiveClick = () => {
    // Toast.negetive('消极文案不超过十个字')
    Toast.create({
      content: '消极文案不超过十个字',
      type: 'negetive'
    })
  }
  const onCallbackClick = () => {
    Toast.create({
      content: '消失时回调，出alert',
      callback () {
        alert(0)
      }
    })
  }

  return <div style={styles.pageView}>
    <Titlebar theme='b' onBack={goHome}>Toast</Titlebar>
    <div style={styles.exampleList}>
      <div style={styles.exampleItem} onClick={onDefaultClick}>
        默认 default
      </div>
      <div style={styles.exampleItem} onClick={onPositiveClick}>
        积极文案（type="positive"）
      </div>
      <div style={styles.exampleItem} onClick={onNegetiveClick}>
        消极文案（type="negetive"）
      </div>
      <div style={styles.exampleItem} onClick={onCallbackClick}>
        消失时回调
      </div>
    </div>

  </div>
}

export default ToastDemo
