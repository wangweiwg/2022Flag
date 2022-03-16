// Promise 是解决异步编程的一种方案，比传统的解决方案（回调函数、事件）更合理和更强大。

// 特点
// 1、对象的状态不受外界影响。有三种状态：pendding、fulfilled、rejected。只有异步操作的结果，可以决定当前是哪种状态。
// 2、一旦状态改变，就不会再变

// 缺点
// 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
// 当处于pendding状态时，无法得知目前进展到哪一个阶段（是刚刚开始，还是即将完成）

// 基本用法：
// ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
const promise = new Promise((resolve, reject) => {
    // ... 处理异步操作逻辑
    // if (异步操作成功) {
        // resolve(value)
    // } else {
        // reject(error)
    // }
})

// 实例可以调用then方法来处理结果，接受两个函数resolved函数，rejected函数
// 调用resolve和reject并不会终结Promise的参数函数的执行，一般会使用return语句

// p1的状态会传递给p2，也就是说p1的状态决定了p2的状态
const p1 = new Promise((resolve, reject) => {
    // setTimeout(reject(new Error('fail')), 5000)
    console.log('p1 start')
    setTimeout(() => {
        console.log('马上开始执行p1')
        resolve('haha-p1')
    }, 9000)
})
p1.then((res) => {
    console.log('p1---res')
})
const p2 = new Promise((resolve, reject) => {
    console.log('p2 start')
    setTimeout(reject(p1), 1000);
})
p2.then(result => {
    console.log('result==', result)
}).catch(err => {
    console.log('catch--err--', err)
})

// Promise.prototype.then()
// then方法定义在原型上对象Promise.prototype上，
// then方法返回的是一个新的Promise实例，因此可以采用链式写法，即then方法后面再调用then方法。
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('1')
    }, 3000)
}).then((res) => {
    console.log('第一步结果是---', res)
    return 2
}).then((res) => {
    console.log('第二步结果是---', res)
})

// Promise.prototype.catch()
// Promise内部的错误不会影响到外部代码的执行，因此需要使用catch来捕获异常
// 不过nodejs有个unhandledRejection事件，专门监听未捕获的reject错误
// process.on('unhandledRejection', function(err, p) { throw err })


// Promise.prototype.finally()
// finally()方法用于指定不管Promise对象最后状态如何，都会执行的操作。改方法是ES2018引入标准的。
// finally里面的操作，与状态无关，不依赖于Promise的执行结果
// finally本质上是then方法的特例。


// Promise.all()
// 用于将多个Promise实例，包装成一个新的Promise实例
// 接受数组作为参数，只有所有的参数成员状态都变为fulfilled时，最终才会变为fufilled状态，以数组的形式返回
// 只要有一个参数状态变为rejected，最终状态就会变为rejected，直接抛出异常
// 如果参数实例定义了catch方法，那么报错时不会走Promise.all()的catch方法

// Promise.race()
// 将多个Promise实例包装成一个新的Promise实例
// 只要参数实例中有一个率先改变状态，最终状态就跟着改变。并且返回率先改变的值

// Promise.allSettled()
// 有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。
// 但是，现有的Promise方法很难实现这个要求。
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3');
    }, 2000)
})

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p4');
    }, 4000)
})

const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p5');
    }, 6000)
})

// 只有p3、p4、p5都成功了才会成功
// Promise.all([p3, p4, p5]).then((res) => {
//     console.log('rees---all--', res)
// }).catch(err => {
//     console.log('出现异常了')
// })

// ES2020引入了 Promise.allSettled()方法，用来确定一组异步操作是否都结束了。
Promise.allSettled([p3, p4, p5]).then(res => {
    console.log('都执行完了---', res)
})


// Promise.any()
// ES2021引入了Promise.any()方法。该方法接受一组Promise实例作为参数，包装成一个新的Promise实例返回
// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态，如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
// Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某一个Promise变成rejected状态而结束。
// 必须等到所有的Promise实例都变成rejected状态才会结束


// Promise.resolve()
// 将现有对象转为Promise对象
// 立即resolve()的Promise对象，是在本轮事件循环的结束时执行，而不是在下一轮事件循环的开始时


// Promise.reject()
// 返回一个新的Promise实例，该实例的状态为rejected

// 应用
// 图片加载
const preloadImage = (path) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = path
    })
}


// Promise.try()
// 开发中会遇到不知道或者不想区分，函数是同步函数还是异步函数，但是想用Promise来处理它。
// 可以使用then方法指定下一步流程，用catch处理函数抛出的异常，可以使用Promise.try()