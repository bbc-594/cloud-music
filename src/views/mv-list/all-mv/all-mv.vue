<template>
  <div class="all-mv">
    <div class="classify">
      <type :type="areas" @change="change" />
      <type :type="types" @change="change" />
      <type :type="orders" @change="change" />
    </div>
    <div class="mv-list">
      <mv-list :mvList="mvList" />
    </div>
  </div>
</template>

<script>
import Type from '../../../components/type-list/type-list';
import MvList from '../../../components/mv-list/mv-list';
import { mapGetters } from 'vuex';
export default {
  name: 'allMv',
  components: {
    Type,
    MvList
  },
  computed: {
    ...mapGetters(['getMore'])
  },
  watch: {
    getMore(val) {
      if (val) {
        this.offset += 1;
        this.getMv();
      }
    }
  },
  data() {
    return {
      mvList: [],
      areas: {
        name: '地区',
        val: 'area',
        typeList: ['全部', '内地', '港台', '欧美', '韩国', '日本']
      },
      types: {
        name: '类型',
        val: 'type',
        typeList: ['全部', '官方版', '原声', '现场版', '网易出品']
      },
      orders: {
        name: '排序',
        val: 'order',
        typeList: ['上升最快', '最热', '最新']
      },
      area: '',
      type: '',
      order: '',
      offset: 0,
      limit: 30
    };
  },
  created() {
    // const { area, order, type, offset, limit } = this;
    this.getMv();
  },
  methods: {
    getMv: async function() {
      let { area, order, type, offset, limit } = this;
      offset = offset * limit;
      let res = await this.$api.allMv(area, order, type, offset, limit);
      const {
        data: { data }
      } = res;
      this.mvList = [...this.mvList, ...data];
    },
    change({ val, type }) {
      if (type === '全部') {
        this[type] = '';
      }
      this.offset = 0;
      this.mvList.splice(0);
      this[type] = val;
      // const { area, order, type, offset, limit } = this;
      this.getMv();
    }
  }
};
</script>

<style lang="less" scoped>
.all-mv {
  width: 100%;
  max-width: 1000px;
  margin: 10px auto;
}
</style>
