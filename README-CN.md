# vue3-golden-layout-virtualcomponent
Gloden Layout官网：[http://golden-layout.com](http://golden-layout.com)

Golden Layout Git：[https://github.com/golden-layout/golden-layout](https://github.com/golden-layout/golden-layout)

本Demo演示了Golden Layout布局库的最灵活自由但也是最复杂的一个用法：Virtual Component，使用这种用法，你可以跟其它的任何框架结合，而不会受限于Golden Layout的写法，GL的另外三种用法或多或少会跟其它框架冲突，因为GL默认是直接修改DOM树，而其它框架，比如vue，是将自己的结构渲染成DOM树

本Demo不演示弹窗(popup)！
如果你使用弹窗功能发现了bug，不要来找我。当然，我一般也不上github，所以有啥问题直接去官方git发issue

本Demo由vue-cli4创建，使用的Golden Layout版本：2.3.0

如果你不了解Golden Layout，只是被比如官网首页的演示吸引过来的，那么我建议你先阅读一下官方git仓库里的README

注：当前时间2021/09/20，GL官网依然是v1版本的案例和教程，但git仓库已更新至v2版本，v2由于加入了虚拟组件（即Virtual Component），改写了大量底层代码，但并不代表官网的文档完全不能使用，至少配置项有哪些还是可以看的，如果你想更好地学习代码的写法，那目前只能看官方git的README和apitest目录下的例子

## Demo如何运行
1. 下载该仓库，git拉取或zip下载都行
2. 在项目根目录运行命令行：`yarn`
3. 命令行运行：`yarn serve`
4. 浏览器打开：`http://localhost:8080/`

## Demo已将GL封装成vue3组件，可在其它项目中直接使用！
> 但是，组件是用TS写的，如果你不用TS，那么你只能自己翻译一下了

`src/components/`内的`Glayout.vue`和`GlComponent.vue`就是全部的组件，它们必须一起使用，其它文件都是为了展示这个demo

当然，除此之外你还需要从npm下载golden-layout

**Glayout.vue**

这是GL布局组件，掌管整个布局

它有三个接口函数：

	addGLComponent(componentType: string, title: string)
	loadGLLayout(layoutConfig: LayoutConfig | ResolvedLayoutConfig)
	getLayoutConfig()

具体用法详见下方

**GlComponent.vue**

这是GL布局中的单个内容容器，用于存放并展示你的自定义内容

比如像Visual Studio那样打开了很多代码的标签页，一个容器就是存放了某一个标签页里所展示的内容，包含代码、行数字、滚动条等，标签只是跟这个容器绑定，但不归这个容器管

**注：你可能需要更改这两个组件以满足你自己的需求，毕竟这两个组件只是最基本地使用GL**

### 具体用法
查看`src/App.vue`以了解详细的写法，这里只是简单说明

	<template>
		<glayout
			ref="GLayoutRoot"
			glc-path="./"
			style="width: 500px; height: 400px"
		></glayout>
	</template>

	<script setup lang="ts">
		import Glayout from "@/components/Glayout.vue";
		import { ref } from "vue";

		const GLayoutRoot = ref<null | HTMLElement>(null);
		onMounted(() => {
			GLayoutRoot.value.addGLComponent("Content1", "Title 1st");
		});
	</script>

	<style src="golden-layout/dist/css/goldenlayout-base.css"></style>
	<style src="golden-layout/dist/css/themes/goldenlayout-dark-theme.css"></style>

glayout就是你唯一需要关心的组件，将该组件放到任何你想要展示GL布局的地方

##### glayout的3个Attr
- ref：vue3的写法，用于script中获取这个组件，参考官方文档 [ref](https://v3.cn.vuejs.org/api/special-attributes.html#ref)
- glc-path：你的自定义内容组件的根目录，在本Demo中就是Content1.vue、Content2.vue和Content3.vue所在的目录，由于Glayout.vue在同目录，所以填写`./`
- style：css样式，一定要给width和height赋值，决定了该GL布局的占用面积，如果宽高不赋值，那么宽度可能是100%，高度就是0了，最终应该什么都不会显示，如果是要做单页应用，即该GL组件需要撑满浏览器窗口，那么除了这里height赋值100%，记得html、body以及所有的父DOM都要设置高度100%

##### 自定义内容
比如Content1.vue

    <template>
        <div style="color: white">111</div>
    </template>

就这么简单，这里样式写了白色是因为我用了黑色风格的GL布局，否则字就看不见了

你可以写成任何vue组件，按理都应该能够展示出来

##### 将自定义内容添加到GL布局中
调用组件的`addGLComponent(componentType: string, title: string)`方法
- componentType：一般是组件名，比如 "Content1"

最终加载的内容组件为：glcPath + componentType + ".vue"

在本例中就是 "./Content1.vue"

由于是组合路径，当然你也可以写 "SomePath/Content1"，最后会加载 "./SomePath/Content1.vue"

##### 保存当前布局
调用组件的`getLayoutConfig()`方法以获取布局配置对象，然后可以用`JSON.stringify`转换成字符串，就能保存了，比如保存到`localStorage`

##### 加载布局
无论是你自己写的初始布局配置，还是恢复成保存的配置，都可以通过`loadGLLayout(layoutConfig: LayoutConfig | ResolvedLayoutConfig)`方法加载布局

LayoutConfig是最终这个方法内部加载组件和内容用的配置类型

ResolvedLayoutConfig是保存的布局配置类型，你获取到保存的字符串后，得先用`JSON.parse`转换回配置对象，然后再传入，这个方法内部会再将其转换成LayoutConfig

##### LayoutConfig
这是GL定义的一个结构，官网的文档有

本Demo里有个最简单的版本：`src/ts/predefined-layouts.ts`，是从官方的apitest里抄过来的，所以详细的可以去看官方的案例

配置里的componentType要写你的自定义内容组件的文件名，即 "Content1"这种，如果不在glcPath下，还得加上额外路径

##### 引入官方css样式

	<style src="golden-layout/dist/css/goldenlayout-base.css"></style>
	<style src="golden-layout/dist/css/themes/goldenlayout-dark-theme.css"></style>

官方样式在node_modules内，你还能找到更多主题

第1行是基础样式

第2行是主题样式，主题样式可换，不过我这种写法应该是换不了的，得用import之类动态导入

之所以样式没有集成到Glayout组件里，是为了方便你控制样式，而且GL的虚拟组件本身就是为了跟其它框架结合使用的，如果你用了其它UI框架或库，一般来说都会跟GL官方样式不和谐，这时你就会需要自定义GL的样式

### 注意事项
1. 如果你要修改或另写一个Glayout组件，那么注意GL的根DOM必须在你的GlComponent组件上面，否则GL管理器将会覆盖在内容组件上面，如果管理器有背景色（用了主题样式就肯定有），那么内容就完全看不见了，具体顺序看Glayout.vue的template
2. GL相关的样式无法使用scoped，因为GL是动态加载的，无法被vue所解析，但对于IDE类的应用来说，一般也只需要一种样式
3. 对于单页应用，一般都不想要页面滚动条，因此需要给body加上样式`overflow:hidden`，否则拖动标签页的时候若移出边界就会出现滚动条，你可以把demo里body的overflow样式删掉，然后拖动标签页到边界看看效果
4. LayoutConfig的componentState可能你用不到，而且Glayout组件也没有对外开放该值，但是有坑所以还是要说一下，首先它虽然能赋任意的值，但个人只建议undefined和{ }对象，这个值在Glayout组件里被用作传递非常关键的ref索引，没有这个ref，将会导致找不到具体的GlComponent，所以我的处理，如果componentState不是对象，那么直接用对象覆盖，如果是，则把ref索引添加进去，key是refId
