<template>
  <div class="mv-list">
    <mv v-for="mv of mvList" :key="mv.id" :mv="mv" />
  </div>
</template>

<script>
import Mv from '../mv/mv';
export default {
  components: {
    Mv
  },
  props: {
    mvList: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.mv-list {
  max-width: 900px;
  margin: 20px auto;
  padding-right: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
