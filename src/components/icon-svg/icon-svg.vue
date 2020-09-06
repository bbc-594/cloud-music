<template>
  <svg class="icon" aria-hidden="true" :style="{ fontSize: size, color }">
    <use :xlink:href="`#${iconHref}`" />
  </svg>
</template>

<script>
export default {
  name: "icon-svg",
  props: {
    iconHref: {
      type: String
    },
    size: {
      type: String
    },
    color: {
      type: String
    }
  }
};
</script>

<style></style>
