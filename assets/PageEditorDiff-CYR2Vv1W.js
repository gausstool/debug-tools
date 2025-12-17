import{l as c}from"./index-C50JY8Fn.js";import{d as p,b as g,x as s,j as w,y as _,c as E,f as y,l as h,o as V}from"./core-BwSNT4NU.js";import{E as r,c as d,a as b,b as C}from"./editor-manager-jiG3-D10.js";import"./monaco-editor-DZ47WWuQ.js";import"./sql-formatter-DEqxU7E6.js";const D={class:"page-editor-diff",id:"editor-diff"},M=`// 粘贴需要进行比对的代码
void main() {
  printf("hello, world");
}
`,j=`// 粘贴需要进行比对的代码
function main() { 
  console.log("Hello World!"); 
}
`,$=p({__name:"PageEditorDiff",setup(k){const i=g(),e=s(null),a=s(null),o=s(null),l=h();async function u(){i.value&&(a.value=await d("","javascript"),o.value=await d("","javascript"),e.value=await b(i.value),e.value.setModel({original:a.value,modified:o.value}),await C(e.value,async()=>{await f()}),r.addEditor(e.value))}async function f(){const t=a.value.getValue(),n=o.value.getValue();await c.setItem(`debug-tools-${String(l.name)}`,{code1:t,code2:n})}async function m(){const t=await c.getItem(`debug-tools-${String(l.name)}`),{code1:n="",code2:v=""}=t||{};a.value.setValue(n||M),o.value.setValue(v||j)}return w(async()=>{await u(),await m()}),_(()=>{r.dispose()}),(t,n)=>(V(),E("div",D,[y("div",{ref_key:"editor1Container",ref:i,class:"container"},null,512)]))}});export{$ as default};
