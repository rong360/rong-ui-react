import { useCallback, useState } from 'react';
import { Titlebar, TextScroll } from 'rong-ui-react';

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

const TextScrollDemo = () => {
  const [count, setCount] = useState(0);
  const [list] = useState([
    '让子弹飞一会儿，网络流行词，是2010年末上映的电影《让子弹飞》中的一句对白。',
  ]);
  const goHome = useCallback(() => {}, []);

  return (
    <div className="textscroll-page">
      <Titlebar theme="b" onBack={goHome}>
        TextScroll
      </Titlebar>

      <div className={styles.exampleList}>
        <div style={styles.exampleItemTitle}>1,默认</div>
        <TextScroll list={list} />

        <div style={styles.exampleItemTitle}>2,插槽</div>
        <TextScroll
          list={list}
          prepend={<span style={{ padding: '0 10px', color: 'red' }}>Tips:</span>}
        />
      </div>
    </div>
  );
};

export default TextScrollDemo;
