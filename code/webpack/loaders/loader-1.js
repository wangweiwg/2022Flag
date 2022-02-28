// loader的本质就是一个函数，接受我们的源代码作为入参，返回转换后的内容
function loader1(sourceCode) {
    return sourceCode + `\nconst loader1 = 'https://github.com/19Qingfeng'`;
}

module.exports = loader1