import { useState, useCallback, useEffect, useRef } from 'react'
import { Titlebar, Form, Select3, Modal } from 'rong-ui-react'

const styles = {
  results: {
    fontSize: '14px',
    color: '#333',
    padding: '15px',
    backgroundColor: '#d3d3d3',
    marginTop: '15px',
    lineHeight: '18px',
  },
  btnWrap: {
    display: 'flex',
  },
  btn: {
    flex: 1,
    borderRadius: '4px',
    margin: '10px',
    padding: '10px 0',
    textAlign: 'center',
    backgroundColor: 'darkcyan',
    fontSize: '12px',
    color: '#fff',
    border: '1px solid #ccc',
  },
  tips: {
    backgroundColor: 'lightgoldenrodyellow',
    padding: '15px',
    fontSize: '12px'
  }
};

function Select3Demo () {
  const formRef = useRef(null)
  const select1Ref = useRef(null)
  const select2Ref = useRef(null)
  const [count, setCount] = useState(0)
  const [config, setConfig] = useState({
    "rely_policy_id": 0,
    "id": "635",
    "category_id": "1",
    "title": "本地公积金",
    "name": "user_social_security",
    "type": "2",
    "verify_type": "0",
    "data": [{
      "value": "1",
      "text": "有",
      "rely": []
    }, {
      "value": "2",
      "text": "无",
      "rely": []
    }],
    "unit": "",
    "material_type": "101",
    "info_property": "1",
    "level": 1,
    "desc": "",
    "value": "",
    "readonly": 0
  })
  const [config2, setConfig2] = useState({
    "rely_policy_id": 1,
    "id": "636",
    "category_id": "1",
    "title": "本地社保",
    "name": "shebao",
    "type": "2",
    "verify_type": "0",
    "data": [{
      "value": "1",
      "text": "有",
      "rely": []
    }, {
      "value": "2",
      "text": "无",
      "rely": []
    }],
    "unit": "",
    "material_type": "101",
    "info_property": "1",
    "level": 1,
    "desc": "",
    "value": "",
    "readonly": 0
  })

  const goHome = useCallback(() => {}, [])
  const configChange = useCallback(({ event, component, value }) => setConfig(Object.assign({ ...config }, { value: value })), [config])
  const config2Change = useCallback(({ event, component, value }) => setConfig2(Object.assign({ ...config2 }, { value: value })), [config2])
  const getValue1 = () => {
    let obj = select1Ref.current.getValue()
    Modal.create({
      content: <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(obj)}</div>
    })
  }
  const getValue2 = () => {
    let obj = select2Ref.current.getValue()
    Modal.create({
      content: <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(obj)}</div>
    })
  }
  const getValue3 = () => {
    let form = formRef.current
    form.validate((valid, validateMessage) => {
      if (valid) {
        console.log('getValue', form.getValue())
        console.log('getSerializeValue', form.getSerializeValue())
        console.log('getObjectValue', form.getObjectValue())
      } else {
        Modal.create({
          content: validateMessage.map(item => item.replace('不能为空', '')).join('、') + '不能为空'
        })
      }
    })
  }
  const resetFields = () => formRef.current.resetFields()

  const [fields, setFields] = useState([])
  useEffect(() => {
    setFields(formRef.current._state.fields)
  }, [])
  return <div className='select3-page'>
    <Titlebar theme='b' onBack={goHome}>Select3</Titlebar>
    <div style={styles.tips}>标题和选项在同一行展示， 用于性别选择等</div>
    <div className='p-15'>
      请选择以下信息：
      <Form ref={formRef}>
        <Select3 ref={select1Ref} {...config} onChange={configChange} />
        <Select3 ref={select2Ref} {...config2} onChange={config2Change} />
      </Form>
    </div>
    <div style={styles.btnWrap}>
      <button style={styles.btn} onClick={getValue1}>获取公积金数据</button>
      <button style={styles.btn} onClick={getValue2}>获取社保数据</button>
      <button style={styles.btn} onClick={resetFields}>重置</button>
    </div>
    <div style={styles.btnWrap}>
      <button style={styles.btn} onClick={getValue3}>借助Form组件获取所有数据</button>
    </div>
    <div style={styles.results}>
      {
        fields.map(item => <p key={item.props.title}>{item.props.title}:{item.state.value}</p>)
      }
    </div>
  </div>
}

export default Select3Demo
