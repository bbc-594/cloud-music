<template>
  <div class="loading">
    <a-spin size="large">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 80vh;
  line-height: 80vh;
  text-align: center;
}
</style>
