<template>
  <div class="type language">
    <div class="type-title">{{ type.name }}：</div>
    <div class="type-list">
      <span
        class="type-name"
        :class="selected === val ? 'selected' : ''"
        v-for="(val, index) of type.typeList"
        @click="handleType({ val, type: type.val })"
        :key="index"
        >{{ val }}<a-divider type="vertical"
      /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Type',
  props: {
    type: { type: Object }
  },
  created() {
    this.selected = this.type.typeList[0];
  },
  data() {
    return {
      selected: ''
    };
  },
  methods: {
    handleType(type) {
      this.selected = type.val;
      this.$emit('change', type);
    }
  }
};
</script>

<style lang="less" scoped>
.type {
  padding: 0 20px;
  display: flex;
  font-size: 13px;
  margin-top: 10px;
  .type-title {
    min-width: 50px;
  }
  .type-list {
    display: flex;
    flex-wrap: wrap;
    .type-name {
      margin-bottom: 10px;
      cursor: pointer;
      color: #888;
    }
    .selected {
      color: #df3b3b;
    }
  }
}
</style>
