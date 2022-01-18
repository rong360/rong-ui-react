import { useCallback } from "react";
import {Titlebar, Loading} from 'rong-ui-react'

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

const LoadingDemo = () => {
  const goHome = useCallback(() => {}, [])
  const onDefaultClick = (e) => {
    let loading = Loading.create()

    setTimeout(() => {
      loading.remove()
    }, 2000);
  }
  const onTextClick = (e) => {
    let loading = Loading.create({ text: '灰太狼快跑' })

    setTimeout(() => {
      loading.remove()
    }, 2000);
  }
  const onCountTimeClick = (e) => {
    let count = 3
    let loading = Loading.create({ text: `${count}s` })
    let timer = setInterval(() => {
      count--
      if (count === 0) {
        clearInterval(timer)
        loading.remove()
      } else {
        loading.update({ text: `${count}s` })
      }
    }, 1000);
  }
  const onTextChangeClick = (e) => {
    let loading = Loading.create({ text: 'Hello World，disappear in 2', textStyle: { color: '#e0a711' } })

    setTimeout(() => {
      loading.remove()
    }, 2000);
  }
  const onCustomClick = (e) => {
    let loading = Loading.create({
      icon: <span style={{ fontSize: '45px', color: 'yellow', lineHeight: '0px' }}>
        <svg viewBox="64 64 896 896" data-icon="smile" width="1em" height="1em" fill="currentColor">
          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path>
        </svg>
      </span>,
      text: 'Hello'
    })

    setTimeout(() => {
      loading.remove()
    }, 2000);
  }

  return <div style={styles.pageView}>
    <Titlebar theme='b' onBack={goHome}>Loading</Titlebar>
    <div style={styles.exampleList}>
      <div style={styles.exampleItem} onClick={onDefaultClick}>
        默认 default
      </div>
      <div style={styles.exampleItem} onClick={onTextClick}>
        添加文案
      </div>
      <div style={styles.exampleItem} onClick={onCountTimeClick}>
        倒计时
      </div>
      <div style={styles.exampleItem} onClick={onTextChangeClick}>
        改变大小、颜色、文字等
      </div>
      <div style={styles.exampleItem} onClick={onCustomClick}>
        自定义loading
      </div>
    </div>

  </div>
}

export default LoadingDemo
