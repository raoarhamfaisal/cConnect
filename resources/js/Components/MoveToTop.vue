<template>
  <!-- Scroll to Top Button -->
  <button
    @click="scrollToTop"
    class="scroll-to-top"
    :style="{
      border: `2px solid ${selectedColor}`,
    }"
  >
    <Icon
      icon="icon-park-solid:up-two"
      :color="selectedColor"
      class="w-6 h-6 sm:w-8 sm:h-8"
    />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
const props = defineProps({
  scrollableContainer: {
    type: String,
    required: false,
    default: "scrollable",
  },
  selectedColor: {
    type: String,
    default: "#3a357c",
  },
});
const scrollToTop = () => {
  const container = document.getElementById(props.scrollableContainer);
  if (container) {
    container.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  }
};

onMounted(() => {
  if (props.scrollableContainer === "scrollableContainer") {
    // Listening to the window's scroll event if it's the default viewport
    window.addEventListener("scroll", handleScroll);
  } else {
    // Listen for scroll events on the specified scrollable container
    const container = document.getElementById(props.scrollableContainer);

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
  }
});

onUnmounted(() => {
  if (props.scrollableContainer === "scrollableContainer") {
    // Removing the listener from the window
    window.removeEventListener("scroll", handleScroll);
  } else {
    // Remove the scroll event listener from the container
    const container = document.getElementById(props.scrollableContainer);
    if (container) {
      container.removeEventListener("scroll", handleScroll);
    }
  }
});

const handleScroll = () => {
  let scrollTop;
  if (props.scrollableContainer === "scrollableContainer") {
    // Getting scroll position from the window
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  } else {
    // Getting scroll position from the specified container
    const container = document.getElementById(props.scrollableContainer);
    if (container) {
      scrollTop = container.scrollTop;
    }
  }

  const scrollButton = document.querySelector(".scroll-to-top");
  if (scrollButton) {
    scrollButton.style.display = scrollTop > 100 ? "block" : "none";
  }
};
</script>

<style scoped>
/* Style for the scroll to top button */
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 100px;
  z-index: 20;
  background-color: white;
  color: white;
  border-radius: 50%;
  padding: 10px;
  display: none;
  cursor: pointer;

  transition: opacity 0.3s;
}
@media (max-width: 640px) {
  .scroll-to-top {
    bottom: 20px;
    right: 20px;
  }
}

/* Style for the scroll to top button icon */
.scroll-to-top .iconify-icon {
  font-size: 24px;
}

.scroll-to-top.show {
  opacity: 1;
}
</style>
