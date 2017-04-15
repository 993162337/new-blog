## 配置ssh的config文件实现多秘钥管理

#### 导语：
> 前些天在看各位大牛的 Github 发现他们 [Github](https://github.com/993162337) 的 Contribution 基本上绿油油的一片，甚是好看。  
> 然后我看了下自己的 [Github](https://github.com/993162337)……空白上几个小绿点……  
> 我想了想，真是日了**了，我也没少往G上填代码啊，咋都空白的呢。然后看了下G官方对 [Contribution 规则](https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile)的介绍。  
> 其他的条件我就不说了，我的问题在于我电脑里面的ssh秘钥是公司的，用的公司邮箱，不是我自己Github邮箱，所以提交了代码不算Contribution。我需要在公司用公司的秘钥，github上用自己的邮箱。

#### 一、直接操作（ 我用的是MacOS ）
因为使用了多秘钥，每个秘钥的邮箱是不一样的，所以要取消掉全局的账户设置

    git config --unset --global user.name
    git config --unset --global user.email

首先你肯定有几个秘钥对放在/User/**/.ssh/目录下...  
如果没有的话，可以现在生成。先把已有的修改名称：

```ssh-keygen -t rsa -C "woolson.lee@gmail.com"```

![文件目录](http://ww1.sinaimg.cn/large/708e7d29gw1fagaptmi6dj21040fwwkk.jpg)

看下里面会有两个id_rsa秘钥对，名字完全可以随意。

> 在生成秘钥后，需要执行```ssh-add id_rsa```添加刚刚生成的秘钥  
> 但是，这样只是添加秘钥到ssh的sesison中，电脑重启后ssh就session就失效了，还需要再添加一次。  
> 查询之后，找到一个永久添加的方法即: ```ssh-add -K id_rsa```。


#### 二、新建修改~/.ssh/config文件
如果之前没有类似操作过，```.ssh/```目录下可能没有config文件

新建一个新的即可
```touch config```

添加下面的内容到config文件中

    #default github
    Host github.com                       // 这个是个命名，请随意
      HostName github.com                 // 这个可以是IP也可以是域名
      PreferredAuthentications publickey  // 指定登录方式
      IdentityFile ~/.ssh/id_rsa          // 指定秘钥文件

    Host github_work_13
      HostName 192.168.0.13
      User     root
      PreferredAuthentications publickey
      IdentityFile ~/.ssh/id_rsa_work


#### 三、配置完成，可以测试是否可以正常使用
配置好以后可以使用```ssh```登录你的服务器或者```pull```远程代码  
如果不行的话，可以尝试重启一下```ssh```的服务。

可以使用命令行...

    #开启
    sudo systemsetup -setremotelogin on
    #关闭
    sudo systemsetup -setremotelogin off


之前我们取消了全局的设置，需要到你的代码库中设置局部的用户名和邮箱，然后再推送的话
就是你设置的用户了
