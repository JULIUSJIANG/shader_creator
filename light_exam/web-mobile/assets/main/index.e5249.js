window.__require=function t(e,o,i){function r(l,s){if(!o[l]){if(!e[l]){var c=l.split("/");if(c=c[c.length-1],!e[c]){var d="function"==typeof __require&&__require;if(!s&&d)return d(c,!0);if(n)return n(c,!0);throw new Error("Cannot find module '"+l+"'")}l=c}var a=o[l]={exports:{}};e[l][0].call(a.exports,function(t){return r(e[l][1][t]||t)},a,a.exports,t,e,o,i)}return o[l].exports}for(var n="function"==typeof __require&&__require,l=0;l<i.length;l++)r(i[l]);return r}({BtnBind:[function(t,e,o){"use strict";cc._RF.push(e,"fd44bCpdzRAUrtvTKDsYJgW","BtnBind"),Object.defineProperty(o,"__esModule",{value:!0}),cc._RF.pop()},{}],BtnBlock:[function(t,e,o){"use strict";cc._RF.push(e,"0599fCbkaJGGKhIupm6g3Gu","BtnBlock");var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),n=this&&this.__decorate||function(t,e,o,i){var r,n=arguments.length,l=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(l=(n<3?r(l):n>3?r(e,o,l):r(e,o))||l);return n>3&&l&&Object.defineProperty(e,o,l),l};Object.defineProperty(o,"__esModule",{value:!0});var l=t("../Index"),s=t("./DataStorage"),c=cc._decorator,d=c.ccclass,a=c.property,h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.colorPreview=null,e.btnSelect=null,e.mask=null,e}return r(e,t),e.prototype.init=function(t){this.editItem=s.default.vo.colorPool[t],this.colorPreview.color=new cc.Color(this.editItem.r,this.editItem.g,this.editItem.b),this.colorPreview.opacity=this.editItem.a,this.mask.active=s.default.vo.colorIndex==t,this.btnSelect.on(cc.Node.EventType.TOUCH_START,function(){s.default.vo.colorIndex!=t?(s.default.vo.colorIndex=t,l.default.inst.refreshLeftNav()):(l.default.inst.viewBlockEdit.node.active=!0,l.default.inst.viewBlockEdit.init(t))})},n([a(cc.Node)],e.prototype,"colorPreview",void 0),n([a(cc.Node)],e.prototype,"btnSelect",void 0),n([a(cc.Node)],e.prototype,"mask",void 0),n([d],e)}(cc.Component);o.default=h,cc._RF.pop()},{"../Index":"Index","./DataStorage":"DataStorage"}],ColorRecord:[function(t,e,o){"use strict";cc._RF.push(e,"5d8a3F1obNOtrXWo+l1m7b6","ColorRecord"),Object.defineProperty(o,"__esModule",{value:!0});o.default=function(){this.r=255,this.g=255,this.b=255,this.a=255,this.p=100},cc._RF.pop()},{}],DataStorage:[function(t,e,o){"use strict";cc._RF.push(e,"576fdG6ZwtA16SSDu4GbgEr","DataStorage"),Object.defineProperty(o,"__esModule",{value:!0});var i="dataStorage3",r={vo:new function(){this.colorIndex=0,this.editTypeIndex=0,this.colorPool=[],this.gridRec=[]},save:function(){localStorage.setItem(i,JSON.stringify(r.vo))},certainRecord:function(){if(null==r.vo.colorPool[r.vo.colorIndex]){r.vo.colorIndex=0;for(var t=0;t<r.vo.colorPool.length;t++)if(null!=r.vo.colorPool[t])return void(r.vo.colorIndex=t)}}},n=localStorage.getItem(i);null!=n&&""!=n&&(r.vo=JSON.parse(n)),cc.game.on(cc.game.EVENT_HIDE,function(){r.save()}),o.default=r,cc._RF.pop()},{}],GlobalConfig:[function(t,e,o){"use strict";cc._RF.push(e,"f5398Xy9bdHPJlOFHAdT1XK","GlobalConfig"),Object.defineProperty(o,"__esModule",{value:!0});var i={gridPixel:30,drawPixel:10,outLineColor:new cc.Color(0,0,0,255),shadowAlphaMax:225};o.default=i,cc._RF.pop()},{}],Index:[function(t,e,o){"use strict";cc._RF.push(e,"71b0eSIpGpD85LqCpu6nwNn","Index");var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),n=this&&this.__decorate||function(t,e,o,i){var r,n=arguments.length,l=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(l=(n<3?r(l):n>3?r(e,o,l):r(e,o))||l);return n>3&&l&&Object.defineProperty(e,o,l),l};Object.defineProperty(o,"__esModule",{value:!0});var l=t("./scripts/DataStorage"),s=t("./scripts/ViewBlockEdit"),c=t("./scripts/BtnBlock"),d=t("./scripts/ColorRecord"),a=t("./scripts/UtilTexture2D"),h=t("./scripts/GlobalConfig"),u=cc._decorator,p=u.ccclass,f=u.property,v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.sideNav=null,e.btnBuild=null,e.btnDestory=null,e.viewBlockEdit=null,e.blockContainer=null,e.btnBlockPrefab=null,e.btnAddBlock=null,e.grid=null,e.display=null,e.blockBytes=[],e.spr=new cc.SpriteFrame,e.tex=new cc.Texture2D,e.penetrationBytes=[],e}var o;return r(e,t),o=e,e.prototype.start=function(){var t=this;o.inst=this,this.viewBlockEdit.node.active=!1,this.initForEditType(),this.refreshLeftNav(),this.btnAddBlock.on(cc.Node.EventType.TOUCH_START,function(){l.default.vo.colorPool.push(new d.default),l.default.vo.colorIndex=l.default.vo.colorPool.length-1,t.refreshLeftNav(),t.viewBlockEdit.init(l.default.vo.colorIndex),t.viewBlockEdit.node.active=!0}),this.horGridCount=Math.ceil(this.node.width/h.default.gridPixel),this.texWidth=this.horGridCount*h.default.gridPixel,this.drawWidth=this.horGridCount*h.default.drawPixel,this.verGridCount=Math.ceil(this.node.height/h.default.gridPixel),this.texHeight=this.verGridCount*h.default.gridPixel,this.drawHeigh=this.verGridCount*h.default.drawPixel,this.grid.node.width=this.texWidth,this.grid.node.height=this.texHeight,this.display.node.width=this.texWidth,this.display.node.height=this.texHeight,this.grid.spriteFrame=a.default.grid(this.texWidth,this.texHeight,h.default.gridPixel,this.blockBytes);var e=function(e){var o=e.currentTouch.getLocation(),i=Math.floor(o.x/h.default.gridPixel),r=Math.floor(o.y/h.default.gridPixel);t.btnList[l.default.vo.editTypeIndex].onGrid(i,r)};this.display.node.on(cc.Node.EventType.TOUCH_START,e),this.display.node.on(cc.Node.EventType.TOUCH_MOVE,e),this.refreshGridDraw()},e.prototype.initForEditType=function(){var t=this;this.btnList=[{btn:this.btnBuild,onEnable:function(){t.sideNav.active=!0},onDisable:function(){t.sideNav.active=!1},onGrid:function(e,o){var i=l.default.vo.colorIndex;null==l.default.vo.gridRec[o]&&(l.default.vo.gridRec[o]=[]),l.default.vo.gridRec[o][e]!=i&&(l.default.vo.gridRec[o][e]=i,t.refreshGridDraw())}},{btn:this.btnDestory,onEnable:function(){},onDisable:function(){},onGrid:function(e,o){null!=l.default.vo.gridRec[o]&&null!=l.default.vo.gridRec[o][e]&&(l.default.vo.gridRec[o][e]=null,t.refreshGridDraw())}}];var e=function(){t.btnList.forEach(function(t,e){t.btn.active=l.default.vo.editTypeIndex!=e,l.default.vo.editTypeIndex==e?t.onEnable():t.onDisable()})};this.btnList.forEach(function(t,o){t.btn.on(cc.Node.EventType.TOUCH_START,function(){l.default.vo.editTypeIndex=o,e()})}),e()},e.prototype.refreshLeftNav=function(){var t=this;this.blockContainer.removeAllChildren(),l.default.vo.colorPool.forEach(function(e,o){if(null!=e){var i=cc.instantiate(t.btnBlockPrefab);i.getComponent(c.default).init(o),t.blockContainer.addChild(i)}})},e.prototype.refreshGridDraw=function(){this.refreshCurrBlockTextureBytes(),this.refreshLightPenetration(),this.refreshLightBlend(),a.default.verReverse(this.drawWidth,this.drawHeigh,this.blockBytes),this.tex.initWithData(new Uint8Array(this.blockBytes),cc.Texture2D.PixelFormat.RGBA8888,this.drawWidth,this.drawHeigh),this.spr.setTexture(this.tex),this.display.spriteFrame=this.spr},e.prototype.refreshCurrBlockTextureBytes=function(){this.blockBytes.fill(null),this.penetrationBytes.fill(null);for(var t=0;t<this.drawWidth;t++)for(var e=0;e<this.drawHeigh;e++){var o=4*(e*this.drawWidth+t);this.blockBytes[o]=255,this.blockBytes[o+1]=255,this.blockBytes[o+2]=255,this.blockBytes[o+3]=0,this.penetrationBytes[o]=0,this.penetrationBytes[o+1]=0,this.penetrationBytes[o+2]=0,this.penetrationBytes[o+3]=0}for(var i=0;i<l.default.vo.gridRec.length;i++){var r=l.default.vo.gridRec[i];if(null!=r)for(var n=0;n<r.length;n++){var s=r[n];if(null!=s){var c=l.default.vo.colorPool[s];if(null!=c)for(var d=this.getColorTag(n-1,i),a=this.getColorTag(n+1,i),u=this.getColorTag(n,i-1),p=this.getColorTag(n,i+1),f=0;f<h.default.drawPixel;f++)for(var v=0;v<h.default.drawPixel;v++){var y=4*((i*h.default.drawPixel+v)*this.drawWidth+n*h.default.drawPixel+f),g=c.r,b=c.g,B=c.b,w=c.a;(null==d&&0==f||null==a&&f==h.default.drawPixel-1||null==u&&0==v||null==p&&v==h.default.drawPixel-1)&&(g=h.default.outLineColor.r,b=h.default.outLineColor.g,B=h.default.outLineColor.b,w=h.default.outLineColor.a),this.blockBytes[y]=g,this.blockBytes[y+1]=b,this.blockBytes[y+2]=B,this.blockBytes[y+3]=w,this.penetrationBytes[y]=0,this.penetrationBytes[y+1]=0,this.penetrationBytes[y+2]=0,this.penetrationBytes[y+3]=c.p/100/h.default.drawPixel}}}}},e.prototype.refreshLightPenetration=function(){for(var t=0;t<this.drawWidth;t++)for(var e=this.drawHeigh-1;0<=e;e--){var o=4*(e*this.drawWidth+t),i=255;0<t&&e<this.drawHeigh-1&&(i=this.penetrationBytes[4*((e+1)*this.drawWidth+(t-1))+3]),this.penetrationBytes[o+3]=i-255*this.penetrationBytes[o+3],this.penetrationBytes[o+3]=Math.max(0,this.penetrationBytes[o+3])}for(t=0;t<this.drawWidth;t++)for(e=0;e<this.drawHeigh;e++)o=4*(e*this.drawWidth+t),this.penetrationBytes[o+3]=Math.min(255-this.penetrationBytes[o+3],h.default.shadowAlphaMax)},e.prototype.refreshLightBlend=function(){for(var t=0;t<this.drawWidth;t++)for(var e=0;e<this.drawHeigh;e++){var o=4*(e*this.drawWidth+t);this.blockBytes[o]=this.penetrationBytes[o]*this.penetrationBytes[o+3]/255+(255-this.penetrationBytes[o+3])/255*this.blockBytes[o],this.blockBytes[o+1]=this.penetrationBytes[o+1]*this.penetrationBytes[o+3]/255+(255-this.penetrationBytes[o+3])/255*this.blockBytes[o+1],this.blockBytes[o+2]=this.penetrationBytes[o+2]*this.penetrationBytes[o+3]/255+(255-this.penetrationBytes[o+3])/255*this.blockBytes[o+2],this.blockBytes[o+3]=this.penetrationBytes[o+3]*this.penetrationBytes[o+3]/255+(255-this.penetrationBytes[o+3])/255*this.blockBytes[o+3]}},e.prototype.getColorTag=function(t,e){var o=l.default.vo.gridRec[e];return null==o?null:null==o[t]?null:null==l.default.vo.colorPool[o[t]]?null:o[t]},n([f(cc.Node)],e.prototype,"sideNav",void 0),n([f(cc.Node)],e.prototype,"btnBuild",void 0),n([f(cc.Node)],e.prototype,"btnDestory",void 0),n([f(s.default)],e.prototype,"viewBlockEdit",void 0),n([f(cc.Node)],e.prototype,"blockContainer",void 0),n([f(cc.Prefab)],e.prototype,"btnBlockPrefab",void 0),n([f(cc.Node)],e.prototype,"btnAddBlock",void 0),n([f(cc.Sprite)],e.prototype,"grid",void 0),n([f(cc.Sprite)],e.prototype,"display",void 0),o=n([p],e)}(cc.Component);o.default=v,cc._RF.pop()},{"./scripts/BtnBlock":"BtnBlock","./scripts/ColorRecord":"ColorRecord","./scripts/DataStorage":"DataStorage","./scripts/GlobalConfig":"GlobalConfig","./scripts/UtilTexture2D":"UtilTexture2D","./scripts/ViewBlockEdit":"ViewBlockEdit"}],UtilTexture2D:[function(t,e,o){"use strict";cc._RF.push(e,"985738MtPFI5JPuOTwDINpR","UtilTexture2D"),Object.defineProperty(o,"__esModule",{value:!0});var i={grid:function(t,e,o,r){var n=Date.now();r.length=t*e*4;for(var l=Date.now(),s=0;s<t;s++)for(var c=0;c<e;c++){var d=4*(c*t+s);s%o==0||s%o==1||c%o==0||c%o==1?(r[d]=255,r[d+1]=255,r[d+2]=255,r[d+3]=255):(r[d]=0,r[d+1]=0,r[d+2]=0,r[d+3]=0)}var a=Date.now();i.verReverse(t,e,r);var h=Date.now(),u=new cc.Texture2D;u.initWithData(new Uint8Array(r),cc.Texture2D.PixelFormat.RGBA8888,t,e);var p=Date.now(),f=new cc.SpriteFrame;f.setTexture(u);var v=Date.now();return console.log("t5 - t4["+(v-p)+"], t4 - t3["+(p-h)+"], t3 - t2["+(h-a)+"], t2 - t1["+(a-l)+"], t1 - t0["+(l-n)+"]"),f},verReverse:function(t,e,o){for(var i,r=Math.floor(e/2),n=0;n<t;n++)for(var l=0;l<r;l++){var s=4*(l*t+n),c=4*((e-l-1)*t+n);i=[o[c],o[c+1],o[c+2],o[c+3],o[s],o[s+1],o[s+2],o[s+3]],o[s]=i[0],o[s+1]=i[1],o[s+2]=i[2],o[s+3]=i[3],o[c]=i[4],o[c+1]=i[5],o[c+2]=i[6],o[c+3]=i[7]}}};o.default=i,cc._RF.pop()},{}],ViewBlockEdit:[function(t,e,o){"use strict";cc._RF.push(e,"4065cvKUuZB/YolC6EeHP8M","ViewBlockEdit");var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),n=this&&this.__decorate||function(t,e,o,i){var r,n=arguments.length,l=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(l=(n<3?r(l):n>3?r(e,o,l):r(e,o))||l);return n>3&&l&&Object.defineProperty(e,o,l),l};Object.defineProperty(o,"__esModule",{value:!0});var l=t("../Index"),s=t("./DataStorage"),c=cc._decorator,d=c.ccclass,a=c.property,h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.colorPreview=null,e.sliderRed=null,e.redHandle=null,e.sliderGreen=null,e.greenHandle=null,e.sliderBlue=null,e.blueHandle=null,e.sliderAlpha=null,e.aHandle=null,e.sliderPenetration=null,e.btnCertain=null,e.btnDelete=null,e.pHandle=null,e.pBg=null,e}return r(e,t),e.prototype.start=function(){var t=this;this.sliderRed.node.on("slide",function(){t.editItem.r=255*t.sliderRed.progress,t.refresh()}),this.sliderGreen.node.on("slide",function(){t.editItem.g=255*t.sliderGreen.progress,t.refresh()}),this.sliderBlue.node.on("slide",function(){t.editItem.b=255*t.sliderBlue.progress,t.refresh()}),this.sliderAlpha.node.on("slide",function(){t.editItem.a=255*t.sliderAlpha.progress,t.refresh()}),this.sliderPenetration.node.on("slide",function(){t.editItem.p=255*t.sliderPenetration.progress,t.refresh()}),this.btnCertain.on(cc.Node.EventType.TOUCH_START,function(){t.node.active=!1,l.default.inst.refreshLeftNav(),l.default.inst.refreshGridDraw()}),this.btnDelete.on(cc.Node.EventType.TOUCH_START,function(){t.node.active=!1,s.default.vo.colorPool[t.editIndex]=null,s.default.certainRecord(),l.default.inst.refreshLeftNav(),l.default.inst.refreshGridDraw()})},e.prototype.init=function(t){this.editIndex=t,this.editItem=s.default.vo.colorPool[t],this.refresh()},e.prototype.refresh=function(){this.colorPreview.color=new cc.Color(this.editItem.r,this.editItem.g,this.editItem.b),this.colorPreview.opacity=this.editItem.a,this.sliderRed.progress=this.editItem.r/255,this.redHandle.color=new cc.Color(this.editItem.r,0,0),this.sliderGreen.progress=this.editItem.g/255,this.greenHandle.color=new cc.Color(0,this.editItem.g,0),this.sliderBlue.progress=this.editItem.b/255,this.blueHandle.color=new cc.Color(0,0,this.editItem.b),this.sliderAlpha.progress=this.editItem.a/255,this.aHandle.color=new cc.Color(255,255,255),this.aHandle.opacity=this.editItem.a,this.sliderPenetration.progress=this.editItem.p/255,this.pHandle.opacity=255-this.editItem.p,this.pBg.opacity=255-this.editItem.p},n([a(cc.Node)],e.prototype,"colorPreview",void 0),n([a(cc.Slider)],e.prototype,"sliderRed",void 0),n([a(cc.Node)],e.prototype,"redHandle",void 0),n([a(cc.Slider)],e.prototype,"sliderGreen",void 0),n([a(cc.Node)],e.prototype,"greenHandle",void 0),n([a(cc.Slider)],e.prototype,"sliderBlue",void 0),n([a(cc.Node)],e.prototype,"blueHandle",void 0),n([a(cc.Slider)],e.prototype,"sliderAlpha",void 0),n([a(cc.Node)],e.prototype,"aHandle",void 0),n([a(cc.Slider)],e.prototype,"sliderPenetration",void 0),n([a(cc.Node)],e.prototype,"btnCertain",void 0),n([a(cc.Node)],e.prototype,"btnDelete",void 0),n([a(cc.Node)],e.prototype,"pHandle",void 0),n([a(cc.Node)],e.prototype,"pBg",void 0),n([d],e)}(cc.Component);o.default=h,cc._RF.pop()},{"../Index":"Index","./DataStorage":"DataStorage"}]},{},["Index","BtnBind","BtnBlock","ColorRecord","DataStorage","GlobalConfig","UtilTexture2D","ViewBlockEdit"]);