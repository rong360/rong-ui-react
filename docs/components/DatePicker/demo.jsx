import { useCallback, useState, useEffect } from 'react'
import { Titlebar, history, Form, DatePicker, ViewSource } from 'rong-ui-react'

const styles = {
  item: {
    display: 'flex',
    marginTop: '20px',
    alignItems: 'center'
  },
  label: {
    width: '120px',
    textAlign: 'right',
    fontSize: '14px'
  },
  rDatepicker: {
    padding: '10px',
    border: '1px solid #efeff4'
  },
  results: {
    fontSize: '14px',
    color: '#333',
    padding: '15px',
    backgroundColor: '#d3d3d3',
    marginTop: '15px',
    lineHeight: '18px',
  }
}

function DatePickerDemo () {
  const [config1, setConfig1] = useState({
    value: '2022/10/22',
    placeholder: '请选择',
    // valueFormat: 'yyyy/mm/dd',
    // textFormat: 'yyyy年mm月dd日',
    textFormat (val) {
      return `${val.year.text},${val.month.text.substr(0, 4)},${val.day.text}`
    },
    // startYear: '',
    // endYear: '',
    // offsetYear: '',
    // yearsLength: '',
    disabled: false,
    language: 'en',
    pickerFormatter: function (type, val) {
      // if (type == 'year') {
      //   return val + '年'
      // } else if (type == 'month') {
      //   return val + '月'
      // } else if (type == 'day') {
      //   return val + '日'
      // }
    },
    pickerTitle: 'hello',
    pickerCancelBtnText: 'cancel',
    pickerConfirmBtnText: 'confirm',
    columnsOrder: ['year', 'month', 'day']
  })
  const [config2, setConfig2] = useState({
    valueFormat: 'yyyy',
    textFormat: 'yyyy年',
    columnsOrder: ['year']
  })
  const [config3, setConfig3] = useState({
    value: '2022/10',
    valueFormat: 'yyyy/mm',
    textFormat: 'yyyy年mm月',
    columnsOrder: ['year', 'month']
  })
  const goHome = useCallback(() => {}, [])
  const fatherChange = useCallback((obj) => {
    setConfig1(Object.assign({ ...config1 }, { value: obj.value }))
    // eslint-disable-next-line
  }, [])
  const motherChange = useCallback((obj) => {
    setConfig2(Object.assign({ ...config2 }, { value: obj.value }))
    // eslint-disable-next-line
  }, [])
  const brotherChange = useCallback((obj) => {
    setConfig3(Object.assign({ ...config3 }, { value: obj.value }))
    // eslint-disable-next-line
  }, [])

  console.log('parent')

  // 模拟异步请求
  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setConfig1(Object.assign({ ...config1 }, { value: '2021/02/26', columnsOrder: ['day', 'month', 'year'] }))
    }, 3000);
    return () => {
      clearTimeout(timeoutID)
    }
    // eslint-disable-next-line
  }, [])

  return <div className='date-picker-page'>
    <Titlebar theme='b' onBack={goHome}>Titlebar</Titlebar>
    <div className='p-15'>
      <div className='fs-14'>请选择以下信息：</div>
      <div style={styles.list}>
        <div style={styles.item}>
          <label style={styles.label}>爸爸生日：</label>
          <DatePicker {...config1} style={styles.rDatepicker} onConfirm={fatherChange} />
        </div>
        <div style={styles.item}>
          <label style={styles.label}>妈妈出生年份：</label>
          <DatePicker {...config2} style={styles.rDatepicker} onConfirm={motherChange} />
        </div>
        <div style={styles.item}>
          <label style={styles.label}>哥哥出生日期：</label>
          <DatePicker {...config3} style={styles.rDatepicker} onConfirm={brotherChange} />
        </div>
      </div>
    </div>
    <div style={styles.results}>
      <p>爸爸生日：{config1.value}</p>
      <p>妈妈出生年份：{config2.value}</p>
      <p>哥哥出生日期：{config3.value}</p>
    </div>
  </div>
}

export default DatePickerDemo
