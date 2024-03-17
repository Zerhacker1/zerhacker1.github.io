var dh=Object.defineProperty;var fh=(r,e,t)=>e in r?dh(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ge=(r,e,t)=>(fh(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.1
 * @author George Michael Brower
 * @license MIT
 */class cn{constructor(e,t,n,i,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),cn.nextNameID=cn.nextNameID||0,this.$name.id=`lil-gui-name-${++cn.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ph extends cn{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function po(r){let e,t;return(e=r.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const mh={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:po,toHexString:po},_s={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},gh={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,e,t=1){const n=_s.fromHexString(r);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([r,e,t],n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return _s.toHexString(i)}},_h={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,e,t=1){const n=_s.fromHexString(r);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r,g:e,b:t},n=1){n=255/n;const i=r*n<<16^e*n<<8^t*n<<0;return _s.toHexString(i)}},xh=[mh,_s,gh,_h];function vh(r){return xh.find(e=>e.match(r))}class yh extends cn{constructor(e,t,n,i){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=vh(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=po(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Sr extends cn{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Mh extends cn{constructor(e,t,n,i,s,o){super(e,t,n,"number"),this._initInput(),this.min(i),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let v=parseFloat(this.$input.value);isNaN(v)||(this._stepExplicit&&(v=this._snap(v)),this.setValue(this._clamp(v)))},n=v=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+v),this.$input.value=this.getValue())},i=v=>{v.key==="Enter"&&this.$input.blur(),v.code==="ArrowUp"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v))),v.code==="ArrowDown"&&(v.preventDefault(),n(this._step*this._arrowKeyMultiplier(v)*-1))},s=v=>{this._inputFocused&&(v.preventDefault(),n(this._step*this._normalizeMouseWheel(v)))};let o=!1,a,l,c,h,u;const d=5,p=v=>{a=v.clientX,l=c=v.clientY,o=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",_)},g=v=>{if(o){const x=v.clientX-a,y=v.clientY-l;Math.abs(y)>d?(v.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>d&&_()}if(!o){const x=v.clientY-c;u-=x*this._step*this._arrowKeyMultiplier(v),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)}c=v.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",_)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(f,v,x,y,E)=>(f-v)/(x-v)*(E-y)+y,t=f=>{const v=this.$slider.getBoundingClientRect();let x=e(f,v.left,v.right,this._min,this._max);this._snapClampSetValue(x)},n=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=f=>{t(f.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let o=!1,a,l;const c=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),o=!1},h=f=>{f.touches.length>1||(this._hasScrollBar?(a=f.touches[0].clientX,l=f.touches[0].clientY,o=!0):c(f),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=f=>{if(o){const v=f.touches[0].clientX-a,x=f.touches[0].clientY-l;Math.abs(v)>Math.abs(x)?c(f):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else f.preventDefault(),t(f.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),g=400;let _;const m=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const x=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(p,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Sh extends cn{constructor(e,t,n,i){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.innerHTML=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class Eh extends cn{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Th=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function bh(r){const e=document.createElement("style");e.innerHTML=r;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let aa=!1;class No{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:i,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!aa&&a&&(bh(Th),aa=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=o}add(e,t,n,i,s){if(Object(n)===n)return new Sh(this,e,t,n);const o=e[t];switch(typeof o){case"number":return new Mh(this,e,t,n,i,s);case"boolean":return new ph(this,e,t);case"string":return new Eh(this,e,t);case"function":return new Sr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,n=1){return new yh(this,e,t,n)}addFolder(e){const t=new No({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Sr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Sr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const Ah=No;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="158",di={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wh=0,la=1,Rh=2,gc=1,_c=2,yn=3,wn=0,Dt=1,on=2,Hn=0,Ni=1,ca=2,ha=3,ua=4,Ch=5,ni=100,Lh=101,Ph=102,da=103,fa=104,Ih=200,Dh=201,Nh=202,Uh=203,mo=204,go=205,Oh=206,Fh=207,Bh=208,zh=209,Gh=210,Hh=211,kh=212,Vh=213,Wh=214,Xh=0,jh=1,Yh=2,sr=3,qh=4,$h=5,Kh=6,Zh=7,Oo=0,Jh=1,Qh=2,kn=0,eu=1,tu=2,nu=3,iu=4,su=5,pa="attached",ru="detached",xc=300,Fi=301,Bi=302,_o=303,xo=304,dr=306,zi=1e3,Vt=1001,rr=1002,vt=1003,vo=1004,nr=1005,It=1006,vc=1007,ai=1008,Vn=1009,ou=1010,au=1011,Fo=1012,yc=1013,Bn=1014,En=1015,xs=1016,Mc=1017,Sc=1018,si=1020,lu=1021,Wt=1023,cu=1024,hu=1025,ri=1026,Gi=1027,uu=1028,Ec=1029,du=1030,Tc=1031,bc=1033,Er=33776,Tr=33777,br=33778,Ar=33779,ma=35840,ga=35841,_a=35842,xa=35843,fu=36196,va=37492,ya=37496,Ma=37808,Sa=37809,Ea=37810,Ta=37811,ba=37812,Aa=37813,wa=37814,Ra=37815,Ca=37816,La=37817,Pa=37818,Ia=37819,Da=37820,Na=37821,wr=36492,Ua=36494,Oa=36495,pu=36283,Fa=36284,Ba=36285,za=36286,vs=2300,Hi=2301,Rr=2302,Ga=2400,Ha=2401,ka=2402,mu=2500,gu=0,Ac=1,yo=2,wc=3e3,oi=3001,_u=3200,xu=3201,Bo=0,vu=1,Xt="",rt="srgb",St="srgb-linear",zo="display-p3",fr="display-p3-linear",or="linear",tt="srgb",ar="rec709",lr="p3",pi=7680,Va=519,yu=512,Mu=513,Su=514,Eu=515,Tu=516,bu=517,Au=518,wu=519,Mo=35044,Wa="300 es",So=1035,Tn=2e3,cr=2001;class Xn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xa=1234567;const ds=Math.PI/180,ki=180/Math.PI;function en(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[r&255]+Et[r>>8&255]+Et[r>>16&255]+Et[r>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function ft(r,e,t){return Math.max(e,Math.min(t,r))}function Go(r,e){return(r%e+e)%e}function Ru(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Cu(r,e,t){return r!==e?(t-r)/(e-r):0}function fs(r,e,t){return(1-t)*r+t*e}function Lu(r,e,t,n){return fs(r,e,1-Math.exp(-t*n))}function Pu(r,e=1){return e-Math.abs(Go(r,e*2)-e)}function Iu(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Du(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Nu(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Uu(r,e){return r+Math.random()*(e-r)}function Ou(r){return r*(.5-Math.random())}function Fu(r){r!==void 0&&(Xa=r);let e=Xa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bu(r){return r*ds}function zu(r){return r*ki}function Eo(r){return(r&r-1)===0&&r!==0}function Rc(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function hr(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Gu(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),p=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*p,a*c);break;case"YXY":r.set(l*p,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function an(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ze(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Cc={DEG2RAD:ds,RAD2DEG:ki,generateUUID:en,clamp:ft,euclideanModulo:Go,mapLinear:Ru,inverseLerp:Cu,lerp:fs,damp:Lu,pingpong:Pu,smoothstep:Iu,smootherstep:Du,randInt:Nu,randFloat:Uu,randFloatSpread:Ou,seededRandom:Fu,degToRad:Bu,radToDeg:zu,isPowerOfTwo:Eo,ceilPowerOfTwo:Rc,floorPowerOfTwo:hr,setQuaternionFromProperEuler:Gu,normalize:Ze,denormalize:an};class Ee{constructor(e=0,t=0){Ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,i,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],v=i[1],x=i[4],y=i[7],E=i[2],C=i[5],b=i[8];return s[0]=o*_+a*v+l*E,s[3]=o*m+a*x+l*C,s[6]=o*f+a*y+l*b,s[1]=c*_+h*v+u*E,s[4]=c*m+h*x+u*C,s[7]=c*f+h*y+u*b,s[2]=d*_+p*v+g*E,s[5]=d*m+p*x+g*C,s[8]=d*f+p*y+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,p=c*s-o*l,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Cr.makeScale(e,t)),this}rotate(e){return this.premultiply(Cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cr=new He;function Lc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ys(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Hu(){const r=ys("canvas");return r.style.display="block",r}const ja={};function ps(r){r in ja||(ja[r]=!0,console.warn(r))}const Ya=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qa=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ts={[St]:{transfer:or,primaries:ar,toReference:r=>r,fromReference:r=>r},[rt]:{transfer:tt,primaries:ar,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[fr]:{transfer:or,primaries:lr,toReference:r=>r.applyMatrix3(qa),fromReference:r=>r.applyMatrix3(Ya)},[zo]:{transfer:tt,primaries:lr,toReference:r=>r.convertSRGBToLinear().applyMatrix3(qa),fromReference:r=>r.applyMatrix3(Ya).convertLinearToSRGB()}},ku=new Set([St,fr]),Ye={enabled:!0,_workingColorSpace:St,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!ku.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Ts[e].toReference,i=Ts[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Ts[r].primaries},getTransfer:function(r){return r===Xt?or:Ts[r].transfer}};function Ui(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Lr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let mi;class Pc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mi===void 0&&(mi=ys("canvas")),mi.width=e.width,mi.height=e.height;const n=mi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=mi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ys("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ui(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vu=0;class Ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=en(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Pr(i[o].image)):s.push(Pr(i[o]))}else s=Pr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Pr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Pc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wu=0;class Mt extends Xn{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,n=Vt,i=Vt,s=It,o=ai,a=Wt,l=Vn,c=Mt.DEFAULT_ANISOTROPY,h=Xt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=en(),this.name="",this.source=new Ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ps("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===oi?rt:Xt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zi:e.x=e.x-Math.floor(e.x);break;case Vt:e.x=e.x<0?0:1;break;case rr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zi:e.y=e.y-Math.floor(e.y);break;case Vt:e.y=e.y<0?0:1;break;case rr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ps("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===rt?oi:wc}set encoding(e){ps("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===oi?rt:Xt}}Mt.DEFAULT_IMAGE=null;Mt.DEFAULT_MAPPING=xc;Mt.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,n=0,i=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(p+1)/2,E=(f+1)/2,C=(h+d)/4,b=(u+_)/4,N=(g+m)/4;return x>y&&x>E?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=C/n,s=b/n):y>E?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=C/i,s=N/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=b/s,i=N/s),this.set(n,i,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xu extends Xn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(ps("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===oi?rt:Xt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Mt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ic(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends Xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Dc extends Mt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=Vt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ju extends Mt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=Vt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-a;const f=l*d+c*p+h*g+u*_,v=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const E=Math.sqrt(x),C=Math.atan2(E,f*v);m=Math.sin(m*C)/E,a=Math.sin(a*C)/E}const y=a*v;if(l=l*m+d*y,c=c*m+p*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-a*p,e[t+2]=c*g+h*p+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),p=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(s-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($a.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($a.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ir.copy(this).projectOnVector(e),this.sub(Ir)}reflect(e){return this.sub(Ir.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ir=new R,$a=new tn;class Yt{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,qt):qt.fromBufferAttribute(s,o),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bs.copy(n.boundingBox)),bs.applyMatrix4(e.matrixWorld),this.union(bs)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),As.subVectors(this.max,Qi),gi.subVectors(e.a,Qi),_i.subVectors(e.b,Qi),xi.subVectors(e.c,Qi),Rn.subVectors(_i,gi),Cn.subVectors(xi,_i),$n.subVectors(gi,xi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-$n.z,$n.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,$n.z,0,-$n.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-$n.y,$n.x,0];return!Dr(t,gi,_i,xi,As)||(t=[1,0,0,0,1,0,0,0,1],!Dr(t,gi,_i,xi,As))?!1:(ws.crossVectors(Rn,Cn),t=[ws.x,ws.y,ws.z],Dr(t,gi,_i,xi,As))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fn=[new R,new R,new R,new R,new R,new R,new R,new R],qt=new R,bs=new Yt,gi=new R,_i=new R,xi=new R,Rn=new R,Cn=new R,$n=new R,Qi=new R,As=new R,ws=new R,Kn=new R;function Dr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Kn.fromArray(r,s);const a=i.x*Math.abs(Kn.x)+i.y*Math.abs(Kn.y)+i.z*Math.abs(Kn.z),l=e.dot(Kn),c=t.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Yu=new Yt,es=new R,Nr=new R;class hn{constructor(e=new R,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Yu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;es.subVectors(e,this.center);const t=es.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(es,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(es.copy(e.center).add(Nr)),this.expandByPoint(es.copy(e.center).sub(Nr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pn=new R,Ur=new R,Rs=new R,Ln=new R,Or=new R,Cs=new R,Fr=new R;class Yi{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pn.copy(this.origin).addScaledVector(this.direction,t),pn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ur.copy(e).add(t).multiplyScalar(.5),Rs.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Ur);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Rs),a=Ln.dot(this.direction),l=-Ln.dot(Rs),c=Ln.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ur).addScaledVector(Rs,d),p}intersectSphere(e,t){pn.subVectors(e.center,this.origin);const n=pn.dot(this.direction),i=pn.dot(pn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,pn)!==null}intersectTriangle(e,t,n,i,s){Or.subVectors(t,e),Cs.subVectors(n,e),Fr.crossVectors(Or,Cs);let o=this.direction.dot(Fr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ln.subVectors(this.origin,e);const l=a*this.direction.dot(Cs.crossVectors(Ln,Cs));if(l<0)return null;const c=a*this.direction.dot(Or.cross(Ln));if(c<0||l+c>o)return null;const h=-a*Ln.dot(Fr);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(e,t,n,i,s,o,a,l,c,h,u,d,p,g,_,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,h,u,d,p,g,_,m)}set(e,t,n,i,s,o,a,l,c,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/vi.setFromMatrixColumn(e,0).length(),s=1/vi.setFromMatrixColumn(e,1).length(),o=1/vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qu,e,$u)}lookAt(e,t,n){const i=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Pn.crossVectors(n,Ft),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Pn.crossVectors(n,Ft)),Pn.normalize(),Ls.crossVectors(Ft,Pn),i[0]=Pn.x,i[4]=Ls.x,i[8]=Ft.x,i[1]=Pn.y,i[5]=Ls.y,i[9]=Ft.y,i[2]=Pn.z,i[6]=Ls.z,i[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],v=n[3],x=n[7],y=n[11],E=n[15],C=i[0],b=i[4],N=i[8],S=i[12],A=i[1],B=i[5],Y=i[9],Q=i[13],I=i[2],H=i[6],j=i[10],W=i[14],ee=i[3],Z=i[7],q=i[11],D=i[15];return s[0]=o*C+a*A+l*I+c*ee,s[4]=o*b+a*B+l*H+c*Z,s[8]=o*N+a*Y+l*j+c*q,s[12]=o*S+a*Q+l*W+c*D,s[1]=h*C+u*A+d*I+p*ee,s[5]=h*b+u*B+d*H+p*Z,s[9]=h*N+u*Y+d*j+p*q,s[13]=h*S+u*Q+d*W+p*D,s[2]=g*C+_*A+m*I+f*ee,s[6]=g*b+_*B+m*H+f*Z,s[10]=g*N+_*Y+m*j+f*q,s[14]=g*S+_*Q+m*W+f*D,s[3]=v*C+x*A+y*I+E*ee,s[7]=v*b+x*B+y*H+E*Z,s[11]=v*N+x*Y+y*j+E*q,s[15]=v*S+x*Q+y*W+E*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*p-n*l*p)+_*(+t*l*p-t*c*d+s*o*d-i*o*p+i*c*h-s*l*h)+m*(+t*c*u-t*a*p-s*o*u+n*o*p+s*a*h-n*c*h)+f*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],v=u*m*c-_*d*c+_*l*p-a*m*p-u*l*f+a*d*f,x=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,y=h*_*c-g*u*c+g*a*p-o*_*p-h*a*f+o*u*f,E=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,C=t*v+n*x+i*y+s*E;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/C;return e[0]=v*b,e[1]=(_*d*s-u*m*s-_*i*p+n*m*p+u*i*f-n*d*f)*b,e[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*f+n*l*f)*b,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*p-n*l*p)*b,e[4]=x*b,e[5]=(h*m*s-g*d*s+g*i*p-t*m*p-h*i*f+t*d*f)*b,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*f-t*l*f)*b,e[7]=(o*d*s-h*l*s+h*i*c-t*d*c-o*i*p+t*l*p)*b,e[8]=y*b,e[9]=(g*u*s-h*_*s-g*n*p+t*_*p+h*n*f-t*u*f)*b,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*f+t*a*f)*b,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*p-t*a*p)*b,e[12]=E*b,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*b,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*b,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*b,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,p=s*h,g=s*u,_=o*h,m=o*u,f=a*u,v=l*c,x=l*h,y=l*u,E=n.x,C=n.y,b=n.z;return i[0]=(1-(_+f))*E,i[1]=(p+y)*E,i[2]=(g-x)*E,i[3]=0,i[4]=(p-y)*C,i[5]=(1-(d+f))*C,i[6]=(m+v)*C,i[7]=0,i[8]=(g+x)*b,i[9]=(m-v)*b,i[10]=(1-(d+_))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=vi.set(i[0],i[1],i[2]).length();const o=vi.set(i[4],i[5],i[6]).length(),a=vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],$t.copy(this);const c=1/s,h=1/o,u=1/a;return $t.elements[0]*=c,$t.elements[1]*=c,$t.elements[2]*=c,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Tn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let p,g;if(a===Tn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===cr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Tn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-s),d=(t+e)*c,p=(n+i)*h;let g,_;if(a===Tn)g=(o+s)*u,_=-2*u;else if(a===cr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vi=new R,$t=new Ue,qu=new R(0,0,0),$u=new R(1,1,1),Pn=new R,Ls=new R,Ft=new R,Ka=new Ue,Za=new tn;class bn{constructor(e=0,t=0,n=0,i=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ka.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ka,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Za.setFromEuler(this),this.setFromQuaternion(Za,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class Ho{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ku=0;const Ja=new R,yi=new tn,mn=new Ue,Ps=new R,ts=new R,Zu=new R,Ju=new tn,Qa=new R(1,0,0),el=new R(0,1,0),tl=new R(0,0,1),Qu={type:"added"},ed={type:"removed"};class it extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new R,t=new bn,n=new tn,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ue},normalMatrix:{value:new He}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Ho,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(el,e)}rotateZ(e){return this.rotateOnAxis(tl,e)}translateOnAxis(e,t){return Ja.copy(e).applyQuaternion(this.quaternion),this.position.add(Ja.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(el,e)}translateZ(e){return this.translateOnAxis(tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ps.copy(e):Ps.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(ts,Ps,this.up):mn.lookAt(Ps,ts,this.up),this.quaternion.setFromRotationMatrix(mn),i&&(mn.extractRotation(i.matrixWorld),yi.setFromRotationMatrix(mn),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Qu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ed)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,e,Zu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,Ju,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}it.DEFAULT_UP=new R(0,1,0);it.DEFAULT_MATRIX_AUTO_UPDATE=!0;it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new R,gn=new R,Br=new R,_n=new R,Mi=new R,Si=new R,nl=new R,zr=new R,Gr=new R,Hr=new R;let Is=!1;class Qt{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Kt.subVectors(e,t),i.cross(Kt);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Kt.subVectors(i,t),gn.subVectors(n,t),Br.subVectors(e,t);const o=Kt.dot(Kt),a=Kt.dot(gn),l=Kt.dot(Br),c=gn.dot(gn),h=gn.dot(Br),u=o*c-a*a;if(u===0)return s.set(-2,-1,-1);const d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,_n),_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getUV(e,t,n,i,s,o,a,l){return Is===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Is=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,_n),l.setScalar(0),l.addScaledVector(s,_n.x),l.addScaledVector(o,_n.y),l.addScaledVector(a,_n.z),l}static isFrontFacing(e,t,n,i){return Kt.subVectors(n,t),gn.subVectors(e,t),Kt.cross(gn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Kt.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Is===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Is=!0),Qt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Mi.subVectors(i,n),Si.subVectors(s,n),zr.subVectors(e,n);const l=Mi.dot(zr),c=Si.dot(zr);if(l<=0&&c<=0)return t.copy(n);Gr.subVectors(e,i);const h=Mi.dot(Gr),u=Si.dot(Gr);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Mi,o);Hr.subVectors(e,s);const p=Mi.dot(Hr),g=Si.dot(Hr);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Si,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return nl.subVectors(s,i),a=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(nl,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(Mi,o).addScaledVector(Si,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},Ds={h:0,s:0,l:0};function kr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Te{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=Go(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=kr(o,s,e+1/3),this.g=kr(o,s,e),this.b=kr(o,s,e-1/3)}return Ye.toWorkingColorSpace(this,i),this}setStyle(e,t=rt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rt){const n=Nc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rt){return Ye.fromWorkingColorSpace(Tt.copy(this),e),Math.round(ft(Tt.r*255,0,255))*65536+Math.round(ft(Tt.g*255,0,255))*256+Math.round(ft(Tt.b*255,0,255))}getHexString(e=rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,i=Tt.g,s=Tt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=rt){Ye.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,i=Tt.b;return e!==rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(Ds);const n=fs(In.h,Ds.h,t),i=fs(In.s,Ds.s,t),s=fs(In.l,Ds.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Te;Te.NAMES=Nc;let td=0;class jt extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=en(),this.name="",this.type="Material",this.blending=Ni,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mo,this.blendDst=go,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Va,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ni&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==mo&&(n.blendSrc=this.blendSrc),this.blendDst!==go&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Va&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ln extends jt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Oo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new R,Ns=new Ee;class bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Mo,this.updateRange={offset:0,count:-1},this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ns.fromBufferAttribute(this,t),Ns.applyMatrix3(e),this.setXY(t,Ns.x,Ns.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ze(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),i=Ze(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),i=Ze(i,this.array),s=Ze(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mo&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Uc extends bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Oc extends bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let nd=0;const Ht=new Ue,Vr=new it,Ei=new R,Bt=new Yt,ns=new Yt,_t=new R;class Nt extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lc(e)?Oc:Uc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new He().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,n){return Ht.makeTranslation(e,t,n),this.applyMatrix4(Ht),this}scale(e,t,n){return Ht.makeScale(e,t,n),this.applyMatrix4(Ht),this}lookAt(e){return Vr.lookAt(e),Vr.updateMatrix(),this.applyMatrix4(Vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new At(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ns.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Bt.min,ns.min),Bt.expandByPoint(_t),_t.addVectors(Bt.max,ns.max),Bt.expandByPoint(_t)):(Bt.expandByPoint(ns.min),Bt.expandByPoint(ns.max))}Bt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)_t.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(_t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)_t.fromBufferAttribute(a,c),l&&(Ei.fromBufferAttribute(e,c),_t.add(Ei)),i=Math.max(i,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let A=0;A<a;A++)c[A]=new R,h[A]=new R;const u=new R,d=new R,p=new R,g=new Ee,_=new Ee,m=new Ee,f=new R,v=new R;function x(A,B,Y){u.fromArray(i,A*3),d.fromArray(i,B*3),p.fromArray(i,Y*3),g.fromArray(o,A*2),_.fromArray(o,B*2),m.fromArray(o,Y*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);const Q=1/(_.x*m.y-m.x*_.y);isFinite(Q)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(Q),v.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(Q),c[A].add(f),c[B].add(f),c[Y].add(f),h[A].add(v),h[B].add(v),h[Y].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let A=0,B=y.length;A<B;++A){const Y=y[A],Q=Y.start,I=Y.count;for(let H=Q,j=Q+I;H<j;H+=3)x(n[H+0],n[H+1],n[H+2])}const E=new R,C=new R,b=new R,N=new R;function S(A){b.fromArray(s,A*3),N.copy(b);const B=c[A];E.copy(B),E.sub(b.multiplyScalar(b.dot(B))).normalize(),C.crossVectors(N,B);const Q=C.dot(h[A])<0?-1:1;l[A*4]=E.x,l[A*4+1]=E.y,l[A*4+2]=E.z,l[A*4+3]=Q}for(let A=0,B=y.length;A<B;++A){const Y=y[A],Q=Y.start,I=Y.count;for(let H=Q,j=Q+I;H<j;H+=3)S(n[H+0]),S(n[H+1]),S(n[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new bt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const il=new Ue,Zn=new Yi,Us=new hn,sl=new R,Ti=new R,bi=new R,Ai=new R,Wr=new R,Os=new R,Fs=new Ee,Bs=new Ee,zs=new Ee,rl=new R,ol=new R,al=new R,Gs=new R,Hs=new R;class at extends it{constructor(e=new Nt,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Os.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Wr.fromBufferAttribute(u,e),o?Os.addScaledVector(Wr,h):Os.addScaledVector(Wr.sub(t),h))}t.add(Os)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(s),Zn.copy(e.ray).recast(e.near),!(Us.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Us,sl)===null||Zn.origin.distanceToSquared(sl)>(e.far-e.near)**2))&&(il.copy(s).invert(),Zn.copy(e.ray).applyMatrix4(il),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,E=x;y<E;y+=3){const C=a.getX(y),b=a.getX(y+1),N=a.getX(y+2);i=ks(this,f,e,n,c,h,u,C,b,N),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const v=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);i=ks(this,o,e,n,c,h,u,v,x,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,E=x;y<E;y+=3){const C=y,b=y+1,N=y+2;i=ks(this,f,e,n,c,h,u,C,b,N),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const v=m,x=m+1,y=m+2;i=ks(this,o,e,n,c,h,u,v,x,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function id(r,e,t,n,i,s,o,a){let l;if(e.side===Dt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===wn,a),l===null)return null;Hs.copy(a),Hs.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Hs);return c<t.near||c>t.far?null:{distance:c,point:Hs.clone(),object:r}}function ks(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ti),r.getVertexPosition(l,bi),r.getVertexPosition(c,Ai);const h=id(r,e,t,n,Ti,bi,Ai,Gs);if(h){i&&(Fs.fromBufferAttribute(i,a),Bs.fromBufferAttribute(i,l),zs.fromBufferAttribute(i,c),h.uv=Qt.getInterpolation(Gs,Ti,bi,Ai,Fs,Bs,zs,new Ee)),s&&(Fs.fromBufferAttribute(s,a),Bs.fromBufferAttribute(s,l),zs.fromBufferAttribute(s,c),h.uv1=Qt.getInterpolation(Gs,Ti,bi,Ai,Fs,Bs,zs,new Ee),h.uv2=h.uv1),o&&(rl.fromBufferAttribute(o,a),ol.fromBufferAttribute(o,l),al.fromBufferAttribute(o,c),h.normal=Qt.getInterpolation(Gs,Ti,bi,Ai,rl,ol,al,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new R,materialIndex:0};Qt.getNormal(Ti,bi,Ai,u.normal),h.face=u}return h}class ui extends Nt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(h,3)),this.setAttribute("uv",new At(u,2));function g(_,m,f,v,x,y,E,C,b,N,S){const A=y/b,B=E/N,Y=y/2,Q=E/2,I=C/2,H=b+1,j=N+1;let W=0,ee=0;const Z=new R;for(let q=0;q<j;q++){const D=q*B-Q;for(let z=0;z<H;z++){const oe=z*A-Y;Z[_]=oe*v,Z[m]=D*x,Z[f]=I,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[f]=C>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(z/b),u.push(1-q/N),W+=1}}for(let q=0;q<N;q++)for(let D=0;D<b;D++){const z=d+D+H*q,oe=d+D+H*(q+1),le=d+(D+1)+H*(q+1),he=d+(D+1)+H*q;l.push(z,oe,he),l.push(oe,le,he),ee+=6}a.addGroup(p,ee,S),p+=ee,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Lt(r){const e={};for(let t=0;t<r.length;t++){const n=Vi(r[t]);for(const i in n)e[i]=n[i]}return e}function sd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Fc(r){return r.getRenderTarget()===null?r.outputColorSpace:Ye.workingColorSpace}const rd={clone:Vi,merge:Lt};var od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ad=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends jt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=od,this.fragmentShader=ad,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=sd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bc extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Tn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Pt extends Bc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ki*2*Math.atan(Math.tan(ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ds*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const wi=-90,Ri=1;class ld extends it{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Pt(wi,Ri,e,t);i.layers=this.layers,this.add(i);const s=new Pt(wi,Ri,e,t);s.layers=this.layers,this.add(s);const o=new Pt(wi,Ri,e,t);o.layers=this.layers,this.add(o);const a=new Pt(wi,Ri,e,t);a.layers=this.layers,this.add(a);const l=new Pt(wi,Ri,e,t);l.layers=this.layers,this.add(l);const c=new Pt(wi,Ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class zc extends Mt{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Fi,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cd extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ps("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===oi?rt:Xt),this.texture=new zc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:It}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ui(5,5,5),s=new ci({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:Hn});s.uniforms.tEquirect.value=t;const o=new at(i,s),a=t.minFilter;return t.minFilter===ai&&(t.minFilter=It),new ld(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Xr=new R,hd=new R,ud=new He;class Sn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Xr.subVectors(n,t).cross(hd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Xr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ud.getNormalMatrix(e),i=this.coplanarPoint(Xr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new hn,Vs=new R;class ko{constructor(e=new Sn,t=new Sn,n=new Sn,i=new Sn,s=new Sn,o=new Sn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],v=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,m-p,y-f).normalize(),n[1].setComponents(l+s,d+c,m+p,y+f).normalize(),n[2].setComponents(l+o,d+h,m+g,y+v).normalize(),n[3].setComponents(l-o,d-h,m-g,y-v).normalize(),n[4].setComponents(l-a,d-u,m-_,y-x).normalize(),t===Tn)n[5].setComponents(l+a,d+u,m+_,y+x).normalize();else if(t===cr)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Vs.x=i.normal.x>0?e.max.x:e.min.x,Vs.y=i.normal.y>0?e.max.y:e.min.y,Vs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gc(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function dd(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,p=r.createBuffer();r.bindBuffer(h,p),r.bufferData(h,u,d),c.onUploadCallback();let g;if(u instanceof Float32Array)g=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=r.SHORT;else if(u instanceof Uint32Array)g=r.UNSIGNED_INT;else if(u instanceof Int32Array)g=r.INT;else if(u instanceof Int8Array)g=r.BYTE;else if(u instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const d=h.array,p=h.updateRange;r.bindBuffer(u,c),p.count===-1?r.bufferSubData(u,0,d):(t?r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class pr extends Nt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const v=f*d-o;for(let x=0;x<c;x++){const y=x*u-s;g.push(y,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<a;v++){const x=v+c*f,y=v+c*(f+1),E=v+1+c*(f+1),C=v+1+c*f;p.push(x,y,C),p.push(y,E,C)}this.setIndex(p),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.widthSegments,e.heightSegments)}}var fd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_d=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Md=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ed=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Td=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ad=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ld=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Nd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Od=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",kd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$d=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ef=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,af=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,uf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,df=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ff=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_f=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,xf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,vf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,wf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,If=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Of=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$f=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ep=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,tp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ip=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,rp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,op=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const up=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,vp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ep=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bp=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ip=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Op=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:fd,alphahash_pars_fragment:pd,alphamap_fragment:md,alphamap_pars_fragment:gd,alphatest_fragment:_d,alphatest_pars_fragment:xd,aomap_fragment:vd,aomap_pars_fragment:yd,begin_vertex:Md,beginnormal_vertex:Sd,bsdfs:Ed,iridescence_fragment:Td,bumpmap_pars_fragment:bd,clipping_planes_fragment:Ad,clipping_planes_pars_fragment:wd,clipping_planes_pars_vertex:Rd,clipping_planes_vertex:Cd,color_fragment:Ld,color_pars_fragment:Pd,color_pars_vertex:Id,color_vertex:Dd,common:Nd,cube_uv_reflection_fragment:Ud,defaultnormal_vertex:Od,displacementmap_pars_vertex:Fd,displacementmap_vertex:Bd,emissivemap_fragment:zd,emissivemap_pars_fragment:Gd,colorspace_fragment:Hd,colorspace_pars_fragment:kd,envmap_fragment:Vd,envmap_common_pars_fragment:Wd,envmap_pars_fragment:Xd,envmap_pars_vertex:jd,envmap_physical_pars_fragment:rf,envmap_vertex:Yd,fog_vertex:qd,fog_pars_vertex:$d,fog_fragment:Kd,fog_pars_fragment:Zd,gradientmap_pars_fragment:Jd,lightmap_fragment:Qd,lightmap_pars_fragment:ef,lights_lambert_fragment:tf,lights_lambert_pars_fragment:nf,lights_pars_begin:sf,lights_toon_fragment:of,lights_toon_pars_fragment:af,lights_phong_fragment:lf,lights_phong_pars_fragment:cf,lights_physical_fragment:hf,lights_physical_pars_fragment:uf,lights_fragment_begin:df,lights_fragment_maps:ff,lights_fragment_end:pf,logdepthbuf_fragment:mf,logdepthbuf_pars_fragment:gf,logdepthbuf_pars_vertex:_f,logdepthbuf_vertex:xf,map_fragment:vf,map_pars_fragment:yf,map_particle_fragment:Mf,map_particle_pars_fragment:Sf,metalnessmap_fragment:Ef,metalnessmap_pars_fragment:Tf,morphcolor_vertex:bf,morphnormal_vertex:Af,morphtarget_pars_vertex:wf,morphtarget_vertex:Rf,normal_fragment_begin:Cf,normal_fragment_maps:Lf,normal_pars_fragment:Pf,normal_pars_vertex:If,normal_vertex:Df,normalmap_pars_fragment:Nf,clearcoat_normal_fragment_begin:Uf,clearcoat_normal_fragment_maps:Of,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:Bf,opaque_fragment:zf,packing:Gf,premultiplied_alpha_fragment:Hf,project_vertex:kf,dithering_fragment:Vf,dithering_pars_fragment:Wf,roughnessmap_fragment:Xf,roughnessmap_pars_fragment:jf,shadowmap_pars_fragment:Yf,shadowmap_pars_vertex:qf,shadowmap_vertex:$f,shadowmask_pars_fragment:Kf,skinbase_vertex:Zf,skinning_pars_vertex:Jf,skinning_vertex:Qf,skinnormal_vertex:ep,specularmap_fragment:tp,specularmap_pars_fragment:np,tonemapping_fragment:ip,tonemapping_pars_fragment:sp,transmission_fragment:rp,transmission_pars_fragment:op,uv_pars_fragment:ap,uv_pars_vertex:lp,uv_vertex:cp,worldpos_vertex:hp,background_vert:up,background_frag:dp,backgroundCube_vert:fp,backgroundCube_frag:pp,cube_vert:mp,cube_frag:gp,depth_vert:_p,depth_frag:xp,distanceRGBA_vert:vp,distanceRGBA_frag:yp,equirect_vert:Mp,equirect_frag:Sp,linedashed_vert:Ep,linedashed_frag:Tp,meshbasic_vert:bp,meshbasic_frag:Ap,meshlambert_vert:wp,meshlambert_frag:Rp,meshmatcap_vert:Cp,meshmatcap_frag:Lp,meshnormal_vert:Pp,meshnormal_frag:Ip,meshphong_vert:Dp,meshphong_frag:Np,meshphysical_vert:Up,meshphysical_frag:Op,meshtoon_vert:Fp,meshtoon_frag:Bp,points_vert:zp,points_frag:Gp,shadow_vert:Hp,shadow_frag:kp,sprite_vert:Vp,sprite_frag:Wp},ce={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},rn={basic:{uniforms:Lt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Lt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Te(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Lt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Lt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Lt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Te(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Lt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Lt([ce.points,ce.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Lt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Lt([ce.common,ce.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Lt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Lt([ce.sprite,ce.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Lt([ce.common,ce.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Lt([ce.lights,ce.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};rn.physical={uniforms:Lt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Ws={r:0,b:0,g:0};function Xp(r,e,t,n,i,s,o){const a=new Te(0);let l=s===!0?0:1,c,h,u=null,d=0,p=null;function g(m,f){let v=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),v=!0);const y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===dr)?(h===void 0&&(h=new at(new ui(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:Vi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Ye.getTransfer(x.colorSpace)!==tt,(u!==x||d!==x.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new at(new pr(2,2),new ci({name:"BackgroundMaterial",uniforms:Vi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(x.colorSpace)!==tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,f){m.getRGB(Ws,Fc(r)),n.buffers.color.setClear(Ws.r,Ws.g,Ws.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function jp(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,h=!1;function u(I,H,j,W,ee){let Z=!1;if(o){const q=_(W,j,H);c!==q&&(c=q,p(c.object)),Z=f(I,W,j,ee),Z&&v(I,W,j,ee)}else{const q=H.wireframe===!0;(c.geometry!==W.id||c.program!==j.id||c.wireframe!==q)&&(c.geometry=W.id,c.program=j.id,c.wireframe=q,Z=!0)}ee!==null&&t.update(ee,r.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,N(I,H,j,W),ee!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ee).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function p(I){return n.isWebGL2?r.bindVertexArray(I):s.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?r.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function _(I,H,j){const W=j.wireframe===!0;let ee=a[I.id];ee===void 0&&(ee={},a[I.id]=ee);let Z=ee[H.id];Z===void 0&&(Z={},ee[H.id]=Z);let q=Z[W];return q===void 0&&(q=m(d()),Z[W]=q),q}function m(I){const H=[],j=[],W=[];for(let ee=0;ee<i;ee++)H[ee]=0,j[ee]=0,W[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:j,attributeDivisors:W,object:I,attributes:{},index:null}}function f(I,H,j,W){const ee=c.attributes,Z=H.attributes;let q=0;const D=j.getAttributes();for(const z in D)if(D[z].location>=0){const le=ee[z];let he=Z[z];if(he===void 0&&(z==="instanceMatrix"&&I.instanceMatrix&&(he=I.instanceMatrix),z==="instanceColor"&&I.instanceColor&&(he=I.instanceColor)),le===void 0||le.attribute!==he||he&&le.data!==he.data)return!0;q++}return c.attributesNum!==q||c.index!==W}function v(I,H,j,W){const ee={},Z=H.attributes;let q=0;const D=j.getAttributes();for(const z in D)if(D[z].location>=0){let le=Z[z];le===void 0&&(z==="instanceMatrix"&&I.instanceMatrix&&(le=I.instanceMatrix),z==="instanceColor"&&I.instanceColor&&(le=I.instanceColor));const he={};he.attribute=le,le&&le.data&&(he.data=le.data),ee[z]=he,q++}c.attributes=ee,c.attributesNum=q,c.index=W}function x(){const I=c.newAttributes;for(let H=0,j=I.length;H<j;H++)I[H]=0}function y(I){E(I,0)}function E(I,H){const j=c.newAttributes,W=c.enabledAttributes,ee=c.attributeDivisors;j[I]=1,W[I]===0&&(r.enableVertexAttribArray(I),W[I]=1),ee[I]!==H&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,H),ee[I]=H)}function C(){const I=c.newAttributes,H=c.enabledAttributes;for(let j=0,W=H.length;j<W;j++)H[j]!==I[j]&&(r.disableVertexAttribArray(j),H[j]=0)}function b(I,H,j,W,ee,Z,q){q===!0?r.vertexAttribIPointer(I,H,j,ee,Z):r.vertexAttribPointer(I,H,j,W,ee,Z)}function N(I,H,j,W){if(n.isWebGL2===!1&&(I.isInstancedMesh||W.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const ee=W.attributes,Z=j.getAttributes(),q=H.defaultAttributeValues;for(const D in Z){const z=Z[D];if(z.location>=0){let oe=ee[D];if(oe===void 0&&(D==="instanceMatrix"&&I.instanceMatrix&&(oe=I.instanceMatrix),D==="instanceColor"&&I.instanceColor&&(oe=I.instanceColor)),oe!==void 0){const le=oe.normalized,he=oe.itemSize,_e=t.get(oe);if(_e===void 0)continue;const Pe=_e.buffer,me=_e.type,Ce=_e.bytesPerElement,qe=n.isWebGL2===!0&&(me===r.INT||me===r.UNSIGNED_INT||oe.gpuType===yc);if(oe.isInterleavedBufferAttribute){const Ne=oe.data,O=Ne.stride,lt=oe.offset;if(Ne.isInstancedInterleavedBuffer){for(let xe=0;xe<z.locationSize;xe++)E(z.location+xe,Ne.meshPerAttribute);I.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=Ne.meshPerAttribute*Ne.count)}else for(let xe=0;xe<z.locationSize;xe++)y(z.location+xe);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let xe=0;xe<z.locationSize;xe++)b(z.location+xe,he/z.locationSize,me,le,O*Ce,(lt+he/z.locationSize*xe)*Ce,qe)}else{if(oe.isInstancedBufferAttribute){for(let Ne=0;Ne<z.locationSize;Ne++)E(z.location+Ne,oe.meshPerAttribute);I.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ne=0;Ne<z.locationSize;Ne++)y(z.location+Ne);r.bindBuffer(r.ARRAY_BUFFER,Pe);for(let Ne=0;Ne<z.locationSize;Ne++)b(z.location+Ne,he/z.locationSize,me,le,he*Ce,he/z.locationSize*Ne*Ce,qe)}}else if(q!==void 0){const le=q[D];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(z.location,le);break;case 3:r.vertexAttrib3fv(z.location,le);break;case 4:r.vertexAttrib4fv(z.location,le);break;default:r.vertexAttrib1fv(z.location,le)}}}}C()}function S(){Y();for(const I in a){const H=a[I];for(const j in H){const W=H[j];for(const ee in W)g(W[ee].object),delete W[ee];delete H[j]}delete a[I]}}function A(I){if(a[I.id]===void 0)return;const H=a[I.id];for(const j in H){const W=H[j];for(const ee in W)g(W[ee].object),delete W[ee];delete H[j]}delete a[I.id]}function B(I){for(const H in a){const j=a[H];if(j[I.id]===void 0)continue;const W=j[I.id];for(const ee in W)g(W[ee].object),delete W[ee];delete j[I.id]}}function Y(){Q(),h=!0,c!==l&&(c=l,p(c.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:Y,resetDefaultState:Q,dispose:S,releaseStatesOfGeometry:A,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:y,disableUnusedAttributes:C}}function Yp(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,h){r.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,u){if(u===0)return;let d,p;if(i)d=r,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](s,c,h,u),t.update(h,s,u)}this.setMode=o,this.render=a,this.renderInstances=l}function qp(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),f=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,y=o||e.has("OES_texture_float"),E=x&&y,C=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:E,maxSamples:C}}function $p(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Sn,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const v=s?0:n,x=v*4;let y=f.clippingState||null;l.value=y,y=h(g,d,x,p);for(let E=0;E!==x;++E)y[E]=t[E];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,y=p;x!==_;++x,y+=4)o.copy(u[x]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Kp(r){let e=new WeakMap;function t(o,a){return a===_o?o.mapping=Fi:a===xo&&(o.mapping=Bi),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===_o||a===xo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new cd(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Vo extends Bc{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Di=4,ll=[.125,.215,.35,.446,.526,.582],ii=20,jr=new Vo,cl=new Te;let Yr=null,qr=0,$r=0;const ti=(1+Math.sqrt(5))/2,Ci=1/ti,hl=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,ti,Ci),new R(0,ti,-Ci),new R(Ci,0,ti),new R(-Ci,0,ti),new R(ti,Ci,0),new R(-ti,Ci,0)];class ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Yr=this._renderer.getRenderTarget(),qr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yr,qr,$r),e.scissorTest=!1,Xs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yr=this._renderer.getRenderTarget(),qr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:xs,format:Wt,colorSpace:St,depthBuffer:!1},i=dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zp(s)),this._blurMaterial=Jp(s,e,t)}return i}_compileMaterial(e){const t=new at(this._lodPlanes[0],e);this._renderer.compile(t,jr)}_sceneToCubeUV(e,t,n,i){const a=new Pt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(cl),h.toneMapping=kn,h.autoClear=!1;const p=new ln({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),g=new at(new ui,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(cl),_=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):v===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const x=this._cubeSize;Xs(i,v*x,f>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Fi||e.mapping===Bi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new at(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Xs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,jr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=hl[(i-1)%hl.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new at(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ii-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):ii;m>ii&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);const f=[];let v=0;for(let b=0;b<ii;++b){const N=b/_,S=Math.exp(-N*N/2);f.push(S),b===0?v+=S:b<m&&(v+=2*S)}for(let b=0;b<f.length;b++)f[b]=f[b]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const y=this._sizeLods[i],E=3*y*(i>x-Di?i-x+Di:0),C=4*(this._cubeSize-y);Xs(t,E,C,3*y,2*y),l.setRenderTarget(t),l.render(u,jr)}}function Zp(r){const e=[],t=[],n=[];let i=r;const s=r-Di+1+ll.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Di?l=ll[o-r+Di-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,v=new Float32Array(_*g*p),x=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let C=0;C<p;C++){const b=C%3*2/3-1,N=C>2?0:-1,S=[b,N,0,b+2/3,N,0,b+2/3,N+1,0,b,N,0,b+2/3,N+1,0,b,N+1,0];v.set(S,_*g*C),x.set(d,m*g*C);const A=[C,C,C,C,C,C];y.set(A,f*g*C)}const E=new Nt;E.setAttribute("position",new bt(v,_)),E.setAttribute("uv",new bt(x,m)),E.setAttribute("faceIndex",new bt(y,f)),e.push(E),i>Di&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function dl(r,e,t){const n=new li(r,e,t);return n.texture.mapping=dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Jp(r,e,t){const n=new Float32Array(ii),i=new R(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function fl(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function pl(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Qp(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===_o||l===xo,h=l===Fi||l===Bi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new ul(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new ul(r));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function em(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function tm(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],r.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let x=0,y=v.length;x<y;x+=3){const E=v[x+0],C=v[x+1],b=v[x+2];d.push(E,C,C,b,b,E)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const E=x+0,C=x+1,b=x+2;d.push(E,C,C,b,b,E)}}else return;const m=new(Lc(d)?Oc:Uc)(d,1);m.version=_;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function nm(r,e,t,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,p){r.drawElements(s,p,a,d*l),t.update(p,s,1)}function u(d,p,g){if(g===0)return;let _,m;if(i)_=r,m="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[m](s,p,a,d*l,g),t.update(p,s,g)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function im(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function sm(r,e){return r[0]-e[0]}function rm(r,e){return Math.abs(e[1])-Math.abs(r[1])}function om(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new Je,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(h);if(m===void 0||m.count!==_){let H=function(){Q.dispose(),s.delete(h),h.removeEventListener("dispose",H)};var p=H;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,E=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let S=0;x===!0&&(S=1),y===!0&&(S=2),E===!0&&(S=3);let A=h.attributes.position.count*S,B=1;A>e.maxTextureSize&&(B=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const Y=new Float32Array(A*B*4*_),Q=new Dc(Y,A,B,_);Q.type=En,Q.needsUpdate=!0;const I=S*4;for(let j=0;j<_;j++){const W=C[j],ee=b[j],Z=N[j],q=A*B*4*j;for(let D=0;D<W.count;D++){const z=D*I;x===!0&&(o.fromBufferAttribute(W,D),Y[q+z+0]=o.x,Y[q+z+1]=o.y,Y[q+z+2]=o.z,Y[q+z+3]=0),y===!0&&(o.fromBufferAttribute(ee,D),Y[q+z+4]=o.x,Y[q+z+5]=o.y,Y[q+z+6]=o.z,Y[q+z+7]=0),E===!0&&(o.fromBufferAttribute(Z,D),Y[q+z+8]=o.x,Y[q+z+9]=o.y,Y[q+z+10]=o.z,Y[q+z+11]=Z.itemSize===4?o.w:1)}}m={count:_,texture:Q,size:new Ee(A,B)},s.set(h,m),h.addEventListener("dispose",H)}let f=0;for(let x=0;x<d.length;x++)f+=d[x];const v=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(r,"morphTargetBaseInfluence",v),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];n[h.id]=_}for(let y=0;y<g;y++){const E=_[y];E[0]=y,E[1]=d[y]}_.sort(rm);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(sm);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const E=a[y],C=E[0],b=E[1];C!==Number.MAX_SAFE_INTEGER&&b?(m&&h.getAttribute("morphTarget"+y)!==m[C]&&h.setAttribute("morphTarget"+y,m[C]),f&&h.getAttribute("morphNormal"+y)!==f[C]&&h.setAttribute("morphNormal"+y,f[C]),i[y]=b,v+=b):(m&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),f&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}const x=h.morphTargetsRelative?1:1-v;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function am(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Hc=new Mt,kc=new Dc,Vc=new ju,Wc=new zc,ml=[],gl=[],_l=new Float32Array(16),xl=new Float32Array(9),vl=new Float32Array(4);function qi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=ml[i];if(s===void 0&&(s=new Float32Array(i),ml[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function pt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function mt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function mr(r,e){let t=gl[e];t===void 0&&(t=new Int32Array(e),gl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function lm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function cm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2fv(this.addr,e),mt(t,e)}}function hm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;r.uniform3fv(this.addr,e),mt(t,e)}}function um(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4fv(this.addr,e),mt(t,e)}}function dm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;vl.set(n),r.uniformMatrix2fv(this.addr,!1,vl),mt(t,n)}}function fm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;xl.set(n),r.uniformMatrix3fv(this.addr,!1,xl),mt(t,n)}}function pm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;_l.set(n),r.uniformMatrix4fv(this.addr,!1,_l),mt(t,n)}}function mm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function gm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2iv(this.addr,e),mt(t,e)}}function _m(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;r.uniform3iv(this.addr,e),mt(t,e)}}function xm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4iv(this.addr,e),mt(t,e)}}function vm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2uiv(this.addr,e),mt(t,e)}}function Mm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;r.uniform3uiv(this.addr,e),mt(t,e)}}function Sm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4uiv(this.addr,e),mt(t,e)}}function Em(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||Hc,i)}function Tm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Vc,i)}function bm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Wc,i)}function Am(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||kc,i)}function wm(r){switch(r){case 5126:return lm;case 35664:return cm;case 35665:return hm;case 35666:return um;case 35674:return dm;case 35675:return fm;case 35676:return pm;case 5124:case 35670:return mm;case 35667:case 35671:return gm;case 35668:case 35672:return _m;case 35669:case 35673:return xm;case 5125:return vm;case 36294:return ym;case 36295:return Mm;case 36296:return Sm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return Am}}function Rm(r,e){r.uniform1fv(this.addr,e)}function Cm(r,e){const t=qi(e,this.size,2);r.uniform2fv(this.addr,t)}function Lm(r,e){const t=qi(e,this.size,3);r.uniform3fv(this.addr,t)}function Pm(r,e){const t=qi(e,this.size,4);r.uniform4fv(this.addr,t)}function Im(r,e){const t=qi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Dm(r,e){const t=qi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Nm(r,e){const t=qi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Um(r,e){r.uniform1iv(this.addr,e)}function Om(r,e){r.uniform2iv(this.addr,e)}function Fm(r,e){r.uniform3iv(this.addr,e)}function Bm(r,e){r.uniform4iv(this.addr,e)}function zm(r,e){r.uniform1uiv(this.addr,e)}function Gm(r,e){r.uniform2uiv(this.addr,e)}function Hm(r,e){r.uniform3uiv(this.addr,e)}function km(r,e){r.uniform4uiv(this.addr,e)}function Vm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Hc,s[o])}function Wm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Vc,s[o])}function Xm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Wc,s[o])}function jm(r,e,t){const n=this.cache,i=e.length,s=mr(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||kc,s[o])}function Ym(r){switch(r){case 5126:return Rm;case 35664:return Cm;case 35665:return Lm;case 35666:return Pm;case 35674:return Im;case 35675:return Dm;case 35676:return Nm;case 5124:case 35670:return Um;case 35667:case 35671:return Om;case 35668:case 35672:return Fm;case 35669:case 35673:return Bm;case 5125:return zm;case 36294:return Gm;case 36295:return Hm;case 36296:return km;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return jm}}class qm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=wm(t.type)}}class $m{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Ym(t.type)}}class Km{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Kr=/(\w+)(\])?(\[|\.)?/g;function yl(r,e){r.seq.push(e),r.map[e.id]=e}function Zm(r,e,t){const n=r.name,i=n.length;for(Kr.lastIndex=0;;){const s=Kr.exec(n),o=Kr.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){yl(t,c===void 0?new qm(a,r,e):new $m(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Km(a),yl(t,u)),t=u}}}class ir{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Zm(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Ml(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Jm=37297;let Qm=0;function eg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function tg(r){const e=Ye.getPrimaries(Ye.workingColorSpace),t=Ye.getPrimaries(r);let n;switch(e===t?n="":e===lr&&t===ar?n="LinearDisplayP3ToLinearSRGB":e===ar&&t===lr&&(n="LinearSRGBToLinearDisplayP3"),r){case St:case fr:return[n,"LinearTransferOETF"];case rt:case zo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Sl(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+eg(r.getShaderSource(e),o)}else return i}function ng(r,e){const t=tg(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ig(r,e){let t;switch(e){case eu:t="Linear";break;case tu:t="Reinhard";break;case nu:t="OptimizedCineon";break;case iu:t="ACESFilmic";break;case su:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function sg(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(us).join(`
`)}function rg(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function og(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function us(r){return r!==""}function El(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Tl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ag=/^[ \t]*#include +<([\w\d./]+)>/gm;function To(r){return r.replace(ag,cg)}const lg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function cg(r,e){let t=Be[e];if(t===void 0){const n=lg.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return To(t)}const hg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(r){return r.replace(hg,ug)}function ug(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Al(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function dg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===gc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===_c?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===yn&&(e="SHADOWMAP_TYPE_VSM"),e}function fg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Fi:case Bi:e="ENVMAP_TYPE_CUBE";break;case dr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Bi:e="ENVMAP_MODE_REFRACTION";break}return e}function mg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Oo:e="ENVMAP_BLENDING_MULTIPLY";break;case Jh:e="ENVMAP_BLENDING_MIX";break;case Qh:e="ENVMAP_BLENDING_ADD";break}return e}function gg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function _g(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=dg(t),c=fg(t),h=pg(t),u=mg(t),d=gg(t),p=t.isWebGL2?"":sg(t),g=rg(s),_=i.createProgram();let m,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(us).join(`
`),m.length>0&&(m+=`
`),f=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(us).join(`
`),f.length>0&&(f+=`
`)):(m=[Al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),f=[p,Al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?Be.tonemapping_pars_fragment:"",t.toneMapping!==kn?ig("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,ng("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(us).join(`
`)),o=To(o),o=El(o,t),o=Tl(o,t),a=To(a),a=El(a,t),a=Tl(a,t),o=bl(o),a=bl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=v+m+o,y=v+f+a,E=Ml(i,i.VERTEX_SHADER,x),C=Ml(i,i.FRAGMENT_SHADER,y);i.attachShader(_,E),i.attachShader(_,C),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function b(B){if(r.debug.checkShaderErrors){const Y=i.getProgramInfoLog(_).trim(),Q=i.getShaderInfoLog(E).trim(),I=i.getShaderInfoLog(C).trim();let H=!0,j=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(H=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,E,C);else{const W=Sl(i,E,"vertex"),ee=Sl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+W+`
`+ee)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(Q===""||I==="")&&(j=!1);j&&(B.diagnostics={runnable:H,programLog:Y,vertexShader:{log:Q,prefix:m},fragmentShader:{log:I,prefix:f}})}i.deleteShader(E),i.deleteShader(C),N=new ir(i,_),S=og(i,_)}let N;this.getUniforms=function(){return N===void 0&&b(this),N};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(_,Jm)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Qm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=C,this}let xg=0;class vg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yg(e),t.set(e,n)),n}}class yg{constructor(e){this.id=xg++,this.code=e,this.usedTimes=0}}function Mg(r,e,t,n,i,s,o){const a=new Ho,l=new vg,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,A,B,Y,Q){const I=Y.fog,H=Q.geometry,j=S.isMeshStandardMaterial?Y.environment:null,W=(S.isMeshStandardMaterial?t:e).get(S.envMap||j),ee=W&&W.mapping===dr?W.image.height:null,Z=g[S.type];S.precision!==null&&(p=i.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const q=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,D=q!==void 0?q.length:0;let z=0;H.morphAttributes.position!==void 0&&(z=1),H.morphAttributes.normal!==void 0&&(z=2),H.morphAttributes.color!==void 0&&(z=3);let oe,le,he,_e;if(Z){const ct=rn[Z];oe=ct.vertexShader,le=ct.fragmentShader}else oe=S.vertexShader,le=S.fragmentShader,l.update(S),he=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const Pe=r.getRenderTarget(),me=Q.isInstancedMesh===!0,Ce=!!S.map,qe=!!S.matcap,Ne=!!W,O=!!S.aoMap,lt=!!S.lightMap,xe=!!S.bumpMap,be=!!S.normalMap,Ae=!!S.displacementMap,Ke=!!S.emissiveMap,Ie=!!S.metalnessMap,Le=!!S.roughnessMap,ke=S.anisotropy>0,Qe=S.clearcoat>0,nt=S.iridescence>0,w=S.sheen>0,M=S.transmission>0,F=ke&&!!S.anisotropyMap,ne=Qe&&!!S.clearcoatMap,J=Qe&&!!S.clearcoatNormalMap,ie=Qe&&!!S.clearcoatRoughnessMap,pe=nt&&!!S.iridescenceMap,$=nt&&!!S.iridescenceThicknessMap,ue=w&&!!S.sheenColorMap,L=w&&!!S.sheenRoughnessMap,re=!!S.specularMap,K=!!S.specularColorMap,we=!!S.specularIntensityMap,ve=M&&!!S.transmissionMap,Se=M&&!!S.thicknessMap,ge=!!S.gradientMap,fe=!!S.alphaMap,Ve=S.alphaTest>0,P=!!S.alphaHash,ae=!!S.extensions,te=!!H.attributes.uv1,X=!!H.attributes.uv2,se=!!H.attributes.uv3;let Me=kn;return S.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(Me=r.toneMapping),{isWebGL2:h,shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:oe,fragmentShader:le,defines:S.defines,customVertexShaderID:he,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,instancing:me,instancingColor:me&&Q.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Pe===null?r.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:St,map:Ce,matcap:qe,envMap:Ne,envMapMode:Ne&&W.mapping,envMapCubeUVHeight:ee,aoMap:O,lightMap:lt,bumpMap:xe,normalMap:be,displacementMap:d&&Ae,emissiveMap:Ke,normalMapObjectSpace:be&&S.normalMapType===vu,normalMapTangentSpace:be&&S.normalMapType===Bo,metalnessMap:Ie,roughnessMap:Le,anisotropy:ke,anisotropyMap:F,clearcoat:Qe,clearcoatMap:ne,clearcoatNormalMap:J,clearcoatRoughnessMap:ie,iridescence:nt,iridescenceMap:pe,iridescenceThicknessMap:$,sheen:w,sheenColorMap:ue,sheenRoughnessMap:L,specularMap:re,specularColorMap:K,specularIntensityMap:we,transmission:M,transmissionMap:ve,thicknessMap:Se,gradientMap:ge,opaque:S.transparent===!1&&S.blending===Ni,alphaMap:fe,alphaTest:Ve,alphaHash:P,combine:S.combine,mapUv:Ce&&_(S.map.channel),aoMapUv:O&&_(S.aoMap.channel),lightMapUv:lt&&_(S.lightMap.channel),bumpMapUv:xe&&_(S.bumpMap.channel),normalMapUv:be&&_(S.normalMap.channel),displacementMapUv:Ae&&_(S.displacementMap.channel),emissiveMapUv:Ke&&_(S.emissiveMap.channel),metalnessMapUv:Ie&&_(S.metalnessMap.channel),roughnessMapUv:Le&&_(S.roughnessMap.channel),anisotropyMapUv:F&&_(S.anisotropyMap.channel),clearcoatMapUv:ne&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:J&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:$&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:L&&_(S.sheenRoughnessMap.channel),specularMapUv:re&&_(S.specularMap.channel),specularColorMapUv:K&&_(S.specularColorMap.channel),specularIntensityMapUv:we&&_(S.specularIntensityMap.channel),transmissionMapUv:ve&&_(S.transmissionMap.channel),thicknessMapUv:Se&&_(S.thicknessMap.channel),alphaMapUv:fe&&_(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(be||ke),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:te,vertexUv2s:X,vertexUv3s:se,pointsUvs:Q.isPoints===!0&&!!H.attributes.uv&&(Ce||fe),fog:!!I,useFog:S.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Q.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:z,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:Me,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ce&&S.map.isVideoTexture===!0&&Ye.getTransfer(S.map.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===on,flipSided:S.side===Dt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ae&&S.extensions.derivatives===!0,extensionFragDepth:ae&&S.extensions.fragDepth===!0,extensionDrawBuffers:ae&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&S.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const B in S.defines)A.push(B),A.push(S.defines[B]);return S.isRawShaderMaterial===!1&&(v(A,S),x(A,S),A.push(r.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function v(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function x(S,A){a.disableAll(),A.isWebGL2&&a.enable(0),A.supportsVertexTextures&&a.enable(1),A.instancing&&a.enable(2),A.instancingColor&&a.enable(3),A.matcap&&a.enable(4),A.envMap&&a.enable(5),A.normalMapObjectSpace&&a.enable(6),A.normalMapTangentSpace&&a.enable(7),A.clearcoat&&a.enable(8),A.iridescence&&a.enable(9),A.alphaTest&&a.enable(10),A.vertexColors&&a.enable(11),A.vertexAlphas&&a.enable(12),A.vertexUv1s&&a.enable(13),A.vertexUv2s&&a.enable(14),A.vertexUv3s&&a.enable(15),A.vertexTangents&&a.enable(16),A.anisotropy&&a.enable(17),A.alphaHash&&a.enable(18),S.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.skinning&&a.enable(4),A.morphTargets&&a.enable(5),A.morphNormals&&a.enable(6),A.morphColors&&a.enable(7),A.premultipliedAlpha&&a.enable(8),A.shadowMapEnabled&&a.enable(9),A.useLegacyLights&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function y(S){const A=g[S.type];let B;if(A){const Y=rn[A];B=rd.clone(Y.uniforms)}else B=S.uniforms;return B}function E(S,A){let B;for(let Y=0,Q=c.length;Y<Q;Y++){const I=c[Y];if(I.cacheKey===A){B=I,++B.usedTimes;break}}return B===void 0&&(B=new _g(r,A,S,s),c.push(B)),B}function C(S){if(--S.usedTimes===0){const A=c.indexOf(S);c[A]=c[c.length-1],c.pop(),S.destroy()}}function b(S){l.remove(S)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:E,releaseProgram:C,releaseShaderCache:b,programs:c,dispose:N}}function Sg(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Eg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function wl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Rl(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,p,g,_,m){let f=r[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||Eg),n.length>1&&n.sort(d||wl),i.length>1&&i.sort(d||wl)}function h(){for(let u=e,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Tg(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Rl,r.set(n,[o])):i>=s.length?(o=new Rl,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function bg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Te};break;case"SpotLight":t={position:new R,direction:new R,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function Ag(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let wg=0;function Rg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Cg(r,e){const t=new bg,n=Ag(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new R);const s=new R,o=new Ue,a=new Ue;function l(h,u){let d=0,p=0,g=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let _=0,m=0,f=0,v=0,x=0,y=0,E=0,C=0,b=0,N=0,S=0;h.sort(Rg);const A=u===!0?Math.PI:1;for(let Y=0,Q=h.length;Y<Q;Y++){const I=h[Y],H=I.color,j=I.intensity,W=I.distance,ee=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=H.r*j*A,p+=H.g*j*A,g+=H.b*j*A;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(I.sh.coefficients[Z],j);S++}else if(I.isDirectionalLight){const Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity*A),I.castShadow){const q=I.shadow,D=n.get(I);D.shadowBias=q.bias,D.shadowNormalBias=q.normalBias,D.shadowRadius=q.radius,D.shadowMapSize=q.mapSize,i.directionalShadow[_]=D,i.directionalShadowMap[_]=ee,i.directionalShadowMatrix[_]=I.shadow.matrix,y++}i.directional[_]=Z,_++}else if(I.isSpotLight){const Z=t.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(H).multiplyScalar(j*A),Z.distance=W,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,i.spot[f]=Z;const q=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,q.updateMatrices(I),I.castShadow&&N++),i.spotLightMatrix[f]=q.matrix,I.castShadow){const D=n.get(I);D.shadowBias=q.bias,D.shadowNormalBias=q.normalBias,D.shadowRadius=q.radius,D.shadowMapSize=q.mapSize,i.spotShadow[f]=D,i.spotShadowMap[f]=ee,C++}f++}else if(I.isRectAreaLight){const Z=t.get(I);Z.color.copy(H).multiplyScalar(j),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),i.rectArea[v]=Z,v++}else if(I.isPointLight){const Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity*A),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){const q=I.shadow,D=n.get(I);D.shadowBias=q.bias,D.shadowNormalBias=q.normalBias,D.shadowRadius=q.radius,D.shadowMapSize=q.mapSize,D.shadowCameraNear=q.camera.near,D.shadowCameraFar=q.camera.far,i.pointShadow[m]=D,i.pointShadowMap[m]=ee,i.pointShadowMatrix[m]=I.shadow.matrix,E++}i.point[m]=Z,m++}else if(I.isHemisphereLight){const Z=t.get(I);Z.skyColor.copy(I.color).multiplyScalar(j*A),Z.groundColor.copy(I.groundColor).multiplyScalar(j*A),i.hemi[x]=Z,x++}}v>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=g;const B=i.hash;(B.directionalLength!==_||B.pointLength!==m||B.spotLength!==f||B.rectAreaLength!==v||B.hemiLength!==x||B.numDirectionalShadows!==y||B.numPointShadows!==E||B.numSpotShadows!==C||B.numSpotMaps!==b||B.numLightProbes!==S)&&(i.directional.length=_,i.spot.length=f,i.rectArea.length=v,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=C+b-N,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=S,B.directionalLength=_,B.pointLength=m,B.spotLength=f,B.rectAreaLength=v,B.hemiLength=x,B.numDirectionalShadows=y,B.numPointShadows=E,B.numSpotShadows=C,B.numSpotMaps=b,B.numLightProbes=S,i.version=wg++)}function c(h,u){let d=0,p=0,g=0,_=0,m=0;const f=u.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){const y=h[v];if(y.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),d++}else if(y.isSpotLight){const E=i.spot[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),g++}else if(y.isRectAreaLight){const E=i.rectArea[_];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(f),a.identity(),o.copy(y.matrixWorld),o.premultiply(f),a.extractRotation(o),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){const E=i.hemi[m];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:i}}function Cl(r,e){const t=new Cg(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Lg(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Cl(r,e),t.set(s,[l])):o>=a.length?(l=new Cl(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class Pg extends jt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_u,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ig extends jt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Dg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ng=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ug(r,e,t){let n=new ko;const i=new Ee,s=new Ee,o=new Je,a=new Pg({depthPacking:xu}),l=new Ig,c={},h=t.maxTextureSize,u={[wn]:Dt,[Dt]:wn,[on]:on},d=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:Dg,fragmentShader:Ng}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Nt;g.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new at(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gc;let f=this.type;this.render=function(E,C,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const N=r.getRenderTarget(),S=r.getActiveCubeFace(),A=r.getActiveMipmapLevel(),B=r.state;B.setBlending(Hn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Y=f!==yn&&this.type===yn,Q=f===yn&&this.type!==yn;for(let I=0,H=E.length;I<H;I++){const j=E[I],W=j.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ee=W.getFrameExtents();if(i.multiply(ee),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ee.x),i.x=s.x*ee.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ee.y),i.y=s.y*ee.y,W.mapSize.y=s.y)),W.map===null||Y===!0||Q===!0){const q=this.type!==yn?{minFilter:vt,magFilter:vt}:{};W.map!==null&&W.map.dispose(),W.map=new li(i.x,i.y,q),W.map.texture.name=j.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const Z=W.getViewportCount();for(let q=0;q<Z;q++){const D=W.getViewport(q);o.set(s.x*D.x,s.y*D.y,s.x*D.z,s.y*D.w),B.viewport(o),W.updateMatrices(j,q),n=W.getFrustum(),y(C,b,W.camera,j,this.type)}W.isPointLightShadow!==!0&&this.type===yn&&v(W,b),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(N,S,A)};function v(E,C){const b=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new li(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(C,null,b,d,_,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(C,null,b,p,_,null)}function x(E,C,b,N){let S=null;const A=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)S=A;else if(S=b.isPointLight===!0?l:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const B=S.uuid,Y=C.uuid;let Q=c[B];Q===void 0&&(Q={},c[B]=Q);let I=Q[Y];I===void 0&&(I=S.clone(),Q[Y]=I),S=I}if(S.visible=C.visible,S.wireframe=C.wireframe,N===yn?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,b.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const B=r.properties.get(S);B.light=b}return S}function y(E,C,b,N,S){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===yn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);const Y=e.update(E),Q=E.material;if(Array.isArray(Q)){const I=Y.groups;for(let H=0,j=I.length;H<j;H++){const W=I[H],ee=Q[W.materialIndex];if(ee&&ee.visible){const Z=x(E,ee,N,S);r.renderBufferDirect(b,null,Y,Z,E,W)}}}else if(Q.visible){const I=x(E,Q,N,S);r.renderBufferDirect(b,null,Y,I,E,null)}}const B=E.children;for(let Y=0,Q=B.length;Y<Q;Y++)y(B[Y],C,b,N,S)}}function Og(r,e,t){const n=t.isWebGL2;function i(){let P=!1;const ae=new Je;let te=null;const X=new Je(0,0,0,0);return{setMask:function(se){te!==se&&!P&&(r.colorMask(se,se,se,se),te=se)},setLocked:function(se){P=se},setClear:function(se,Me,We,ct,Gt){Gt===!0&&(se*=ct,Me*=ct,We*=ct),ae.set(se,Me,We,ct),X.equals(ae)===!1&&(r.clearColor(se,Me,We,ct),X.copy(ae))},reset:function(){P=!1,te=null,X.set(-1,0,0,0)}}}function s(){let P=!1,ae=null,te=null,X=null;return{setTest:function(se){se?Ce(r.DEPTH_TEST):qe(r.DEPTH_TEST)},setMask:function(se){ae!==se&&!P&&(r.depthMask(se),ae=se)},setFunc:function(se){if(te!==se){switch(se){case Xh:r.depthFunc(r.NEVER);break;case jh:r.depthFunc(r.ALWAYS);break;case Yh:r.depthFunc(r.LESS);break;case sr:r.depthFunc(r.LEQUAL);break;case qh:r.depthFunc(r.EQUAL);break;case $h:r.depthFunc(r.GEQUAL);break;case Kh:r.depthFunc(r.GREATER);break;case Zh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}te=se}},setLocked:function(se){P=se},setClear:function(se){X!==se&&(r.clearDepth(se),X=se)},reset:function(){P=!1,ae=null,te=null,X=null}}}function o(){let P=!1,ae=null,te=null,X=null,se=null,Me=null,We=null,ct=null,Gt=null;return{setTest:function(et){P||(et?Ce(r.STENCIL_TEST):qe(r.STENCIL_TEST))},setMask:function(et){ae!==et&&!P&&(r.stencilMask(et),ae=et)},setFunc:function(et,wt,nn){(te!==et||X!==wt||se!==nn)&&(r.stencilFunc(et,wt,nn),te=et,X=wt,se=nn)},setOp:function(et,wt,nn){(Me!==et||We!==wt||ct!==nn)&&(r.stencilOp(et,wt,nn),Me=et,We=wt,ct=nn)},setLocked:function(et){P=et},setClear:function(et){Gt!==et&&(r.clearStencil(et),Gt=et)},reset:function(){P=!1,ae=null,te=null,X=null,se=null,Me=null,We=null,ct=null,Gt=null}}}const a=new i,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,f=!1,v=null,x=null,y=null,E=null,C=null,b=null,N=null,S=new Te(0,0,0),A=0,B=!1,Y=null,Q=null,I=null,H=null,j=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,Z=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),ee=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),ee=Z>=2);let D=null,z={};const oe=r.getParameter(r.SCISSOR_BOX),le=r.getParameter(r.VIEWPORT),he=new Je().fromArray(oe),_e=new Je().fromArray(le);function Pe(P,ae,te,X){const se=new Uint8Array(4),Me=r.createTexture();r.bindTexture(P,Me),r.texParameteri(P,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(P,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let We=0;We<te;We++)n&&(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)?r.texImage3D(ae,0,r.RGBA,1,1,X,0,r.RGBA,r.UNSIGNED_BYTE,se):r.texImage2D(ae+We,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,se);return Me}const me={};me[r.TEXTURE_2D]=Pe(r.TEXTURE_2D,r.TEXTURE_2D,1),me[r.TEXTURE_CUBE_MAP]=Pe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(me[r.TEXTURE_2D_ARRAY]=Pe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),me[r.TEXTURE_3D]=Pe(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ce(r.DEPTH_TEST),l.setFunc(sr),Ie(!1),Le(la),Ce(r.CULL_FACE),Ae(Hn);function Ce(P){d[P]!==!0&&(r.enable(P),d[P]=!0)}function qe(P){d[P]!==!1&&(r.disable(P),d[P]=!1)}function Ne(P,ae){return p[P]!==ae?(r.bindFramebuffer(P,ae),p[P]=ae,n&&(P===r.DRAW_FRAMEBUFFER&&(p[r.FRAMEBUFFER]=ae),P===r.FRAMEBUFFER&&(p[r.DRAW_FRAMEBUFFER]=ae)),!0):!1}function O(P,ae){let te=_,X=!1;if(P)if(te=g.get(ae),te===void 0&&(te=[],g.set(ae,te)),P.isWebGLMultipleRenderTargets){const se=P.texture;if(te.length!==se.length||te[0]!==r.COLOR_ATTACHMENT0){for(let Me=0,We=se.length;Me<We;Me++)te[Me]=r.COLOR_ATTACHMENT0+Me;te.length=se.length,X=!0}}else te[0]!==r.COLOR_ATTACHMENT0&&(te[0]=r.COLOR_ATTACHMENT0,X=!0);else te[0]!==r.BACK&&(te[0]=r.BACK,X=!0);X&&(t.isWebGL2?r.drawBuffers(te):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(te))}function lt(P){return m!==P?(r.useProgram(P),m=P,!0):!1}const xe={[ni]:r.FUNC_ADD,[Lh]:r.FUNC_SUBTRACT,[Ph]:r.FUNC_REVERSE_SUBTRACT};if(n)xe[da]=r.MIN,xe[fa]=r.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(xe[da]=P.MIN_EXT,xe[fa]=P.MAX_EXT)}const be={[Ih]:r.ZERO,[Dh]:r.ONE,[Nh]:r.SRC_COLOR,[mo]:r.SRC_ALPHA,[Gh]:r.SRC_ALPHA_SATURATE,[Bh]:r.DST_COLOR,[Oh]:r.DST_ALPHA,[Uh]:r.ONE_MINUS_SRC_COLOR,[go]:r.ONE_MINUS_SRC_ALPHA,[zh]:r.ONE_MINUS_DST_COLOR,[Fh]:r.ONE_MINUS_DST_ALPHA,[Hh]:r.CONSTANT_COLOR,[kh]:r.ONE_MINUS_CONSTANT_COLOR,[Vh]:r.CONSTANT_ALPHA,[Wh]:r.ONE_MINUS_CONSTANT_ALPHA};function Ae(P,ae,te,X,se,Me,We,ct,Gt,et){if(P===Hn){f===!0&&(qe(r.BLEND),f=!1);return}if(f===!1&&(Ce(r.BLEND),f=!0),P!==Ch){if(P!==v||et!==B){if((x!==ni||C!==ni)&&(r.blendEquation(r.FUNC_ADD),x=ni,C=ni),et)switch(P){case Ni:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ca:r.blendFunc(r.ONE,r.ONE);break;case ha:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ua:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ni:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ca:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case ha:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ua:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}y=null,E=null,b=null,N=null,S.set(0,0,0),A=0,v=P,B=et}return}se=se||ae,Me=Me||te,We=We||X,(ae!==x||se!==C)&&(r.blendEquationSeparate(xe[ae],xe[se]),x=ae,C=se),(te!==y||X!==E||Me!==b||We!==N)&&(r.blendFuncSeparate(be[te],be[X],be[Me],be[We]),y=te,E=X,b=Me,N=We),(ct.equals(S)===!1||Gt!==A)&&(r.blendColor(ct.r,ct.g,ct.b,Gt),S.copy(ct),A=Gt),v=P,B=!1}function Ke(P,ae){P.side===on?qe(r.CULL_FACE):Ce(r.CULL_FACE);let te=P.side===Dt;ae&&(te=!te),Ie(te),P.blending===Ni&&P.transparent===!1?Ae(Hn):Ae(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const X=P.stencilWrite;c.setTest(X),X&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Qe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Ce(r.SAMPLE_ALPHA_TO_COVERAGE):qe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(P){Y!==P&&(P?r.frontFace(r.CW):r.frontFace(r.CCW),Y=P)}function Le(P){P!==wh?(Ce(r.CULL_FACE),P!==Q&&(P===la?r.cullFace(r.BACK):P===Rh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):qe(r.CULL_FACE),Q=P}function ke(P){P!==I&&(ee&&r.lineWidth(P),I=P)}function Qe(P,ae,te){P?(Ce(r.POLYGON_OFFSET_FILL),(H!==ae||j!==te)&&(r.polygonOffset(ae,te),H=ae,j=te)):qe(r.POLYGON_OFFSET_FILL)}function nt(P){P?Ce(r.SCISSOR_TEST):qe(r.SCISSOR_TEST)}function w(P){P===void 0&&(P=r.TEXTURE0+W-1),D!==P&&(r.activeTexture(P),D=P)}function M(P,ae,te){te===void 0&&(D===null?te=r.TEXTURE0+W-1:te=D);let X=z[te];X===void 0&&(X={type:void 0,texture:void 0},z[te]=X),(X.type!==P||X.texture!==ae)&&(D!==te&&(r.activeTexture(te),D=te),r.bindTexture(P,ae||me[P]),X.type=P,X.texture=ae)}function F(){const P=z[D];P!==void 0&&P.type!==void 0&&(r.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ne(){try{r.compressedTexImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{r.compressedTexImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{r.texSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{r.texSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ue(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function L(){try{r.texStorage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function re(){try{r.texStorage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{r.texImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function we(){try{r.texImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ve(P){he.equals(P)===!1&&(r.scissor(P.x,P.y,P.z,P.w),he.copy(P))}function Se(P){_e.equals(P)===!1&&(r.viewport(P.x,P.y,P.z,P.w),_e.copy(P))}function ge(P,ae){let te=u.get(ae);te===void 0&&(te=new WeakMap,u.set(ae,te));let X=te.get(P);X===void 0&&(X=r.getUniformBlockIndex(ae,P.name),te.set(P,X))}function fe(P,ae){const X=u.get(ae).get(P);h.get(ae)!==X&&(r.uniformBlockBinding(ae,X,P.__bindingPointIndex),h.set(ae,X))}function Ve(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},D=null,z={},p={},g=new WeakMap,_=[],m=null,f=!1,v=null,x=null,y=null,E=null,C=null,b=null,N=null,S=new Te(0,0,0),A=0,B=!1,Y=null,Q=null,I=null,H=null,j=null,he.set(0,0,r.canvas.width,r.canvas.height),_e.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ce,disable:qe,bindFramebuffer:Ne,drawBuffers:O,useProgram:lt,setBlending:Ae,setMaterial:Ke,setFlipSided:Ie,setCullFace:Le,setLineWidth:ke,setPolygonOffset:Qe,setScissorTest:nt,activeTexture:w,bindTexture:M,unbindTexture:F,compressedTexImage2D:ne,compressedTexImage3D:J,texImage2D:K,texImage3D:we,updateUBOMapping:ge,uniformBlockBinding:fe,texStorage2D:L,texStorage3D:re,texSubImage2D:ie,texSubImage3D:pe,compressedTexSubImage2D:$,compressedTexSubImage3D:ue,scissor:ve,viewport:Se,reset:Ve}}function Fg(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,M){return f?new OffscreenCanvas(w,M):ys("canvas")}function x(w,M,F,ne){let J=1;if((w.width>ne||w.height>ne)&&(J=ne/Math.max(w.width,w.height)),J<1||M===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ie=M?hr:Math.floor,pe=ie(J*w.width),$=ie(J*w.height);_===void 0&&(_=v(pe,$));const ue=F?v(pe,$):_;return ue.width=pe,ue.height=$,ue.getContext("2d").drawImage(w,0,0,pe,$),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+pe+"x"+$+")."),ue}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function y(w){return Eo(w.width)&&Eo(w.height)}function E(w){return a?!1:w.wrapS!==Vt||w.wrapT!==Vt||w.minFilter!==vt&&w.minFilter!==It}function C(w,M){return w.generateMipmaps&&M&&w.minFilter!==vt&&w.minFilter!==It}function b(w){r.generateMipmap(w)}function N(w,M,F,ne,J=!1){if(a===!1)return M;if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ie=M;if(M===r.RED&&(F===r.FLOAT&&(ie=r.R32F),F===r.HALF_FLOAT&&(ie=r.R16F),F===r.UNSIGNED_BYTE&&(ie=r.R8)),M===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(ie=r.R8UI),F===r.UNSIGNED_SHORT&&(ie=r.R16UI),F===r.UNSIGNED_INT&&(ie=r.R32UI),F===r.BYTE&&(ie=r.R8I),F===r.SHORT&&(ie=r.R16I),F===r.INT&&(ie=r.R32I)),M===r.RG&&(F===r.FLOAT&&(ie=r.RG32F),F===r.HALF_FLOAT&&(ie=r.RG16F),F===r.UNSIGNED_BYTE&&(ie=r.RG8)),M===r.RGBA){const pe=J?or:Ye.getTransfer(ne);F===r.FLOAT&&(ie=r.RGBA32F),F===r.HALF_FLOAT&&(ie=r.RGBA16F),F===r.UNSIGNED_BYTE&&(ie=pe===tt?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(ie=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(ie=r.RGB5_A1)}return(ie===r.R16F||ie===r.R32F||ie===r.RG16F||ie===r.RG32F||ie===r.RGBA16F||ie===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function S(w,M,F){return C(w,F)===!0||w.isFramebufferTexture&&w.minFilter!==vt&&w.minFilter!==It?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function A(w){return w===vt||w===vo||w===nr?r.NEAREST:r.LINEAR}function B(w){const M=w.target;M.removeEventListener("dispose",B),Q(M),M.isVideoTexture&&g.delete(M)}function Y(w){const M=w.target;M.removeEventListener("dispose",Y),H(M)}function Q(w){const M=n.get(w);if(M.__webglInit===void 0)return;const F=w.source,ne=m.get(F);if(ne){const J=ne[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&I(w),Object.keys(ne).length===0&&m.delete(F)}n.remove(w)}function I(w){const M=n.get(w);r.deleteTexture(M.__webglTexture);const F=w.source,ne=m.get(F);delete ne[M.__cacheKey],o.memory.textures--}function H(w){const M=w.texture,F=n.get(w),ne=n.get(M);if(ne.__webglTexture!==void 0&&(r.deleteTexture(ne.__webglTexture),o.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(F.__webglFramebuffer[J]))for(let ie=0;ie<F.__webglFramebuffer[J].length;ie++)r.deleteFramebuffer(F.__webglFramebuffer[J][ie]);else r.deleteFramebuffer(F.__webglFramebuffer[J]);F.__webglDepthbuffer&&r.deleteRenderbuffer(F.__webglDepthbuffer[J])}else{if(Array.isArray(F.__webglFramebuffer))for(let J=0;J<F.__webglFramebuffer.length;J++)r.deleteFramebuffer(F.__webglFramebuffer[J]);else r.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&r.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&r.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let J=0;J<F.__webglColorRenderbuffer.length;J++)F.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(F.__webglColorRenderbuffer[J]);F.__webglDepthRenderbuffer&&r.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let J=0,ie=M.length;J<ie;J++){const pe=n.get(M[J]);pe.__webglTexture&&(r.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(M[J])}n.remove(M),n.remove(w)}let j=0;function W(){j=0}function ee(){const w=j;return w>=l&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+l),j+=1,w}function Z(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function q(w,M){const F=n.get(w);if(w.isVideoTexture&&Qe(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const ne=w.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(F,w,M);return}}t.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+M)}function D(w,M){const F=n.get(w);if(w.version>0&&F.__version!==w.version){Ce(F,w,M);return}t.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+M)}function z(w,M){const F=n.get(w);if(w.version>0&&F.__version!==w.version){Ce(F,w,M);return}t.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+M)}function oe(w,M){const F=n.get(w);if(w.version>0&&F.__version!==w.version){qe(F,w,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+M)}const le={[zi]:r.REPEAT,[Vt]:r.CLAMP_TO_EDGE,[rr]:r.MIRRORED_REPEAT},he={[vt]:r.NEAREST,[vo]:r.NEAREST_MIPMAP_NEAREST,[nr]:r.NEAREST_MIPMAP_LINEAR,[It]:r.LINEAR,[vc]:r.LINEAR_MIPMAP_NEAREST,[ai]:r.LINEAR_MIPMAP_LINEAR},_e={[yu]:r.NEVER,[wu]:r.ALWAYS,[Mu]:r.LESS,[Eu]:r.LEQUAL,[Su]:r.EQUAL,[Au]:r.GEQUAL,[Tu]:r.GREATER,[bu]:r.NOTEQUAL};function Pe(w,M,F){if(F?(r.texParameteri(w,r.TEXTURE_WRAP_S,le[M.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,le[M.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,le[M.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,he[M.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,he[M.minFilter])):(r.texParameteri(w,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(w,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(M.wrapS!==Vt||M.wrapT!==Vt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(w,r.TEXTURE_MAG_FILTER,A(M.magFilter)),r.texParameteri(w,r.TEXTURE_MIN_FILTER,A(M.minFilter)),M.minFilter!==vt&&M.minFilter!==It&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,_e[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===vt||M.minFilter!==nr&&M.minFilter!==ai||M.type===En&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===xs&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(r.texParameterf(w,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function me(w,M){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",B));const ne=M.source;let J=m.get(ne);J===void 0&&(J={},m.set(ne,J));const ie=Z(M);if(ie!==w.__cacheKey){J[ie]===void 0&&(J[ie]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,F=!0),J[ie].usedTimes++;const pe=J[w.__cacheKey];pe!==void 0&&(J[w.__cacheKey].usedTimes--,pe.usedTimes===0&&I(M)),w.__cacheKey=ie,w.__webglTexture=J[ie].texture}return F}function Ce(w,M,F){let ne=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ne=r.TEXTURE_3D);const J=me(w,M),ie=M.source;t.bindTexture(ne,w.__webglTexture,r.TEXTURE0+F);const pe=n.get(ie);if(ie.version!==pe.__version||J===!0){t.activeTexture(r.TEXTURE0+F);const $=Ye.getPrimaries(Ye.workingColorSpace),ue=M.colorSpace===Xt?null:Ye.getPrimaries(M.colorSpace),L=M.colorSpace===Xt||$===ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,L);const re=E(M)&&y(M.image)===!1;let K=x(M.image,re,!1,h);K=nt(M,K);const we=y(K)||a,ve=s.convert(M.format,M.colorSpace);let Se=s.convert(M.type),ge=N(M.internalFormat,ve,Se,M.colorSpace,M.isVideoTexture);Pe(ne,M,we);let fe;const Ve=M.mipmaps,P=a&&M.isVideoTexture!==!0,ae=pe.__version===void 0||J===!0,te=S(M,K,we);if(M.isDepthTexture)ge=r.DEPTH_COMPONENT,a?M.type===En?ge=r.DEPTH_COMPONENT32F:M.type===Bn?ge=r.DEPTH_COMPONENT24:M.type===si?ge=r.DEPTH24_STENCIL8:ge=r.DEPTH_COMPONENT16:M.type===En&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===ri&&ge===r.DEPTH_COMPONENT&&M.type!==Fo&&M.type!==Bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Bn,Se=s.convert(M.type)),M.format===Gi&&ge===r.DEPTH_COMPONENT&&(ge=r.DEPTH_STENCIL,M.type!==si&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=si,Se=s.convert(M.type))),ae&&(P?t.texStorage2D(r.TEXTURE_2D,1,ge,K.width,K.height):t.texImage2D(r.TEXTURE_2D,0,ge,K.width,K.height,0,ve,Se,null));else if(M.isDataTexture)if(Ve.length>0&&we){P&&ae&&t.texStorage2D(r.TEXTURE_2D,te,ge,Ve[0].width,Ve[0].height);for(let X=0,se=Ve.length;X<se;X++)fe=Ve[X],P?t.texSubImage2D(r.TEXTURE_2D,X,0,0,fe.width,fe.height,ve,Se,fe.data):t.texImage2D(r.TEXTURE_2D,X,ge,fe.width,fe.height,0,ve,Se,fe.data);M.generateMipmaps=!1}else P?(ae&&t.texStorage2D(r.TEXTURE_2D,te,ge,K.width,K.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,K.width,K.height,ve,Se,K.data)):t.texImage2D(r.TEXTURE_2D,0,ge,K.width,K.height,0,ve,Se,K.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){P&&ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,te,ge,Ve[0].width,Ve[0].height,K.depth);for(let X=0,se=Ve.length;X<se;X++)fe=Ve[X],M.format!==Wt?ve!==null?P?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,0,fe.width,fe.height,K.depth,ve,fe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,X,ge,fe.width,fe.height,K.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?t.texSubImage3D(r.TEXTURE_2D_ARRAY,X,0,0,0,fe.width,fe.height,K.depth,ve,Se,fe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,X,ge,fe.width,fe.height,K.depth,0,ve,Se,fe.data)}else{P&&ae&&t.texStorage2D(r.TEXTURE_2D,te,ge,Ve[0].width,Ve[0].height);for(let X=0,se=Ve.length;X<se;X++)fe=Ve[X],M.format!==Wt?ve!==null?P?t.compressedTexSubImage2D(r.TEXTURE_2D,X,0,0,fe.width,fe.height,ve,fe.data):t.compressedTexImage2D(r.TEXTURE_2D,X,ge,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?t.texSubImage2D(r.TEXTURE_2D,X,0,0,fe.width,fe.height,ve,Se,fe.data):t.texImage2D(r.TEXTURE_2D,X,ge,fe.width,fe.height,0,ve,Se,fe.data)}else if(M.isDataArrayTexture)P?(ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,te,ge,K.width,K.height,K.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ve,Se,K.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,ge,K.width,K.height,K.depth,0,ve,Se,K.data);else if(M.isData3DTexture)P?(ae&&t.texStorage3D(r.TEXTURE_3D,te,ge,K.width,K.height,K.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ve,Se,K.data)):t.texImage3D(r.TEXTURE_3D,0,ge,K.width,K.height,K.depth,0,ve,Se,K.data);else if(M.isFramebufferTexture){if(ae)if(P)t.texStorage2D(r.TEXTURE_2D,te,ge,K.width,K.height);else{let X=K.width,se=K.height;for(let Me=0;Me<te;Me++)t.texImage2D(r.TEXTURE_2D,Me,ge,X,se,0,ve,Se,null),X>>=1,se>>=1}}else if(Ve.length>0&&we){P&&ae&&t.texStorage2D(r.TEXTURE_2D,te,ge,Ve[0].width,Ve[0].height);for(let X=0,se=Ve.length;X<se;X++)fe=Ve[X],P?t.texSubImage2D(r.TEXTURE_2D,X,0,0,ve,Se,fe):t.texImage2D(r.TEXTURE_2D,X,ge,ve,Se,fe);M.generateMipmaps=!1}else P?(ae&&t.texStorage2D(r.TEXTURE_2D,te,ge,K.width,K.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,Se,K)):t.texImage2D(r.TEXTURE_2D,0,ge,ve,Se,K);C(M,we)&&b(ne),pe.__version=ie.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function qe(w,M,F){if(M.image.length!==6)return;const ne=me(w,M),J=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+F);const ie=n.get(J);if(J.version!==ie.__version||ne===!0){t.activeTexture(r.TEXTURE0+F);const pe=Ye.getPrimaries(Ye.workingColorSpace),$=M.colorSpace===Xt?null:Ye.getPrimaries(M.colorSpace),ue=M.colorSpace===Xt||pe===$?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const L=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,K=[];for(let X=0;X<6;X++)!L&&!re?K[X]=x(M.image[X],!1,!0,c):K[X]=re?M.image[X].image:M.image[X],K[X]=nt(M,K[X]);const we=K[0],ve=y(we)||a,Se=s.convert(M.format,M.colorSpace),ge=s.convert(M.type),fe=N(M.internalFormat,Se,ge,M.colorSpace),Ve=a&&M.isVideoTexture!==!0,P=ie.__version===void 0||ne===!0;let ae=S(M,we,ve);Pe(r.TEXTURE_CUBE_MAP,M,ve);let te;if(L){Ve&&P&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ae,fe,we.width,we.height);for(let X=0;X<6;X++){te=K[X].mipmaps;for(let se=0;se<te.length;se++){const Me=te[se];M.format!==Wt?Se!==null?Ve?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se,0,0,Me.width,Me.height,Se,Me.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se,fe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se,0,0,Me.width,Me.height,Se,ge,Me.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se,fe,Me.width,Me.height,0,Se,ge,Me.data)}}}else{te=M.mipmaps,Ve&&P&&(te.length>0&&ae++,t.texStorage2D(r.TEXTURE_CUBE_MAP,ae,fe,K[0].width,K[0].height));for(let X=0;X<6;X++)if(re){Ve?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,K[X].width,K[X].height,Se,ge,K[X].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,fe,K[X].width,K[X].height,0,Se,ge,K[X].data);for(let se=0;se<te.length;se++){const We=te[se].image[X].image;Ve?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se+1,0,0,We.width,We.height,Se,ge,We.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se+1,fe,We.width,We.height,0,Se,ge,We.data)}}else{Ve?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Se,ge,K[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,fe,Se,ge,K[X]);for(let se=0;se<te.length;se++){const Me=te[se];Ve?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se+1,0,0,Se,ge,Me.image[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,se+1,fe,Se,ge,Me.image[X])}}}C(M,ve)&&b(r.TEXTURE_CUBE_MAP),ie.__version=J.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function Ne(w,M,F,ne,J,ie){const pe=s.convert(F.format,F.colorSpace),$=s.convert(F.type),ue=N(F.internalFormat,pe,$,F.colorSpace);if(!n.get(M).__hasExternalTextures){const re=Math.max(1,M.width>>ie),K=Math.max(1,M.height>>ie);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?t.texImage3D(J,ie,ue,re,K,M.depth,0,pe,$,null):t.texImage2D(J,ie,ue,re,K,0,pe,$,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),ke(M)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,J,n.get(F).__webglTexture,0,Le(M)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,J,n.get(F).__webglTexture,ie),t.bindFramebuffer(r.FRAMEBUFFER,null)}function O(w,M,F){if(r.bindRenderbuffer(r.RENDERBUFFER,w),M.depthBuffer&&!M.stencilBuffer){let ne=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(F||ke(M)){const J=M.depthTexture;J&&J.isDepthTexture&&(J.type===En?ne=r.DEPTH_COMPONENT32F:J.type===Bn&&(ne=r.DEPTH_COMPONENT24));const ie=Le(M);ke(M)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,ne,M.width,M.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,ne,M.width,M.height)}else r.renderbufferStorage(r.RENDERBUFFER,ne,M.width,M.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,w)}else if(M.depthBuffer&&M.stencilBuffer){const ne=Le(M);F&&ke(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,r.DEPTH24_STENCIL8,M.width,M.height):ke(M)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,r.DEPTH24_STENCIL8,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,w)}else{const ne=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let J=0;J<ne.length;J++){const ie=ne[J],pe=s.convert(ie.format,ie.colorSpace),$=s.convert(ie.type),ue=N(ie.internalFormat,pe,$,ie.colorSpace),L=Le(M);F&&ke(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,L,ue,M.width,M.height):ke(M)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L,ue,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,ue,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function lt(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const ne=n.get(M.depthTexture).__webglTexture,J=Le(M);if(M.depthTexture.format===ri)ke(M)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(M.depthTexture.format===Gi)ke(M)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function xe(w){const M=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");lt(M.__webglFramebuffer,w)}else if(F){M.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[ne]),M.__webglDepthbuffer[ne]=r.createRenderbuffer(),O(M.__webglDepthbuffer[ne],w,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),O(M.__webglDepthbuffer,w,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function be(w,M,F){const ne=n.get(w);M!==void 0&&Ne(ne.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&xe(w)}function Ae(w){const M=w.texture,F=n.get(w),ne=n.get(M);w.addEventListener("dispose",Y),w.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=M.version,o.memory.textures++);const J=w.isWebGLCubeRenderTarget===!0,ie=w.isWebGLMultipleRenderTargets===!0,pe=y(w)||a;if(J){F.__webglFramebuffer=[];for(let $=0;$<6;$++)if(a&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer[$]=[];for(let ue=0;ue<M.mipmaps.length;ue++)F.__webglFramebuffer[$][ue]=r.createFramebuffer()}else F.__webglFramebuffer[$]=r.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer=[];for(let $=0;$<M.mipmaps.length;$++)F.__webglFramebuffer[$]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(ie)if(i.drawBuffers){const $=w.texture;for(let ue=0,L=$.length;ue<L;ue++){const re=n.get($[ue]);re.__webglTexture===void 0&&(re.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&w.samples>0&&ke(w)===!1){const $=ie?M:[M];F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ue=0;ue<$.length;ue++){const L=$[ue];F.__webglColorRenderbuffer[ue]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[ue]);const re=s.convert(L.format,L.colorSpace),K=s.convert(L.type),we=N(L.internalFormat,re,K,L.colorSpace,w.isXRRenderTarget===!0),ve=Le(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,we,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ue,r.RENDERBUFFER,F.__webglColorRenderbuffer[ue])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),O(F.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),Pe(r.TEXTURE_CUBE_MAP,M,pe);for(let $=0;$<6;$++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)Ne(F.__webglFramebuffer[$][ue],w,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue);else Ne(F.__webglFramebuffer[$],w,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);C(M,pe)&&b(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const $=w.texture;for(let ue=0,L=$.length;ue<L;ue++){const re=$[ue],K=n.get(re);t.bindTexture(r.TEXTURE_2D,K.__webglTexture),Pe(r.TEXTURE_2D,re,pe),Ne(F.__webglFramebuffer,w,re,r.COLOR_ATTACHMENT0+ue,r.TEXTURE_2D,0),C(re,pe)&&b(r.TEXTURE_2D)}t.unbindTexture()}else{let $=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(a?$=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture($,ne.__webglTexture),Pe($,M,pe),a&&M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)Ne(F.__webglFramebuffer[ue],w,M,r.COLOR_ATTACHMENT0,$,ue);else Ne(F.__webglFramebuffer,w,M,r.COLOR_ATTACHMENT0,$,0);C(M,pe)&&b($),t.unbindTexture()}w.depthBuffer&&xe(w)}function Ke(w){const M=y(w)||a,F=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ne=0,J=F.length;ne<J;ne++){const ie=F[ne];if(C(ie,M)){const pe=w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,$=n.get(ie).__webglTexture;t.bindTexture(pe,$),b(pe),t.unbindTexture()}}}function Ie(w){if(a&&w.samples>0&&ke(w)===!1){const M=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],F=w.width,ne=w.height;let J=r.COLOR_BUFFER_BIT;const ie=[],pe=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=n.get(w),ue=w.isWebGLMultipleRenderTargets===!0;if(ue)for(let L=0;L<M.length;L++)t.bindFramebuffer(r.FRAMEBUFFER,$.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,$.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,$.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,$.__webglFramebuffer);for(let L=0;L<M.length;L++){ie.push(r.COLOR_ATTACHMENT0+L),w.depthBuffer&&ie.push(pe);const re=$.__ignoreDepthValues!==void 0?$.__ignoreDepthValues:!1;if(re===!1&&(w.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&(J|=r.STENCIL_BUFFER_BIT)),ue&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,$.__webglColorRenderbuffer[L]),re===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[pe]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[pe])),ue){const K=n.get(M[L]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,F,ne,0,0,F,ne,J,r.NEAREST),p&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ue)for(let L=0;L<M.length;L++){t.bindFramebuffer(r.FRAMEBUFFER,$.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.RENDERBUFFER,$.__webglColorRenderbuffer[L]);const re=n.get(M[L]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,$.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+L,r.TEXTURE_2D,re,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,$.__webglMultisampledFramebuffer)}}function Le(w){return Math.min(u,w.samples)}function ke(w){const M=n.get(w);return a&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Qe(w){const M=o.render.frame;g.get(w)!==M&&(g.set(w,M),w.update())}function nt(w,M){const F=w.colorSpace,ne=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===So||F!==St&&F!==Xt&&(Ye.getTransfer(F)===tt?a===!1?e.has("EXT_sRGB")===!0&&ne===Wt?(w.format=So,w.minFilter=It,w.generateMipmaps=!1):M=Pc.sRGBToLinear(M):(ne!==Wt||J!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),M}this.allocateTextureUnit=ee,this.resetTextureUnits=W,this.setTexture2D=q,this.setTexture2DArray=D,this.setTexture3D=z,this.setTextureCube=oe,this.rebindTextures=be,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=ke}function Bg(r,e,t){const n=t.isWebGL2;function i(s,o=Xt){let a;const l=Ye.getTransfer(o);if(s===Vn)return r.UNSIGNED_BYTE;if(s===Mc)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Sc)return r.UNSIGNED_SHORT_5_5_5_1;if(s===ou)return r.BYTE;if(s===au)return r.SHORT;if(s===Fo)return r.UNSIGNED_SHORT;if(s===yc)return r.INT;if(s===Bn)return r.UNSIGNED_INT;if(s===En)return r.FLOAT;if(s===xs)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===lu)return r.ALPHA;if(s===Wt)return r.RGBA;if(s===cu)return r.LUMINANCE;if(s===hu)return r.LUMINANCE_ALPHA;if(s===ri)return r.DEPTH_COMPONENT;if(s===Gi)return r.DEPTH_STENCIL;if(s===So)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===uu)return r.RED;if(s===Ec)return r.RED_INTEGER;if(s===du)return r.RG;if(s===Tc)return r.RG_INTEGER;if(s===bc)return r.RGBA_INTEGER;if(s===Er||s===Tr||s===br||s===Ar)if(l===tt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Er)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Tr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===br)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ar)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Er)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Tr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===br)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ar)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ma||s===ga||s===_a||s===xa)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ma)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ga)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===_a)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===xa)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===fu)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===va||s===ya)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===va)return l===tt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===ya)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ma||s===Sa||s===Ea||s===Ta||s===ba||s===Aa||s===wa||s===Ra||s===Ca||s===La||s===Pa||s===Ia||s===Da||s===Na)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Ma)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Sa)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ea)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ta)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ba)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Aa)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===wa)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ra)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ca)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===La)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Pa)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ia)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Da)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Na)return l===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===wr||s===Ua||s===Oa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===wr)return l===tt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ua)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Oa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===pu||s===Fa||s===Ba||s===za)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===wr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Fa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ba)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===za)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===si?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class zg extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class An extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gg={type:"move"};class Zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new An;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Hg extends Mt{constructor(e,t,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:ri,h!==ri&&h!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ri&&(n=Bn),n===void 0&&h===Gi&&(n=si),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:vt,this.minFilter=l!==void 0?l:vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kg extends Xn{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const _=t.getContextAttributes();let m=null,f=null;const v=[],x=[],y=new Pt;y.layers.enable(1),y.viewport=new Je;const E=new Pt;E.layers.enable(2),E.viewport=new Je;const C=[y,E],b=new zg;b.layers.enable(1),b.layers.enable(2);let N=null,S=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let z=v[D];return z===void 0&&(z=new Zr,v[D]=z),z.getTargetRaySpace()},this.getControllerGrip=function(D){let z=v[D];return z===void 0&&(z=new Zr,v[D]=z),z.getGripSpace()},this.getHand=function(D){let z=v[D];return z===void 0&&(z=new Zr,v[D]=z),z.getHandSpace()};function A(D){const z=x.indexOf(D.inputSource);if(z===-1)return;const oe=v[z];oe!==void 0&&(oe.update(D.inputSource,D.frame,c||o),oe.dispatchEvent({type:D.type,data:D.inputSource}))}function B(){i.removeEventListener("select",A),i.removeEventListener("selectstart",A),i.removeEventListener("selectend",A),i.removeEventListener("squeeze",A),i.removeEventListener("squeezestart",A),i.removeEventListener("squeezeend",A),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",Y);for(let D=0;D<v.length;D++){const z=x[D];z!==null&&(x[D]=null,v[D].disconnect(z))}N=null,S=null,e.setRenderTarget(m),p=null,d=null,u=null,i=null,f=null,q.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){s=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){a=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(D){c=D},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(D){if(i=D,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",A),i.addEventListener("selectstart",A),i.addEventListener("selectend",A),i.addEventListener("squeeze",A),i.addEventListener("squeezestart",A),i.addEventListener("squeezeend",A),i.addEventListener("end",B),i.addEventListener("inputsourceschange",Y),_.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const z={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,z),i.updateRenderState({baseLayer:p}),f=new li(p.framebufferWidth,p.framebufferHeight,{format:Wt,type:Vn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let z=null,oe=null,le=null;_.depth&&(le=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,z=_.stencil?Gi:ri,oe=_.stencil?si:Bn);const he={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(he),i.updateRenderState({layers:[d]}),f=new li(d.textureWidth,d.textureHeight,{format:Wt,type:Vn,depthTexture:new Hg(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const _e=e.properties.get(f);_e.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),q.setContext(i),q.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function Y(D){for(let z=0;z<D.removed.length;z++){const oe=D.removed[z],le=x.indexOf(oe);le>=0&&(x[le]=null,v[le].disconnect(oe))}for(let z=0;z<D.added.length;z++){const oe=D.added[z];let le=x.indexOf(oe);if(le===-1){for(let _e=0;_e<v.length;_e++)if(_e>=x.length){x.push(oe),le=_e;break}else if(x[_e]===null){x[_e]=oe,le=_e;break}if(le===-1)break}const he=v[le];he&&he.connect(oe)}}const Q=new R,I=new R;function H(D,z,oe){Q.setFromMatrixPosition(z.matrixWorld),I.setFromMatrixPosition(oe.matrixWorld);const le=Q.distanceTo(I),he=z.projectionMatrix.elements,_e=oe.projectionMatrix.elements,Pe=he[14]/(he[10]-1),me=he[14]/(he[10]+1),Ce=(he[9]+1)/he[5],qe=(he[9]-1)/he[5],Ne=(he[8]-1)/he[0],O=(_e[8]+1)/_e[0],lt=Pe*Ne,xe=Pe*O,be=le/(-Ne+O),Ae=be*-Ne;z.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Ae),D.translateZ(be),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Ke=Pe+be,Ie=me+be,Le=lt-Ae,ke=xe+(le-Ae),Qe=Ce*me/Ie*Ke,nt=qe*me/Ie*Ke;D.projectionMatrix.makePerspective(Le,ke,Qe,nt,Ke,Ie),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function j(D,z){z===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(z.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(i===null)return;b.near=E.near=y.near=D.near,b.far=E.far=y.far=D.far,(N!==b.near||S!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),N=b.near,S=b.far);const z=D.parent,oe=b.cameras;j(b,z);for(let le=0;le<oe.length;le++)j(oe[le],z);oe.length===2?H(b,y,E):b.projectionMatrix.copy(y.projectionMatrix),W(D,b,z)};function W(D,z,oe){oe===null?D.matrix.copy(z.matrixWorld):(D.matrix.copy(oe.matrixWorld),D.matrix.invert(),D.matrix.multiply(z.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(z.projectionMatrix),D.projectionMatrixInverse.copy(z.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=ki*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(D){l=D,d!==null&&(d.fixedFoveation=D),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=D)};let ee=null;function Z(D,z){if(h=z.getViewerPose(c||o),g=z,h!==null){const oe=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let le=!1;oe.length!==b.cameras.length&&(b.cameras.length=0,le=!0);for(let he=0;he<oe.length;he++){const _e=oe[he];let Pe=null;if(p!==null)Pe=p.getViewport(_e);else{const Ce=u.getViewSubImage(d,_e);Pe=Ce.viewport,he===0&&(e.setRenderTargetTextures(f,Ce.colorTexture,d.ignoreDepthValues?void 0:Ce.depthStencilTexture),e.setRenderTarget(f))}let me=C[he];me===void 0&&(me=new Pt,me.layers.enable(he),me.viewport=new Je,C[he]=me),me.matrix.fromArray(_e.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(_e.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),he===0&&(b.matrix.copy(me.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),le===!0&&b.cameras.push(me)}}for(let oe=0;oe<v.length;oe++){const le=x[oe],he=v[oe];le!==null&&he!==void 0&&he.update(le,z,c||o)}ee&&ee(D,z),z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:z}),g=null}const q=new Gc;q.setAnimationLoop(Z),this.setAnimationLoop=function(D){ee=D},this.dispose=function(){}}}function Vg(r,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Fc(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,v,x,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,v,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Dt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Dt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*x,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Dt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Wg(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const y=x.program;n.uniformBlockBinding(v,y)}function c(v,x){let y=i[v.id];y===void 0&&(g(v),y=h(v),i[v.id]=y,v.addEventListener("dispose",m));const E=x.program;n.updateUBOMapping(v,E);const C=e.render.frame;s[v.id]!==C&&(d(v),s[v.id]=C)}function h(v){const x=u();v.__bindingPointIndex=x;const y=r.createBuffer(),E=v.__size,C=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,E,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=i[v.id],y=v.uniforms,E=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let C=0,b=y.length;C<b;C++){const N=y[C];if(p(N,C,E)===!0){const S=N.__offset,A=Array.isArray(N.value)?N.value:[N.value];let B=0;for(let Y=0;Y<A.length;Y++){const Q=A[Y],I=_(Q);typeof Q=="number"?(N.__data[0]=Q,r.bufferSubData(r.UNIFORM_BUFFER,S+B,N.__data)):Q.isMatrix3?(N.__data[0]=Q.elements[0],N.__data[1]=Q.elements[1],N.__data[2]=Q.elements[2],N.__data[3]=Q.elements[0],N.__data[4]=Q.elements[3],N.__data[5]=Q.elements[4],N.__data[6]=Q.elements[5],N.__data[7]=Q.elements[0],N.__data[8]=Q.elements[6],N.__data[9]=Q.elements[7],N.__data[10]=Q.elements[8],N.__data[11]=Q.elements[0]):(Q.toArray(N.__data,B),B+=I.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,S,N.__data)}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(v,x,y){const E=v.value;if(y[x]===void 0){if(typeof E=="number")y[x]=E;else{const C=Array.isArray(E)?E:[E],b=[];for(let N=0;N<C.length;N++)b.push(C[N].clone());y[x]=b}return!0}else if(typeof E=="number"){if(y[x]!==E)return y[x]=E,!0}else{const C=Array.isArray(y[x])?y[x]:[y[x]],b=Array.isArray(E)?E:[E];for(let N=0;N<C.length;N++){const S=C[N];if(S.equals(b[N])===!1)return S.copy(b[N]),!0}}return!1}function g(v){const x=v.uniforms;let y=0;const E=16;let C=0;for(let b=0,N=x.length;b<N;b++){const S=x[b],A={boundary:0,storage:0},B=Array.isArray(S.value)?S.value:[S.value];for(let Y=0,Q=B.length;Y<Q;Y++){const I=B[Y],H=_(I);A.boundary+=H.boundary,A.storage+=H.storage}if(S.__data=new Float32Array(A.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=y,b>0){C=y%E;const Y=E-C;C!==0&&Y-A.boundary<0&&(y+=E-C,S.__offset=y)}y+=A.storage}return C=y%E,C>0&&(y+=E-C),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function f(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:f}}class Xc{constructor(e={}){const{canvas:t=Hu(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rt,this._useLegacyLights=!1,this.toneMapping=kn,this.toneMappingExposure=1;const x=this;let y=!1,E=0,C=0,b=null,N=-1,S=null;const A=new Je,B=new Je;let Y=null;const Q=new Te(0);let I=0,H=t.width,j=t.height,W=1,ee=null,Z=null;const q=new Je(0,0,H,j),D=new Je(0,0,H,j);let z=!1;const oe=new ko;let le=!1,he=!1,_e=null;const Pe=new Ue,me=new Ee,Ce=new R,qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ne(){return b===null?W:1}let O=n;function lt(T,U){for(let G=0;G<T.length;G++){const k=T[G],V=t.getContext(k,U);if(V!==null)return V}return null}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uo}`),t.addEventListener("webglcontextlost",Ve,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",ae,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&U.shift(),O=lt(U,T),O===null)throw lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let xe,be,Ae,Ke,Ie,Le,ke,Qe,nt,w,M,F,ne,J,ie,pe,$,ue,L,re,K,we,ve,Se;function ge(){xe=new em(O),be=new qp(O,xe,e),xe.init(be),we=new Bg(O,xe,be),Ae=new Og(O,xe,be),Ke=new im(O),Ie=new Sg,Le=new Fg(O,xe,Ae,Ie,be,we,Ke),ke=new Kp(x),Qe=new Qp(x),nt=new dd(O,be),ve=new jp(O,xe,nt,be),w=new tm(O,nt,Ke,ve),M=new am(O,w,nt,Ke),L=new om(O,be,Le),pe=new $p(Ie),F=new Mg(x,ke,Qe,xe,be,ve,pe),ne=new Vg(x,Ie),J=new Tg,ie=new Lg(xe,be),ue=new Xp(x,ke,Qe,Ae,M,d,l),$=new Ug(x,M,be),Se=new Wg(O,Ke,be,Ae),re=new Yp(O,xe,Ke,be),K=new nm(O,xe,Ke,be),Ke.programs=F.programs,x.capabilities=be,x.extensions=xe,x.properties=Ie,x.renderLists=J,x.shadowMap=$,x.state=Ae,x.info=Ke}ge();const fe=new kg(x,O);this.xr=fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const T=xe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=xe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(H,j,!1))},this.getSize=function(T){return T.set(H,j)},this.setSize=function(T,U,G=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,j=U,t.width=Math.floor(T*W),t.height=Math.floor(U*W),G===!0&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(H*W,j*W).floor()},this.setDrawingBufferSize=function(T,U,G){H=T,j=U,W=G,t.width=Math.floor(T*G),t.height=Math.floor(U*G),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(A)},this.getViewport=function(T){return T.copy(q)},this.setViewport=function(T,U,G,k){T.isVector4?q.set(T.x,T.y,T.z,T.w):q.set(T,U,G,k),Ae.viewport(A.copy(q).multiplyScalar(W).floor())},this.getScissor=function(T){return T.copy(D)},this.setScissor=function(T,U,G,k){T.isVector4?D.set(T.x,T.y,T.z,T.w):D.set(T,U,G,k),Ae.scissor(B.copy(D).multiplyScalar(W).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(T){Ae.setScissorTest(z=T)},this.setOpaqueSort=function(T){ee=T},this.setTransparentSort=function(T){Z=T},this.getClearColor=function(T){return T.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor.apply(ue,arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha.apply(ue,arguments)},this.clear=function(T=!0,U=!0,G=!0){let k=0;if(T){let V=!1;if(b!==null){const de=b.texture.format;V=de===bc||de===Tc||de===Ec}if(V){const de=b.texture.type,ye=de===Vn||de===Bn||de===Fo||de===si||de===Mc||de===Sc,Re=ue.getClearColor(),De=ue.getClearAlpha(),ze=Re.r,Oe=Re.g,Fe=Re.b;ye?(p[0]=ze,p[1]=Oe,p[2]=Fe,p[3]=De,O.clearBufferuiv(O.COLOR,0,p)):(g[0]=ze,g[1]=Oe,g[2]=Fe,g[3]=De,O.clearBufferiv(O.COLOR,0,g))}else k|=O.COLOR_BUFFER_BIT}U&&(k|=O.DEPTH_BUFFER_BIT),G&&(k|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),J.dispose(),ie.dispose(),Ie.dispose(),ke.dispose(),Qe.dispose(),M.dispose(),ve.dispose(),Se.dispose(),F.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",Gt),fe.removeEventListener("sessionend",et),_e&&(_e.dispose(),_e=null),wt.stop()};function Ve(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const T=Ke.autoReset,U=$.enabled,G=$.autoUpdate,k=$.needsUpdate,V=$.type;ge(),Ke.autoReset=T,$.enabled=U,$.autoUpdate=G,$.needsUpdate=k,$.type=V}function ae(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function te(T){const U=T.target;U.removeEventListener("dispose",te),X(U)}function X(T){se(T),Ie.remove(T)}function se(T){const U=Ie.get(T).programs;U!==void 0&&(U.forEach(function(G){F.releaseProgram(G)}),T.isShaderMaterial&&F.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,G,k,V,de){U===null&&(U=qe);const ye=V.isMesh&&V.matrixWorld.determinant()<0,Re=lh(T,U,G,k,V);Ae.setMaterial(k,ye);let De=G.index,ze=1;if(k.wireframe===!0){if(De=w.getWireframeAttribute(G),De===void 0)return;ze=2}const Oe=G.drawRange,Fe=G.attributes.position;let ot=Oe.start*ze,Ut=(Oe.start+Oe.count)*ze;de!==null&&(ot=Math.max(ot,de.start*ze),Ut=Math.min(Ut,(de.start+de.count)*ze)),De!==null?(ot=Math.max(ot,0),Ut=Math.min(Ut,De.count)):Fe!=null&&(ot=Math.max(ot,0),Ut=Math.min(Ut,Fe.count));const gt=Ut-ot;if(gt<0||gt===1/0)return;ve.setup(V,k,Re,G,De);let dn,st=re;if(De!==null&&(dn=nt.get(De),st=K,st.setIndex(dn)),V.isMesh)k.wireframe===!0?(Ae.setLineWidth(k.wireframeLinewidth*Ne()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(V.isLine){let Xe=k.linewidth;Xe===void 0&&(Xe=1),Ae.setLineWidth(Xe*Ne()),V.isLineSegments?st.setMode(O.LINES):V.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else V.isPoints?st.setMode(O.POINTS):V.isSprite&&st.setMode(O.TRIANGLES);if(V.isInstancedMesh)st.renderInstances(ot,gt,V.count);else if(G.isInstancedBufferGeometry){const Xe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xr=Math.min(G.instanceCount,Xe);st.renderInstances(ot,gt,xr)}else st.render(ot,gt)};function Me(T,U,G){T.transparent===!0&&T.side===on&&T.forceSinglePass===!1?(T.side=Dt,T.needsUpdate=!0,Es(T,U,G),T.side=wn,T.needsUpdate=!0,Es(T,U,G),T.side=on):Es(T,U,G)}this.compile=function(T,U,G=null){G===null&&(G=T),m=ie.get(G),m.init(),v.push(m),G.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),T!==G&&T.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights(x._useLegacyLights);const k=new Set;return T.traverse(function(V){const de=V.material;if(de)if(Array.isArray(de))for(let ye=0;ye<de.length;ye++){const Re=de[ye];Me(Re,G,V),k.add(Re)}else Me(de,G,V),k.add(de)}),v.pop(),m=null,k},this.compileAsync=function(T,U,G=null){const k=this.compile(T,U,G);return new Promise(V=>{function de(){if(k.forEach(function(ye){Ie.get(ye).currentProgram.isReady()&&k.delete(ye)}),k.size===0){V(T);return}setTimeout(de,10)}xe.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let We=null;function ct(T){We&&We(T)}function Gt(){wt.stop()}function et(){wt.start()}const wt=new Gc;wt.setAnimationLoop(ct),typeof self<"u"&&wt.setContext(self),this.setAnimationLoop=function(T){We=T,fe.setAnimationLoop(T),T===null?wt.stop():wt.start()},fe.addEventListener("sessionstart",Gt),fe.addEventListener("sessionend",et),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(U),U=fe.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,U,b),m=ie.get(T,v.length),m.init(),v.push(m),Pe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),oe.setFromProjectionMatrix(Pe),he=this.localClippingEnabled,le=pe.init(this.clippingPlanes,he),_=J.get(T,f.length),_.init(),f.push(_),nn(T,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(ee,Z),this.info.render.frame++,le===!0&&pe.beginShadows();const G=m.state.shadowsArray;if($.render(G,T,U),le===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),ue.render(_,T),m.setupLights(x._useLegacyLights),U.isArrayCamera){const k=U.cameras;for(let V=0,de=k.length;V<de;V++){const ye=k[V];ta(_,T,ye,ye.viewport)}}else ta(_,T,U);b!==null&&(Le.updateMultisampleRenderTarget(b),Le.updateRenderTargetMipmap(b)),T.isScene===!0&&T.onAfterRender(x,T,U),ve.resetDefaultState(),N=-1,S=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function nn(T,U,G,k){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||oe.intersectsSprite(T)){k&&Ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Pe);const ye=M.update(T),Re=T.material;Re.visible&&_.push(T,ye,Re,G,Ce.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||oe.intersectsObject(T))){const ye=M.update(T),Re=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ce.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ce.copy(ye.boundingSphere.center)),Ce.applyMatrix4(T.matrixWorld).applyMatrix4(Pe)),Array.isArray(Re)){const De=ye.groups;for(let ze=0,Oe=De.length;ze<Oe;ze++){const Fe=De[ze],ot=Re[Fe.materialIndex];ot&&ot.visible&&_.push(T,ye,ot,G,Ce.z,Fe)}}else Re.visible&&_.push(T,ye,Re,G,Ce.z,null)}}const de=T.children;for(let ye=0,Re=de.length;ye<Re;ye++)nn(de[ye],U,G,k)}function ta(T,U,G,k){const V=T.opaque,de=T.transmissive,ye=T.transparent;m.setupLightsView(G),le===!0&&pe.setGlobalState(x.clippingPlanes,G),de.length>0&&ah(V,de,U,G),k&&Ae.viewport(A.copy(k)),V.length>0&&Ss(V,U,G),de.length>0&&Ss(de,U,G),ye.length>0&&Ss(ye,U,G),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function ah(T,U,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const de=be.isWebGL2;_e===null&&(_e=new li(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?xs:Vn,minFilter:ai,samples:de?4:0})),x.getDrawingBufferSize(me),de?_e.setSize(me.x,me.y):_e.setSize(hr(me.x),hr(me.y));const ye=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(Q),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();const Re=x.toneMapping;x.toneMapping=kn,Ss(T,G,k),Le.updateMultisampleRenderTarget(_e),Le.updateRenderTargetMipmap(_e);let De=!1;for(let ze=0,Oe=U.length;ze<Oe;ze++){const Fe=U[ze],ot=Fe.object,Ut=Fe.geometry,gt=Fe.material,dn=Fe.group;if(gt.side===on&&ot.layers.test(k.layers)){const st=gt.side;gt.side=Dt,gt.needsUpdate=!0,na(ot,G,k,Ut,gt,dn),gt.side=st,gt.needsUpdate=!0,De=!0}}De===!0&&(Le.updateMultisampleRenderTarget(_e),Le.updateRenderTargetMipmap(_e)),x.setRenderTarget(ye),x.setClearColor(Q,I),x.toneMapping=Re}function Ss(T,U,G){const k=U.isScene===!0?U.overrideMaterial:null;for(let V=0,de=T.length;V<de;V++){const ye=T[V],Re=ye.object,De=ye.geometry,ze=k===null?ye.material:k,Oe=ye.group;Re.layers.test(G.layers)&&na(Re,U,G,De,ze,Oe)}}function na(T,U,G,k,V,de){T.onBeforeRender(x,U,G,k,V,de),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(x,U,G,k,T,de),V.transparent===!0&&V.side===on&&V.forceSinglePass===!1?(V.side=Dt,V.needsUpdate=!0,x.renderBufferDirect(G,U,k,V,T,de),V.side=wn,V.needsUpdate=!0,x.renderBufferDirect(G,U,k,V,T,de),V.side=on):x.renderBufferDirect(G,U,k,V,T,de),T.onAfterRender(x,U,G,k,V,de)}function Es(T,U,G){U.isScene!==!0&&(U=qe);const k=Ie.get(T),V=m.state.lights,de=m.state.shadowsArray,ye=V.state.version,Re=F.getParameters(T,V.state,de,U,G),De=F.getProgramCacheKey(Re);let ze=k.programs;k.environment=T.isMeshStandardMaterial?U.environment:null,k.fog=U.fog,k.envMap=(T.isMeshStandardMaterial?Qe:ke).get(T.envMap||k.environment),ze===void 0&&(T.addEventListener("dispose",te),ze=new Map,k.programs=ze);let Oe=ze.get(De);if(Oe!==void 0){if(k.currentProgram===Oe&&k.lightsStateVersion===ye)return sa(T,Re),Oe}else Re.uniforms=F.getUniforms(T),T.onBuild(G,Re,x),T.onBeforeCompile(Re,x),Oe=F.acquireProgram(Re,De),ze.set(De,Oe),k.uniforms=Re.uniforms;const Fe=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=pe.uniform),sa(T,Re),k.needsLights=hh(T),k.lightsStateVersion=ye,k.needsLights&&(Fe.ambientLightColor.value=V.state.ambient,Fe.lightProbe.value=V.state.probe,Fe.directionalLights.value=V.state.directional,Fe.directionalLightShadows.value=V.state.directionalShadow,Fe.spotLights.value=V.state.spot,Fe.spotLightShadows.value=V.state.spotShadow,Fe.rectAreaLights.value=V.state.rectArea,Fe.ltc_1.value=V.state.rectAreaLTC1,Fe.ltc_2.value=V.state.rectAreaLTC2,Fe.pointLights.value=V.state.point,Fe.pointLightShadows.value=V.state.pointShadow,Fe.hemisphereLights.value=V.state.hemi,Fe.directionalShadowMap.value=V.state.directionalShadowMap,Fe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Fe.spotShadowMap.value=V.state.spotShadowMap,Fe.spotLightMatrix.value=V.state.spotLightMatrix,Fe.spotLightMap.value=V.state.spotLightMap,Fe.pointShadowMap.value=V.state.pointShadowMap,Fe.pointShadowMatrix.value=V.state.pointShadowMatrix),k.currentProgram=Oe,k.uniformsList=null,Oe}function ia(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=ir.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function sa(T,U){const G=Ie.get(T);G.outputColorSpace=U.outputColorSpace,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function lh(T,U,G,k,V){U.isScene!==!0&&(U=qe),Le.resetTextureUnits();const de=U.fog,ye=k.isMeshStandardMaterial?U.environment:null,Re=b===null?x.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:St,De=(k.isMeshStandardMaterial?Qe:ke).get(k.envMap||ye),ze=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Oe=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Fe=!!G.morphAttributes.position,ot=!!G.morphAttributes.normal,Ut=!!G.morphAttributes.color;let gt=kn;k.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(gt=x.toneMapping);const dn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,st=dn!==void 0?dn.length:0,Xe=Ie.get(k),xr=m.state.lights;if(le===!0&&(he===!0||T!==S)){const Ot=T===S&&k.id===N;pe.setState(k,T,Ot)}let ht=!1;k.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==xr.state.version||Xe.outputColorSpace!==Re||V.isInstancedMesh&&Xe.instancing===!1||!V.isInstancedMesh&&Xe.instancing===!0||V.isSkinnedMesh&&Xe.skinning===!1||!V.isSkinnedMesh&&Xe.skinning===!0||V.isInstancedMesh&&Xe.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Xe.instancingColor===!1&&V.instanceColor!==null||Xe.envMap!==De||k.fog===!0&&Xe.fog!==de||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==pe.numPlanes||Xe.numIntersection!==pe.numIntersection)||Xe.vertexAlphas!==ze||Xe.vertexTangents!==Oe||Xe.morphTargets!==Fe||Xe.morphNormals!==ot||Xe.morphColors!==Ut||Xe.toneMapping!==gt||be.isWebGL2===!0&&Xe.morphTargetsCount!==st)&&(ht=!0):(ht=!0,Xe.__version=k.version);let Yn=Xe.currentProgram;ht===!0&&(Yn=Es(k,U,V));let ra=!1,Ji=!1,vr=!1;const Rt=Yn.getUniforms(),qn=Xe.uniforms;if(Ae.useProgram(Yn.program)&&(ra=!0,Ji=!0,vr=!0),k.id!==N&&(N=k.id,Ji=!0),ra||S!==T){Rt.setValue(O,"projectionMatrix",T.projectionMatrix),Rt.setValue(O,"viewMatrix",T.matrixWorldInverse);const Ot=Rt.map.cameraPosition;Ot!==void 0&&Ot.setValue(O,Ce.setFromMatrixPosition(T.matrixWorld)),be.logarithmicDepthBuffer&&Rt.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Rt.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,Ji=!0,vr=!0)}if(V.isSkinnedMesh){Rt.setOptional(O,V,"bindMatrix"),Rt.setOptional(O,V,"bindMatrixInverse");const Ot=V.skeleton;Ot&&(be.floatVertexTextures?(Ot.boneTexture===null&&Ot.computeBoneTexture(),Rt.setValue(O,"boneTexture",Ot.boneTexture,Le),Rt.setValue(O,"boneTextureSize",Ot.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const yr=G.morphAttributes;if((yr.position!==void 0||yr.normal!==void 0||yr.color!==void 0&&be.isWebGL2===!0)&&L.update(V,G,Yn),(Ji||Xe.receiveShadow!==V.receiveShadow)&&(Xe.receiveShadow=V.receiveShadow,Rt.setValue(O,"receiveShadow",V.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(qn.envMap.value=De,qn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Ji&&(Rt.setValue(O,"toneMappingExposure",x.toneMappingExposure),Xe.needsLights&&ch(qn,vr),de&&k.fog===!0&&ne.refreshFogUniforms(qn,de),ne.refreshMaterialUniforms(qn,k,W,j,_e),ir.upload(O,ia(Xe),qn,Le)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ir.upload(O,ia(Xe),qn,Le),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Rt.setValue(O,"center",V.center),Rt.setValue(O,"modelViewMatrix",V.modelViewMatrix),Rt.setValue(O,"normalMatrix",V.normalMatrix),Rt.setValue(O,"modelMatrix",V.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Ot=k.uniformsGroups;for(let Mr=0,uh=Ot.length;Mr<uh;Mr++)if(be.isWebGL2){const oa=Ot[Mr];Se.update(oa,Yn),Se.bind(oa,Yn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yn}function ch(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function hh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(T,U,G){Ie.get(T.texture).__webglTexture=U,Ie.get(T.depthTexture).__webglTexture=G;const k=Ie.get(T);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=G===void 0,k.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,U){const G=Ie.get(T);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,G=0){b=T,E=U,C=G;let k=!0,V=null,de=!1,ye=!1;if(T){const De=Ie.get(T);De.__useDefaultFramebuffer!==void 0?(Ae.bindFramebuffer(O.FRAMEBUFFER,null),k=!1):De.__webglFramebuffer===void 0?Le.setupRenderTarget(T):De.__hasExternalTextures&&Le.rebindTextures(T,Ie.get(T.texture).__webglTexture,Ie.get(T.depthTexture).__webglTexture);const ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ye=!0);const Oe=Ie.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Oe[U])?V=Oe[U][G]:V=Oe[U],de=!0):be.isWebGL2&&T.samples>0&&Le.useMultisampledRTT(T)===!1?V=Ie.get(T).__webglMultisampledFramebuffer:Array.isArray(Oe)?V=Oe[G]:V=Oe,A.copy(T.viewport),B.copy(T.scissor),Y=T.scissorTest}else A.copy(q).multiplyScalar(W).floor(),B.copy(D).multiplyScalar(W).floor(),Y=z;if(Ae.bindFramebuffer(O.FRAMEBUFFER,V)&&be.drawBuffers&&k&&Ae.drawBuffers(T,V),Ae.viewport(A),Ae.scissor(B),Ae.setScissorTest(Y),de){const De=Ie.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,De.__webglTexture,G)}else if(ye){const De=Ie.get(T.texture),ze=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,De.__webglTexture,G||0,ze)}N=-1},this.readRenderTargetPixels=function(T,U,G,k,V,de,ye){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Ie.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Re=Re[ye]),Re){Ae.bindFramebuffer(O.FRAMEBUFFER,Re);try{const De=T.texture,ze=De.format,Oe=De.type;if(ze!==Wt&&we.convert(ze)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Fe=Oe===xs&&(xe.has("EXT_color_buffer_half_float")||be.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Oe!==Vn&&we.convert(Oe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Oe===En&&(be.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-k&&G>=0&&G<=T.height-V&&O.readPixels(U,G,k,V,we.convert(ze),we.convert(Oe),de)}finally{const De=b!==null?Ie.get(b).__webglFramebuffer:null;Ae.bindFramebuffer(O.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(T,U,G=0){const k=Math.pow(2,-G),V=Math.floor(U.image.width*k),de=Math.floor(U.image.height*k);Le.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,T.x,T.y,V,de),Ae.unbindTexture()},this.copyTextureToTexture=function(T,U,G,k=0){const V=U.image.width,de=U.image.height,ye=we.convert(G.format),Re=we.convert(G.type);Le.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,k,T.x,T.y,V,de,ye,Re,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,k,T.x,T.y,U.mipmaps[0].width,U.mipmaps[0].height,ye,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,k,T.x,T.y,ye,Re,U.image),k===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(T,U,G,k,V=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=T.max.x-T.min.x+1,ye=T.max.y-T.min.y+1,Re=T.max.z-T.min.z+1,De=we.convert(k.format),ze=we.convert(k.type);let Oe;if(k.isData3DTexture)Le.setTexture3D(k,0),Oe=O.TEXTURE_3D;else if(k.isDataArrayTexture)Le.setTexture2DArray(k,0),Oe=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const Fe=O.getParameter(O.UNPACK_ROW_LENGTH),ot=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ut=O.getParameter(O.UNPACK_SKIP_PIXELS),gt=O.getParameter(O.UNPACK_SKIP_ROWS),dn=O.getParameter(O.UNPACK_SKIP_IMAGES),st=G.isCompressedTexture?G.mipmaps[0]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,T.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,T.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,T.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Oe,V,U.x,U.y,U.z,de,ye,Re,De,ze,st.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Oe,V,U.x,U.y,U.z,de,ye,Re,De,st.data)):O.texSubImage3D(Oe,V,U.x,U.y,U.z,de,ye,Re,De,ze,st),O.pixelStorei(O.UNPACK_ROW_LENGTH,Fe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ot),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ut),O.pixelStorei(O.UNPACK_SKIP_ROWS,gt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,dn),V===0&&k.generateMipmaps&&O.generateMipmap(Oe),Ae.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?Le.setTextureCube(T,0):T.isData3DTexture?Le.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Le.setTexture2DArray(T,0):Le.setTexture2D(T,0),Ae.unbindTexture()},this.resetState=function(){E=0,C=0,b=null,Ae.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===zo?"display-p3":"srgb",t.unpackColorSpace=Ye.workingColorSpace===fr?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===rt?oi:wc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===oi?rt:St}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Xg extends Xc{}Xg.prototype.isWebGL1Renderer=!0;class jg extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Yg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Mo,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ct=new R;class Xo{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),i=Ze(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),i=Ze(i,this.array),s=Ze(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Xo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ll=new R,Pl=new Je,Il=new Je,qg=new R,Dl=new Ue,js=new R,Jr=new hn,Nl=new Ue,Qr=new Yi;class $g extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=pa,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,js),this.boundingBox.expandByPoint(js)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,js),this.boundingSphere.expandByPoint(js)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(i),e.ray.intersectsSphere(Jr)!==!1&&(Nl.copy(i).invert(),Qr.copy(e.ray).applyMatrix4(Nl),!(this.boundingBox!==null&&Qr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Qr)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Je,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===pa?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ru?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Pl.fromBufferAttribute(i.attributes.skinIndex,e),Il.fromBufferAttribute(i.attributes.skinWeight,e),Ll.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Il.getComponent(s);if(o!==0){const a=Pl.getComponent(s);Dl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(qg.copy(Ll).applyMatrix4(Dl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class jc extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Kg extends Mt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=vt,h=vt,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ul=new Ue,Zg=new Ue;class jo{constructor(e=[],t=[]){this.uuid=en(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Zg;Ul.multiplyMatrices(a,t[s]),Ul.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new jo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Rc(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Kg(t,e,e,Wt,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new jc),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class bo extends bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Li=new Ue,Ol=new Ue,Ys=[],Fl=new Yt,Jg=new Ue,is=new at,ss=new hn;class Yc extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bo(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Jg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Li),Fl.copy(e.boundingBox).applyMatrix4(Li),this.boundingBox.union(Fl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Li),ss.copy(e.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(ss)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(is.geometry=this.geometry,is.material=this.material,is.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ss.copy(this.boundingSphere),ss.applyMatrix4(n),e.ray.intersectsSphere(ss)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Li),Ol.multiplyMatrices(n,Li),is.matrixWorld=Ol,is.raycast(e,Ys);for(let o=0,a=Ys.length;o<a;o++){const l=Ys[o];l.instanceId=s,l.object=this,t.push(l)}Ys.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new bo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class gr extends jt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Bl=new R,zl=new R,Gl=new Ue,eo=new Yi,qs=new hn;class Yo extends it{constructor(e=new Nt,t=new gr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Bl.fromBufferAttribute(t,i-1),zl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Bl.distanceTo(zl);e.setAttribute("lineDistance",new At(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(i),qs.radius+=s,e.ray.intersectsSphere(qs)===!1)return;Gl.copy(i).invert(),eo.copy(e.ray).applyMatrix4(Gl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new R,h=new R,u=new R,d=new R,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const f=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=f,y=v-1;x<y;x+=p){const E=g.getX(x),C=g.getX(x+1);if(c.fromBufferAttribute(m,E),h.fromBufferAttribute(m,C),eo.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=f,y=v-1;x<y;x+=p){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),eo.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||t.push({distance:C,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Hl=new R,kl=new R;class qo extends Yo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Hl.fromBufferAttribute(t,i),kl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Hl.distanceTo(kl);e.setAttribute("lineDistance",new At(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qg extends Yo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class qc extends jt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vl=new Ue,Ao=new Yi,$s=new hn,Ks=new R;class e_ extends it{constructor(e=new Nt,t=new qc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(i),$s.radius+=s,e.ray.intersectsSphere($s)===!1)return;Vl.copy(i).invert(),Ao.copy(e.ray).applyMatrix4(Vl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=c.getX(g);Ks.fromBufferAttribute(u,m),Wl(Ks,m,l,i,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Ks.fromBufferAttribute(u,g),Wl(Ks,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Wl(r,e,t,n,i,s,o){const a=Ao.distanceSqToPoint(r);if(a<t){const l=new R;Ao.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class t_{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,p=(o-h)/d;return(i+p)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=t||(o.isVector2?new Ee:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new R,i=[],s=[],o=[],a=new R,l=new Ue;for(let p=0;p<=e;p++){const g=p/e;i[p]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ft(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(ft(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function $o(){let r=0,e=0,t=0,n=0;function i(s,o,a,l){r=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,i(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const Zs=new R,to=new $o,no=new $o,io=new $o;class n_ extends t_{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Zs.subVectors(i[0],i[1]).add(i[0]),c=Zs);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Zs.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Zs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),to.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),no.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),io.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(to.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),no.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),io.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(to.calc(l),no.calc(l),io.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class Ko extends Nt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new R,d=new R,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const v=[],x=f/n;let y=0;f===0&&o===0?y=.5/t:f===n&&l===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){const C=E/t;u.x=-e*Math.cos(i+C*s)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+C*s)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(C+y,1-x),v.push(c++)}h.push(v)}for(let f=0;f<n;f++)for(let v=0;v<t;v++){const x=h[f][v+1],y=h[f][v],E=h[f+1][v],C=h[f+1][v+1];(f!==0||o>0)&&p.push(x,y,C),(f!==n-1||l<Math.PI)&&p.push(y,E,C)}this.setIndex(p),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wn extends jt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bo,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jn extends Wn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Xl extends jt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Te(16777215),this.specular=new Te(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bo,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Oo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Js(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function i_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function s_(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function jl(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function $c(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Ms{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class r_ extends Ms{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ga,endingEnd:Ga}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ha:s=e,a=2*t-n;break;case ka:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ha:o=e,l=2*n-t;break;case ka:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,v=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-p)*m+(1.5+p)*_+.5*g,y=p*m-p*_;for(let E=0;E!==a;++E)s[E]=f*o[h+E]+v*o[c+E]+x*o[l+E]+y*o[u+E];return s}}class o_ extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class a_ extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class un{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Js(t,this.TimeBufferType),this.values=Js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Js(e.times,Array),values:Js(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new a_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new o_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new r_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case vs:t=this.InterpolantFactoryMethodDiscrete;break;case Hi:t=this.InterpolantFactoryMethodLinear;break;case Rr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vs;case this.InterpolantFactoryMethodLinear:return Hi;case this.InterpolantFactoryMethodSmooth:return Rr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&i_(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Rr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=Hi;class $i extends un{}$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=vs;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;class Kc extends un{}Kc.prototype.ValueTypeName="color";class Wi extends un{}Wi.prototype.ValueTypeName="number";class l_ extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)tn.slerpFlat(s,0,o,c-a,o,c,l);return s}}class hi extends un{InterpolantFactoryMethodLinear(e){return new l_(this.times,this.values,this.getValueSize(),e)}}hi.prototype.ValueTypeName="quaternion";hi.prototype.DefaultInterpolation=Hi;hi.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends un{}Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=vs;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Xi extends un{}Xi.prototype.ValueTypeName="vector";class c_{constructor(e,t=-1,n,i=mu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=en(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(u_(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(un.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=s_(l);l=jl(l,1,h),c=jl(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Wi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];$c(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let v=0;v!==d[g].morphTargets.length;++v){const x=d[g];m.push(x.time),f.push(x.morphTarget===_?1:0)}i.push(new Wi(".morphTargetInfluence["+_+"]",m,f))}l=p.length*o}else{const p=".bones["+t[u].name+"]";n(Xi,p+".position",d,"pos",i),n(hi,p+".quaternion",d,"rot",i),n(Xi,p+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function h_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wi;case"vector":case"vector2":case"vector3":case"vector4":return Xi;case"color":return Kc;case"quaternion":return hi;case"bool":case"boolean":return $i;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function u_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=h_(r.type);if(r.times===void 0){const t=[],n=[];$c(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ji={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Zc{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const d_=new Zc;class Zi{constructor(e){this.manager=e!==void 0?e:d_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zi.DEFAULT_MATERIAL_NAME="__DEFAULT";const xn={};class f_ extends Error{constructor(e,t){super(e),this.response=t}}class Jc extends Zi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ji.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(xn[e]!==void 0){xn[e].push({onLoad:t,onProgress:n,onError:i});return}xn[e]=[],xn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=xn[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){v();function v(){u.read().then(({done:x,value:y})=>{if(x)f.close();else{_+=y.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let C=0,b=h.length;C<b;C++){const N=h[C];N.onProgress&&N.onProgress(E)}f.enqueue(y),v()}})}}});return new Response(m)}else throw new f_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{ji.add(e,c);const h=xn[e];delete xn[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{const h=xn[e];if(h===void 0)throw this.manager.itemError(e),c;delete xn[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class p_ extends Zi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ji.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=ys("img");function l(){h(),ji.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class m_ extends Zi{constructor(e){super(e)}load(e,t,n,i){const s=new Mt,o=new p_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class _r extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const so=new Ue,Yl=new R,ql=new R;class Zo{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ko,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yl),ql.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ql),t.updateMatrixWorld(),so.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(so),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(so)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class g_ extends Zo{constructor(){super(new Pt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ki*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class __ extends _r{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new g_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $l=new Ue,rs=new R,ro=new R;class x_ extends Zo{constructor(){super(new Pt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),rs.setFromMatrixPosition(e.matrixWorld),n.position.copy(rs),ro.copy(n.position),ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ro),n.updateMatrixWorld(),i.makeTranslation(-rs.x,-rs.y,-rs.z),$l.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($l)}}class Qc extends _r{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new x_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class v_ extends Zo{constructor(){super(new Vo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class y_ extends _r{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new v_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class M_ extends _r{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class wo{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class S_ extends Zi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ji.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){ji.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class E_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Kl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Kl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Kl(){return(typeof performance>"u"?Date:performance).now()}const Jo="\\[\\]\\.:\\/",T_=new RegExp("["+Jo+"]","g"),Qo="[^"+Jo+"]",b_="[^"+Jo.replace("\\.","")+"]",A_=/((?:WC+[\/:])*)/.source.replace("WC",Qo),w_=/(WCOD+)?/.source.replace("WCOD",b_),R_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qo),C_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qo),L_=new RegExp("^"+A_+w_+R_+C_+"$"),P_=["material","materials","bones","map"];class I_{constructor(e,t,n){const i=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $e{constructor(e,t,n){this.path=t,this.parsedPath=n||$e.parseTrackName(t),this.node=$e.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $e.Composite(e,t,n):new $e(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(T_,"")}static parseTrackName(e){const t=L_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);P_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=$e.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$e.Composite=I_;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class D_{constructor(e,t,n=0,i=1/0){this.ray=new Yi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ho,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Ro(e,this,n,t),n.sort(Zl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ro(e[i],this,n,t);return n.sort(Zl),n}}function Zl(r,e){return r.distance-e.distance}function Ro(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)Ro(i[s],e,t,!0)}}class Jl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class N_ extends at{constructor(e,t,n){const i=new Ko(t,4,2),s=new ln({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}class U_ extends qo{constructor(e=10,t=10,n=4473924,i=8947848){n=new Te(n),i=new Te(i);const s=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,p=0,g=-a;d<=t;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=d===s?n:i;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const h=new Nt;h.setAttribute("position",new At(l,3)),h.setAttribute("color",new At(c,3));const u=new gr({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class O_ extends qo{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Nt;i.setAttribute("position",new At(t,3)),i.setAttribute("color",new At(n,3));const s=new gr({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Te,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);function Ql(r,e){if(e===gu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===yo||e===Ac){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===yo)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class F_ extends Zi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new k_(t)}),this.register(function(t){return new K_(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new J_(t)}),this.register(function(t){return new W_(t)}),this.register(function(t){return new X_(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new q_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new Q_(t)}),this.register(function(t){return new e0(t)})}load(e,t,n,i){const s=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=wo.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Jc(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===eh){try{o[je.KHR_BINARY_GLTF]=new t0(e)}catch(u){i&&i(u);return}s=JSON.parse(o[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new p0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:o[u]=new G_;break;case je.KHR_DRACO_MESH_COMPRESSION:o[u]=new n0(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:o[u]=new i0;break;case je.KHR_MESH_QUANTIZATION:o[u]=new s0;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function B_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class z_{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],St);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new y_(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Qc(h),c.distance=u;break;case"spot":c=new __(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,On(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class G_{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return ln}extendParams(e,t,n){const i=[];e.color=new Te(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],St),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,rt))}return Promise.all(i)}}class H_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class k_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ee(a,a)}return Promise.all(s)}}class V_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class W_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Te(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],St)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,rt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class X_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class j_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Te().setRGB(a[0],a[1],a[2],St),Promise.all(s)}}class Y_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class q_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Te().setRGB(a[0],a[1],a[2],St),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,rt)),Promise.all(s)}}class $_{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class K_{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Z_{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class J_{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Q_{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}}class e0{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==kt.TRIANGLES&&c.mode!==kt.TRIANGLE_STRIP&&c.mode!==kt.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(const g of u){const _=new Ue,m=new R,f=new tn,v=new R(1,1,1),x=new Yc(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,y),l.SCALE&&v.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,_.compose(m,f,v));for(const y in l)if(y==="_COLOR_0"){const E=l[y];x.instanceColor=new bo(E.array,E.itemSize,E.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);it.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),p.push(x)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const eh="glTF",os=12,ec={JSON:1313821514,BIN:5130562};class t0{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,os),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==eh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-os,s=new DataView(e,os);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===ec.JSON){const c=new Uint8Array(e,os+o,a);this.content=n.decode(c)}else if(l===ec.BIN){const c=os+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class n0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Co[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Co[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=Oi[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u){i.decodeDracoFile(h,function(d){for(const p in d.attributes){const g=d.attributes[p],_=l[p];_!==void 0&&(g.normalized=_)}u(d)},a,c)})})}}class i0{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class s0{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class th extends Ms{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*c,_=g-c,m=-2*p+3*d,f=p-d,v=1-m,x=f-d+u;for(let y=0;y!==a;y++){const E=o[_+y+a],C=o[_+y+l]*h,b=o[g+y+a],N=o[g+y]*h;s[y]=v*E+x*C+m*b+f*N}return s}}const r0=new tn;class o0 extends th{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return r0.fromArray(s).normalize().toArray(s),s}}const kt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Oi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tc={9728:vt,9729:It,9984:vo,9985:vc,9986:nr,9987:ai},nc={33071:Vt,33648:rr,10497:zi},oo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Co={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Dn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},a0={CUBICSPLINE:void 0,LINEAR:Hi,STEP:vs},ao={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function l0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Wn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:wn})),r.DefaultMaterial}function Qn(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function On(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function c0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function h0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function u0(r){let e;const t=r.extensions&&r.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+lo(t.attributes):e=r.indices+":"+lo(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+lo(r.targets[n]);return e}function lo(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Lo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function d0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const f0=new Ue;class p0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new B_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new m_(this.options.manager):this.textureLoader=new S_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Jc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Qn(s,a,i),On(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(wo.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=oo[i.type],a=Oi[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new bt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=oo[i.type],c=Oi[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let x=t.cache.get(v);x||(_=new c(a,f*p,i.count*p/h),x=new Yg(_,p/h),t.cache.add(v,x)),m=new Xo(x,l,d%p/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),m=new bt(_,l,g);if(i.sparse!==void 0){const f=oo.SCALAR,v=Oi[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,E=new v(o[1],x,i.sparse.count*f),C=new c(o[2],y,i.sparse.count*l);a!==null&&(m=new bt(m.array.slice(),m.itemSize,m.normalized));for(let b=0,N=E.length;b<N;b++){const S=E[b];if(m.setX(S,C[b*l]),l>=2&&m.setY(S,C[b*l+1]),l>=3&&m.setZ(S,C[b*l+2]),l>=4&&m.setW(S,C[b*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=tc[d.magFilter]||It,h.minFilter=tc[d.minFilter]||ai,h.wrapS=nc[d.wrapS]||zi,h.wrapT=nc[d.wrapT]||zi,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Mt(_);m.needsUpdate=!0,d(m)}),t.load(wo.resolveURL(u,s.path),g,void 0,p)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||d0(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new qc,jt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new gr,jt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Wn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){const u=i[je.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new Te(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],St),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,rt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=on);const h=s.alphaMode||ao.OPAQUE;if(h===ao.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ao.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ln&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ee(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==ln&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ln){const u=s.emissiveFactor;a.emissive=new Te().setRGB(u[0],u[1],u[2],St)}return s.emissiveTexture!==void 0&&o!==ln&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,rt)),Promise.all(c).then(function(){const u=new o(a);return s.name&&(u.name=s.name),On(u,s),t.associations.set(u,{materials:e}),s.extensions&&Qn(i,u,s),u})}createUniqueName(e){const t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return ic(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=u0(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=ic(new Nt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?l0(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=o[p];let f;const v=c[p];if(m.mode===kt.TRIANGLES||m.mode===kt.TRIANGLE_STRIP||m.mode===kt.TRIANGLE_FAN||m.mode===void 0)f=s.isSkinnedMesh===!0?new $g(_,v):new at(_,v),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===kt.TRIANGLE_STRIP?f.geometry=Ql(f.geometry,Ac):m.mode===kt.TRIANGLE_FAN&&(f.geometry=Ql(f.geometry,yo));else if(m.mode===kt.LINES)f=new qo(_,v);else if(m.mode===kt.LINE_STRIP)f=new Yo(_,v);else if(m.mode===kt.LINE_LOOP)f=new Qg(_,v);else if(m.mode===kt.POINTS)f=new e_(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&h0(f,s),f.name=t.createUniqueName(s.name||"mesh_"+e),On(f,s),m.extensions&&Qn(i,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&Qn(i,u[0],s),u[0];const d=new An;s.extensions&&Qn(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Pt(Cc.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Vo(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),On(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ue;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new jo(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const p=i.channels[u],g=i.samplers[p.sampler],_=p.target,m=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",v)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let v=0,x=d.length;v<x;v++){const y=d[v],E=p[v],C=g[v],b=_[v],N=m[v];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const S=n._createAnimationTracks(y,E,C,b,N);if(S)for(let A=0;A<S.length;A++)f.push(S[A])}return new c_(s,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,f0)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new jc:c.length>1?h=new An:c.length===1?h=c[0]:h=new it,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=o),On(h,s),s.extensions&&Qn(n,h,s),s.matrix!==void 0){const u=new Ue;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new An;n.name&&(s.name=i.createUniqueName(n.name)),On(s,n),n.extensions&&Qn(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,p]of i.associations)(d instanceof jt||d instanceof Mt)&&u.set(d,p);return h.traverse(d=>{const p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Dn[s.path]===Dn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Dn[s.path]){case Dn.weights:c=Wi;break;case Dn.rotation:c=hi;break;case Dn.position:case Dn.scale:c=Xi;break;default:switch(n.itemSize){case 1:c=Wi;break;case 2:case 3:default:c=Xi;break}break}const h=i.interpolation!==void 0?a0[i.interpolation]:Hi,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){const g=new c(l[d]+"."+Dn[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Lo(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof hi?o0:th;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function m0(r,e,t){const n=e.attributes,i=new Yt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new R(l[0],l[1],l[2]),new R(c[0],c[1],c[2])),a.normalized){const h=Lo(Oi[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new R,l=new R;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=Lo(Oi[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new hn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function ic(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Co[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Ye.workingColorSpace!==St&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),On(r,e),m0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?c0(r,e.targets,t):r})}const Pi=new Sn,Nn=new D_,as=new Ee,sc=new R,Qs=new R,co=new R,rc=new Ue;class g0 extends Xn{constructor(e,t,n){super(),n.style.touchAction="none";let i=null,s=null;const o=[],a=this;function l(){n.addEventListener("pointermove",p),n.addEventListener("pointerdown",g),n.addEventListener("pointerup",_),n.addEventListener("pointerleave",_)}function c(){n.removeEventListener("pointermove",p),n.removeEventListener("pointerdown",g),n.removeEventListener("pointerup",_),n.removeEventListener("pointerleave",_),n.style.cursor=""}function h(){c()}function u(){return e}function d(){return Nn}function p(f){if(a.enabled!==!1){if(m(f),Nn.setFromCamera(as,t),i){Nn.ray.intersectPlane(Pi,Qs)&&i.position.copy(Qs.sub(sc).applyMatrix4(rc)),a.dispatchEvent({type:"drag",object:i});return}if(f.pointerType==="mouse"||f.pointerType==="pen")if(o.length=0,Nn.setFromCamera(as,t),Nn.intersectObjects(e,a.recursive,o),o.length>0){const v=o[0].object;Pi.setFromNormalAndCoplanarPoint(t.getWorldDirection(Pi.normal),co.setFromMatrixPosition(v.matrixWorld)),s!==v&&s!==null&&(a.dispatchEvent({type:"hoveroff",object:s}),n.style.cursor="auto",s=null),s!==v&&(a.dispatchEvent({type:"hoveron",object:v}),n.style.cursor="pointer",s=v)}else s!==null&&(a.dispatchEvent({type:"hoveroff",object:s}),n.style.cursor="auto",s=null)}}function g(f){a.enabled!==!1&&(m(f),o.length=0,Nn.setFromCamera(as,t),Nn.intersectObjects(e,a.recursive,o),o.length>0&&(i=a.transformGroup===!0?e[0]:o[0].object,Pi.setFromNormalAndCoplanarPoint(t.getWorldDirection(Pi.normal),co.setFromMatrixPosition(i.matrixWorld)),Nn.ray.intersectPlane(Pi,Qs)&&(rc.copy(i.parent.matrixWorld).invert(),sc.copy(Qs).sub(co.setFromMatrixPosition(i.matrixWorld))),n.style.cursor="move",a.dispatchEvent({type:"dragstart",object:i})))}function _(){a.enabled!==!1&&(i&&(a.dispatchEvent({type:"dragend",object:i}),i=null),n.style.cursor=s?"pointer":"auto")}function m(f){const v=n.getBoundingClientRect();as.x=(f.clientX-v.left)/v.width*2-1,as.y=-(f.clientY-v.top)/v.height*2+1}l(),this.enabled=!0,this.recursive=!0,this.transformGroup=!1,this.activate=l,this.deactivate=c,this.dispose=h,this.getObjects=u,this.getRaycaster=d}}const oc={type:"change"},ho={type:"start"},ac={type:"end"},er=new Yi,lc=new Sn,_0=Math.cos(70*Cc.DEG2RAD);class x0 extends Xn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:fi.ROTATE,TWO:fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",M),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",M),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(oc),n.update(),s=i.NONE},this.update=function(){const L=new R,re=new tn().setFromUnitVectors(e.up,new R(0,1,0)),K=re.clone().invert(),we=new R,ve=new tn,Se=new R,ge=2*Math.PI;return function(Ve=null){const P=n.object.position;L.copy(P).sub(n.target),L.applyQuaternion(re),a.setFromVector3(L),n.autoRotate&&s===i.NONE&&B(S(Ve)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let ae=n.minAzimuthAngle,te=n.maxAzimuthAngle;isFinite(ae)&&isFinite(te)&&(ae<-Math.PI?ae+=ge:ae>Math.PI&&(ae-=ge),te<-Math.PI?te+=ge:te>Math.PI&&(te-=ge),ae<=te?a.theta=Math.max(ae,Math.min(te,a.theta)):a.theta=a.theta>(ae+te)/2?Math.max(ae,a.theta):Math.min(te,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&C||n.object.isOrthographicCamera?a.radius=Z(a.radius):a.radius=Z(a.radius*c),L.setFromSpherical(a),L.applyQuaternion(K),P.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0));let X=!1;if(n.zoomToCursor&&C){let se=null;if(n.object.isPerspectiveCamera){const Me=L.length();se=Z(Me*c);const We=Me-se;n.object.position.addScaledVector(y,We),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Me=new R(E.x,E.y,0);Me.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),X=!0;const We=new R(E.x,E.y,0);We.unproject(n.object),n.object.position.sub(We).add(Me),n.object.updateMatrixWorld(),se=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;se!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(se).add(n.object.position):(er.origin.copy(n.object.position),er.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(er.direction))<_0?e.lookAt(n.target):(lc.setFromNormalAndCoplanarPoint(n.object.up,n.target),er.intersectPlane(lc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),X=!0);return c=1,C=!1,X||we.distanceToSquared(n.object.position)>o||8*(1-ve.dot(n.object.quaternion))>o||Se.distanceToSquared(n.target)>0?(n.dispatchEvent(oc),we.copy(n.object.position),ve.copy(n.object.quaternion),Se.copy(n.target),X=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",J),n.domElement.removeEventListener("pointerdown",Ie),n.domElement.removeEventListener("pointercancel",ke),n.domElement.removeEventListener("wheel",w),n.domElement.removeEventListener("pointermove",Le),n.domElement.removeEventListener("pointerup",ke),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",M),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new Jl,l=new Jl;let c=1;const h=new R,u=new Ee,d=new Ee,p=new Ee,g=new Ee,_=new Ee,m=new Ee,f=new Ee,v=new Ee,x=new Ee,y=new R,E=new Ee;let C=!1;const b=[],N={};function S(L){return L!==null?2*Math.PI/60*n.autoRotateSpeed*L:2*Math.PI/60/60*n.autoRotateSpeed}function A(){return Math.pow(.95,n.zoomSpeed)}function B(L){l.theta-=L}function Y(L){l.phi-=L}const Q=function(){const L=new R;return function(K,we){L.setFromMatrixColumn(we,0),L.multiplyScalar(-K),h.add(L)}}(),I=function(){const L=new R;return function(K,we){n.screenSpacePanning===!0?L.setFromMatrixColumn(we,1):(L.setFromMatrixColumn(we,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(K),h.add(L)}}(),H=function(){const L=new R;return function(K,we){const ve=n.domElement;if(n.object.isPerspectiveCamera){const Se=n.object.position;L.copy(Se).sub(n.target);let ge=L.length();ge*=Math.tan(n.object.fov/2*Math.PI/180),Q(2*K*ge/ve.clientHeight,n.object.matrix),I(2*we*ge/ve.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(Q(K*(n.object.right-n.object.left)/n.object.zoom/ve.clientWidth,n.object.matrix),I(we*(n.object.top-n.object.bottom)/n.object.zoom/ve.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function j(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function W(L){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ee(L){if(!n.zoomToCursor)return;C=!0;const re=n.domElement.getBoundingClientRect(),K=L.clientX-re.left,we=L.clientY-re.top,ve=re.width,Se=re.height;E.x=K/ve*2-1,E.y=-(we/Se)*2+1,y.set(E.x,E.y,1).unproject(n.object).sub(n.object.position).normalize()}function Z(L){return Math.max(n.minDistance,Math.min(n.maxDistance,L))}function q(L){u.set(L.clientX,L.clientY)}function D(L){ee(L),f.set(L.clientX,L.clientY)}function z(L){g.set(L.clientX,L.clientY)}function oe(L){d.set(L.clientX,L.clientY),p.subVectors(d,u).multiplyScalar(n.rotateSpeed);const re=n.domElement;B(2*Math.PI*p.x/re.clientHeight),Y(2*Math.PI*p.y/re.clientHeight),u.copy(d),n.update()}function le(L){v.set(L.clientX,L.clientY),x.subVectors(v,f),x.y>0?j(A()):x.y<0&&W(A()),f.copy(v),n.update()}function he(L){_.set(L.clientX,L.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),H(m.x,m.y),g.copy(_),n.update()}function _e(L){ee(L),L.deltaY<0?W(A()):L.deltaY>0&&j(A()),n.update()}function Pe(L){let re=!1;switch(L.code){case n.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?Y(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,n.keyPanSpeed),re=!0;break;case n.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?Y(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,-n.keyPanSpeed),re=!0;break;case n.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?B(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(n.keyPanSpeed,0),re=!0;break;case n.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?B(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(-n.keyPanSpeed,0),re=!0;break}re&&(L.preventDefault(),n.update())}function me(){if(b.length===1)u.set(b[0].pageX,b[0].pageY);else{const L=.5*(b[0].pageX+b[1].pageX),re=.5*(b[0].pageY+b[1].pageY);u.set(L,re)}}function Ce(){if(b.length===1)g.set(b[0].pageX,b[0].pageY);else{const L=.5*(b[0].pageX+b[1].pageX),re=.5*(b[0].pageY+b[1].pageY);g.set(L,re)}}function qe(){const L=b[0].pageX-b[1].pageX,re=b[0].pageY-b[1].pageY,K=Math.sqrt(L*L+re*re);f.set(0,K)}function Ne(){n.enableZoom&&qe(),n.enablePan&&Ce()}function O(){n.enableZoom&&qe(),n.enableRotate&&me()}function lt(L){if(b.length==1)d.set(L.pageX,L.pageY);else{const K=ue(L),we=.5*(L.pageX+K.x),ve=.5*(L.pageY+K.y);d.set(we,ve)}p.subVectors(d,u).multiplyScalar(n.rotateSpeed);const re=n.domElement;B(2*Math.PI*p.x/re.clientHeight),Y(2*Math.PI*p.y/re.clientHeight),u.copy(d)}function xe(L){if(b.length===1)_.set(L.pageX,L.pageY);else{const re=ue(L),K=.5*(L.pageX+re.x),we=.5*(L.pageY+re.y);_.set(K,we)}m.subVectors(_,g).multiplyScalar(n.panSpeed),H(m.x,m.y),g.copy(_)}function be(L){const re=ue(L),K=L.pageX-re.x,we=L.pageY-re.y,ve=Math.sqrt(K*K+we*we);v.set(0,ve),x.set(0,Math.pow(v.y/f.y,n.zoomSpeed)),j(x.y),f.copy(v)}function Ae(L){n.enableZoom&&be(L),n.enablePan&&xe(L)}function Ke(L){n.enableZoom&&be(L),n.enableRotate&&lt(L)}function Ie(L){n.enabled!==!1&&(b.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",Le),n.domElement.addEventListener("pointerup",ke)),ie(L),L.pointerType==="touch"?F(L):Qe(L))}function Le(L){n.enabled!==!1&&(L.pointerType==="touch"?ne(L):nt(L))}function ke(L){pe(L),b.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",Le),n.domElement.removeEventListener("pointerup",ke)),n.dispatchEvent(ac),s=i.NONE}function Qe(L){let re;switch(L.button){case 0:re=n.mouseButtons.LEFT;break;case 1:re=n.mouseButtons.MIDDLE;break;case 2:re=n.mouseButtons.RIGHT;break;default:re=-1}switch(re){case di.DOLLY:if(n.enableZoom===!1)return;D(L),s=i.DOLLY;break;case di.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;z(L),s=i.PAN}else{if(n.enableRotate===!1)return;q(L),s=i.ROTATE}break;case di.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;q(L),s=i.ROTATE}else{if(n.enablePan===!1)return;z(L),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(ho)}function nt(L){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;oe(L);break;case i.DOLLY:if(n.enableZoom===!1)return;le(L);break;case i.PAN:if(n.enablePan===!1)return;he(L);break}}function w(L){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(L.preventDefault(),n.dispatchEvent(ho),_e(L),n.dispatchEvent(ac))}function M(L){n.enabled===!1||n.enablePan===!1||Pe(L)}function F(L){switch($(L),b.length){case 1:switch(n.touches.ONE){case fi.ROTATE:if(n.enableRotate===!1)return;me(),s=i.TOUCH_ROTATE;break;case fi.PAN:if(n.enablePan===!1)return;Ce(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case fi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ne(),s=i.TOUCH_DOLLY_PAN;break;case fi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;O(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(ho)}function ne(L){switch($(L),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;lt(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;xe(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ae(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ke(L),n.update();break;default:s=i.NONE}}function J(L){n.enabled!==!1&&L.preventDefault()}function ie(L){b.push(L)}function pe(L){delete N[L.pointerId];for(let re=0;re<b.length;re++)if(b[re].pointerId==L.pointerId){b.splice(re,1);return}}function $(L){let re=N[L.pointerId];re===void 0&&(re=new Ee,N[L.pointerId]=re),re.set(L.pageX,L.pageY)}function ue(L){const re=L.pointerId===b[0].pointerId?b[1]:b[0];return N[re.pointerId]}n.domElement.addEventListener("contextmenu",J),n.domElement.addEventListener("pointerdown",Ie),n.domElement.addEventListener("pointercancel",ke),n.domElement.addEventListener("wheel",w,{passive:!1}),this.update()}}var ms=function(){var r=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(h){h.preventDefault(),n(++r%e.children.length)},!1);function t(h){return e.appendChild(h.dom),h}function n(h){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===h?"block":"none";r=h}var i=(performance||Date).now(),s=i,o=0,a=t(new ms.Panel("FPS","#0ff","#002")),l=t(new ms.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new ms.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){i=(performance||Date).now()},end:function(){o++;var h=(performance||Date).now();if(l.update(h-i,200),h>=s+1e3&&(a.update(o*1e3/(h-s),100),s=h,o=0,c)){var u=performance.memory;c.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return h},update:function(){i=this.end()},domElement:e,setMode:n}};ms.Panel=function(r,e,t){var n=1/0,i=0,s=Math.round,o=s(window.devicePixelRatio||1),a=80*o,l=48*o,c=3*o,h=2*o,u=3*o,d=15*o,p=74*o,g=30*o,_=document.createElement("canvas");_.width=a,_.height=l,_.style.cssText="width:80px;height:48px";var m=_.getContext("2d");return m.font="bold "+9*o+"px Helvetica,Arial,sans-serif",m.textBaseline="top",m.fillStyle=t,m.fillRect(0,0,a,l),m.fillStyle=e,m.fillText(r,c,h),m.fillRect(u,d,p,g),m.fillStyle=t,m.globalAlpha=.9,m.fillRect(u,d,p,g),{dom:_,update:function(f,v){n=Math.min(n,f),i=Math.max(i,f),m.fillStyle=t,m.globalAlpha=1,m.fillRect(0,0,a,d),m.fillStyle=e,m.fillText(s(f)+" "+r+" ("+s(n)+"-"+s(i)+")",c,h),m.drawImage(_,u+o,d,p-o,g,u,d,p-o,g),m.fillRect(u+p-o,d,o,g),m.fillStyle=t,m.globalAlpha=.9,m.fillRect(u+p-o,d,o,s((1-f/v)*g))}}};const v0=ms;function y0(r){document.fullscreenElement?document.exitFullscreen():!document.fullscreenElement&&r.requestFullscreen?r.requestFullscreen():document.webkitFullscreenElement?document.webkitExitFullscreen():!document.webkitFullscreenElement&&r.webkitRequestFullscreen&&r.webkitRequestFullscreen()}function M0(r){const e=r.domElement,t=e.clientWidth,n=e.clientHeight,i=e.width!==t||e.height!==n;return i&&r.setSize(t,n,!1),i}class S0{constructor(e=1/0){Ge(this,"storage",[]);this.capacity=e}push(e){if(this.size()===this.capacity)throw Error("Stack has reached max capacity, you cannot add more items");this.storage.push(e)}pop(){return this.storage.pop()}peek(){return this.storage[this.size()-1]}empty(){return this.size()===0}size(){return this.storage.length}}class ea{constructor(e){Ge(this,"outSideCell",{materialIndex:-1,portions:[]});Ge(this,"parameters");Ge(this,"grid");Ge(this,"materialGrid",[]);this.parameters=e}setResolution(e){this.parameters.resolution=Math.ceil(e)}setBoxFill(e){this.parameters.boxFill=e}setParameters(e){this.parameters=e}getParameters(){return this.parameters}floodGrid(){const e=[new R(0,0,-1),new R(0,0,1),new R(0,-1,0),new R(0,1,0),new R(-1,0,0),new R(1,0,0)],t=new S0,n=new R(this.grid[0][0].length-1,this.grid[0].length-1,this.grid.length-1);for(t.push(n),this.setGridAt(n,this.outSideCell);!t.empty();){const i=t.pop();for(const s of e){const o=i.clone().add(s);this.pointInGrid(o)&&this.getGridAt(o).materialIndex===0&&(this.setGridAt(o,this.outSideCell),t.push(o))}}}fitGrid(e){const t=Math.max(e.x,e.y,e.z),n=this.parameters.resolution/t;return this.grid=Array.from({length:Math.ceil(e.z*n)+2},()=>Array.from({length:Math.ceil(e.y*n)+2},()=>{const i=Math.ceil(e.x*n)+2,s=[];for(let o=0;o<i;++o)s.push({materialIndex:0,portions:[]});return s})),this.materialGrid=Array.from({length:Math.ceil(e.z*n)+2},()=>Array.from({length:Math.ceil(e.y*n)+2},()=>{const i=Math.ceil(e.x*n)+2,s=[];for(let o=0;o<i;++o)s.push(null);return s})),t}getCellColor(e){let t=0;for(const i of e.portions)t+=i.value;const n=new Te(0,0,0);for(const i of e.portions){const s=i.color;n.add(s.clone().multiplyScalar(i.value/t))}return n}pointInGrid(e){return e.z>=0&&e.z<this.grid.length&&e.y>=0&&e.y<this.grid[e.z].length&&e.x>=0&&e.x<this.grid[e.z][e.y].length}updateGridAt(e,t,n=!1){const i=n?1:0;this.grid[e.z+i][e.y+i][e.x+i].materialIndex=t.materialIndex,this.grid[e.z+i][e.y+i][e.x+i].portions.push(...t.portions)}setGridAt(e,t,n=!1){const i=n?1:0;this.grid[e.z+i][e.y+i][e.x+i]=t}getGridAt(e,t=!1){const n=t?1:0;return this.grid[e.z+n][e.y+n][e.x+n]}setMaterialGridAt(e,t,n=!1){const i=n?1:0;this.materialGrid[e.z+i][e.y+i][e.x+i]=t}getMaterialAt(e,t=!1){const n=t?1:0;return this.materialGrid[e.z+n][e.y+n][e.x+n]}vectorToString(e){return`${e.x},${e.y},${e.z}`}}class E0 extends ea{constructor(e){super(e)}voxelizeTriangle(e,t,n,i,s,o,a){a&&(this.grid=a);const{a:l,b:c,c:h}=e,u=c.clone().sub(l),d=h.clone().sub(c),p=h.clone().sub(l),g=Math.max(u.length(),d.length(),p.length()),_=Math.ceil(g/i);_<=1&&this.updateGridOnMicroTriangle(e,{a:l,b:c,c:h},t,n,s,o);const m=this.subdivideEdge(h,l,_),f=this.subdivideEdge(h,c,_),v=[];for(let x=1;x<=_;++x)v.push(this.subdivideEdge(m[x],f[x],x));this.updateGridOnMicroTriangle(e,{a:v[0][0],b:v[0][1],c:h},t,n,s,o);for(let x=1;x<v.length;++x){const y=v[x-1],E=v[x];this.updateGridOnMicroTriangle(e,{a:E[0],b:E[1],c:y[0]},t,n,s,o);for(let C=1;C<E.length-1;++C)this.updateGridOnMicroTriangle(e,{a:E[C],b:y[C-1],c:y[C]},t,n,s,o),this.updateGridOnMicroTriangle(e,{a:E[C],b:y[C],c:E[C+1]},t,n,s,o)}}subdivideEdge(e,t,n){const i=[e.clone()],s=t.clone().sub(e).multiplyScalar(1/n),o=e.clone();for(let a=1;a<n;++a)o.add(s),i.push(o.clone());return i.push(t.clone()),i}updateGridOnMicroTriangle(e,t,{a:n,b:i,c:s},o,a,l){const{a:c,b:h,c:u}=t,d=new R(Math.floor(c.x/a),Math.floor(c.y/a),Math.floor(c.z/a)),p=new R(Math.floor(h.x/a),Math.floor(h.y/a),Math.floor(h.z/a)),g=new R(Math.floor(u.x/a),Math.floor(u.y/a),Math.floor(u.z/a));let _=this.barycentricCoordinatesOnTriangle(e,c);if(Number.isNaN(_.x)||_.x===-1/0)return;const m=this.getMicroTriangleGridIntersections(t,d,p,g,a);let f=m.ab.x===1/0?h:m.ab,v=f.clone().sub(c).length(),x=m.ac.x===1/0?u:m.ac,y=x.clone().sub(c).length();this.updateGridAt(d,{materialIndex:l,portions:[{color:this.getColorAtUV(o,n.clone().multiplyScalar(_.x).add(i.clone().multiplyScalar(_.y)).add(s.clone().multiplyScalar(_.z))),value:this.calculateWeight(v,y)}]},!0),_=this.barycentricCoordinatesOnTriangle(e,h),f=m.ba.x===1/0?c:m.ba,v=f.clone().sub(h).length(),x=m.bc.x===1/0?u:m.bc,y=x.clone().sub(h).length(),this.updateGridAt(p,{materialIndex:l,portions:[{color:this.getColorAtUV(o,n.clone().multiplyScalar(_.x).add(i.clone().multiplyScalar(_.y)).add(s.clone().multiplyScalar(_.z))),value:this.calculateWeight(v,y)}]},!0),_=this.barycentricCoordinatesOnTriangle(e,u),f=m.ca.x===1/0?c:m.ca,v=f.clone().sub(h).length(),x=m.cb.x===1/0?h:m.cb,y=x.clone().sub(u).length(),this.updateGridAt(g,{materialIndex:l,portions:[{color:this.getColorAtUV(o,n.clone().multiplyScalar(_.x).add(i.clone().multiplyScalar(_.y)).add(s.clone().multiplyScalar(_.z))),value:this.calculateWeight(v,y)}]},!0)}calculateWeight(e,t){const n=e*t*.5*1e3;return Math.exp(n)}getColorAtUV(e,t){t.setX(Math.min(t.x,1)),t.setY(Math.min(t.y,(e.height-1)/e.height));const n=Math.min(e.data.length-4,4*(Math.floor(t.x*e.width)+e.width*Math.floor(t.y*e.height))),i=e.data;return new Te(Math.pow(i[n]/255,2.2),Math.pow(i[n+1]/255,2.2),Math.pow(i[n+2]/255,2.2))}barycentricCoordinatesOnTriangle({a:e,b:t,c:n},i){const s=t.clone().sub(e),o=n.clone().sub(e),a=i.clone().sub(e),l=s.dot(s),c=s.dot(o),h=o.dot(o),u=a.dot(s),d=a.dot(o),p=l*h-c*c,g=(h*u-c*d)/p,_=(l*d-c*u)/p,m=1-g-_;return new R(m,g,_)}getMicroTriangleGridIntersections({a:e,b:t,c:n},i,s,o,a){return{ab:this.getLineSegmentGridIntersection(e,t,i,s,a),ba:this.getLineSegmentGridIntersection(t,e,s,i,a),ac:this.getLineSegmentGridIntersection(e,n,i,o,a),ca:this.getLineSegmentGridIntersection(n,e,o,i,a),bc:this.getLineSegmentGridIntersection(t,n,s,o,a),cb:this.getLineSegmentGridIntersection(n,t,o,s,a)}}getLineSegmentGridIntersection(e,t,n,i,s){const o=n.clone().multiplyScalar(s),a=o.clone().addScalar(s),l=[o.x,o.y,o.z],c=[a.x,a.y,a.z],h=[e.x,e.y,e.z];let u=1/0;const d=t.clone().sub(e),p=[d.x,d.y,d.z];let g=0;for(let _=0;_<3;++_)if(p[_]!==0){if(g=(l[_]-h[_])/p[_],g>1)u=Math.min(g,u);else if(g>=0)return e.clone().add(d.multiplyScalar(g));if(g=(c[_]-h[_])/p[_],g>1)u=Math.min(g,u);else if(g>=0)return e.clone().add(d.multiplyScalar(g))}return u!==1/0?new R(1/0,1/0,1/0):new R(1/0,1/0,1/0)}}class T0 extends ea{constructor(e){super(e)}voxelizeMesh({mesh:e,materialIndex:t,customGrid:n,modelSize:i,translateMesh:s,fillGrid:o,paintGrid:a}){n&&(this.grid=n),t=t===void 0?0:t;const l=i/this.parameters.resolution,c=e.geometry.getIndex(),h=e.geometry.getAttribute("position");let u=e.geometry.getAttribute("uv");const d=e.material;let p=d.map,g={width:0,height:0,data:new Uint8ClampedArray};if(!p)u=new bt(this.createCustomUvMapping(c.count),2),g={width:c.count,height:1,data:this.createCustomImageData(c.count,d)};else{const f=document.createElement("canvas"),v=f.getContext("2d");p&&(f.width=p==null?void 0:p.image.width,f.height=p==null?void 0:p.image.height,v.drawImage(p==null?void 0:p.image,0,0));const x=v.getImageData(0,0,f.width,f.height);g={width:f.width,height:f.height,data:x.data}}const _=new E0(this.parameters),m=l*.5;for(let f=0;f<c.count;f+=3){const v=new R(h.getX(c.array[f]),h.getY(c.array[f]),h.getZ(c.array[f])),x=new R(h.getX(c.array[f+1]),h.getY(c.array[f+1]),h.getZ(c.array[f+1])),y=new R(h.getX(c.array[f+2]),h.getY(c.array[f+2]),h.getZ(c.array[f+2])),E=new Ee(u.getX(c.array[f]),u.getY(c.array[f])),C=new Ee(u.getX(c.array[f+1]),u.getY(c.array[f+1])),b=new Ee(u.getX(c.array[f+2]),u.getY(c.array[f+2]));_.voxelizeTriangle({a:v,b:x,c:y},{a:E,b:C,c:b},g,m,l,t,this.grid)}}createCustomUvMapping(e){const t=new Float32Array(2*e);for(let n=0;n<e;++n)t[2*n]=n/e,t[2*n+1]=0;return t}createCustomImageData(e,t){const n=new Uint8ClampedArray(e*4),i=t.color;for(let s=0;s<e;++s)n[4*s]=Math.floor(Math.pow(i.r,1/2.2)*255),n[4*s+1]=Math.floor(Math.pow(i.g,1/2.2)*255),n[4*s+2]=Math.floor(Math.pow(i.b,1/2.2)*255),n[4*s+3]=255;return n}}class b0{constructor(){Ge(this,"map");this.map=new Map}add(e){this.map.set(this.toIdString(e),e)}values(){return this.map.values()}delete(e){return this.map.delete(this.toIdString(e))}toIdString(e){return JSON.stringify(e)}}class A0 extends ea{constructor(e){super(e)}voxelScene(e){const t=[];e.traverse(y=>{y instanceof at&&t.push(y)});const n=[],i=[],s=[],o=[],a=[],l=[],c=e.rotation.clone(),h=e.position.clone();e.rotation.set(0,0,0),e.position.set(0,0,0),e.updateMatrix();for(const y of t){y.material instanceof jt?(y.material instanceof ln||y.material instanceof Wn||y.material instanceof Xl)&&l.push(y.material):(y.material[0]instanceof ln||y.material[0]instanceof Wn||y.material[0]instanceof Xl)&&l.push(y.material[0]);const E=y.geometry.getIndex(),C=y.geometry.getAttribute("position"),b=y.geometry.getAttribute("uv");if(i.push(C.clone()),E===null)throw"non indexed objects currently not supported";s.push(E),o.push(b);const N=[y.matrix];let S=y.parent;for(;S!==null;)N.push(S.matrix),S=S.parent;const A=N[N.length-1].clone();for(let B=N.length-2;B>=0;--B)A.multiply(N[B]);a.push(A);for(let B=0;B<C.count;++B)n.push(new R(C.getX(B),C.getY(B),C.getZ(B)).applyMatrix4(A))}const u=new Yt().setFromPoints(n),d=new R;u.getSize(d);const p=u.min.clone().multiplyScalar(-1),g=this.fitGrid(d);for(let y=0;y<i.length;++y){const E=i[y],C=a[y];for(let b=0;b<E.count;++b){const N=new R(E.getX(b),E.getY(b),E.getZ(b)).applyMatrix4(C).add(p);E.setXYZ(b,N.x,N.y,N.z)}}const _=new T0(this.parameters);for(let y=0;y<i.length;++y){const E=new Nt;E.setIndex(s[y]),E.setAttribute("position",i[y]),E.setAttribute("uv",o[y]),_.voxelizeMesh({mesh:new at(E,l[y]),modelSize:g,materialIndex:y+1,customGrid:this.grid,translateMesh:!1,fillGrid:!1,paintGrid:!1})}this.floodGrid(),this.paintVoxels(l);const{meshes:m,meshGrid:f}=this.createVoxels(l,g),v=new Yt().setFromObject(e),x=new An;x.add(...m);for(const y of m)y.position.copy(v.min),y.updateMatrix();return e.rotation.copy(c),e.position.copy(h),e.updateMatrix(),x.rotation.copy(c),x.position.copy(h),x.updateMatrix(),{meshGroup:x,meshGrid:f}}paintVoxels(e){const t=this.paintHull(e);this.paintInside(e,t)}paintHull(e){const t=[];for(let n=0;n<this.grid.length;++n)for(let i=0;i<this.grid[n].length;++i)for(let s=0;s<this.grid[n][i].length;++s){const o=new R(s,i,n);if(this.getGridAt(o).materialIndex>0){const c=this.paintVoxel(e,o);t.push({color:c,position:new R(s,i,n)})}}return t}paintVoxel(e,t){const n=this.getGridAt(t),i=this.computeMaterial([e[n.materialIndex-1]]),s=this.getCellColor(n);return i.setValues({color:s}),this.setMaterialGridAt(t,i),s}paintInside(e,t){const n=[new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0),new R(1,0,0),new R(-1,0,0)];let i=1,s=[...t];const o=new Map;for(;s.length>0;){const a=new b0;for(const l of s)for(const c of n){const h=l.position.clone().add(c);if(this.pointInGrid(h)){const u=this.getGridAt(h);if(u.materialIndex!==-1&&(u.portions.length===0||u.portions[0].value===i)){u.materialIndex=this.getGridAt(l.position).materialIndex,u.portions.push({color:l.color,value:i});const d=o.get(h),p=this.getMaterialAt(l.position);d?(d.push(p),o.set(h,d)):o.set(h,[p]),a.add(h)}}}s=[];for(const l of a.values()){const c=this.paintVoxel(e,l);s.push({color:c,position:l})}++i}}computeMaterial(e){const t=e[0];return new Wn({color:t.color,opacity:t.opacity})}createVoxels(e,t){const n=t/this.parameters.resolution*this.parameters.boxFill,i=new ui(n,n,n),s=t/this.parameters.resolution,o=Array.from({length:e.length},()=>0);for(let u=0;u<this.grid.length;++u)for(let d=0;d<this.grid[u].length;++d)for(let p=0;p<this.grid[u][d].length;++p){const g=this.getGridAt(new R(p,d,u)).materialIndex;g!==0&&++o[g-1]}const a=Array.from({length:this.grid.length},()=>Array.from({length:this.grid[0].length},()=>{const u=this.grid[0][0].length,d=[];for(let p=0;p<u;++p)d.push({meshIndex:-1,instanceIndex:-1});return d})),l=[],c=[];for(let u=0;u<e.length;++u){const d=this.computeMaterial([e[u]]);d.map=null,l.push(new Yc(i,d,o[u])),c.push(0)}const h=new at;for(let u=0;u<this.grid.length;++u)for(let d=0;d<this.grid[u].length;++d)for(let p=0;p<this.grid[u][d].length;++p){const g=new R(p,d,u),_=this.getMaterialAt(g);if(_){const m=this.getGridAt(g).materialIndex;h.position.copy(new R(p,d,u).multiplyScalar(s).addScalar(n/2-s)),h.updateMatrix();const f=l[m-1],v=c[m-1];f.setMatrixAt(v,h.matrix),f.setColorAt(v,_.color),a[u][d][p]={meshIndex:m-1,instanceIndex:v},++c[m-1]}}return{meshes:l,meshGrid:a}}}const cc=r=>{const e=L0(r);return{noise2D:(t,n)=>w0(e,t,n),noise3D:(t,n,i)=>R0(e,t,n,i),noise4D:(t,n,i,s)=>C0(e,t,n,i,s)}},w0=(r,e,t)=>{const{perm:n,permMod12:i}=r;let s=0,o=0,a=0;var l=(e+t)*P0,c=Math.floor(e+l),h=Math.floor(t+l),u=(c+h)*ls;const d=c-u,p=h-u,g=e-d,_=t-p,m=g>_?1:0,f=g>_?0:1,v=g-m+ls,x=_-f+ls,y=g-1+2*ls,E=_-1+2*ls,C=c&255,b=h&255;let N=.5-g*g-_*_;if(N>=0){const B=i[C+n[b]]*3;N*=N,s=N*N*(xt[B]*g+xt[B+1]*_)}let S=.5-v*v-x*x;if(S>=0){const B=i[C+m+n[b+f]]*3;S*=S,o=S*S*(xt[B]*v+xt[B+1]*x)}let A=.5-y*y-E*E;if(A>=0){const B=i[C+1+n[b+1]]*3;A*=A,a=A*A*(xt[B]*y+xt[B+1]*E)}return 70*(s+o+a)},R0=(r,e,t,n)=>{const{perm:i,permMod12:s}=r;let o=0,a=0,l=0,c=0;const h=(e+t+n)*I0,u=Math.floor(e+h),d=Math.floor(t+h),p=Math.floor(n+h),g=(u+d+p)*sn,_=u-g,m=d-g,f=p-g,v=e-_,x=t-m,y=n-f;let E,C,b,N,S,A;v>=x?x>=y?(E=1,C=0,b=0,N=1,S=1,A=0):v>=y?(E=1,C=0,b=0,N=1,S=0,A=1):(E=0,C=0,b=1,N=1,S=0,A=1):x<y?(E=0,C=0,b=1,N=0,S=1,A=1):v<y?(E=0,C=1,b=0,N=0,S=1,A=1):(E=0,C=1,b=0,N=1,S=1,A=0);const B=v-E+sn,Y=x-C+sn,Q=y-b+sn,I=v-N+2*sn,H=x-S+2*sn,j=y-A+2*sn,W=v-1+3*sn,ee=x-1+3*sn,Z=y-1+3*sn,q=u&255,D=d&255,z=p&255;let oe=.6-v*v-x*x-y*y;if(oe>=0){const me=s[q+i[D+i[z]]]*3;oe*=oe,o=oe*oe*(xt[me]*v+xt[me+1]*x+xt[me+2]*y)}let le=.6-B*B-Y*Y-Q*Q;if(le>=0){const me=s[q+E+i[D+C+i[z+b]]]*3;le*=le,a=le*le*(xt[me]*B+xt[me+1]*Y+xt[me+2]*Q)}let he=.6-I*I-H*H-j*j;if(he>=0){const me=s[q+N+i[D+S+i[z+A]]]*3;he*=he,l=he*he*(xt[me]*I+xt[me+1]*H+xt[me+2]*j)}let _e=.6-W*W-ee*ee-Z*Z;if(_e>=0){var Pe=s[q+1+i[D+1+i[z+1]]]*3;_e*=_e,c=_e*_e*(xt[Pe]*W+xt[Pe+1]*ee+xt[Pe+2]*Z)}return 32*(o+a+l+c)},C0=(r,e,t,n,i)=>{const{perm:s}=r;let o=0,a=0,l=0,c=0,h=0;const u=(e+t+n+i)*D0,d=Math.floor(e+u),p=Math.floor(t+u),g=Math.floor(n+u),_=Math.floor(i+u),m=(d+p+g+_)*yt,f=d-m,v=p-m,x=g-m,y=_-m,E=e-f,C=t-v,b=n-x,N=i-y;let S=0,A=0,B=0,Y=0;E>C?S++:A++,E>b?S++:B++,E>N?S++:Y++,C>b?A++:B++,C>N?A++:Y++,b>N?B++:Y++;let Q,I,H,j,W,ee,Z,q,D,z,oe,le;Q=S>=3?1:0,I=A>=3?1:0,H=B>=3?1:0,j=Y>=3?1:0,W=S>=2?1:0,ee=A>=2?1:0,Z=B>=2?1:0,q=Y>=2?1:0,D=S>=1?1:0,z=A>=1?1:0,oe=B>=1?1:0,le=Y>=1?1:0;const he=E-Q+yt,_e=C-I+yt,Pe=b-H+yt,me=N-j+yt,Ce=E-W+2*yt,qe=C-ee+2*yt,Ne=b-Z+2*yt,O=N-q+2*yt,lt=E-D+3*yt,xe=C-z+3*yt,be=b-oe+3*yt,Ae=N-le+3*yt,Ke=E-1+4*yt,Ie=C-1+4*yt,Le=b-1+4*yt,ke=N-1+4*yt,Qe=d&255,nt=p&255,w=g&255,M=_&255;let F=.6-E*E-C*C-b*b-N*N;if(F>=0){const $=s[Qe+s[nt+s[w+s[M]]]]%32*4;F*=F,o=F*F*(dt[$]*E+dt[$+1]*C+dt[$+2]*b+dt[$+3]*N)}let ne=.6-he*he-_e*_e-Pe*Pe-me*me;if(ne>=0){const $=s[Qe+Q+s[nt+I+s[w+H+s[M+j]]]]%32*4;ne*=ne,a=ne*ne*(dt[$]*he+dt[$+1]*_e+dt[$+2]*Pe+dt[$+3]*me)}let J=.6-Ce*Ce-qe*qe-Ne*Ne-O*O;if(J>=0){const $=s[Qe+W+s[nt+ee+s[w+Z+s[M+q]]]]%32*4;J*=J,l=J*J*(dt[$]*Ce+dt[$+1]*qe+dt[$+2]*Ne+dt[$+3]*O)}let ie=.6-lt*lt-xe*xe-be*be-Ae*Ae;if(ie>=0){const $=s[Qe+D+s[nt+z+s[w+oe+s[M+le]]]]%32*4;ie*=ie,c=ie*ie*(dt[$]*lt+dt[$+1]*xe+dt[$+2]*be+dt[$+3]*Ae)}let pe=.6-Ke*Ke-Ie*Ie-Le*Le-ke*ke;if(pe>=0){const $=s[Qe+1+s[nt+1+s[w+1+s[M+1]]]]%32*4;pe*=pe,h=pe*pe*(dt[$]*Ke+dt[$+1]*Ie+dt[$+2]*Le+dt[$+3]*ke)}return 27*(o+a+l+c+h)},L0=r=>{const e=new Uint8Array(512),t=new Uint8Array(512),n=new Uint8Array(256);for(let s=0;s<256;s++)n[s]=s;for(let s=0;s<255;s++){const o=s+~~(r()*(256-s)),a=n[o];n[o]=n[s],e[s]=e[s+256]=a,t[s]=t[s+256]=a%12}const i=n[255];return e[255]=e[511]=i,t[255]=t[511]=i%12,{perm:e,permMod12:t}},P0=.5*(Math.sqrt(3)-1),ls=(3-Math.sqrt(3))/6,I0=1/3,sn=1/6,D0=(Math.sqrt(5)-1)/4,yt=(5-Math.sqrt(5))/20,xt=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),dt=new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);var N0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function U0(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var nh={exports:{}};(function(r,e){(function(t,n){r.exports=n()})(N0,function(){return t.importState=function(i){var s=new t;return s.importState(i),s},t;function t(){return function(i){var s=0,o=0,a=0,l=1;i.length==0&&(i=[+new Date]);var c=n();s=c(" "),o=c(" "),a=c(" ");for(var h=0;h<i.length;h++)s-=c(i[h]),s<0&&(s+=1),o-=c(i[h]),o<0&&(o+=1),a-=c(i[h]),a<0&&(a+=1);c=null;var u=function(){var d=2091639*s+l*23283064365386963e-26;return s=o,o=a,a=d-(l=d|0)};return u.next=u,u.uint32=function(){return u()*4294967296},u.fract53=function(){return u()+(u()*2097152|0)*11102230246251565e-32},u.version="Alea 0.9",u.args=i,u.exportState=function(){return[s,o,a,l]},u.importState=function(d){s=+d[0]||0,o=+d[1]||0,a=+d[2]||0,l=+d[3]||0},u}(Array.prototype.slice.call(arguments))}function n(){var i=4022871197,s=function(o){o=o.toString();for(var a=0;a<o.length;a++){i+=o.charCodeAt(a);var l=.02519603282416938*i;i=l>>>0,l-=i,l*=i,i=l>>>0,l-=i,i+=l*4294967296}return(i>>>0)*23283064365386963e-26};return s.version="Mash 0.9",s}})})(nh);var O0=nh.exports;const hc=U0(O0);class F0{constructor(e,t){Ge(this,"extent");Ge(this,"seed");Ge(this,"noise");this.extent=e,this.seed=t,this.noise=cc(hc(this.seed))}getRandom(e,t){const n=e.clone().sub(this.extent.min).divide(this.extent.max.clone().sub(this.extent.min));return t===void 0?this.noise.noise3D(n.x,n.y,n.z):this.noise.noise4D(n.x,n.y,n.z,t)}setSeed(e){this.noise=cc(hc(e))}}const Mn=class Mn{constructor(e){Ge(this,"originalPosition");Ge(this,"controlPoints");Ge(this,"controlPointProgress");Ge(this,"velocity");Ge(this,"minVelocity");Ge(this,"stallPoint");Ge(this,"gravity");Ge(this,"firstAngularVelocity");Ge(this,"secondAngularVelocity");Ge(this,"rotation");Ge(this,"scale");Ge(this,"xToGroundRotationFinished",!1);Ge(this,"zToGroundRotationFinished",!1);Ge(this,"disappearTimer",3);Ge(this,"toGroundImpulse",7);this.minVelocity=e.minVelocity,this.stallPoint=e.stallPoint,this.gravity=e.gravity,this.velocity=0,this.controlPointProgress=0,this.firstAngularVelocity=e.firstImpulse,this.secondAngularVelocity=e.secondImpulse,this.rotation=new bn(0,0,0),this.scale=new R(1,1,1),this.controlPoints=[],this.originalPosition=e.curve.getPoint(0),this.controlPoints.push(this.originalPosition);for(let t=1;t<=e.segments;++t)this.controlPoints.push(e.curve.getPoint(t/e.segments))}step(e,t){const{position:i}=t;if(this.controlPointProgress>=this.controlPoints.length-2?this.rotateToGround(e):this.rotateDuringMovement(e),this.controlPointProgress===this.controlPoints.length-1){if(this.disappearTimer-=e,this.disappearTimer<=0){const o=e/2;this.scale.set(Math.max(this.scale.x-o,0),Math.max(this.scale.y-o,0),Math.max(this.scale.z-o,0))}return i.copy(this.controlPoints[this.controlPointProgress]),[i,this.rotation,this.scale]}const s=this.calculateAcceleration(t,.2);return this.velocity+=e*s,this.velocity=Math.max(this.velocity,this.minVelocity*e),i.copy(this.moveAlongCurve(t,e)),[i,this.rotation,this.scale]}rotateToGround(e){const t=this.toGroundImpulse*e,n=Math.sign(this.rotation.x%(Math.PI/2)-Math.PI/4),i=Math.sign(this.rotation.z%(Math.PI/2)-Math.PI/4);this.secondAngularVelocity.set(this.xToGroundRotationFinished?0:this.toGroundImpulse*n,this.xToGroundRotationFinished&&this.zToGroundRotationFinished?0:this.secondAngularVelocity.y,this.zToGroundRotationFinished?0:this.toGroundImpulse*i),this.stepRotation(this.secondAngularVelocity,e),this.rotation.x%(Math.PI/2)<t&&(this.rotation.set(0,this.rotation.y,this.rotation.z),this.xToGroundRotationFinished=!0),this.rotation.z%(Math.PI/2)<t&&(this.rotation.set(this.rotation.x,this.rotation.y,0),this.zToGroundRotationFinished=!0)}rotateDuringMovement(e){this.stallPoint===-1/0?this.stepRotation(this.secondAngularVelocity,e):this.stepRotation(this.firstAngularVelocity,e)}calculateAcceleration(e,t){const{lowerBound:n,upperBound:i,tangent:s,projectedTangent:o}=e,a=Math.floor(this.controlPointProgress);n.copy(this.controlPoints[a+1]),i.copy(this.controlPoints[a]),s.copy(n).sub(i),o.set(s.x,0,s.z);let l=Math.PI/2;o.length()!==0&&(l=Math.acos(Math.min(s.dot(o)/(s.length()*o.length()),1)));const c=Math.sin(l)*this.gravity,h=Math.cos(l)*this.gravity,u=t*h;return(c-u)/1}moveAlongCurve(e,t){const{position:n,tangent:i,upperBound:s,lowerBound:o,positionToLowerBound:a}=e;n.copy(i).multiplyScalar(this.controlPointProgress-Math.floor(this.controlPointProgress)).add(s),n.y<this.stallPoint&&(this.velocity=Math.max(this.velocity/10,this.minVelocity*t),this.stallPoint=-1/0);let l=i.length(),c=this.velocity;for(;c>0;){const h=a.copy(o).sub(n).length();if(c<=h)this.controlPointProgress+=c/l,c=0,n.copy(i).multiplyScalar(this.controlPointProgress-Math.floor(this.controlPointProgress)).add(s);else{if(c-=h,this.controlPointProgress=Math.floor(this.controlPointProgress)+1,this.controlPointProgress===this.controlPoints.length-1){n.copy(this.controlPoints[this.controlPoints.length-1]);break}n.copy(this.controlPoints[this.controlPointProgress]),s.copy(n),o.copy(this.controlPoints[this.controlPointProgress+1]),l=i.copy(o).sub(n).length()}}return n}stepRotation(e,t){const n=(this.rotation.x+e.x*t)%Mn.radMax,i=(this.rotation.y+e.y*t)%Mn.radMax,s=(this.rotation.z+e.z*t)%Mn.radMax;this.rotation.set(n<0?Mn.radMax+n:n,i<0?Mn.radMax+i:i,s<0?Mn.radMax+s:s)}setGravity(e){this.gravity=e}getOriginalPosition(){return this.originalPosition}};Ge(Mn,"radMax",2*Math.PI);let Po=Mn;class B0{constructor(e){Ge(this,"parameters");Ge(this,"tempVariables",{projectedTangent:new R,position:new R,tangent:new R,upperBound:new R,lowerBound:new R,positionToLowerBound:new R,previousRotation:new bn,dummyMesh:new at});Ge(this,"bodies");Ge(this,"relativeGravity");Ge(this,"boxNoise");Ge(this,"floorNoise");Ge(this,"noiseTexture");Ge(this,"RNG");this.parameters=e,e.meshes[0].geometry.computeBoundingBox();const t=e.meshes[0].geometry.boundingBox,n=new Ue,i=Math.max(...e.meshes.map(a=>{let l=-1/0;for(let c=0;c<a.count;++c)a.getMatrixAt(c,n),l=Math.max(n.elements[14]+t.max.y,l);return l}));this.relativeGravity=e.gravity/i,this.RNG=uc(Math.random()),this.boxNoise=new bn(10*Math.PI/180,10*Math.PI/180,10*Math.PI/180),this.floorNoise=new bn(10*Math.PI/180,10*Math.PI/180,10*Math.PI/180);const s=Math.random(),o=this.allMeshesBoundingBox();this.noiseTexture=new F0(o,s),this.bodies=this.constructAnimationCurves()}constructAnimationCurves(){const{meshes:e,meshGrid:t,curveSegments:n}=this.parameters,i=[new R(0,0,1),new R(0,1,0),new R(1,0,0)],s=[new R(0,1,1),new R(1,0,1),new R(1,1,0)];this.RNG=uc(Math.random());const o=this.allMeshesBoundingBox();e[0].geometry.computeBoundingBox();const a=e[0].geometry.boundingBox,l=new R((o.max.x-o.min.x)/2,0,(o.max.z-o.min.z)/2),c=e.map(p=>Array(p.count).fill(null));let h=0;const u=new R(1/0,1/0,1/0),d=new R().copy(u);for(let p=0;p<t.length;++p)for(let g=0;g<t[0][0].length;++g){d.copy(u);const _=[];for(let f=0;f<t[0].length;++f){if(t[p][f][g].meshIndex===-1)continue;const x=.4,y=this.RNG(),E=Math.floor(Math.log(y)/Math.log(x));E<_.length?_.splice(E,0,f):_.push(f)}const m=Array(t[0].length);for(let f=0;f<_.length;++f)m[_[f]]=f;for(let f=0;f<t[0].length;++f){const v=t[p][f][g];if(v.meshIndex===-1)continue;const x=new Ue;e[v.meshIndex].getMatrixAt(v.instanceIndex,x);const y=[],E=new R().setFromMatrixPosition(x);d.x===1/0&&d.copy(new R(E.x,0,E.z));const C=d.clone().add(new R(0,a.max.y,0));d.copy(C),y.push(new R(E.x,E.y,E.z));const b=this.applyNoiseBetweenPoints(E,C,this.boxNoise),A=b.clone().sub(l).setY(0).normalize().multiplyScalar(a.max.y*this.relativeGravity*2).clone().multiplyScalar(m[f]).add(b).setY(a.max.y),B=this.applyNoiseBetweenPoints(b,A,this.floorNoise).setY(a.max.y);y.push(new R(b.x,b.y,b.z)),y.push(new R(B.x,B.y,B.z));const Y=new n_(y,void 0,void 0,.2),Q=this.randomiseGravity(E,o),I=5/t[0].length*this.relativeGravity,H=Math.max(m[f],1)*I;h=Math.min(H,h),c[v.meshIndex][v.instanceIndex]=new Po({curve:Y,firstImpulse:new R(this.noiseTexture.getRandom(E,.6)*3.5,this.noiseTexture.getRandom(E,.7)*3.5,this.noiseTexture.getRandom(E,.8)*3.5).multiply(i[Math.floor(this.RNG()*i.length)]),secondImpulse:new R(this.noiseTexture.getRandom(E,.65)*8,this.noiseTexture.getRandom(E,.75)*8,this.noiseTexture.getRandom(E,.85)*8).multiply(s[Math.floor(this.RNG()*s.length)]),gravity:Q,minVelocity:H,segments:n,stallPoint:b.y})}}return console.log(h),c}reset(){const{meshes:e}=this.parameters,t=new at;for(let n=0;n<e.length;++n){const i=e[n];for(let s=0;s<i.count;++s)t.setRotationFromQuaternion(new tn(0,0,0,1)),t.position.copy(this.bodies[n][s].getOriginalPosition()),t.updateMatrix(),i.setMatrixAt(s,t.matrix);i.instanceMatrix.needsUpdate=!0,i.updateMatrix(),i.matrixWorldNeedsUpdate=!0}this.noiseTexture.setSeed(Math.random()),this.bodies=this.constructAnimationCurves()}animateVoxels(e){const{meshes:t}=this.parameters,n=new at;for(let i=0;i<t.length;++i){const s=t[i];for(let o=0;o<s.count;++o){const[a,l,c]=this.bodies[i][o].step(e,this.tempVariables);n.rotation.copy(l),n.scale.copy(c),n.position.copy(a.setY(a.y+0*(c.y-1)*.1)),n.updateMatrix(),s.setMatrixAt(o,n.matrix)}s.instanceMatrix.needsUpdate=!0,s.updateMatrix(),s.matrixWorldNeedsUpdate=!0}}setGravity(e){this.parameters.gravity=e,this.parameters.meshes[0].geometry.computeBoundingBox();const t=this.parameters.meshes[0].geometry.boundingBox,n=new Ue,i=Math.max(...this.parameters.meshes.map(s=>{let o=-1/0;for(let a=0;a<s.count;++a)s.getMatrixAt(a,n),o=Math.max(n.elements[14]+t.max.y,o);return o}));this.relativeGravity=this.parameters.gravity/i}allMeshesBoundingBox(){const{meshes:e}=this.parameters;e[0].computeBoundingBox();const t=new Yt().copy(e[0].boundingBox);for(const n of e){n.computeBoundingBox();const i=n.boundingBox;i.min.x===1/0||i.max.x===-1/0||t.setFromPoints([...t.min.x!==1/0&&t.max.x!==-1/0?[t.min.clone(),t.max.clone()]:[],i.min.clone(),i.max.clone()])}return t}applyNoiseBetweenPoints(e,t,n){const i=t.clone().sub(e);let s=[this.RNG()*Math.sign(this.RNG()-.5),this.RNG()*Math.sign(this.RNG()-.5),this.RNG()*Math.sign(this.RNG()-.5)];return i.applyEuler(new bn(s[0]*n.x,s[1]*n.y,s[2]*n.z,"ZYX")),e.clone().add(i)}randomiseGravity(e,t){return this.relativeGravity*(.3+e.y/t.max.y*.7+Math.abs(this.noiseTexture.getRandom(e,.4))*.3)}}function uc(r){return function(){r|=0,r=r+2654435769|0;var e=r^r>>>16;return e=Math.imul(e,569420461),e=e^e>>>15,e=Math.imul(e,1935289751),((e=e^e>>>15)>>>0)/4294967296}}class z0 extends it{constructor(t){super();Ge(this,"voxelizer");Ge(this,"animator");Ge(this,"originalModel");Ge(this,"meshGrid");Ge(this,"meshGroup");const{model:n,resolution:i,boxFill:s,segments:o,gravity:a}=t;this.originalModel=n,this.voxelizer=new A0({resolution:i,boxFill:s});const l=this.voxelizer.voxelScene(n);this.meshGrid=l.meshGrid,this.meshGroup=l.meshGroup,this.animator=new B0({meshes:this.meshGroup.children,gravity:a,meshGrid:this.meshGrid,curveSegments:o}),this.children.push(this.originalModel)}switchToVoxelModel(){this.children[0]=this.meshGroup}switchToOriginalModel(){this.children[0]=this.originalModel}animate(t){this.children[0]!==this.originalModel&&this.animator.animateVoxels(t)}reset(){const t=Date.now();this.animator.reset();const n=Date.now();console.log("resetting: ",n-t)}setGravity(t){this.animator.setGravity(t)}}const G0="scene";let ei,Fn,Jt,cs,dc,vn,tr,zn,Un,Ii,uo,fo,ih,Io,Zt,sh,fc=[],pc=0,zt,Do=!1;const Gn={play:!1,gravity:.1,timeFactor:1,reset:()=>{zt&&(zt.reset(),zt.switchToOriginalModel(),Do=!0)}};sh=new F_;let hs=new An,gs={selectedOption:"Astronaut"};const H0=["Astronaut","Cabinet Bed Drawer Tabl","chess","Earth","Little Man","low_poly_car_-_de_tomaso_p72_2020","Mercedes-Benz 190","Police Car","sportcar.017"];let mc="";const ur={resolution:15,boxFill:1},k0={update:()=>{zt=null,rh(gs.selectedOption)}};V0();function V0(){ei=document.querySelector(`canvas#${G0}`),Fn=new Xc({canvas:ei,antialias:!0,alpha:!0}),Fn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Fn.shadowMap.enabled=!0,Fn.shadowMap.type=_c,Jt=new jg,cs=new Zc,cs.onStart=()=>{console.log("loading started")},cs.onProgress=(r,e,t)=>{console.log("loading in progress:"),console.log(`${r} -> ${e} / ${t}`)},cs.onLoad=()=>{console.log("loaded!")},cs.onError=()=>{console.log("❌ error while loading")},dc=new M_("white",.8),vn=new Qc("#ffdca8",1.2,100),vn.position.set(-2,3,3),vn.castShadow=!0,vn.shadow.radius=4,vn.shadow.camera.near=.5,vn.shadow.camera.far=4e3,vn.shadow.mapSize.width=2048,vn.shadow.mapSize.height=2048,Jt.add(dc);{const r=new pr(3,3),e=new Wn({color:"gray",side:2}),t=new at(r,e);t.rotateX(Math.PI/2),t.receiveShadow=!0,tr=new at(new ui(.001,.001,.001),new Wn),Jt.add(tr),Jt.add(t)}zn=new Pt(50,ei.clientWidth/ei.clientHeight,.1,100),zn.position.set(20,20,30),Un=new x0(zn,ei),Un.target=tr.position.clone(),Un.enableDamping=!0,Un.autoRotate=!1,Un.update(),Ii=new g0([tr],zn,Fn.domElement),Ii.addEventListener("hoveron",r=>{r.object.material.emissive.set("orange")}),Ii.addEventListener("hoveroff",r=>{r.object.material.emissive.set("black")}),Ii.addEventListener("dragstart",r=>{Un.enabled=!1,r.object.material.emissive.set("black"),r.object.material.opacity=.7,r.object.material.needsUpdate=!0}),Ii.addEventListener("dragend",r=>{Un.enabled=!0,r.object.material.emissive.set("black"),r.object.material.opacity=1,r.object.material.needsUpdate=!0}),Ii.enabled=!1,window.addEventListener("dblclick",r=>{r.target===ei&&y0(ei)});{uo=new O_(4),uo.visible=!1,Jt.add(uo),fo=new N_(vn,void 0,"orange"),fo.visible=!1,Jt.add(fo);const r=new U_(20,20,"teal","darkgray");r.position.y=-.01,Jt.add(r)}ih=new E_,Io=new v0,document.body.appendChild(Io.dom),Zt=new Ah({title:" Debug GUI",width:300});{const r=Zt.addFolder("voxelizer");r.add(ur,"resolution").name("resolution"),r.add(ur,"boxFill").name("box fill"),r.add(k0,"update").name("update model");const e=Zt.addFolder("animator");e.add(Gn,"play").name("play animation"),e.add(Gn,"reset").name("reset model"),e.add(Gn,"gravity",0,10).onChange(s=>{zt&&zt.setGravity(s)}),e.add(Gn,"timeFactor",0,2).name("time factor"),Zt.addFolder("model").add(gs,"selectedOption",H0),Zt.onFinishChange(()=>{const s=Zt.save();localStorage.setItem("guiState",JSON.stringify(s))});const n=localStorage.getItem("guiState");n&&Zt.load(JSON.parse(n));const i=()=>{localStorage.removeItem("guiState"),Zt.reset()};Zt.add({resetGui:i},"resetGui").name("RESET"),Zt.close()}oh()}function rh(r){for(const e of fc)Jt.remove(e);fc=[],zt&&Jt.remove(zt),sh.load(`./models/${r}.glb`,e=>{hs=e.scene,hs.position.set(2,2,3),hs.scale.set(2,2,2),hs.updateMatrix();const t=Date.now();zt=new z0({model:hs.clone(),resolution:ur.resolution,boxFill:ur.boxFill,segments:15,gravity:Gn.gravity});const n=Date.now();console.log(n-t),Jt.add(zt),Gn.play=!1,Zt.children[1].children[0].setValue(!1)})}function oh(){requestAnimationFrame(oh);const r=ih.getElapsedTime(),e=(r-pc)*(Do?0:1);if(Do=!1,pc=r,zt&&Gn.play&&(zt.switchToVoxelModel(),zt.animate(e*Gn.timeFactor)),Io.update(),M0(Fn)){const t=Fn.domElement;zn.aspect=t.clientWidth/t.clientHeight,zn.updateProjectionMatrix()}zn.far=5e4,Un.update(),Fn.render(Jt,zn),gs.selectedOption!==mc&&(mc=gs.selectedOption,rh(gs.selectedOption))}
