<template>
  <div class="recommend-title">
    <div class="recommend-title-l">
      <icon-svg :iconHref="icon" />
      <p>{{ title }}</p>
    </div>
    <div class="recomment-title-center" v-if="tags.length > 0">
      <span
        class="tag"
        :class="selTag === tag ? 'selected' : ''"
        @click="handleTag(tag)"
        v-for="tag of tags"
        :key="tag"
        >{{ tag }} <a-divider type="vertical"
      /></span>
    </div>
    <div class="recommend-title-r">
      <span>更多</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selTag: '内地'
    };
  },
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleTag(tag) {
      this.selTag = tag;
      this.$emit('tag', tag);
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin-bottom: 0;
}
.recommend-title {
  display: flex;
  margin-top: 10px;
  padding-right: 20px;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #eaeaea;
  .recommend-title-l {
    display: flex;
    align-items: center;
    svg {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }
  .recomment-title-center {
    font-size: 13px;
    color: #888;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
    .selected {
      color: #000;
    }
  }
  .recommend-title-r {
    color: #888;
    font-size: 12px;
  }
}
</style>
