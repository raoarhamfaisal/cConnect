<template>
  <div
    class="loading-screen"
    v-show="loading"
    :class="classes"
    :style="{ backgroundColor: bc, height: loaderHeight }"
  >
    <component v-if="customLoader" :is="customLoader"></component>
    <div v-else>
      <div class="loading-circle"></div>
      <p class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, toRefs } from "vue";

export default {
  props: {
    text: {
      type: String,
      default: "Loading",
    },
    dark: {
      type: Boolean,
      default: false,
    },
    classes: String,
    loading: {
      type: Boolean,
      default: false,
    },
    background: String,
    customLoader: String,
    height: {
      type: String,
      default: "100vh",
    },
  },
  setup(props) {
    // Convert each prop to a reactive ref.
    const { text, dark, classes, loading, background, customLoader, height } =
      toRefs(props);

    const bc = computed(() => {
      return (
        background.value ||
        (dark.value ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)")
      );
    });

    // Create a computed property to provide a fallback value if height is not provided.
    const loaderHeight = computed(() => {
      return height.value || "100vh";
    });

    return {
      text,
      dark,
      classes,
      loading,
      background,
      customLoader,
      bc,
      loaderHeight,
    };
  },
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  flex-direction: column;
  user-select: none;
}
.loading-circle {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-left-color: #241e6d;
  animation: circleanimation 0.45s linear infinite;
}
.loading-text {
  margin-top: 15px;
  color: #000;
  font-size: 12px;
  text-align: center;
}
@keyframes circleanimation {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
