// https://www.mianshigee.com/tutorial/dumi-1.x/guide-control-route-generate.md
// https://www.bookstack.cn/read/dumi-1.x/guide-demo-principle.md
// https://d.umijs.org/zh-CN/guide/faq
// https://github.com/umijs/dumi/issues?page=5&q=is%3Aissue+is%3Aclosed
import { defineConfig } from 'dumi';

const isTestReleasePkg = process.env.NODE_START_ENV === 'release'// 打开测试release包

const repo = 'rong-ui-react';

const logo =
'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

export default defineConfig({
  title: repo,
  favicon: logo,
  logo: logo,
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  history: {
    type: 'hash'
  },
  // base: `/${repo}/`,
  publicPath: `/${repo}/`,
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  dynamicImport: {}, // 拆包 站点过大时可以优化首屏加载速度
  mode: 'site',
  styles: [
    `
    * {
        margin: 0;
        padding: 0;
    }
    .__dumi-default-mobile-demo-layout {
      padding: 0 !important;
    }
    html,
    body,
    #root,
    .__dumi-default-mobile-demo-layout,
    .__dumi-default-mobile-demo-layout > div
    {
      height: 100%;
    }
    `
  ],
  resolve: {
    // 生成均以 resolve.includes 配置项的值作为基础检测路径，倘若我们不配置该值，则会默认探测 docs 目录、src 目录（普通项目）、packages/pkg/src 目录（lerna 项目）
    includes: ['docs'],
  },
  themeConfig: {
    carrier: '中国移动',
    hd: {
      // umi-hd 的 750 高清方案（默认值）
      // 根据不同的设备屏幕宽度断点切换高清方案
      rules: [
      ],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    }
  },
  theme: {
    // 修改 dumi 默认主题的主色，更多变量详见：https://github.com/umijs/dumi/blob/master/packages/theme-default/src/style/variables.less
    '@c-primary': '#000',
  },
  // 配置顶部导航
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    // {
    //   title: '使用说明',
    //   path: '/guide',
    // },
    // {
    //   title: '组件',
    //   path: '/components',
    // },
    // {
    //   title: 'GitHub',
    //   path: 'https://github.com/umijs/dumi',
    // }
  ],
  // 配置侧边菜单
  // menus: {
  //   '/guide': [
  //     {
  //       title: '简介',
  //       path: '/guide/introduction'
  //     },
  //     {
  //       title: '快速上手',
  //       path: '/guide/quick-start' // 注意驼峰转成 -
  //     },
  //   ],
  //   '/components': [
  //     {
  //       title: '弹窗',
  //       children: [
  //         {
  //           title: 'Modal对话框',
  //           path: '/components/modal'
  //         },
  //         {
  //           title: 'Loading加载中',
  //           path: '/components/loading'
  //         },
  //         {
  //           title: 'Toast提示',
  //           path: '/components/toast'
  //         }
  //       ]
  //     },
  //     {
  //       title: '通用',
  //       children: [
  //         {
  //           title: 'Titlebar 标题',
  //           path: '/components/titlebar'
  //         },
  //         {
  //           title: 'Button 按钮',
  //           path: '/components/button'
  //         },
  //       ]
  //     }
  //   ]
  // },
  alias: {
    'rong-ui-react': isTestReleasePkg ? '/release' : '/src',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'rong-ui-react',
        libraryDirectory: isTestReleasePkg ? 'es' : '',
        style: isTestReleasePkg ? 'css' : true
      }
    ]
  ],
  cssLoader: {
    localsConvention: 'camelCase' // // .bar-foo { font-size: 16px; }, 调用 className={styles.barFoo}
  }
});

