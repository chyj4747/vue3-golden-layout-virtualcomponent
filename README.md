# vue3-golden-layout-virtualcomponent

[中文文档](https://github.com/chyj4747/vue3-golden-layout-virtualcomponent/blob/master/README-CN.md)
------------


Gloden Layout official site: [http://golden-layout.com](http://golden-layout.com)

Golden Layout Git: [https://github.com/golden-layout/golden-layout](https://github.com/golden-layout/golden-layout)

This demo shows the most flexible but also the most complex way of using Golden Layout, which is the Virtual Component. By using virtual component, you can integrate golden layout with any other framework such as Vue.

This demo does not show Popup!
So if you find a bug when using popup, don't ask me. Try to send an issue to the GL git for help.

This demo is created by vue-cli4, and use Golden Layout v2.3.0

If you don't know golden layout, but want to use its nice features, then the first thing I will recommend is the README in the GL git.

Note: current date is 2021/09/20. GL official site still doesn't have tutorial and documentation for v2, although git repo is already updated to v2.3. The virtual component is added since GL v2.x, which changes a lot of the base codes. But it doesn't mean the documentation in the official site is useless. At least you can learn the config params. If you want to learn GL, currently you can just read the README and the codes in the folder apitest of GL git repo.

## How to run the demo
1. git pull or download this demo repo
2. run `yarn` in the root path of the repo
3. run `yarn serve`
4. open `http://localhost:8080/` in your broswer

## This demo has already integrated GL as vue3 components, they can be used in other projects directly!
> But, these conponents are wrote in TS, if you don't use ts, then you have to translate by yourself.

In the path `src/components/`, `Glayout.vue` and `GlComponent.vue` are the components. They must be used together. Other files in this repo are for demo.

Of course, you need to download golden-layout from npm.

**Glayout.vue**

This is the layout component, which controls and manages the whole layout.

It exports 3 methods:

	addGLComponent(componentType: string, title: string)
	loadGLLayout(layoutConfig: LayoutConfig | ResolvedLayoutConfig)
	getLayoutConfig()

See below for more details.

**GlComponent.vue**

This is the container for custom content. It is also the conponent defined in GL document.

**Note: you may need to modify these components for your own demand. These two components just made for the basic usage of GL.**

### Usage of the components
Check `src/App.vue` for the complete code. Here just shows the simplest code.

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

glayout is the only component you will use in code. Put it anywhere you wanna show the golden layout.

##### glayout's 3 Attrs
- ref: used in vue3, for getting the component in script. See Vue3 doc [ref](https://v3.vuejs.org/api/special-attributes.html#ref)
- glc-path: the path of your custom content components. In this demo, it is the path which has Content1.vue, Content2.vue and Content3.vue. Because the Glayout.vue is in the same path, glc-path here is `./`
- style: must give value to width and height, which decide how many spaces GL will occupy. If they are undefined, then width may be 100%, but the height will be 0, which will cause the GL to be hidden. When making a single page app, that is you want GL to be full screen, not only to set height 100% in this style, but also you need to set the height of html, body and any parent doms to be 100%.

##### Custom content
E.g. Content1.vue

    <template>
        <div style="color: white">111</div>
    </template>

It's simple. Here the white color is for the dark theme, otherwise the words can not be seen.

You can write any vue component. It should work with this demo.

##### Add custom content to GL
Call `addGLComponent(componentType: string, title: string)`
- componentType: usually it is the component's file name, such as "Content1"

The component to be loaded is `glcPath + componentType + ".vue"`

In this case it's "./Content1.vue"

Because it combines the paths, you can write "SomePath/Content1", then "./SomePath/Content1.vue" will be loaded.

##### Save current layout
Call `getLayoutConfig()` to get the config object, then use `JSON.stringify` to change it to string. You can then save the config string locally or in localStorage

##### Load layout
Call `loadGLLayout(layoutConfig: LayoutConfig | ResolvedLayoutConfig)` to load your initial or saved layout config

LayoutConfig is finally used in this method to load components.

ResolvedLayoutConfig is the saved config type. After you get the saved config string, using `JSON.parse` to get the config object. Pass the object to this method. The config object will be changed to LayoutConfig internally.

##### LayoutConfig
It is defined by GL, you can find it on the official site.

There is a simple version of the config in this demo, which is `src/ts/predefined-layouts.ts`.

It is copied from GL official repo's apitest, so you can see the official repo for more details.

"componentType" in the config is the same as the first param of the method `addGLComponent`.
You need to write the file name of content component like "Content1".

##### Import GL's style

	<style src="golden-layout/dist/css/goldenlayout-base.css"></style>
	<style src="golden-layout/dist/css/themes/goldenlayout-dark-theme.css"></style>

They are in node_modules, and you can find more themes.
The first line is the basic style.
The second line is theme. If you want to dynamically change it, you may need something like `import`

The reason for not integrating GL style in Glayout is that it is easier to use your own style.
The virtual component of GL is designed for using with other frameworks or libs. If you use other UI framework or lib, usually the style is not in tune with GL style, so you may need to customize style for GL.

### Notes
1. If you want to modify or write a new component like Glayout, then make sure the root DOM of GL is above of your GlComponent. Otherwise the GL container will be rendered on top of all content components, so you can't see any content. See the order in the template of Glayout.vue.
2. The style related to GL can not use `scoped`. Because GL is dynamically added to the dom tree, which cannot be resovled by vue. But for app like IDE, usually one style is enough.
3. For single page app, scroll bar is not needed. `overflow:hidden` should be added to `body`, or otherwise the scroll bar will appear when dragging the tab to the border of body. You can delete the body's overflow of this demo to see the effect.
4. The componentState in LayoutConfig may not useful to you, also Glayout does not export it, but it has a trap so I have to mention it here. Basically it can be set to any value type. But I just recommend to set it to undefined and object. It is used for an impotant ref, without this ref, Glayout cannot find any target GlComponent. What I did is if componentState is not object, it will be set to { refId }, or if it is object, then refId will be it's new key.
