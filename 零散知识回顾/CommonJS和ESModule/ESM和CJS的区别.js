/*
 * ES6之前，JS一直没有自己的模块体系，因此社区就出现了CommonJS和AMD，CommonJS主要用于服务器(Node)，AMD主要用户浏览器
 * 但是ES6引入了ESModule，JS终于有了自己的模块体系，基本可以完全取代CJS和AMD
 */

// ESModule使用
// 导出命令: export
export const obj = { name: 'xiaowang' };
// 默认导出: export default
export default { name: 'xiaowang' };

// 引入接口: import
// 引入普通导出
import { obj } from './test.js';
// 引入默认导出
import obj from './test';


// CommonJS使用
// 导出
const obj = { a: 1 };
module.exports = obj;

// 引入
const obj = require('./test');

// 两者的区别
// 1、使用方式不同
// 2、ESM输出的是值的引用，而CJS输出的是值的拷贝
// 3、ESM是编译时输出接口，而CJS是运行时输出。因为CJS输出的是一个对象，
// 该对象需要在脚本运行完成后才生成，而ESM的输出是静态的，在编译时就生成
// 4、ESM是异步加载，而CJS是同步加载。因为ESM是用于浏览器端的，可能涉及到异步请求，所以需要采用异步加载。
// 而CJS是用于后端的，需要加载的模块都在本地，所以采用同步加载也不会出问题。