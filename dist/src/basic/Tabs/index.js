Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName="src/basic/Tabs/index.js";

var _propTypes=require("prop-types");var _propTypes2=_interopRequireDefault(_propTypes);
var _createReactClass=require("create-react-class");var _createReactClass2=_interopRequireDefault(_createReactClass);










var _Utils=require("../../Utils");

var _lodash=require("lodash");var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var React=require("react");var Component=React.Component;var ReactNative=require("react-native");var Dimensions=ReactNative.Dimensions,View=ReactNative.View,Animated=ReactNative.Animated,ScrollView=ReactNative.ScrollView,StyleSheet=ReactNative.StyleSheet,InteractionManager=ReactNative.InteractionManager,Platform=ReactNative.Platform;var TimerMixin=require("react-timer-mixin");

var SceneComponent=require("./SceneComponent");var _require=
require("./DefaultTabBar"),DefaultTabBar=_require.DefaultTabBar;var _require2=
require("./ScrollableTabBar"),ScrollableTabBar=_require2.ScrollableTabBar;

var ScrollableTabView=(0,_createReactClass2.default)({displayName:"ScrollableTabView",
mixins:[TimerMixin],
statics:{
DefaultTabBar:DefaultTabBar,
ScrollableTabBar:ScrollableTabBar},


propTypes:{
tabBarPosition:_propTypes2.default.oneOf(["top","bottom","overlayTop","overlayBottom"]),
initialPage:_propTypes2.default.number,
page:_propTypes2.default.number,
onChangeTab:_propTypes2.default.func,
onScroll:_propTypes2.default.func,
renderTabBar:_propTypes2.default.any,
style:_Utils.ViewPropTypes.style,
contentProps:_propTypes2.default.object,
scrollWithoutAnimation:_propTypes2.default.bool,
locked:_propTypes2.default.bool,
prerenderingSiblingsNumber:_propTypes2.default.number},


getDefaultProps:function getDefaultProps(){
return{
tabBarPosition:"top",
initialPage:0,
page:-1,
onChangeTab:function onChangeTab(){},
onScroll:function onScroll(){},
contentProps:{},
scrollWithoutAnimation:false,
locked:false,
prerenderingSiblingsNumber:0};

},

getInitialState:function getInitialState(){
return{
currentPage:this.props.initialPage,
gotNextPage:false,
isClicked:false,
scrollValue:new Animated.Value(this.props.initialPage),
containerWidth:Dimensions.get("window").width,
sceneKeys:this.newSceneKeys({currentPage:this.props.initialPage})};

},

componentDidMount:function componentDidMount(){var _this=this;
var scrollFn=function scrollFn(){
if(_this.scrollView&&Platform.OS==="android"){
var x=_this.props.initialPage*_this.state.containerWidth;
_this.scrollView.scrollTo({x:x,animated:false});
}
};
this.setTimeout(function(){
InteractionManager.runAfterInteractions(scrollFn);
},0);
},

componentWillReceiveProps:function componentWillReceiveProps(props){
if(props.children!==this.props.children){
this.updateSceneKeys({
page:this.state.currentPage,
children:props.children});

}

if(props.page>=0&&props.page!==this.state.currentPage){
this.goToPage(props.page);
}
},

goToPage:function goToPage(pageNumber){var _this2=this;var isClicked=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;
var offset=pageNumber*this.state.containerWidth;
this.setState({isClicked:isClicked},function(){
if(_this2.scrollView){
_this2.scrollView.scrollTo({
x:offset,
y:0,
animated:!_this2.props.scrollWithoutAnimation});

}
var currentPage=_this2.state.currentPage;
_this2.updateSceneKeys({
page:pageNumber,
callback:_this2._onChangeTab.bind(_this2,currentPage,pageNumber)});

});
},

renderTabBar:function renderTabBar(props){
if(this.props.renderTabBar===false){
return null;
}else if(this.props.renderTabBar){
return React.cloneElement(this.props.renderTabBar(props),props);
}else{
return React.createElement(DefaultTabBar,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:118}}));
}
},

updateSceneKeys:function updateSceneKeys(_ref){var page=_ref.page,_ref$children=_ref.children,children=_ref$children===undefined?this.props.children:_ref$children,_ref$callback=_ref.callback,callback=_ref$callback===undefined?function(){}:_ref$callback;
var newKeys=this.newSceneKeys({
previousKeys:this.state.sceneKeys,
currentPage:page,
children:children});

this.setState({currentPage:page,sceneKeys:newKeys},callback);
},

newSceneKeys:function newSceneKeys(_ref2){var _this3=this;var _ref2$previousKeys=_ref2.previousKeys,previousKeys=_ref2$previousKeys===undefined?[]:_ref2$previousKeys,_ref2$currentPage=_ref2.currentPage,currentPage=_ref2$currentPage===undefined?0:_ref2$currentPage,_ref2$children=_ref2.children,children=_ref2$children===undefined?this.props.children:_ref2$children;
var newKeys=[];
this._children(children).forEach(function(child,idx){
var key=_this3._makeSceneKey(child,idx);
if(_this3._keyExists(previousKeys,key)||_this3._shouldRenderSceneKey(idx,currentPage)){
newKeys.push(key);
}
});
return newKeys;
},

_shouldRenderSceneKey:function _shouldRenderSceneKey(idx,currentPageKey){
var numOfSibling=this.props.prerenderingSiblingsNumber;
return idx<currentPageKey+numOfSibling+1&&idx>currentPageKey-numOfSibling-1;
},

_keyExists:function _keyExists(sceneKeys,key){
return sceneKeys.find(function(sceneKey){return key===sceneKey;});
},

_makeSceneKey:function _makeSceneKey(child,idx){
return child.props.heading+"_"+idx;
},

renderScrollableContent:function renderScrollableContent(){var _this4=this;
var scenes=this._composeScenes();
return(
React.createElement(ScrollView,_extends({
horizontal:true,
pagingEnabled:true,
automaticallyAdjustContentInsets:false,
contentOffset:{
x:this.props.initialPage*this.state.containerWidth},

ref:function ref(scrollView){
_this4.scrollView=scrollView;
},
onScroll:this._optimisticRender,
onMomentumScrollEnd:this._onMomentumScrollBeginAndEnd,
scrollEventThrottle:16,
scrollsToTop:false,
showsHorizontalScrollIndicator:false,
scrollEnabled:!this.props.locked,
directionalLockEnabled:true,
alwaysBounceVertical:false,
keyboardDismissMode:"on-drag"},
this.props.contentProps,{__source:{fileName:_jsxFileName,lineNumber:158}}),

scenes));


},

_composeScenes:function _composeScenes(){var _this5=this;
return this._children().map(function(child,idx){
var key=_this5._makeSceneKey(child,idx);
return(
React.createElement(SceneComponent,{
key:child.key,
shouldUpdated:_this5._shouldRenderSceneKey(idx,_this5.state.currentPage),
style:{width:_this5.state.containerWidth},__source:{fileName:_jsxFileName,lineNumber:188}},

_this5._keyExists(_this5.state.sceneKeys,key)?
child:

React.createElement(View,{heading:child.props.heading,__source:{fileName:_jsxFileName,lineNumber:196}})));



});
},

_onMomentumScrollBeginAndEnd:function _onMomentumScrollBeginAndEnd(e){
var offsetX=e.nativeEvent.contentOffset.x;
var page=Math.round(offsetX/this.state.containerWidth);
if(this.state.currentPage!==page){
this._updateSelectedPage(page);
}
},

_optimisticRender:function _optimisticRender(e){var _this6=this;var _state=
this.state,currentPage=_state.currentPage,containerWidth=_state.containerWidth,isClicked=_state.isClicked,gotNextPage=_state.gotNextPage;

var offsetX=e.nativeEvent.contentOffset.x;

var currentPageOffset=offsetX/containerWidth;

var deltaX=currentPageOffset-currentPage;


if(Math.abs(deltaX)>0&&Math.abs(deltaX)<1&&!isClicked&&!gotNextPage){

this.setState({gotNextPage:true},function(){
var nextPage=deltaX>0?currentPage+1:currentPage-1;
_this6._updateSelectedPage(nextPage);
});
}

if(!deltaX){
this.setState({isClicked:false,gotNextPage:false});
}
this._updateScrollValue(offsetX/this.state.containerWidth);
},

_updateSelectedPage:function _updateSelectedPage(nextPage){
var localNextPage=nextPage;
if(typeof localNextPage==="object"){
localNextPage=nextPage.nativeEvent.position;
}

var currentPage=this.state.currentPage;
this.updateSceneKeys({
page:localNextPage,
callback:this._onChangeTab.bind(this,currentPage,localNextPage)});

},

_onChangeTab:function _onChangeTab(prevPage,currentPage){
this.props.onChangeTab({
i:currentPage,
ref:this._children()[currentPage],
from:prevPage});

},

_updateScrollValue:function _updateScrollValue(value){
this.state.scrollValue.setValue(value);
this.props.onScroll(value);
},

_handleLayout:function _handleLayout(e){var _this7=this;var
width=e.nativeEvent.layout.width;

if(Math.round(width)!==Math.round(this.state.containerWidth)){
this.setState({containerWidth:width});
this.requestAnimationFrame(function(){
_this7.goToPage(_this7.state.currentPage);
});
}
},

_children:function _children(){var children=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.props.children;
return React.Children.map(children,function(child){return child;});
},

render:function render(){
var overlayTabs=
this.props.tabBarPosition==="overlayTop"||this.props.tabBarPosition==="overlayBottom";
var tabBarProps={
goToPage:this.goToPage,
tabs:this._children().map(function(child){return child.props.heading;}),
tabStyle:this._children().map(function(child){return child.props.tabStyle;}),
activeTabStyle:this._children().map(function(child){return child.props.activeTabStyle;}),
textStyle:this._children().map(function(child){return child.props.textStyle;}),
activeTextStyle:this._children().map(function(child){return child.props.activeTextStyle;}),
tabHeaderStyle:this._children().map(function(child){return(
_lodash2.default.get(child.props.heading.props,"style",undefined));}),

activeTab:this.state.currentPage,
scrollValue:this.state.scrollValue,
containerWidth:this.state.containerWidth};


if(this.props.tabBarBackgroundColor){
tabBarProps.backgroundColor=this.props.tabBarBackgroundColor;
}
if(this.props.tabBarActiveTextColor){
tabBarProps.activeTextColor=this.props.tabBarActiveTextColor;
}
if(this.props.tabBarInactiveTextColor){
tabBarProps.inactiveTextColor=this.props.tabBarInactiveTextColor;
}
if(this.props.tabBarTextStyle){
tabBarProps.textStyle=this.props.tabBarTextStyle;
}
if(this.props.tabBarUnderlineStyle){
tabBarProps.underlineStyle=this.props.tabBarUnderlineStyle;
}
if(this.props.tabContainerStyle){
tabBarProps.tabContainerStyle=this.props.tabContainerStyle;
}
if(overlayTabs){var _tabBarProps$style;
tabBarProps.style=(_tabBarProps$style={
position:"absolute",
left:0,
right:0},_defineProperty(_tabBarProps$style,
this.props.tabBarPosition==="overlayTop"?"top":"bottom",0),_defineProperty(_tabBarProps$style,"backgroundColor",
"rgba(255, 255, 255, 0.7)"),_tabBarProps$style);

}

return(
React.createElement(View,{style:[styles.container,this.props.style],onLayout:this._handleLayout,__source:{fileName:_jsxFileName,lineNumber:323}},
(this.props.tabBarPosition==="top"||this.props.tabBarPosition==="overlayTop")&&this.renderTabBar(tabBarProps),
this.renderScrollableContent(),
(this.props.tabBarPosition==="bottom"||this.props.tabBarPosition==="overlayBottom")&&this.renderTabBar(tabBarProps)));


}});exports.default=


ScrollableTabView;

var styles=StyleSheet.create({
container:{
flex:1},

scrollableContentAndroid:{
flex:1}});
//# sourceMappingURL=index.js.map