<template>
  <div class="rank">
    <div class="rank-t">
      <div class="area">
        <span
          v-for="area of areas"
          :class="selArea === area ? 'selected' : ''"
          :key="area"
          @click="changArea(area)"
          >{{ area }}</span
        >
      </div>
      <div class="update-time">{{ updateTime | formatDate }}</div>
    </div>
    <loading v-if="mvList.length === 0" />
    <div class="rank-list" v-else>
      <div
        class="mv"
        @click="getMvDetail(mv.id)"
        v-for="(mv, index) of mvList"
        :key="mv.id"
      >
        <div class="rank">{{ (index + 1) | _pad }}</div>
        <div class="mv-pic"><img v-lazy="mv.cover" alt="" /></div>
        <div class="mv-info">
          <p class="mv-name">{{ mv.name }}</p>
          <p class="mv-artist">{{ mv.artistName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Rank',
  data() {
    return {
      areas: ['内地', '港台', '欧美', '日本', '韩国'],
      selArea: '内地',
      mvList: [],
      offset: 0,
      updateTime: 0
    };
  },
  computed: {
    ...mapGetters(['getMore'])
  },
  watch: {
    getMore(val) {
      if (val) {
        this.offset += 1;
        this.getRank();
      }
    }
  },
  created() {
    this.getRank();
  },
  methods: {
    changArea(area) {
      this.selArea = area;
      this.offset = 0;
      this.mvList.splice(0);
      this.getRank();
    },
    getMvDetail(id) {
      this.$router.push({ path: '/mvDetail', query: { id } });
    },
    getRank: async function(limit = 30) {
      let { offset, selArea: area } = this;
      offset = limit * offset;
      let res = await this.$api.topMv(area, offset);
      const {
        data: { data, updateTime }
      } = res;
      this.updateTime = updateTime;
      this.mvList = [...this.mvList, ...data];
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.rank {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  .rank-t {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .area {
      text-align: center;
      span {
        font-size: 12px;
        color: #888;
        cursor: pointer;
        margin-right: 20px;
      }
      .selected {
        color: #000;
      }
    }
    .update-time {
      font-size: 13px;
      color: #888;
    }
  }
  .rank-list {
    display: flex;
    flex-wrap: wrap;
    .mv {
      width: 50%;
      display: flex;
      margin: 20px 0;
      justify-content: center;
      :hover {
        opacity: 0.8;
      }
      .rank {
        width: 10%;
        font-size: 16px;
        // max-width: 30px;
        line-height: 130px;
        color: #888;
      }
      .mv-pic {
        width: 50%;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .mv-info {
        width: 40%;
        margin-left: 20px;
        .mv-name {
          .ellipsis;
        }
        .mv-artist {
          font-size: 13px;
          color: #888;
        }
      }
    }
  }
}
</style>
