require=function s(o,a,r){function u(e,t){if(!a[e]){if(!o[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(h)return h(e,!0);var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}var n=a[e]={exports:{}};o[e][0].call(n.exports,function(t){return u(o[e][1][t]||t)},n,n.exports,s,o,a,r)}return a[e].exports}for(var h="function"==typeof require&&require,t=0;t<r.length;t++)u(r[t]);return u}({Game:[function(t,e,i){"use strict";cc._RF.push(e,"4e12fLSQu1L+KV6QmxDiavU","Game"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.timer=0,this.starDuration=0,this.spawnNewStar(),this.score=0},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),(t.getComponent("Star").game=this).starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){var t,e=this.groundY+Math.random()*this.player.getComponent("Player").jumpHeight+50,i=this.node.width/2;return t=2*(Math.random()-.5)*i,cc.v2(t,e)},update:function(t){if(this.timer>this.starDuration)return this.gameOver(),void(this.enabled=!1);this.timer+=t},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score,cc.audioEngine.playEffect(this.scoreAudio,!1)},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")}}),cc._RF.pop()},{}],Player:[function(t,e,i){"use strict";cc._RF.push(e,"6c688v72QdOKamCGCT+xaAd","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,jumpAudio:{default:null,type:cc.AudioClip}},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(t,e,i))},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!0;break;case cc.macro.KEY.d:this.accRight=!0}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!1;break;case cc.macro.KEY.d:this.accRight=!1}},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t}}),cc._RF.pop()},{}],Star:[function(t,e,i){"use strict";cc._RF.push(e,"4644f0m2WtABYRy+pn6dOaG","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0},getPlayerDistance:function(){var t=this.game.player.getPosition();return this.node.position.sub(t).mag()},onPicked:function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e)}}}),cc._RF.pop()},{}]},{},["Game","Player","Star"]);