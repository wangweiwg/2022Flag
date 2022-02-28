class PluginB {
    apply(compiler) {
      compiler.hooks.done.tap('Plugin B', () => {
        console.log('编译结束后，注册PluginB');
      });
    }
}

module.exports = PluginB;