<template>
  <div class="find-singer">
    <loading v-if="artists.length === 0" />
    <div v-else>
      <div class="singer-type">
        <div class="type language">
          <div class="type-title">分类：</div>
          <div class="type-list">
            <span
              class="type-name"
              :class="clasSel === cat.cat ? 'selected' : ''"
              v-for="(cat, index) of classify"
              @click="clasSearch(cat.cat)"
              :key="index"
              >{{ cat.name }}<a-divider type="vertical"
            /></span>
          </div>
        </div>
      </div>
      <div class="singer-list">
        <div
          class="singer"
          @click="getSingerDetail(artist)"
          v-for="artist of artists"
          :key="artist.id"
        >
          <div class="singer-pic">
            <img v-lazy="artist.img1v1Url" alt="" />
          </div>
          <div class="singer-name">
            <p>{{ artist.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'findSinger',
  created() {
    this.getTopSinger();
  },
  data() {
    return {
      artists: [],
      clasSel: 0,
      classify: [
        { cat: 0, name: '全部' },
        { cat: 5001, name: '入驻歌手' },
        { cat: 1001, name: '华语男歌手' },
        { cat: 1002, name: '华语女歌手' },
        { cat: 1003, name: '华语组合' },
        { cat: 2001, name: '欧美男歌手' },
        { cat: 2002, name: '欧美女歌手' },
        { cat: 2003, name: '欧美组合' },
        { cat: 6001, name: '日本男歌手' },
        { cat: 6002, name: '日本女歌手' },
        { cat: 6003, name: '日本组合' },
        { cat: 7001, name: '韩国男歌手' },
        { cat: 7002, name: '韩国女歌手' },
        { cat: 7003, name: '韩国组合' },
        { cat: 4001, name: '其他男歌手' },
        { cat: 4002, name: '其他女歌手' },
        { cat: 4003, name: '其他组合' }
      ],
      offset: 0
    };
  },
  computed: {
    ...mapGetters(['getMore'])
  },
  watch: {
    getMore(val) {
      if (val && this.clasSel === 0) {
        this.offset += 1;
        this.getTopSinger();
      } else if (val && this.clasSel !== 0) {
        this.offset += 1;
        const { clasSel } = this;
        this.getArtistList(clasSel);
      } else {
        return;
      }
    }
  },
  methods: {
    getTopSinger: async function(limit = 30) {
      let { offset } = this;
      offset = offset * limit;
      let res = await this.$api.topArtist(offset, limit);
      const {
        data: { artists, more }
      } = res;
      if (!more) {
        this.setMore(false);
      }
      this.artists = [...this.artists, ...artists];
    },
    getSingerDetail(singer) {
      this.setCurSinger(singer);
      this.$router.push('/singerDetail');
    },
    getArtistList: async function(cat, limit = 30) {
      let { offset } = this;
      offset = offset * limit;
      if (cat === 0) {
        this.getTopSinger();
        return;
      }
      let res = await this.$api.artistList(cat, limit, offset);
      const {
        data: { artists }
      } = res;
      this.artists = [...this.artists, ...artists];
    },
    clasSearch(clasSel) {
      this.clasSel = clasSel;
      this.getArtistList(clasSel);
      this.offset = 0;
      this.artists.splice(0);
    },
    ...mapActions(['setCurSinger', 'setMore'])
  }
};
</script>

<style lang="less" scoped>
@import '~@/assets/less/index';
.find-singer {
  .type {
    padding: 0 20px;
    display: flex;
    font-size: 13px;
    margin-top: 20px;
    .type-title {
      width: 100px;
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
        color: red;
      }
    }
  }
  .singer-list {
    .grid(10px, 150px);
  }
  .singer {
    margin-top: 20px;
    width: 150px;
    .singer-pic {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .singer-name {
      margin-top: 5px;
    }
  }
}
</style>
