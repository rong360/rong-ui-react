import { useCallback, useState, useRef, useEffect, useReducer, useMemo } from 'react';
import { Titlebar, Form, Input, Select2, Modal, Area, FlexFixed } from 'rong-ui-react';
import areaList from './areaCode';

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
  btnDisabled: {
    backgroundColor: 'gray',
  },
};

function FormDemo() {
  const goHome = useCallback(() => {}, []);
  const [count, setCount] = useState(0);
  // const [timeStamp, setTimeStamp] = useState(new Date().getTime())
  const [_count, forceUpdate] = useReducer((x) => x + 1, 0);
  const [user, setUser] = useState({
    type: 'text',
    title: '本人姓名',
    name: 'bureau_user_name',
    value: '',
    placeholder: '',
    readonly: 0,
    maxlength: 6,
    rules: [
      {
        required: true,
        message: '姓名不能为空',
        trigger: 'blur',
      },
      {
        validator(rule, value) {
          return value.length >= 3;
        },
        message: '姓名最少三个字',
        trigger: 'blur',
      },
    ],
  });
  const [age, setAge] = useState({
    type: 'number',
    title: <span>年龄<font color='red' onClick={() => {alert(0)}}>icon</font></span>,
    name: 'age',
    value: '23',
    placeholder: '',
    fixed: 0,
    unit: '',
    readonly: 0,
    maxlength: 3,
  });
  const [amount, setAmount] = useState({
    type: 'number',
    title: '申请金额',
    name: 'application_amount',
    value: '10000.00',
    fixed: 2,
    placeholder: '',
    unit: '',
    readonly: 0,
    maxlength: 8,
    rules: [
      {
        required: true,
        message: '申请金额不能为空',
        trigger: 'blur',
      },
      {
        validator(rule, value, callback, source, options) {
          // let { component } = options;
          // if (value > 10000) {
          //   component.setValue('10000', () => {}, {validateDisabled: true});
          //   callback(new Error('最大申请金额为10000元，已为你自动变更为10000元'));
          //   return
          // }
          callback();
        },
        trigger: 'blur',
      },
    ],
  });
  const [phone, setPhone] = useState({
    type: 'tel',
    title: '手机号码',
    name: 'phone_number',
    value: '13122222222',
    unit: '',
    placeholder: '',
    readonly: 0,
    maxlength: 11,
  });
  const [email, setEmail] = useState({
    type: 'email',
    title: '邮箱',
    name: 'email',
    value: 'test@qq.com',
    readonly: 0,
    placeholder: '',
    emailList: [
      'qq.com',
      'sina.com',
      'sohu.com',
      '163.com',
      'foxmail.com',
      'gmail.com',
      'rong360.com',
      'edu.cn',
      'outlook.com',
      'vip.qq.com',
      '126.com',
    ],
    rules: [
      {
        required: true,
        message: '邮箱不能为空',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: '邮箱格式不正确',
        trigger: 'blur',
      },
    ],
  });
  const [IDCard, setIDCard] = useState({
    type: 'IDCard',
    title: '本人身份证号码',
    name: 'user_id',
    value: '150303195208075046',
    placeholder: '',
    readonly: 0,
  });
  const [loanTerm, setLoanTerm] = useState({
    title: '贷款期限',
    name: 'loan_term',
    value: '',
    data: [
      {
        text: '1个月',
        value: '1',
      },
      {
        text: '2个月',
        value: '2',
      },
      {
        text: '36个月',
        value: '36',
      },
      {
        text: '自己输入',
        value: '0',
        children: [
          {
            component: Input,
            type: 'number',
            title: '输入您的贷款期限',
            name: 'm_term',
            value: '',
            unit: '个月',
            placeholder: '请输入您期望的贷款期限',
            onChange: ({ event, component, value }) => {
              if (value > 12) {
                component.setValue('12');
                component.setState({
                  validateState: 'error',
                  validateMessage: '贷款期限最长12个月，以为您变更为12个月',
                });
              }
            },
            rules: [
              {
                required: true,
                message: '贷款期限不能为空',
              },
              {
                validator(rule, value, callback, source, options) {
                  const { component } = options;
                  const errors = [];
                  // if (value > 12) {
                  //   component.setValue('12', () => {}, {validateDisabled: true});
                  //   errors.push('贷款期限最长12个月，以为您变更为12个月');
                  // } else if (value < 3) {
                  //   component.setValue('3', () => {}, {validateDisabled: true});
                  //   errors.push('贷款期限最短3个月，以为您变更为3个月');
                  // }
                  callback(errors);
                },
                trigger: 'blur',
              },
            ],
          },
        ],
      },
    ],
    rules: [
      {
        required: true,
        message: '贷款期限不能为空',
      },
      {
        validator(rule, value, callback) {
          if (value === '1') {
            return new Error('目前暂不支持1个月的贷款，请选择贷款期限');
          }
          callback();
        },
      },
    ],
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const formRef = useRef(null);
  // const handleChange = useCallback(({ event, component, value }) => {
  //   // component.props.item.value = value
  //   // setList(prevList => {
  //   //   return [...prevList]
  //   // })
  // }, [])
  const handleChange = useCallback(({ event, component, value }) => {}, []);
  const userChange = useCallback(
    ({ event, component, value }) => {
      setUser(Object.assign({}, user, { value: value }));
    },
    [user],
  );
  const ageChange = useCallback(
    ({ event, component, value }) => {
      setAge(Object.assign({}, age, { value: value }));
    },
    [age],
  );
  const amountChange = useCallback(
    ({ event, component, value }) => {
      if (value > 10000) {
        value = '10000';
        component.setValue(value);
        component.setState({
          validateState: 'error',
          validateMessage: '最大申请金额为10000元，已为你自动变更为10000元',
        });
      }
      setAmount(Object.assign({}, amount, { value: value }));
    },
    [amount],
  );
  const phoneChange = useCallback(
    ({ event, component, value }) => {
      setPhone(Object.assign({}, phone, { value: value }));
    },
    [phone],
  );
  const emailChange = useCallback(
    ({ event, component, value }) => {
      setEmail(Object.assign({}, email, { value: value }));
    },
    [email],
  );
  const IDCardChange = useCallback(
    ({ event, component, value }) => {
      setIDCard(Object.assign({}, IDCard, { value: value }));
    },
    [IDCard],
  );
  const loanTermChange = useCallback(
    ({ event, component, value }) => {
      setLoanTerm(Object.assign({}, loanTerm, { value: value }));
    },
    [loanTerm],
  );

  const onComplete = useCallback(({ isCompleted }) => {
    setIsCompleted(isCompleted);
  }, []);

  const [results, setResults] = useState([]);

  const onFieldsChange = useCallback((fields) => {
    setResults(fields.map((field) => field.getValue()));
  }, []);

  const doSubmit = () => {
    formRef.current.validate((valid, validateMessage) => {
      if (valid) {
        Modal.create({
          content: formRef.current.getValue().map((field) => (
            <p key={field.name} style={{ textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold' }}>{field.title}:</span> {field.value}
            </p>
          )),
        });
        console.log('getValue', formRef.current.getValue());
        console.log('getSerializeValue', formRef.current.getSerializeValue());
        console.log('getObjectValue', formRef.current.getObjectValue());
      } else {
        Modal.create({
          content: validateMessage.map((message, idx) => <p key={idx}>{message}</p>),
        });
      }
    });
  };
  const doSubmit2 = () => {
    formRef.current.validateOneByOne((valid, validateMessage) => {
      if (valid) {
        Modal.create({
          content: formRef.current.getValue().map((field) => (
            <p key={field.name} style={{ textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold' }}>{field.title}:</span> {field.value}
            </p>
          )),
        });
        console.log('getValue', formRef.current.getValue());
        console.log('getSerializeValue', formRef.current.getSerializeValue());
        console.log('getObjectValue', formRef.current.getObjectValue());
      } else {
        Modal.create({ content: validateMessage });
      }
    });
  };
  const doReset = () => {
    formRef.current.resetFields();
  };

  const btnStyle = isCompleted ? styles.btn : Object.assign({}, styles.btn, styles.btnDisabled);

  const [counter, setCounter] = useState(0);

  const [list, setList] = useState([]);
  const [values, setValues] = useState("".split(" "))

  useEffect(() => {

    setTimeout(() => {
      setList([areaList]);
      // setValues(['浙江省', '绍兴市', '上虞区', 'sdsdf'])
    }, 1000);

    setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);
  }, []);

  const cancelBtnText = useMemo(() => <font color="red">cancel3</font>, [])
  const confirmBtnText = useMemo(() => <font color="red">confirm3</font>, [])
  const list2 = useMemo(() => [[{text: '河南1', value: "10000"},{text: '河南2', value: "100020"}], [{text: '湖南1', value: "10000"},{text: '湖南2', value: "100020"}]], [])

  return (
    <FlexFixed className={styles['page-view']}>
      <Titlebar theme="b" onBack={goHome}>
        Form {counter}
      </Titlebar>
      <Form
        ref={formRef}
        className={styles['r-form']}
        labelWidth="5.8rem"
        labelPosition="left"
        textPosition="left"
        onComplete={onComplete}
        onChange={handleChange}
        onFieldsChange={onFieldsChange}
      >
        <Input {...user} showEdit={true} onChange={userChange} />
        <Input {...age} onChange={ageChange} />
        <Input {...amount} onChange={amountChange} />
        <Input {...phone} onChange={phoneChange} />
        <Input {...email} onChange={emailChange} />
        <Input {...IDCard} onChange={IDCardChange} />
        <Select2 {...loanTerm} onChange={loanTermChange} />

         <Area
          title="标题1"
          detailTitle="详细地址"
          name="addresss"
          value="xxx"
          labelWidth=""
          labelPosition="left"
          textPosition="right"
          areaList={list}
          areaValues = {values}
          cancelBtnText={cancelBtnText}
          confirmBtnText={confirmBtnText}
          required={true}
        />
        <Area
          title="标题222"
          name="address2"
          value="xxx22222"
          labelWidth=""
          labelPosition="left"
          textPosition="right"
          areaList={list}
          areaValues = {values}
          cancelBtnText={cancelBtnText}
          confirmBtnText={confirmBtnText}
          required={true}
        />
        <div style={styles.btnWrap}>
          <div style={btnStyle} onClick={doSubmit}>
            <p>提交（{isCompleted ? '完成' : '未完成'}）</p>
            <p>validate</p>
          </div>
          <div style={btnStyle} onClick={doSubmit2}>
            <p>提交（{isCompleted ? '完成' : '未完成'}）</p>
            <p>validateOneByOne</p>
          </div>
          <div style={styles.btn} onClick={doReset}>
            <p>重设</p>
          </div>
        </div>
      </Form>
      <div style={styles.results}>
        {results.map((item) => {
          return (
            <p key={item.name}>
              {item.title}:{item.value}
            </p>
          );
        })}
      </div>
    </FlexFixed>
  );
}

export default FormDemo;
