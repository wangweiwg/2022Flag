### Linux yun命令

yum（ Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 SUSE 中的 Shell 前端软件包管理器。

基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。

yum 提供了查找、安装、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。

### yum语法

```
yum [options] [command] [package ...]
```

* options：可选，选项包括-h（帮助），-y(当安装过程提示选择全部为"yes")，-q（不显示安装的过程）等等
* command：要进行的操作
* package：安装的包名

### yum常用命令

* 列出所有可更新的软件清单命令：yum check-uodate
* 更新所有软件命令：yum update
* 仅安装指定的软件命令：`yum install <package_name>`
* 仅更新指定的如软件命令：`yum update <package_name>`
* 列出所有可安装的软件清单命令：`yum list`
* 删除软件包命令：`yum remove <package_name>`
* 查找软件包命令：`yum search <package_name>`
* 清除缓存命令：
* `yum clean packages` : 清除缓存目录下的软件包
* `yum clean headers` : 清除缓存目录下的headers
* `yum clean oldheaders` : `清除缓存目录下的headers`
* **yum clean, yum clean all (= yum clean packages; yum clean oldheaders)** :清除缓存目录下的软件包及旧的 headers

### 国内yum源

网易(163)yum源是国内最好的yum源之一，无乱世速度还是软件版本，都非常不错

将yum源设置为163yum，可以提升软件包安装和更新的速度，同时避免一些常见软件无法找到。

安装步骤

1. 首先备份 /etc/yum.repos.d/CentOS-Base.repo

   ```
   mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
   ```
2. 下载对应版本 repo 文件, 放入 /etc/yum.repos.d/ (操作前请做好相应备份)

   ```
   wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
   mv CentOS6-Base-163.repo CentOS-Base.repo
   ```
3. 运行以下命令生成缓存

   ```
   yum clean all
   yum makecache
   ```

除了网易之外，国内还有其他不错的 yum 源，比如中科大和搜狐。

中科大的 yum 源，安装方法查看：[https://lug.ustc.edu.cn/wiki/mirrors/help/centos](https://lug.ustc.edu.cn/wiki/mirrors/help/centos)

sohu 的 yum 源安装方法查看: [http://mirrors.sohu.com/help/centos.html](http://mirrors.sohu.com/help/centos.html)
