<template>
  <div class="choiceness">
    <loading v-if="newMvList.length === 0" />
    <div class="mv-recommend" v-else>
      <div class="rcmd">
        <module-title icon="icon-shexiangji" title="网易出品" />
        <mv-list :mvList="exclusiveList" />
      </div>
      <div class="new-mv">
        <module-title
          icon="icon-new"
          title="最新MV"
          :tags="tags"
          @tag="getArea"
        />
        <mv-list :mvList="newMvList" />
      </div>
    </div>
  </div>
</template>

<script>
import ModuleTitle from '@/components/module-title/module-title';
import MvList from '@/components/mv-list/mv-list';
export default {
  name: 'choiceness',
  components: {
    ModuleTitle,
    MvList
  },
  data() {
    return {
      exclusiveList: [],
      newMvList: [],
      tags: ['内地', '港台', '欧美', '日本', '韩国']
    };
  },
  created() {
    this._pageInit();
  },
  methods: {
    _pageInit() {
      this.getExclusive();
      this.getNewMv(this.tags[0]);
    },
    getMvDetail(id) {
      this.$router.push({ path: '/mvDetail', query: { id } });
    },
    getExclusive: async function() {
      let res = await this.$api.exclusive(0, 3);
      const {
        data: { data }
      } = res;
      this.exclusiveList = data;
    },
    getArea(area) {
      this.getNewMv(area);
    },
    getNewMv: async function(area) {
      area = area || '';
      let res = await this.$api.firstMv(area, 9);
      const {
        data: { data }
      } = res;
      this.newMvList = data;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.mv-list {
  max-width: 900px;
  margin: 20px auto;
  padding-right: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .private-item {
    width: 32%;
    img {
      width: 100%;
    }
  }
  .private-item-img {
    position: relative;
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
  .private-item-name {
    margin-top: 5px;
    .ellipsis;
  }
}
</style>
