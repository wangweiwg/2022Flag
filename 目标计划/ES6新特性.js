// class 类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    localPoint() {
        return `坐标为x: ${this.x}, y: ${this.y}`
    }
}
const p = new Point(10, 20)
console.log(p.localPoint())

// 智能（ES模块）：模块化，多次使用
// export
// import

// 箭头函数
const add = (a, b) => a + b


// 