<template>
  <svg
    class="icon"
    aria-hidden="true"
    @click="click"
    :style="{ width: size, height: size, color }"
  >
    <use :xlink:href="`#${iconHref}`" />
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconHref: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style></style>
