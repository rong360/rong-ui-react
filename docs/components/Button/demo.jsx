import { useCallback, useState } from 'react';
import { Titlebar, Button } from 'rong-ui-react';

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
};

const ButtonDemo = () => {
  const [count, setCount] = useState(0);

  const goHome = useCallback(() => {}, []);
  const onBtnClick = useCallback((e) => {
    console.log(e);
  }, []);

  return (
    <div style={styles.pageView}>
      <Titlebar theme="b" onBack={goHome}>
        Button
      </Titlebar>

      <div style={styles.exampleList}>
        <div style={styles.exampleItemTitle}>default</div>
        <Button onClick={onBtnClick}>提交</Button>

        <div style={styles.exampleItemTitle}>空心默认圆角按钮（:fill="false" :radius="true"）</div>
        <Button fill={false} radius={true}>
          提交
        </Button>

        <div style={styles.exampleItemTitle}>
          示警按钮（type="warning"）:fill="false" :radius="true"）
        </div>
        <Button type="warning">提交</Button>

        <div style={styles.exampleItemTitle}>
          空心示警按钮(type="warning" :fill="false" :radius="true")
        </div>
        <Button type="warning" fill={false} radius={true}>
          提交
        </Button>

        <div style={styles.exampleItemTitle}>不可用按钮（type="disabled"）</div>
        <Button type="disabled">提交</Button>

        <div style={styles.exampleItemTitle}>
          不可用按钮（type="disabled" :fill="false" :radius="true"）
        </div>
        <Button type="disabled" fill={false} radius={true}>
          提交
        </Button>

        <div style={styles.exampleItemTitle}>
          自定义（type="dark-yellow", 样式表里定义.r--button-dark-yellow相关样式 ）
        </div>
        <Button type="dark-yellow" className="custom-button" style={{ color: 'red' }}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default ButtonDemo;
