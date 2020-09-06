<template>
  <div class="recommendation">
    <div class="banner">
      <banner v-if="bannerList.length > 0" :bannerList="bannerList"></banner>
    </div>
    <div class="personalized">
      <div class="personal-item" @click="getFm">
        <div class="personal-item-icon">
          <icon-svg iconHref="icon-luyinji" />
        </div>
        <div class=" personal-item-info">
          <p class="personal-item-name">私人FM</p>
          <p class="personal-item-des">享受你的音乐专属推荐</p>
        </div>
      </div>
      <a-divider type="vertical" />
      <div class="personal-item" @click="getRecommend('/recommend-songs')">
        <div class="personal-item-icon">
          <p class="today">{{ today | _pad }}</p>
        </div>
        <div class="personal-item-info">
          <p class="personal-item-name">每日歌曲推荐</p>
          <p class="personal-item-des">根据你的口味生成</p>
        </div>
      </div>
      <a-divider type="vertical" />
      <div class="personal-item">
        <div class="personal-item-icon">
          <icon-svg iconHref="icon-paihangbang" />
        </div>
        <div class="personal-item-info">
          <p class="personal-item-name">排行榜</p>
          <p class="personal-item-des">最热音乐排行榜</p>
        </div>
      </div>
    </div>
    <div class="recommend-song-list">
      <module-title icon="icon-zuixingedan" title="推荐歌单" />
      <div class="song-list">
        <div
          class="song-menu"
          v-for="list of menuList"
          :key="list.id"
          @click="getListView(list)"
        >
          <div class="menu-img">
            <img :src="list.picUrl" alt />
            <div class="play-count">{{ list.playCount | numberFormat }}</div>
          </div>
          <div class="menu-name">
            <p>{{ list.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="private-content">
      <module-title icon="icon-yinle2" title="独家放送" />
      <div class="private-content-list">
        <div
          class="private-item"
          @click="getMvDetail(item.id)"
          v-for="item of privateList"
          :key="item.id"
        >
          <div class="private-item-img">
            <img :src="item.sPicUrl" alt="" />
            <div class="radio-tag">
              <icon-svg iconHref="icon-shipin1" />
            </div>
          </div>
          <div class="private-item-name">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner/banner';
import { createSong } from '@/utils/song';
import ModuleTitle from '@/components/module-title/module-title';
import { mapActions } from 'vuex';
export default {
  name: 'Recommendation',
  components: {
    Banner,
    ModuleTitle
  },
  data() {
    return {
      bannerList: [],
      menuList: [],
      songList: [],
      privateList: []
    };
  },
  created() {
    this.__pageInit();
  },
  computed: {
    today() {
      return new Date().getDate();
    }
  },
  methods: {
    __pageInit() {
      this.getBanner();
      this.getRecList();
      this.getPrivate();
    },
    getRecommend(path) {
      this.$router.push(path);
    },
    getBanner: async function() {
      let res = await this.$api.banner(0);
      const { status, data } = res;
      if (status === 200) {
        this.bannerList = data.banners;
      }
    },
    getRecList: async function() {
      let res = await this.$api.personalList(10);
      const {
        data: { code, result }
      } = res;
      if (code === 200) {
        this.menuList = result;
      }
    },
    getFm: async function() {
      let res = await this.$api.personal_FM();
      const {
        data: { data }
      } = res;
      this.songList = data;
      this.setFmMode(true);
      this.setPlayer(true);
      this.play({ song: data[0], index: 1 });
      // this.setSeqList(data);
      // this.setCurSong(data[0]);
    },
    play({ song, index }) {
      const { id } = song;
      this.setSeqList(this.songList);
      this.$api.songCheck(id).then(async res => {
        let {
          data: { success }
        } = res;
        if (success) {
          let res = await this.$api.songUrl(id);
          let {
            data: { data }
          } = res;
          const { url, code } = data[0];
          if (code === -110) {
            this.$message.error('暂无版权!');
          } else {
            this.setCurSong(createSong({ url, ...song }));
            this.setCurIndex(index - 1);
          }
        } else {
          this.$message.error('暂无版权!');
        }
      });
    },
    getListView(list) {
      this.setCurList(list);
      this.$router.push('/like-song-list');
    },
    getPrivate: async function() {
      let res = await this.$api.privatecontent();
      let {
        data: { code, result }
      } = res;
      if (code === 200) {
        this.privateList = result;
      }
    },
    callback(key) {},
    getMvDetail(id) {
      this.$router.push({ path: '/mvDetail', query: { id } });
    },
    ...mapActions([
      'setCurList',
      'setSeqList',
      'setCurSong',
      'setCurIndex',
      'setFmMode',
      'setPlayer'
    ])
  }
};
</script>

<style lang="less" scoped>
.recommendation {
  max-width: 1200px;
  cursor: default;
  margin: 0 auto;
}
.personalized {
  display: flex;
  margin-top: 25px;
  justify-content: space-evenly;
  align-items: center;
  .personal-item {
    width: 30%;
    display: flex;
    cursor: pointer;
    justify-content: center;
    .personal-item-icon {
      width: 3.5rem;
      height: 3.5rem;
      text-align: center;
      line-height: 4.5rem;
      border-radius: 50%;
      border: 1px solid rgb(211, 70, 70);
      svg {
        width: 2rem;
        height: 2rem;
      }
      .today {
        color: #df3b3b;
        line-height: 3.4rem;
        font-size: 22px;
      }
    }
    .personal-item-info {
      margin-left: 15px;
      .personal-item-des {
        color: #999;
      }
    }
  }
  .personal-item:active {
    transform: scale(0.96);
  }
}
.ant-divider,
.ant-divider-vertical {
  height: 3rem;
}
.recommend-song-list {
  margin: 20px 0;
  .recommend-title {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
  .song-list {
    // display: flex;
    margin-top: 10px;
    // justify-content: space-between;
    // flex-wrap: wrap;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(10vw, 1fr));
    .song-menu {
      width: 180px;
      cursor: default;
      .menu-img {
        position: relative;
        .play-count {
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 10px 0 0 10px;
          background-color: rgba(0, 0, 0, 0.2);
          opacity: 0.8;
          color: #fff;
          font-size: 12px;
          padding: 0 5px;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .menu-name {
        width: 100%;
        height: 20px;
        display: block;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        // white-space: nowrap;
      }
    }
  }
}
.private-content {
  .private-content-list {
    margin-top: 30px;
    display: flex;
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
    }
  }
}
</style>
