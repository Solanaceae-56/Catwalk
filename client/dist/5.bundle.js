(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{201:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(2),c=a.n(l),i=function(e){var t={fontSize:"25px"},a={textDecoration:"underline",fontSize:"20px"},r={textAlign:"center"},l=e.relatedItem.data,c=e.pageProduct.data,i={};c.features.forEach((function(e){i[e.feature]={value1:e.value,value2:null}})),l.features.forEach((function(e){i[e.feature]?i[e.feature].value2=e.value:i[e.feature]={value1:null,value2:e.value}}));return n.a.createElement("div",{className:"modal-comparison-body"},n.a.createElement("div",{className:"modal-box"},n.a.createElement("div",{className:"modal-table"},function(){var e=[],o=[],u=[];o.push(n.a.createElement("td",null),n.a.createElement("td",null,"Comparing"),n.a.createElement("td",null)),u.push(n.a.createElement("td",null,c.name),n.a.createElement("td",null),n.a.createElement("td",null,l.name)),e.push(n.a.createElement("tr",{style:t},o)),e.push(n.a.createElement("tr",{style:a},u));for(var d=0;d<Object.keys(i).length;d++){var s=[],m=Object.keys(i)[d];s.push(n.a.createElement("td",null,i[m].value1||"-"),n.a.createElement("td",null,m),n.a.createElement("td",null,i[m].value2||"-")),e.push(n.a.createElement("tr",{style:r},s))}return e}())),n.a.createElement("span",{className:"modal-close-icon",onClick:e.handleClose},"x"))},o=a(9),u=a(20);function d(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var f=function(e){var t,a=Object(r.useContext)(u.default),l=s(Object(r.useState)(""),2),m=l[0],f=l[1],p=s(Object(r.useState)({}),2),v=(p[0],p[1],s(Object(r.useState)(null),2)),h=v[0],y=v[1],b=s(Object(r.useState)(null),2),g=b[0],E=b[1],j=s(Object(r.useState)(!1),2),I=j[0],N=j[1],w=s(Object(r.useState)(0),2),S=w[0],O=w[1],C=function(){N(!I)};return Object(r.useEffect)((function(){return c.a.get("/products",{params:{productId:e.relatedItem.data.id,path:"/products/:product_id/styles"}}).then((function(e){f(e.data.results[0].photos[0].url),y(e.data.results[0].sale_price),E(e.data.results[0].original_price)})),c.a.get("/reviews/meta",{params:{product_id:e.relatedItem.data.id}}).then((function(e){var t=0,a=0;for(var r in e.data.ratings)t+=r*parseInt(e.data.ratings[r],10),a+=parseInt(e.data.ratings[r],10);var n=Math.round(1e3*t/a)/1e3;O(n)})).catch((function(e){O(0)})),function(){!1}}),[e.relatedItem.data.id]),n.a.createElement("div",(d(t={className:"related-card"},"className",a?"related-card-dark":"related-card-light"),d(t,"id",e.relatedItem.data.id),t),n.a.createElement("i",{className:"fas fa-star",onClick:C}),I&&n.a.createElement(i,{handleClose:C,relatedItem:e.relatedItem,pageProduct:e.pageProduct,style:"z-index:3"}),m?n.a.createElement("img",{className:"related-img",src:m,alt:e.relatedItem.data.name,id:e.relatedItem.data.id,onClick:e.handleCardClick}):n.a.createElement("img",{className:"no-image",style:{backgroundColor:"white"},src:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",alt:e.relatedItem.data.name,id:e.relatedItem.data.id,onClick:e.handleCardClick}),n.a.createElement("div",{className:"related-card-category",id:e.relatedItem.data.id},e.relatedItem.data.category),n.a.createElement("div",{className:"related-card-name",id:e.relatedItem.data.id},e.relatedItem.data.name),h?n.a.createElement("div",{className:"related-card-sale-price",id:e.relatedItem.data.id},h):n.a.createElement("div",{className:"related-card-original-price",id:e.relatedItem.data.id},g),n.a.createElement("div",{className:"related-review",id:e.relatedItem.data.id},n.a.createElement(o.a,{id:e.relatedItem.data.id,value:S})))},p=a(197),v=a(45);function h(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var g=function(e){var t,a,l,i,o=Object(r.useContext)(u.default),d=y(Object(r.useState)([]),2),s=d[0],m=d[1],b=y(Object(r.useState)({}),2),g=b[0],E=b[1],j=y(Object(r.useState)(!1),2),I=j[0],N=j[1],w=y(Object(r.useState)(!0),2),S=w[0],O=w[1];Object(r.useEffect)((function(){var t=!0;return c.a.get("/products",{params:{productId:e.defaultProduct_id,path:"/products/:product_id"}}).then((function(e){E(e)})),c.a.get("/products",{params:{productId:e.defaultProduct_id,path:"/products/:product_id/related"}}).then((function(e){if(t){for(var a=[],r=0;r<e.data.length;r++)a.push(c.a.get("/products",{params:{productId:e.data[r],path:"/products/:product_id"}}));return p.Promise.all(a)}})).then((function(e){m(e)})),function(){t=!1}}),[e.defaultProduct_id]);var C=Object(r.useRef)(),k=function(e){C.current.scrollLeft+=e};return void 0!==s&&n.a.createElement("div",{className:"related-item"},o?n.a.createElement(v.a,(h(t={className:"left-arrow"},"className",I?"active":"non-active"),h(t,"size",64),h(t,"onClick",(function(){return k(-100)})),t)):n.a.createElement(v.b,(h(a={className:"left-arrow"},"className",I?"active":"non-active"),h(a,"size",64),h(a,"style",{color:"#a6a6a6"}),h(a,"onClick",(function(){return k(-100)})),a)),n.a.createElement("div",{className:"related-slide",ref:C,onLoad:function(){var e=C.current;e.clientWidth&&e.addEventListener("scroll",(function(){N(e.scrollLeft>0),O(e.scrollLeft<e.scrollWidth-e.clientWidth||e.scrollWidth<e.clientWidth)}))}},s.map((function(t,a){return n.a.createElement(f,{key:a,value:t.data.id,relatedItem:t,pageProduct:g,handleCardClick:e.handleCardClick})}))),o?n.a.createElement(v.c,(h(l={className:"right-arrow"},"className",S?"active":"non-active"),h(l,"size",64),h(l,"onClick",(function(){return k(100)})),l)):n.a.createElement(v.d,(h(i={className:"right-arrow"},"className",S?"active":"non-active"),h(i,"size",64),h(i,"style",{color:"#a6a6a6"}),h(i,"onClick",(function(){return k(100)})),i)))};function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var I=function(e){var t,a,l,i=Object(r.useContext)(u.default),d=E(Object(r.useState)(""),2),s=d[0],m=d[1],f=E(Object(r.useState)(null),2),p=f[0],v=f[1],h=E(Object(r.useState)(null),2),y=h[0],b=h[1],g=E(Object(r.useState)(""),2),j=g[0],I=g[1],N=E(Object(r.useState)(""),2),w=N[0],S=N[1],O=E(Object(r.useState)(0),2),C=O[0],k=O[1];return Object(r.useEffect)((function(){c.a.get("/products",{params:{productId:e.productId,path:"/products/:product_id/styles"}}).then((function(e){m(e.data.results[0].photos[0].url),v(e.data.results[0].sale_price),b(e.data.results[0].original_price)})),c.a.get("/products",{params:{productId:e.productId,path:"/products/:product_id"}}).then((function(e){I(e.data.name),S(e.data.category)})),c.a.get("/reviews/meta",{params:{product_id:e.productId}}).then((function(e){for(var t=0,a=0,r=1;r<=5;r++)t+=r*parseInt(e.data.ratings[r],10),a+=parseInt(e.data.ratings[r],10);var n=Math.round(1e3*t/a)/1e3;k(n/5*100+"%")})).catch((function(e){k(0)}))}),[]),n.a.createElement("div",(l=i?"related-card-dark":"related-card-light",(a="className")in(t={className:"outfit-card"})?Object.defineProperty(t,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[a]=l,t),n.a.createElement("i",{className:"far fa-times-circle",id:e.productId,onClick:e.removeFromList}),s?n.a.createElement("img",{className:"outfit-img",src:s,alt:"product default image",width:"180",height:"200"}):n.a.createElement("img",{className:"outfit-img",src:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",alt:"product default image",width:"150",height:"200"}),n.a.createElement("div",{className:"outfit-card-category"},w),n.a.createElement("div",{className:"outfit-card-name"},j),p?n.a.createElement("div",{className:"outfit-card-sale-price"},p):n.a.createElement("div",{className:"outfit-card-original-price"},y),n.a.createElement("div",{className:"outfit-review"},n.a.createElement(o.a,{value:C})))};function N(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var O=function(e){var t,a,l,i,o=Object(r.useContext)(u.default),d=w(Object(r.useState)([]),2),s=d[0],m=d[1],f=w(Object(r.useState)(!1),2),p=f[0],h=f[1],y=w(Object(r.useState)(!0),2),b=y[0],g=y[1],E=function(e){c.a.delete("/outfit/".concat("dummy",".").concat(e.target.id)).then((function(e){m(e.data)}))};Object(r.useEffect)((function(){c.a.get("/outfit/".concat("dummy")).then((function(e){m(e.data)}))}),[]);var j=Object(r.useRef)(),S=function(e){j.current.scrollLeft+=e};return n.a.createElement("div",{className:"outfit-list"},o?n.a.createElement(v.a,(N(t={className:"left-arrow"},"className",p?"active":"non-active"),N(t,"size",64),N(t,"onClick",(function(){return S(-100)})),t)):n.a.createElement(v.b,(N(a={className:"left-arrow"},"className",p?"active":"non-active"),N(a,"size",64),N(a,"style",{color:"#a6a6a6"}),N(a,"onClick",(function(){return S(-100)})),a)),n.a.createElement("div",{className:"outfit-slide",ref:j,onLoad:function(){var e=j.current;e.clientWidth&&e.addEventListener("scroll",(function(){h(e.scrollLeft>0),g(e.scrollWidth===e.clientWidth||e.scrollLeft<e.scrollWidth-e.clientWidth)}))}},n.a.createElement("div",{className:"outfit-list-add-outfit"},n.a.createElement("img",{className:"outfit-add",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzhJV3XJfPqf_txRnqYivCCWtJtfQ5o28Bt1NDrKrQhLt5eW8jpnCStBerRmX1JDjPSQ&  usqp=CAU",alt:"click to add to outfit list",onClick:function(){c.a.post("/outfit/".concat("dummy",".").concat(e.defaultProduct_id)).then((function(e){})),c.a.get("/outfit/".concat("dummy")).then((function(e){m(e.data)}))}}),n.a.createElement("h1",null,"Add to Outfit"),n.a.createElement("h4",{className:"white-text"},"click"),n.a.createElement("h5",{className:"white-text"},"here")),s.map((function(e,t){return n.a.createElement(I,{key:t,productId:e,removeFromList:E})}))),o?n.a.createElement(v.c,(N(l={className:"right-arrow"},"className",b?"active":"non-active"),N(l,"size",64),N(l,"onClick",(function(){return S(100)})),l)):n.a.createElement(v.d,(N(i={className:"right-arrow"},"className",b?"active":"non-active"),N(i,"size",64),N(i,"style",{color:"#a6a6a6"}),N(i,"onClick",(function(){return S(100)})),i)))};function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return k(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}t.default=function(e){var t=C(Object(r.useState)(),2),a=t[0],l=t[1];Object(r.useEffect)((function(){l(e.product_id)}),[e.product_id]);return a?n.a.createElement("div",{className:"related-products",onClick:function(e){var t={element:e.target.className,widget:"Related Items & Comparison",time:Date()};c.a.post("/interactions",t).then((function(e){})).catch((function(e){}))}},n.a.createElement("h1",null,"Related Products"),n.a.createElement(g,{defaultProduct_id:a,handleCardClick:e.handleCardClick}),n.a.createElement("h1",null,"Your Outfit"),n.a.createElement(O,{defaultProduct_id:a})):n.a.createElement("div",null,"Loading")}}}]);