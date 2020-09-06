<template>
  <div id="app">
    <a-layout id="components-layout-demo-responsive">
      <a-layout-sider
        breakpoint="lg"
        theme="light"
        collapsedWidth="60"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <div class="slide-main">
          <div class="logo" />
          <a-menu
            theme="light"
            mode="inline"
            @click="setMenu"
            v-model="menuSelect"
          >
            <a-menu-item key="1">
              <router-link to="/search">
                <span class="icon">
                  <icon-svg iconHref="icon-sousuo" />
                </span>
                <span class="nav-text">搜索</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/find-music/recommend">
                <span class="icon">
                  <icon-svg iconHref="icon-yinle4" />
                </span>
                <span class="nav-text">发现音乐</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/mv-list/choiceness">
                <span class="icon">
                  <icon-svg iconHref="icon-bofang7" />
                </span>
                <span class="nav-text">MV</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <span class="icon">
                <icon-svg iconHref="icon-pengyou" />
              </span>
              <span class="nav-text">朋友</span>
            </a-menu-item>
          </a-menu>
          <div class="user-play-list">
            <div class="list-title" v-show="hide && userInfo.token">
              创建的歌单
            </div>
            <a-menu
              theme="light"
              mode="inline"
              @click="setMenu"
              v-model="menuSelect"
            >
              <a-menu-item
                v-for="(list, index) of createdList"
                :key="list.id"
                @click="getListView(list)"
              >
                <span class="icon">
                  <icon-svg v-if="index === 0" iconHref="icon-aixin1" />
                  <icon-svg v-else iconHref="icon-yinleliebiao" />
                </span>
                <span class="listName">{{ list.name }}</span>
              </a-menu-item>
            </a-menu>
            <div class="list-title" v-show="hide && userInfo.token">
              收藏的歌单
            </div>
            <a-menu
              theme="light"
              mode="inline"
              @click="setMenu"
              v-model="menuSelect"
            >
              <a-menu-item
                v-for="list of subList"
                :key="list.id"
                @click="getListView(list)"
              >
                <span class="icon">
                  <icon-svg iconHref="icon-yinleliebiao" />
                </span>
                <span class="listName">{{ list.name }}</span>
              </a-menu-item>
            </a-menu>
          </div>
        </div>
        <div class="user">
          <div class="user-avatar" @click="toLogin">
            <a-avatar icon="user" :src="userAvatar" />
          </div>
          <div class="user-name" @click="toLogin" v-show="hide">
            {{ nickName }}
          </div>
          <div class="user-message">
            <icon-svg iconHref="icon-letter" />
          </div>
          <div class="user-option">
            <icon-svg iconHref="icon-shezhi2" />
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content
          ref="content"
          :style="{ margin: '24px 0', paddingLeft: '16px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <mini-player />
    </a-layout>
    <a-modal
      :footer="null"
      width="400px"
      :destroyOnClose="true"
      v-model="modalshow"
    >
      <login-form @logining="modalshow = false" />
    </a-modal>
    <user-option
      @logout="logout"
      @close="close"
      :visible="visible"
      v-if="userInfo.token"
    />
  </div>
</template>

<script>
import LoginForm from '@/views/user-login/user-login';
import MiniPlayer from '@/views/mini-player/mini-player';
import UserOption from '@/views/user-option/user-option';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  created() {
    this._pageInit();
  },
  mounted() {
    let content = document.querySelector('.ant-layout-content');
    content.addEventListener('scroll', () => {
      this._windowScroll(content);
    });
  },
  computed: {
    userAvatar() {
      if (!this.userInfo.token) {
        return;
      }
      return this.userInfo.profile.avatarUrl;
    },
    nickName() {
      if (!this.userInfo.token) {
        return '登录';
      }
      return this.userInfo.profile.nickname;
    },
    ...mapGetters(['userInfo', 'getMore'])
  },
  data() {
    return {
      modalshow: false,
      visible: false,
      hide: false,
      menuSelect: ['2'],
      timer: null,
      // 创建歌单
      createdList: [],
      subList: []
    };
  },
  components: {
    LoginForm,
    MiniPlayer,
    UserOption
  },
  watch: {
    userInfo() {
      this._pageInit();
    },
    $route() {
      this.setMore(false);
    }
  },
  methods: {
    _pageInit() {
      // this.$router.push('/find-music/recommend');
      if (!this.userInfo.token) {
        this.$message.info('可以使用网易云账号登录噢');
      }
      this.getPlayList();
      const key = localStorage.getItem('menu-key');
      if (key) {
        this.menuSelect[0] = key.toString();
      }
    },
    onCollapse(collapsed, type) {},
    onBreakpoint(broken) {
      this.hide = !broken;
    },
    _windowScroll(content) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let scrollTop = content.scrollTop;
        let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = content.scrollHeight;
        if (scrollTop > scrollHeight - windowHeight) {
          if (this.getMore) {
            return;
          }
          // this.getMore = true;
          this.setMore(true);
        } else {
          this.setMore(false);
        }
      }, 200);
    },
    setMenu(e) {
      // console.log('val :', val);
      const { key } = e;
      localStorage.setItem('menu-key', key);
    },
    toLogin() {
      if (this.userInfo.token) {
        this.visible = true;
        return;
      }
      this.modalshow = true;
    },
    logout() {
      this.visible = false;
      this.subList.splice(0);
      this.createdList.splice(0);
    },
    close() {
      this.visible = false;
    },
    getPlayList: async function() {
      if (!this.userInfo.token) {
        return;
      }
      const { userId } = this.userInfo.profile;
      let res = await this.$api.playList(userId);
      const {
        data: { playlist }
      } = res;
      playlist.forEach(list => {
        list.subscribed ? this.subList.push(list) : this.createdList.push(list);
      });
    },
    getListView(list) {
      this.setCurList(list);
      this.$router.push('/like-song-list');
    },
    destroyed() {
      clearTimeout(this.timer);
    },
    ...mapActions(['setCurList', 'setMore'])
  }
};
</script>

<style lang="less">
@import '~@/assets/less/index';
.ant-layout {
  background: #fff !important;
  // margin-bottom: 60px;
  height: 100vh;
  .ant-menu {
    border: none;
    .ant-menu-item {
      text-align: left;
      padding-left: 10px !important;
      a {
        text-decoration: none;
      }
      span {
        margin-left: 10px;
        font-size: 13px;
      }
    }
  }
  .ant-tabs {
    .ant-tabs-bar {
      margin: 0 !important;
    }
  }
  .ant-layout-sider {
    border-right: 1px solid #eaeaea;
    overflow: hidden;
    position: relative;
    margin-bottom: 60px;
    .ant-layout-sider-children {
      height: 100%;
      // margin-bottom: 60px;
    }
    .slide-main {
      height: 80vh;
      overflow: hidden auto;
    }
  }
  .ant-layout-header {
    background-color: #fff;
  }
  .ant-layout-content {
    overflow-y: auto;
    padding-bottom: 60px;
  }
  .user-play-list {
    margin-top: 50px;
    .list-title {
      color: #999;
      padding-left: 20px;
      margin-top: 20px;
      margin-bottom: 5px;
      font-size: 12px;
    }
  }
}
::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #ccc;
}
.user {
  position: absolute;
  display: flex;
  background-color: #f3f3f5;
  border-top: 1px solid #eaeaea;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  padding: 20px;
  .user-name {
    cursor: default;
    font-size: 12px;
  }
  .user-message,
  .user-option {
    display: flex;
    align-items: center;
    svg {
      width: 16px;
      height: 16px;
    }
  }
}
@media (max-width: 992px) {
  .ant-menu-item {
    .icon {
      margin-right: 10px;
    }
  }
  .user {
    // background-color: yellow;
    flex-direction: column;
    bottom: 0px;
    .user-message,
    .user-option {
      margin-top: 15px;
    }
  }
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
small {
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
