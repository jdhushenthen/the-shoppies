(this["webpackJsonpthe-shoppies"]=this["webpackJsonpthe-shoppies"]||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){},15:function(e,t,s){"use strict";s.r(t);var n=s(0),a=s(1),i=s.n(a),c=s(3),r=s.n(c),o=(s(13),s(4)),l=s(5),h=s(7),u=s(6),j=(s(14),function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var n;Object(o.a)(this,s),(n=t.call(this,e)).handleRemoveButtonPress=function(e){e.preventDefault();var t=[];t.push.apply(t,n.state.nominations),t.splice(t.indexOf(e.target.value),1),n.setState({query:n.state.query,results:n.state.results,nominations:t}),sessionStorage.setItem("storedNominations",JSON.stringify(t))},n.handleNominateButtonPress=function(e){e.preventDefault();var t=[];t.push.apply(t,n.state.nominations),t.push(e.target.value),n.setState({query:n.state.query,results:n.state.results,nominations:t}),sessionStorage.setItem("storedNominations",JSON.stringify(t))},n.handleInputChange=function(e){e.preventDefault();var t="https://www.omdbapi.com/?apikey=b2798bd0&s="+e.target.value;fetch(t).then((function(e){return e.json()})).then((function(e){var t,s=[];if("True"===e.Response)for(t=0;t<e.Search.length;t++)s.push(e.Search[t].Title+" ("+e.Search[t].Year+")");return s})).then((function(t){n.setState({query:e.target.value,results:t,nominations:n.state.nominations})}))},n.state={query:"",results:[],nominations:[]};var a=JSON.parse(sessionStorage.getItem("storedNominations"));return null!=a&&a.length>0&&(n.state.nominations=a),n}return Object(l.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{class:"Alert",style:{display:5===this.state.nominations.length?"block":"none"},children:[Object(n.jsx)("strong",{children:"Success!"})," You have selected 5 nominations."]}),Object(n.jsx)("div",{className:"Header",children:Object(n.jsxs)("h3",{children:[Object(n.jsx)("img",{class:"Logo",src:"the-shoppies-logo.png"}),"The Shoppies"]})}),Object(n.jsx)("div",{className:"Row",children:Object(n.jsxs)("div",{className:"Card",children:[Object(n.jsx)("label",{children:"Movie title"}),Object(n.jsx)("input",{className:"Search",type:"text",placeholder:"Search OMDB...",onChange:this.handleInputChange})]})}),Object(n.jsxs)("div",{className:"Row",children:[Object(n.jsxs)("div",{className:"Card",children:[Object(n.jsx)("label",{children:Object(n.jsxs)("b",{children:['Results for "',this.state.query,'"']})}),Object(n.jsx)("ul",{children:this.state.results.map((function(t){return Object(n.jsxs)("li",{children:[Object(n.jsx)("span",{children:t}),Object(n.jsx)("span",{children:Object(n.jsx)("button",{className:"Button",type:"button",value:t,onClick:e.handleNominateButtonPress,disabled:!!e.state.nominations.includes(t),children:"Nominate"})})]},t)}))})]}),Object(n.jsxs)("div",{className:"Card",children:[Object(n.jsx)("label",{children:Object(n.jsx)("b",{children:"Nominations"})}),Object(n.jsx)("ul",{children:this.state.nominations.map((function(t){return Object(n.jsxs)("li",{children:[Object(n.jsx)("span",{children:t}),Object(n.jsx)("span",{children:Object(n.jsx)("button",{className:"Button",type:"button",value:t,onClick:e.handleRemoveButtonPress,children:"Remove"})})]},t)}))})]})]})]})}}]),s}(a.Component));r.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(j,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.4ee3b5e9.chunk.js.map