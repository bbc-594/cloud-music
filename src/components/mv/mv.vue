<template>
  <div class="mv" @click="getMvDetail(mv.id)">
    <div class="mv-pic">
      <img :src="mv.cover" alt="" />
      <div class="radio-tag">
        <icon-svg iconHref="icon-shipin1" />
      </div>
    </div>
    <div class="mv-name">
      <p>{{ mv.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mv: {
      type: Object
    }
  },
  methods: {
    getMvDetail(id) {
      this.$router.push({ path: '/mvDetail', query: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.mv {
  width: 32%;
  margin-bottom: 5px;
  .mv-pic {
    position: relative;
    height: 157px;
    img {
      width: 100%;
      height: 100%;
    }
    .radio-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      border: 1px solid #999;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 35px;
      background-color: rgba(0, 0, 0, 0.6);
      svg {
        width: 22px;
        height: 22px;
        color: #fff;
      }
    }
    :hover {
      opacity: 0.8;
    }
  }
}
.mv-name {
  margin-top: 5px;
  .ellipsis;
}
</style>
