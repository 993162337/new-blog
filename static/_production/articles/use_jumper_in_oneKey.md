## 在Sublime vim模式中中配置Line-jump单键快捷键

#### #引言

> vim模式下有快捷键翻页，翻半页的快捷键，但是有时候我们并不想跳俺么多行。
>
> 所以就找了个跳行的插件```LineJumper```，挺不错的。在配置快捷键的时候遇到问题了。

安装了```package control```的同学可以直接在里面直接安装，没安装```package control```的同学先安装一下吧。^_^

下面放配置方法吧，之前自己在配快捷键的时候在insert模式下也是跳行，导致快捷键字母键无法输入。

    {
        "keys": ["m"],
        "command": "line_jumper",
        "context": [
            { "key": "setting.command_mode", "operand": true },
        ],
        "args": {
            "number_of_lines": 10,
            "cmd": "up",
            "insert_mode": false
        }
    }

这个是在vim模式下按```m```键可以往上跳10行。主要是里面的```insert_mode```需要设置为```false```。往下跳行也是同理。



> 其实配置很简单，只是一直没找到配置项。找了很久，在此记录一下。



### 完结



