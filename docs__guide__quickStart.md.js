(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[23],{dNsB:function(e,n,t){"use strict";t.r(n);var a=t("q1tI"),o=t.n(a),c=t("dEAq"),r=t("H1Ra"),l=o.a.memo((e=>{e.demos;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"markdown"},o.a.createElement("h1",{id:"\u7b2c\u4e00\u4e2a\u4f8b\u5b50"},o.a.createElement(c["AnchorLink"],{to:"#\u7b2c\u4e00\u4e2a\u4f8b\u5b50","aria-hidden":"true",tabIndex:-1},o.a.createElement("span",{className:"icon icon-link"})),"\u7b2c\u4e00\u4e2a\u4f8b\u5b50"),o.a.createElement("blockquote",null,o.a.createElement("p",null,"\u57fa\u4e8eReact UI\u7ec4\u4ef6\u5e93.")),o.a.createElement(r["a"],{code:'import React from "react";\nimport ReactDOM from "react-dom";\nimport {Button, Modal } from "rong-ui-react";\nimport "./index.css";\n\nconst onBtnClick = () => {\n  Modal.create(\'Hello\')\n}\n\nReactDOM.render(\n  <div className="App">\n    <h1>Modal\u5f39\u7a97</h1>\n    <Button style={{ marginLeft: 8 }} onClick={onBtnClick}>\n      Primary Button\n    </Button>\n  </div>,\n  document.getElementById("root")\n);',lang:"js"})))}));n["default"]=e=>{var n=o.a.useContext(c["context"]),t=n.demos;return o.a.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&c["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),o.a.createElement(l,{demos:t})}}}]);