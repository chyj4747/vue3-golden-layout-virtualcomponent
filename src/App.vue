<template>
    <div class="full-height">
        <div id="nav" style="height: 90px">
            <h1 style="margin: 0">Golden Layout Demo</h1>
            <button @click="onClickInitLayoutMinRow">Init Layout MinRow</button>
            <div style="width: 20px; display: inline-block"></div>
            <button @click="onClickAddGLComponent1">
                Add Simple Component
            </button>
            <button @click="onClickAddGLComponent2">
                Add Widest Component
            </button>
            <button @click="onClickAddGLComponent3">
                Add Highest Component
            </button>
            <div style="width: 20px; display: inline-block"></div>
            <button @click="onClickSaveLayout">Save Layout</button>
            <div style="width: 20px; display: inline-block"></div>
            <button @click="onClickLoadLayout">Load Layout</button>
        </div>
        <glayout
            ref="GLayoutRoot"
            glc-path="./"
            style="width: 100%; height: calc(100% - 90px)"
        ></glayout>
    </div>
</template>

<script setup lang="ts">
import Glayout from "@/components/Glayout.vue";
import { ref } from "vue";
import { prefinedLayouts } from "./ts/predefined-layouts";

const GLayoutRoot = ref<null | HTMLElement>(null);

const onClickInitLayoutMinRow = () => {
    if (!GLayoutRoot.value) return;
    GLayoutRoot.value.loadGLLayout(prefinedLayouts.miniRow);
};

const onClickAddGLComponent1 = () => {
    if (!GLayoutRoot.value) return;
    GLayoutRoot.value.addGLComponent("Content1", "Title 1st");
};

const onClickAddGLComponent2 = () => {
    if (!GLayoutRoot.value) return;
    GLayoutRoot.value.addGLComponent("Content2", "I'm wide");
};

const onClickAddGLComponent3 = () => {
    if (!GLayoutRoot.value) return;
    GLayoutRoot.value.addGLComponent("Content3", "I'm high");
};

const onClickSaveLayout = () => {
    if (!GLayoutRoot.value) return;
    const config = GLayoutRoot.value.getLayoutConfig();
    localStorage.setItem("gl_config", JSON.stringify(config));
};

const onClickLoadLayout = () => {
    const str = localStorage.getItem("gl_config");
    if (!str) return;
    if (!GLayoutRoot.value) return;
    const config = JSON.parse(str as string);
    GLayoutRoot.value.loadGLLayout(config);
};
</script>

<style>
html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
    overflow: hidden;
}
.full-height, #app {
    height: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#nav {
    text-align: center;
}
</style>

<style src="golden-layout/dist/css/goldenlayout-base.css"></style>
<style src="golden-layout/dist/css/themes/goldenlayout-dark-theme.css"></style>
