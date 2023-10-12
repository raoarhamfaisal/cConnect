<template>
  <!-- Scroll to Top Button -->
  <button @click="scrollToTop" class="scroll-to-top">
    <Icon
      icon="icon-park-solid:up-two"
      color="#3a357c"
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
  // Listen for scroll events on the scrollable container
  const container = document.getElementById(props.scrollableContainer);
  console.log(container, container.scrollTop, "scroll");
  if (container) {
    container.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  // Remove the scroll event listener to avoid memory leaks
  const container = document.getElementById(props.scrollableContainer);
  if (container) {
    container.removeEventListener("scroll", handleScroll);
  }
});

const handleScroll = () => {
  // Show the scroll button when scrolling down inside the container
  const container = document.getElementById(props.scrollableContainer);
  const scrollButton = document.querySelector(".scroll-to-top");

  if (container && scrollButton) {
    scrollButton.style.display = container.scrollTop > 100 ? "block" : "none";
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
  border: 1px solid #241e6d;
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
