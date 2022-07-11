### hash路由

监听url中hash的变化，然后渲染不同的内容，这种路由不向服务器发送请求，不需要服务端的支持

通过监听hashchange事件，来渲染不同的组件到DOM根节点上


### history路由

监听url中的路径变化，需要客户端和服务端共同的支持

使用window.history中的方法

* back()
* forward()
* go()
* pushState(obj, title, url) 前进到指定的url，不刷新页面
* replaceState(obj, title, url) 用url替换当前的路由，不刷新页面

调用这几种方式时，只是修改了当前页面的url，页面的内容没有任何的变化。

但前3个方法只是路由历史记录的前进或后退，无法跳转到指定的url; 而 pushState和replaceState可以跳转到指定的url。

如果要修改页面的url，而不发送请求，答案只有这5中方法

如果服务端没有新更新的url，一刷新浏览器就会报错。因为刷新浏览器后，是真是的向服务器发送了一个http请求。因此

若要使用history路由，需要服务端的支持


### 应用场景

* location.href和location.replace切换时需要向服务器发送请求，而pushState和replaceState仅修改url, 除非主动发起请求
* 仅切换url而不发送请求的特性，可以在前端渲染中使用，例如首页是服务端渲染，二级页面采用前端渲染。
* 可以添加路由切换的动画
* 在浏览器中使用类似抖音的这种场景时，用户滑动切换视频时，可以静默修改对应的url，当用户刷新页面时，还能停留在当前视频

### 无法监听路由的变化

当我们用history的路由时，必然要监听到路由的变化才行。全局有个popstate事件，别看这个事件名称中有个 state关键词，但pushState和

replaceState被调用时，是不会触发popstate事件的，只有上面列举的前3个方法会触发。针对这种情况，可以使用window.dispatchEvent添加事件
