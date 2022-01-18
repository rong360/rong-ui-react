
import React, { useCallback, useState, useEffect } from "react";
import {Titlebar, Modal} from 'rong-ui-react'

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

function Hello () {
  return <div style={{ height: '100px', overflow: 'scroll', backgroundColor: 'aliceblue' }} className='scroll-area'>
    <p><strong>Hello Component</strong></p>
    <p>sdf 1</p>
    <p>sdf 2</p>
    <p>sdf 3</p>
    <p>sdf 4</p>
    <p>sdf 5</p>
    <p>sdf 6</p>
    <p>sdf 7</p>
    <p>sdf 8</p>
    <p>sdf 9</p>
    <p>sdf 10</p>
    <p>sdf 11</p>
    <p>sdf 12</p>
    <p>sdf 13</p>
    <p>sdf 14</p>
    <p>sdf 15</p>
    <p>sdf 16</p>
    <p>sdf 17</p>
    <p>sdf 18</p>
    <p>sdf 19</p>
    <p>sdf 20</p>
  </div>
}

function DialogDemo () {
  const goHome = useCallback(() => { }, [])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Modal.create({
    //   content: 'hello',
    //   showClose: true
    // })
  }, [])
  const handleDialog1 = () => {
    // Modal.create('风吹柳花满店香，吴姬压酒劝客尝')

    Modal.create({
      content: <span>生如夏花之绚烂，死如秋叶之静美<br />泰戈尔《生如夏花》</span>,
      onCancel () {
        let res = window.confirm('确定关闭？')
        res && this.remove()
      }
    })
  }
  const handleDialog2 = () => {
    Modal.create({
      // 标题
      title: '标题',
      titleStyle: { color: 'green' },
      // 右上角关闭按钮
      showClose: true,
      onClose (e) {
        this.remove()
      },
      // 内容
      content: <Hello />,
      contentStyle: {},
      // 取消按钮
      showCancel: true,
      cancelText: <strong>cancel</strong>,
      cancelStyle: { color: 'red' },
      onCancel () {
        this.remove()
      },
      // 确认按钮
      showConfirm: true,
      confirmText: 'confirm',
      confirmStyle: { color: 'blue' },
      onConfirm () {
        this.remove()
      },
      // 遮罩
      cliperStyle: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
      // dialog框
      dlgStyle: { boxShadow: '10px 10px 5px #888888' },
      // 显示位置
      position: { x: 'center', y: 'center' },
      // 动画
      animate: false
    })
  }
  const handleDialog3 = () => {
    Modal.create({
      title: '飞鸟集',
      content: "当你为错过太阳而哭泣的时候，你也要再错过群星了。",
      titleStyle: { color: 'green' }
    })
  }
  const handleDialog4 = () => {
    Modal.create({
      showClose: true,
      content: <div style={{ padding: '30px 0' }}>我们把世界看错，反说它欺骗了我们。</div>,
      onClose () {
        this.remove()
      }
    })
  }
  const handleDialog5 = () => {
    Modal.create({
      content: '飞鸟集节选',
      contentStyle: { fontSize: '14px', color: "#4080e8", padding: '30px 0' }
    })
  }
  const handleDialog5_2 = () => {
    Modal.create({
      content: <Hello />,
      contentStyle: {}
    })
  }
  const handleDialog6 = () => {
    Modal.create({
      content: '眼睛为她下着雨，心却为她打着伞，这就是爱情',
      // 取消按钮
      cancelText: "取消",
      showCancel: true,
      cancelStyle: { color: 'white', background: '#4080e8' },
      // 确认按钮
      confirmText: "已阅",
      showConfirm: true,
      confirmStyle: { color: 'white', background: '#4080e8' },
      onConfirm () {
        this.remove()
      },
      onCancel () {
        this.remove()
      }
    })
  }
  const handleDialog7 = () => {
    Modal.create({
      content: 'Eyes are raining for her,heart is holding umbrella for her,this is love.',
      dlgStyle: { width: '100%', borderRadius: 0 },
      position: { x: 'center', y: 'bottom' }
    })
  }
  const handleTip = () => {
    Modal.tip({
      content: <Hello />
    })
  }

  return (
    <div style={styles.pageView}>
      <Titlebar theme='b' onBack={goHome}>Modal</Titlebar>
      <Modal content={<Hello />} onConfirm={function () { setVisible(false) }} visible={visible} >1sfsdfsdf</Modal>
      <Modal target={document.getElementById('modal')} onConfirm={function () { setVisible2(false) }} visible={visible2} ><input /></Modal>
      <div style={styles.exampleList}>
        <div style={styles.exampleItem} onClick={handleDialog1}>常规</div>
        <div style={styles.exampleItem} onClick={handleDialog2}>所有配置项</div>
        <div style={styles.exampleItem} onClick={handleDialog3}>配置title</div>
        <div style={styles.exampleItem} onClick={handleDialog4}>配置右上角关闭按钮</div>
        <div style={styles.exampleItem} onClick={handleDialog5}>配置内容</div>
        <div style={styles.exampleItem} onClick={handleDialog5_2}>自定义content</div>
        <div style={styles.exampleItem} onClick={handleDialog6}>配置btn</div>
        <div style={styles.exampleItem} onClick={handleDialog7}>位置变化</div>
        <div style={styles.exampleItem} onClick={() => setVisible(true)}>模板方式插入Dialog</div>
        <div style={styles.exampleItem} onClick={() => setVisible2(true)}>模板方式插入Dialog</div>
        <div style={styles.exampleItem} onClick={handleTip}>Modal.tip</div>
      </div>
    </div>
  )
}

export default DialogDemo
