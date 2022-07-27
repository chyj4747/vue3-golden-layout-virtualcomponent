<template>
    <div ref="GLComponent" style="position: absolute; overflow: hidden">
        <slot></slot>
    </div>
</template>

<script>
import { ref, defineExpose } from "vue";

export default {
    name: "GlComponent",
    setup(props) {
        const GLComponent = ref(undefined);

        const numberToPixels = (value) => {
            return value.toString(10) + "px";
        };

        const setPosAndSize = (left, top,width,height) => {
            if (GLComponent.value) {
                const el = GLComponent.value; // as HTMLElement
                el.style.left = numberToPixels(left);
                el.style.top = numberToPixels(top);
                el.style.width = numberToPixels(width);
                el.style.height = numberToPixels(height);
            }
        };

        
        const setVisibility = (visible) => {
            if (GLComponent.value) {
                const el = GLComponent.value; //as HTMLElement;
                if (visible) {
                    el.style.display = "";
                } else {
                    el.style.display = "none";
                }
            }
        };

        const setZIndex = (value) => {
            if (GLComponent.value) {
                const el = GLComponent.value; //as HTMLElement;
                el.style.zIndex = value;
            }
        };

        return {
            GLComponent,
            numberToPixels,
            setPosAndSize,
            setVisibility,
            setZIndex
        }
    }
}
</script>

