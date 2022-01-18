import React from 'react'
import { Titlebar, Form, Select2, Input, Modal } from 'rong-ui-react';

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

class Select2Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {},
      config0: {
        title: "人群类别-before",
        name: "population_category0",
        value: '',
        cancelBtnText: 'cancel',
        confirmBtnText: 'confirm',
        pickerTitle: '标题',
        data: [
          {
            text: '企业主',
            value: 'office_lady',
            children: [
              {
                component: Input,
                type: "number",
                title: "每月收入流水",
                unit: "万元",
                name: "waterflow",
                value: "",
                placeholder: "请输入每月收入流水"
              }
            ]
          },
          {
            text: '医生',
            value: 'doctor',
            children: [
              {
                component: Select2,
                title: "职位",
                name: "free_type",
                value: 2,
                data: [
                  {
                    text: "院长",
                    value: 0
                  },
                  {
                    text: "主任医师",
                    value: 1
                  },
                  {
                    text: "副主任医师",
                    value: 2
                  },
                  {
                    text: "住院医",
                    value: 3
                  },
                  {
                    text: "医学生",
                    value: 4
                  }
                ]
              }
            ]
          }
        ]
      },
      config1: {
        title: "人群类别-after",
        name: "population_category1",
        value: '',
        data: [
          {
            text: '上班族',
            value: 'office_lady',
            children: [
              {
                component: Input,
                type: "text",
                title: "姓名(无需校验)",
                name: "username",
                value: '',
                placeholder: "请输入用户姓名",
                rules: []
              },
              {
                component: Input,
                type: "IDCard",
                title: "身份证号码",
                name: "idcard",
                value: '',
                placeholder: "请输入身份证号码"
              },
              {
                component: Input,
                type: "tel",
                title: "手机号码",
                name: "mobile",
                value: '',
                placeholder: "请输入您的手机号码"
              }
            ]
          },
          {
            text: '学生',
            value: 'student',
            children: [
              {
                component: Input,
                type: "number",
                title: "每月花费",
                name: "expense",
                value: '',
                unit: "元",
                placeholder: "请输入您每月生活费"
              },
              {
                component: Select2,
                title: "爱好",
                name: "interest",
                value: 'maishu',
                data: [
                  {
                    text: "买书",
                    value: 'maishu',
                    children: [
                      {
                        component: Select2,
                        title: "书籍类型",
                        name: "book_type",
                        value: 'xiaoshuo',
                        data: [
                          {
                            text: '外语',
                            value: 'waiyu'
                          },
                          {
                            text: '汉语',
                            value: 'hanyu'
                          },
                          {
                            text: '小说',
                            value: 'xiaoshuo'
                          }
                        ]
                      },
                      {
                        component: Input,
                        type: "number",
                        title: "买书花费",
                        name: "buy_book_expense",
                        value: '',
                        unit: "元",
                        placeholder: "请输入您每月买书费用"
                      }
                    ]
                  },
                  {
                    text: "娱乐",
                    value: '娱乐'
                  }
                ]
              }
            ]
          },
          {
            text: '自由职业者',
            value: 'free',
            children: [
              {
                component: Select2,
                title: "自由职业者类型",
                name: "free_type",
                value: 1,
                data: [
                  {
                    text: "微商",
                    value: 0
                  },
                  {
                    text: "网络小说写手",
                    value: 1
                  }
                ]
              }
            ]
          }
        ]
      },
      config2: {
        title: "贷款期限",
        name: "loan_term",
        value: '36',
        data: [{
          text: "1个月",
          value: "1"
        }, {
          text: "2个月",
          value: '2'

        }, {
          text: "3个月",
          value: '3'

        },
        {
          text: "4个月",
          value: '4'

        },
        {
          text: "5个月",
          value: '5'

        },
        {
          text: "6个月",
          value: '6'

        },
        {
          text: "7个月",
          value: '7'

        },
        {
          text: "8个月",
          value: '8'

        },
        {
          text: "9个月",
          value: '9'

        },
        {
          text: "36个月",
          value: "36"
        }, {
          text: "自己输入",
          value: "0",
          children: [{
            component: Input,
            type: "number",
            title: "输入您的贷款期限",
            name: "m_term",
            value: "",
            unit: "个月",
            placeholder: "请输入您期望的贷款期限",
            rules: [{
              required: true,
              message: '贷款期限不能为空'
            },
            {
              validator (rule, value, callback, source, options) {
                const { component } = options
                const errors = []
                if (value > 12) {
                  component.setValue('12')
                  errors.push('贷款期限最长12个月，以为您变更为12个月')
                } else if (value < 3) {
                  component.setValue('3')
                  errors.push('贷款期限最短3个月，以为您变更为3个月')
                }
                callback(errors)
              },
              trigger: 'blur'
            }]
          }]
        }],
        rules: [{
          required: true,
          message: '贷款期限不能为空'
        }, {
          validator (rule, value, callback) {
            let errors = []
            if (value === '1') {
              errors.push('目前暂不支持1个月的贷款，请选择贷款期限')
            }
            callback(errors)
          },
          trigger: 'blur'
        }]
      },
      config3: {
        title: "教育程度",
        name: "education",
        value: '2',
        lr: "right",
        placeholder: "请选择贷款期限",
        readonly: true,
        data: [{
          text: "硕士及以上",
          value: "1"
        }, {
          text: "本科",
          value: '2'

        }, {
          text: "大专",
          value: "3"
        }, {
          text: "中专/高中及以下",
          value: "4"
        }]
      },
      count: 0
    }
    this.select1Ref = React.createRef()
    this.select2Ref = React.createRef()
    this.select3Ref = React.createRef()
    this.formRef = React.createRef()
  }
  render () {
    const { count, config, config2, config3 } = this.state
    return <div className='select2-page'>
      <Titlebar theme='b' onBack={this.goHome}>Select2</Titlebar>
      <div style={styles.tips}>下拉列表数据小于6条时固定展示，超过6条出滚动条</div>
      <div className='p-15'>
        请选择以下信息：
        <Form ref={this.formRef}>
          <Select2 {...config} ref={this.select1Ref} />
          <Select2 {...config2} ref={this.select2Ref} />
          <Select2 {...config3} ref={this.select3Ref} />
        </Form>
      </div>
      <div className="pl-15">
        <button onClick={this.doChangeData}>点击改变人群类别data</button>
      </div>
      <div style={styles.btnWrap}>
        <button style={styles.btn} onClick={this.getValue1}>获取人群类别数据</button>
        <button style={styles.btn} onClick={this.getValue2}>获取贷款期限数据</button>
        <button style={styles.btn} onClick={this.getValue3}>获取教育程度数据</button>
      </div>
      <div style={styles.btnWrap}>
        <button style={styles.btn} onClick={this.getValue4}>借助Form组件获取所有数据</button>
      </div>
    </div>
  }
  componentDidMount () {
    this.setState({ config: this.state.config0 })
  }
  doChangeData = e => {
    if (this.state.config.name === "population_category0") {
      this.setState({ config: this.state.config1 })
    } else {
      this.setState({ config: this.state.config0 })
    }
  }
  getValue1 = e => {
    console.log(this.select1Ref.current.getValue())
  }
  getValue2 = e => {
    console.log(this.select2Ref.current.getValue())
  }
  getValue3 = e => {
    console.log(this.select3Ref.current.getValue())
  }
  getValue4 = e => {
    const form = this.formRef.current
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
  goHome = (e) => {}
}

export default Select2Demo
