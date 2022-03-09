import { useCallback, useState, useRef } from 'react';
import { Titlebar, history, Form, Input, Select, Modal } from 'rong-ui-react';

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

const componentfactory = (type) => {
  let component;
  switch (type) {
    case '3':
    case '4':
    case '9':
      component = { componentType: 'Input', component: Input, verifyType: 'number' };
      break;
    case 'email':
      component = { componentType: 'Input', component: Input, verifyType: 'email' };
      break;
    case '50':
      component = { componentType: 'Input', component: Input, verifyType: 'IDCard' };
      break;
    case 'hidden':
      component = { componentType: 'Input', component: Input, verifyType: 'hidden' };
      break;
    case 'select':
    case '2':
    case '1':
      component = { componentType: 'Select', component: Select, verifyType: '' };
      break;
    default:
      component = { componentType: 'Input', component: Input, verifyType: 'text' };
  }
  return component;
};

let data = [
  {
    rely_policy_id: 0,
    id: '123277',
    category_id: '1',
    title: '本人姓名',
    placeholder: '',
    var_name: 'user_name',
    type: 'text',
    verify_type: 'text',
    data: '',
    unit: '',
    material_type: '100',
    info_property: '1',
    level: 1,
    desc: '',
    value: '',
    readonly: 0,
    maxlength: 800,
    rules: [
      {
        required: true,
        message: '姓名不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    rely_policy_id: 0,
    id: '323472',
    category_id: '1',
    title: '本人身份证号码',
    var_name: 'user_id',
    type: '5',
    verify_type: '50',
    data: '',
    unit: '',
    material_type: '100',
    info_property: '1',
    level: 1,
    desc: '',
    value: '110101199003079614',
    readonly: 0,
  },
  {
    rely_policy_id: 0,
    id: '832336',
    category_id: '2',
    title: 'GPS信息',
    var_name: 'gps_location',
    type: '5',
    verify_type: '0',
    data: '',
    unit: '',
    material_type: '0',
    info_property: '0',
    level: 1,
    desc: '',
    readonly: 0,
  },
  {
    rely_policy_id: 0,
    id: '612321392',
    category_id: '1',
    title: '申请金额',
    var_name: 'application_amount',
    type: '9',
    verify_type: '0',
    data: '',
    unit: '',
    material_type: '107',
    info_property: '1',
    level: 1,
    desc: '',
    value: '10000.00',
    fixed: 2,
    readonly: 0,
    maxlength: 8,
    onChange: ({ event, component, value }) => {
      if (value > 10000) {
        component.setValue('10000')
        component.setState({
          validateState: 'error',
          validateMessage: '最大申请金额为10000元，已为你自动变更为10000元',
        });
      }
    }
  },
  {
    rely_policy_id: 0,
    id: '84821212',
    category_id: '1',
    title: '贷款申请期限',
    var_name: 'apply_term',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: 90,
        desc: '3个月',
        rely: [],
      },
      {
        value: 180,
        desc: '6个月',
        rely: [],
      },
      {
        value: 360,
        desc: '12个月',
        rely: [],
      },
      {
        value: 540,
        desc: '18个月',
        rely: [],
      },
      {
        value: 720,
        desc: '24个月',
        rely: [],
      },
    ],
    unit: '',
    material_type: '107',
    info_property: '0',
    level: 1,
    desc: '',
    value: '',
    readonly: 0,
  },
  {
    rely_policy_id: 0,
    id: '163',
    category_id: '1',
    title: '可接受最高月还款额度（元）',
    var_name: 'max_repayment',
    type: '9',
    verify_type: '0',
    data: '',
    unit: '元/月',
    material_type: '100',
    info_property: '0',
    level: 1,
    desc: '',
    value: '2000',
    readonly: 0,
    maxlength: 8,
  },
  {
    rely_policy_id: 0,
    id: '45256233',
    category_id: '112',
    title: '教育程度',
    var_name: 'user_education',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: '1',
        desc: '硕士及以上',
        rely: [],
      },
      {
        value: '2',
        desc: '本科',
        rely: [],
      },
      {
        value: '3',
        desc: '大专',
        rely: [],
      },
      {
        value: '4',
        desc: '中专/高中及以下',
        rely: [],
      },
    ],
    unit: '',
    material_type: '100',
    info_property: '1',
    level: 1,
    desc: '',
    value: '2',
    readonly: 0,
  },
  {
    rely_policy_id: 0,
    id: '6351222',
    category_id: '1',
    title: '现单位是否缴纳社保',
    var_name: 'social_security',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: '1',
        desc: '缴纳本地社保',
        rely: [],
      },
      {
        value: '2',
        desc: '未缴纳社保',
        rely: [],
      },
    ],
    unit: '',
    material_type: '101',
    info_property: '1',
    level: 1,
    desc: '',
    value: '2',
    readonly: 0,
  },
  {
    rely_policy_id: 0,
    id: '26',
    category_id: '1',
    title: '车辆情况',
    var_name: 'auto_type',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: '1',
        desc: '无车',
        rely: [],
      },
      {
        value: '2',
        desc: '本人名下有车，无贷款',
        rely: [],
      },
      {
        value: '3',
        desc: '本人名下有车，有按揭贷款',
        rely: [],
      },
      {
        value: '4',
        desc: '本人名下有车，但已被抵押',
        rely: [],
      },
      {
        value: '5',
        desc: '其他（请备注）',
        rely: [],
      },
    ],
    unit: '',
    material_type: '103',
    info_property: '0',
    level: 1,
    desc: '',
    value: '1',
    readonly: 0,
  },
  {
    rely_policy_id: 0,
    id: '26489',
    category_id: '1',
    title: '职业类别',
    var_name: 'op_type',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: '1',
        desc: '企业主',
        rely: ['20996', '28905'],
      },
      {
        value: '2',
        desc: '个体工商户',
        rely: ['20996', '28905'],
      },
      {
        value: '4',
        desc: '上班人群',
        rely: ['5998', '5256'],
      },
      {
        value: '5',
        desc: '学生',
        rely: [],
      },
      {
        value: '10',
        desc: '无固定职业',
        rely: ['832'],
      },
    ],
    unit: '',
    material_type: '101',
    info_property: '0',
    level: 1,
    desc: '',
    value: '4',
    readonly: 0,
  },
  {
    rely_policy_id: '26489',
    id: '5998',
    category_id: '1',
    title: '月工资收入（元）',
    var_name: 'user_income_by_card',
    type: '9',
    verify_type: '0',
    data: '',
    unit: '元',
    material_type: '101',
    info_property: '1',
    level: 2,
    desc: '',
    value: '7000',
    readonly: 0,
    onChange: ({ event, component, value }) => {
      if (value > 60000) {
        component.setValue('60000')
        component.setState({
          validateState: 'error',
          validateMessage: '月工资最多为60000元，已为你自动变更为60000元',
        });
      }
    }
  },
  {
    rely_policy_id: '26489',
    id: '5256',
    category_id: '1',
    title: '现单位工作年限',
    var_name: 'work_period',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: '1',
        desc: '0-5个月',
        rely: [],
      },
      {
        value: '2',
        desc: '6-12个月',
        rely: [],
      },
      {
        value: '3',
        desc: '1-3年',
        rely: [],
      },
      {
        value: '4',
        desc: '3-7年',
        rely: [],
      },
      {
        value: '5',
        desc: '7年以上',
        rely: [],
      },
    ],
    unit: '个月',
    material_type: '101',
    info_property: '1',
    level: 2,
    desc: '',
    value: '1',
    readonly: 0,
  },
  {
    rely_policy_id: '26489',
    id: '20996',
    category_id: '1',
    title: '经营流水（对公流水）',
    var_name: 'corporate_flow',
    type: '9',
    verify_type: '0',
    data: '',
    unit: '',
    material_type: '102',
    info_property: '0',
    level: 2,
    desc: '',
    readonly: 0,
  },
  {
    rely_policy_id: '26489',
    id: '28905',
    category_id: '1',
    title: '经营年限',
    var_name: 'operating_year',
    type: '2',
    verify_type: '0',
    data: [
      {
        value: '1',
        desc: '0-3个月',
        rely: [],
      },
      {
        value: '2',
        desc: '3-6个月',
        rely: [],
      },
      {
        value: '3',
        desc: '7-12个月',
        rely: [],
      },
      {
        value: '4',
        desc: '1-2年',
        rely: [],
      },
      {
        value: '5',
        desc: '3-4年',
        rely: [],
      },
      {
        value: '6',
        desc: '5年以上',
        rely: [],
      },
    ],
    unit: '',
    material_type: '102',
    info_property: '1',
    level: 2,
    desc: '',
    readonly: 0,
  },
  {
    rely_policy_id: '26489',
    id: '832',
    category_id: '1',
    title: '月平均收入',
    var_name: 'monthly_average_income',
    type: '9',
    verify_type: '0',
    unit: '',
    material_type: '101',
    info_property: '0',
    level: 2,
    desc: '',
    value: '8000',
    readonly: 0,
  },
];

let basicMap = {};
let firstLevel = [];
// 构造符合组件要求的数据格式
data.forEach((item, index) => {
  let type = item.verify_type === '0' ? item.type : item.verify_type;
  item.componentType = componentfactory(type).componentType;
  item.component = componentfactory(type).component;
  item.type = componentfactory(type).verifyType;
  // 用户姓名特殊校验
  if (item.id === '123277') {
    item.rules.push({
      validator(rule, value, callback) {
        if (value.length < 3) {
          return new Error('姓名最少三个字');
        }
        callback();
      },
      trigger: 'blur',
    });
  }
  // 申请金额不能为0
  if (item.id === '612321392') {
    item.rules = [{ required: true, message: '***申请金额不能为空***', trigger: 'blur' }];
    item.rules.push({
      validator(rule, value, callback) {
        if (value === '0') {
          return new Error('申请金额不能为零！');
        }
        callback();
      },
      trigger: 'blur',
    });
  }
  if (item.id === '832336') {
    item.componentType = componentfactory('hidden').componentType;
    item.component = componentfactory('hidden').component;
    item.type = componentfactory('hidden').verifyType;
    item.rules = [];
    item.value = '';
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition &&
        window.navigator.geolocation.getCurrentPosition(
          function (position) {
            // coords.latitude十进制数的纬度
            // coords.longitude十进制数的经度
            item.value = position.coords.longitude + ',' + position.coords.latitude;
          },
          function () {},
          {
            enableHighAccuracy: true,
            timeout: 45000,
          },
        );
    } else {
      item.value = '无法获取gps';
      console.log('Your browser does not natively support geolocation.');
    }
  }
  // basic生成map机构，方便数据查找
  basicMap[item.id] = item;
  // 数据分级
  if (item.level === 1) firstLevel.push(item);
  // 添加name属性
  item.name = item.id;
  item.var_name = '';
});
// 构造rSelect的children数据
data.forEach((item, index) => {
  if (item.componentType === 'Select') {
    item.data.forEach((option) => {
      option.text = option.desc;
      if (option.rely && option.rely.length) {
        option.children = option.rely.map((id) => {
          return basicMap[id];
        });
      }
    });
  }
});
function FormDemo() {
  const goHome = useCallback(() => {}, []);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const formRef = useRef(null);
  const handleChange = useCallback(({ event, component, value }) => {
    component.props.item.value = value;
  }, []);
  const onComplete = useCallback(({ isCompleted }) => {
    setIsCompleted(isCompleted);
  }, []);

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
        Modal.create({
          content: validateMessage,
        });
      }
    });
  };
  const doReset = () => {
    formRef.current.resetFields();
  };

  const btnStyle = isCompleted ? styles.btn : Object.assign({}, styles.btn, styles.btnDisabled);

  return (
    <div className={styles['page-view']}>
      <Titlebar theme="b" onBack={goHome}>
        Form
      </Titlebar>
      <Form
        ref={formRef}
        className={styles['r-form']}
        textPosition="right"
        onComplete={onComplete}
        onChange={handleChange}
        onFieldsChange={onFieldsChange}
      >
        {firstLevel.map((item, index) => {
          return <item.component {...item} data-index={index} item={item} key={item.name} />;
        })}
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
    </div>
  );
}

export default FormDemo;
