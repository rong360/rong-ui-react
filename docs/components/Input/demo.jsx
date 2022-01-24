import { useCallback, useMemo, useState } from "react";
import {Titlebar, Input} from 'rong-ui-react'

const styles = {
  pageView: {},
  exampleList: {},
  exampleItem: {
    backgroundColor: '#20b2aa',
    marginBottom: '10px',
    fontSize: '14px',
    lineHeight: '45px',
    paddingLeft: '10px',
  },
  exampleItemTitle: {
    fontSize: '14px',
    marginTop: '20px',
  },
  verifyCodeBtn: {
    display: 'inline-block',
    border: '1px solid #bebebe',
    fontSize: '0.74667rem',
    padding: '.1rem .3rem',
    borderRadius: '1rem'
  }
}

const InputDemo = () => {
  const [count, setCount] = useState(0)

  const [user, setUser] = useState({
    "type": "text",
    "title": "本人姓名",
    "name": "bureau_user_name",
    "value": "zyx",
    "placeholder": "",
    "readonly": 0,
    "maxlength": 6,
    "rules": [{
      "required": true,
      "message": "姓名不能为空",
      "trigger": "blur"
    }, {
      validator (rule, value) {
        return value.length >= 3
      },
      message: '姓名最少三个字',
      trigger: 'blur'
    }]
  })
  const [age, setAge] = useState({
    "type": "number",
    "title": "年龄",
    "name": "age",
    "value": "23",
    "placeholder": "",
    "fixed": 0,
    "readonly": 0,
    "maxlength": 3
  })
  const [amount, setAmount] = useState({
    "type": "number",
    "title": "申请金额",
    "name": "application_amount",
    "value": "10000.00",
    "fixed": 2,
    "placeholder": "",
    "readonly": 0,
    "maxlength": 8,
    "rules": [{
      "required": true,
      "message": "申请金额不能为空",
      "trigger": "blur"
    }, {
      validator (rule, value, callback, source, options) {
        let { component } = options
        if (value > 10000) {
          component.setValue('10000')
          callback(new Error('最大申请金额为10000元，已为你自动变更为10000元'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }]
  })
  const [phone, setPhone] = useState({
    "type": "tel",
    "title": "手机号码",
    "name": "phone_number",
    "value": "13122222222",
    "placeholder": "",
    "readonly": 0,
    "maxlength": 11
  })
  const [OTP] = useState({
    "type": "text",
    "title": "验证码",
    "name": "otp_code",
    "value": "",
    "placeholder": "",
    "readonly": 0,
    "maxlength": 6
  })
  const [email, setEmail] = useState({
    "type": "email",
    "title": "邮箱",
    "name": "email",
    "value": "test@qq.com",
    "readonly": 0,
    "placeholder": "",
    "emailList": [
      "qq.com",
      "sina.com",
      "sohu.com",
      "163.com",
      "foxmail.com",
      "gmail.com",
      "rong360.com",
      "edu.cn",
      "outlook.com",
      "vip.qq.com",
      "126.com"
    ],
    "rules": [{
      "required": true,
      "message": "邮箱不能为空",
      "trigger": "blur"
    },
    {
      "type": "email",
      "message": "邮箱格式不正确",
      "trigger": "blur"
    }]
  })
  const [IDCard, setIDCard] = useState({
    "type": "IDCard",
    "title": "本人身份证号码",
    "name": "user_id",
    "value": "150303195208075046",
    "placeholder": "",
    "readonly": 0
  })


  const goHome = useCallback(() => {}, [])
  const userChange = useCallback(({ event, component, value }) => {
    setUser(Object.assign({}, user, { value: value }))
  }, [user])
  const ageChange = useCallback(({ event, component, value }) => {
    setAge(Object.assign({}, age, { value: value }))
  }, [age])
  const amountChange = useCallback(({ event, component, value }) => {
    setAmount(Object.assign({}, amount, { value: value }))
  }, [amount])
  const phoneChange = useCallback(({ event, component, value }) => {
    setPhone(Object.assign({}, phone, { value: value }))
  }, [phone])
  const emailChange = useCallback(({ event, component, value }) => {
    setEmail(Object.assign({}, email, { value: value }))
  }, [email])
  const IDCardChange = useCallback(({ event, component, value }) => {
    setIDCard(Object.assign({}, IDCard, { value: value }))
  }, [IDCard])

  const verifyCodeBtnNode = useMemo(() => <span style={styles.verifyCodeBtn} onClick={() => alert(0)}>Get OTP code</span> , [])

  return <div className='input-page'>
    <Titlebar theme='b' onBack={goHome}>Input</Titlebar>

    <div style={styles.exampleItemTitle}>文本 type="text" --- {user.value}</div>
    <Input {...user} onChange={userChange}/>

    <div style={styles.exampleItemTitle}>数字(整型) type="number" --- {age.value}</div>
    <Input {...age} onChange={ageChange} />

    <div style={styles.exampleItemTitle}>数字(浮点) type="number" --- {amount.value}</div>
    <Input {...amount} onChange={amountChange} prepend='RP'/>

    <div style={styles.exampleItemTitle}>电话 type="tel" --- {phone.value}</div>
    <Input {...phone} onChange={phoneChange} prepend='+91'/>
    <Input {...OTP} append={verifyCodeBtnNode}/>

    <div style={styles.exampleItemTitle}>邮箱 type="email" --- {email.value}</div>
    <Input {...email} onChange={emailChange} />

    <div style={styles.exampleItemTitle}>国内身份证 type="IDCard" --- {IDCard.value}</div>
    <Input {...IDCard} onChange={IDCardChange} />

  </div>
}

export default InputDemo
