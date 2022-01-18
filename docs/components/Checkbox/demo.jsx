import React, { useCallback, useState, useEffect } from 'react'
import { Titlebar, Checkbox } from 'rong-ui-react'

// import './demo.less'
let style = document.createElement("style");
style.appendChild(document.createTextNode(`
.long-checkbox {
  background-color: #e5e5e5;
  width: 80px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  font-size: 12px;
}
.long-checkbox .rc-checkbox {
  display: none;
}
.long-checkbox.r-checkbox-checked{
  background-color: #666;
  color: #fff;
}
.mt-5 {
  margin-top: 5px;
}
.mr-5 {
  margin-right: 5px;
}
.p-15 {
  padding: 15px;
}
.pt-10 {
  padding-top: 10px;
}
.pt-15 {
  padding-top: 15px;
}
.pt-30 {
  padding-top: 30px;
}
.pr-10 {
  padding-right: 10px;
}
.fs-12 {
  font-size: 12px;
}
.fs-14 {
  font-size: 14px;
}
`))

let head = document.getElementsByTagName("head")[0];
head.appendChild(style);


const styles = {}

const plainOptions = ['Apple', 'Pear', 'Orange']
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]
const interestOptions = [
  {
    label: '唱歌',
    value: '1',
    className: 'long-checkbox mr-5'
  },
  {
    label: '跳舞',
    value: '2',
    className: 'long-checkbox mr-5'
  },
  {
    label: '美术',
    value: '3',
    className: 'long-checkbox mr-5'
  },
  {
    label: '以上都无',
    value: '0',
    type: 'radio',
    className: 'long-checkbox'
  }
]

const CheckboxDemo = () => {
  const goHome = useCallback(() => history.push({ pathname: '/' }), [history])
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)


  const [defaultPlain, setDefaultPlain] = useState(['Apple', 'Orange'])
  const [defaultPlain2, setDefaultPlain2] = useState(['Pear'])
  const [defaultPlain3, setDefaultPlain3] = useState(['Apple'])
  const [defaultPlain4, setDefaultPlain4] = useState(['C'])
  const [checkAll, setCheckAll] = useState(false)
  const [checkedList, setCheckedList] = useState(['Apple', 'Orange']);

  const [loanAmount, setLoanAmount] = useState()
  const [credits, setCredits] = useState(['2', '3'])
  const [interest, setInterest] = useState(['2', '3'])

  const onBasicChange = useCallback((e) => {
    console.log(`checked = ${e.target.checked}`);
  }, [])
  const onControlChange = useCallback((e) => {
    setChecked(e.target.checked)
  }, [])
  const onGroupChange = useCallback((checkedValues) => {
    setDefaultPlain(checkedValues)
  }, [])
  const onGroup2Change = useCallback((checkedValues) => {
    setDefaultPlain2(checkedValues)
  }, [])
  const onGroup3Change = useCallback((checkedValues) => {
    setDefaultPlain3(checkedValues)
  }, [])
  const onGroup4Change = useCallback((checkedValues) => {
    setDefaultPlain4(checkedValues)
  }, [])
  const onCheckAllChange = useCallback(e => {
    setCheckAll(e.target.checked)
    setCheckedList(e.target.checked ? plainOptions : [])
  }, [])
  const onGroup5Change = useCallback((checkedValues) => {
    setCheckedList(checkedValues)
    setCheckAll(checkedValues.length === plainOptions.length)
  }, [])

  const onLoanAmountChange = useCallback(e => {
    setLoanAmount(e.target.checked ? e.target.value : '')
  }, [])
  const onLoanCreditsChange = useCallback((checkedValues, e) => {
    if (e.target.value === '0') {
      setCredits(['0'])
    } else {
      let index = checkedValues.findIndex(item => item === '0')
      index > -1 && checkedValues.splice(index, 1)
      setCredits(checkedValues)
    }
  }, [])
  const onInterestChange = useCallback((checkedValues, e) => {
    if (e.target.value === '0') {
      setInterest(['0'])
    } else {
      let index = checkedValues.findIndex(item => item === '0')
      index > -1 && checkedValues.splice(index, 1)
      setInterest(checkedValues)
    }
  }, [])

  const toggleChecked = () => setChecked(!checked)
  const toggleDisabled = () => setDisabled(!disabled)

  useEffect(() => {
    setTimeout(() => {
      setChecked(true)
    }, 600);
  }, [])


  return <div className={styles['checkbox-page']}>
    <Titlebar theme='b' onBack={goHome}>Checkbox</Titlebar>
    <div className='p-15 fs-14'>
      <div>基本用法 <span className='fs-12'>(简单的 checkbox)</span></div>
      <div className='pt-10'><Checkbox defaultChecked={true} onChange={onBasicChange}>Checkbox</Checkbox></div>


      <div className='pt-30'>不可用 <span className='fs-12'>(checkbox 不可用)</span></div>
      <div className='pt-10'>
        <Checkbox defaultChecked={false} disabled>Checkbox</Checkbox>
        <Checkbox defaultChecked disabled>Checkbox</Checkbox>
      </div>


      <div className='pt-30'>受控的 Checkbox <span className='fs-12'>(联动 checkbox)</span></div>
      <div className='pt-10'><Checkbox checked={checked} disabled={disabled} onChange={onControlChange}>Checkbox</Checkbox></div>
      <div className='pt-10'>
        <button onClick={toggleChecked}>{checked ? 'Uncheck' : 'Check'}</button> &nbsp;&nbsp;
        <button onClick={toggleDisabled}>{disabled ? 'Enable' : 'Disable'}</button>
      </div>



      <div className='pt-30'>Checkbox 组 <span className='fs-12'>(方便的从数组生成 Checkbox 组)</span></div>
      <div className='pt-10'><Checkbox.Group options={plainOptions} value={defaultPlain} onChange={onGroupChange}></Checkbox.Group></div>
      <div className='pt-10'>{`[${defaultPlain.join(',')}]`}</div>

      <div className='pt-15'><Checkbox.Group options={options} value={defaultPlain2} onChange={onGroup2Change}></Checkbox.Group></div>
      <div className='pt-10'>{`[${defaultPlain2.join(',')}]`}</div>

      <div className='pt-15'><Checkbox.Group options={optionsWithDisabled} value={defaultPlain3} onChange={onGroup3Change}></Checkbox.Group></div>
      <div className='pt-10'>{`[${defaultPlain3.join(',')}]`}</div>



      <div className='pt-30'>布局 <span className='fs-12'>(Checkbox.Group 内嵌 Checkbox, 实现灵活的布局)</span></div>
      <div className='pt-10'>
        <Checkbox.Group value={defaultPlain4} style={{ width: '100%' }} onChange={onGroup4Change}>
          <span className='pr-10'>
            <Checkbox value="A">A</Checkbox>
          </span>
          <span className='pr-10'>
            <Checkbox value="B">B</Checkbox>
          </span>
          <span className='pr-10'>
            <Checkbox value="C" defaultChecked={true}>C</Checkbox>
          </span>
          <span className='pr-10'>
            <Checkbox value="D">D</Checkbox>
          </span>
          <span className='pr-10'>
            <Checkbox value="E">E</Checkbox>
          </span>
        </Checkbox.Group>
      </div>
      <div className='pt-10'>{`[${defaultPlain4.join(',')}]`}</div>



      <div className='pt-30'>全选</div>
      <div className='pt-10'>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          Check all
        </Checkbox>
      </div>
      <div className='pt-10'>
        <Checkbox.Group options={plainOptions} value={checkedList} onChange={onGroup5Change} />
      </div>



      <div className='pt-30'>您需要的贷款额度（单选）</div>
      <div className='pt-10'>
        <Checkbox className='long-checkbox mr-5' value='1' checked={loanAmount === '1'} onChange={onLoanAmountChange}>2万以下</Checkbox>
        <Checkbox className='long-checkbox mr-5' value='2' checked={loanAmount === '2'} onChange={onLoanAmountChange}>2-5万</Checkbox>
        <Checkbox className='long-checkbox mr-5' value='3' checked={loanAmount === '3'} onChange={onLoanAmountChange}>5-10万</Checkbox>
        <Checkbox className='long-checkbox mr-5' value='4' checked={loanAmount === '4'} onChange={onLoanAmountChange}>10-50万</Checkbox>
        <Checkbox className='long-checkbox mr-5 mt-5' value='5' checked={loanAmount === '5'} onChange={onLoanAmountChange}>50万以上</Checkbox>
      </div>
      <div className='pt-10'>贷款额度：{loanAmount}</div>


      <div className='pt-30'>选择您的资质, 提高贷款成功率（可多选）</div>
      <div className='pt-10'>
        <Checkbox.Group value={credits} onChange={onLoanCreditsChange}>
          <Checkbox className='long-checkbox mr-5' value='1'>有房</Checkbox>
          <Checkbox className='long-checkbox mr-5' value='2'>有车</Checkbox>
          <Checkbox className='long-checkbox mr-5' value='3' >有公积金</Checkbox>
          <Checkbox className='long-checkbox mr-5' value='4'>有社保</Checkbox>
          <Checkbox className='long-checkbox mr-5 mt-5' value='5'>有保单</Checkbox>
          <Checkbox className='long-checkbox mr-5 mt-5' value='6'>有企业</Checkbox>
          <Checkbox className='long-checkbox mr-5 mt-5' value='0'>以上都无</Checkbox>
        </Checkbox.Group>
      </div>
      <div className='pt-10'>{`[${credits.join(',')}]`}</div>

      <div className='pt-10'>
        <Checkbox.Group options={interestOptions} value={interest} onChange={onInterestChange}></Checkbox.Group>
      </div>
      <div className='pt-10'>{`[${interest.join(',')}]`}</div>

    </div>
  </div>
}

export default CheckboxDemo
