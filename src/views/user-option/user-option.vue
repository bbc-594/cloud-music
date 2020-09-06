<template>
  <a-drawer
    :closable="false"
    title="账号"
    :visible="drawerShow"
    width="300"
    :drawerStyle="drawerStyle"
    :destroyOnClose="true"
    maskClosable
    @close="close"
  >
    <div class="user-option">
      <div class="user-option-info">
        <div class="user-avatar">
          <a-avatar icon="user" :src="avatarUrl"></a-avatar>
        </div>
        <div class="user-name">{{ userInfo.profile.nickname }}</div>
      </div>
      <div class="user-option-dynamic">
        <div class="dynamic">
          <p>{{ userInfo.profile.eventCount }}</p>
          <p>动态</p>
        </div>
        <a-divider type="vertical" />
        <div class="dynamic">
          <p>{{ userInfo.profile.follows }}</p>
          <p>关注</p>
        </div>
        <a-divider type="vertical" />
        <div class="dynamic">
          <p>{{ userInfo.profile.followeds }}</p>
          <p>粉丝</p>
        </div>
      </div>
      <div class="user-option-operate user-logout" @click="logout">
        <icon-svg iconHref="icon-guanji1" />
        <span>退出登录</span>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'userOption',
  computed: {
    avatarUrl() {
      if (!this.userInfo.token) {
        return;
      }
      return this.userInfo.profile.avatarUrl;
    },
    ...mapGetters(['userInfo'])
  },
  created() {},
  props: {
    visible: {
      type: Boolean
    }
  },
  watch: {
    visible(val) {
      this.drawerShow = val;
    }
  },
  data() {
    return {
      drawerShow: false,
      drawerStyle: {
        backgroundColor: '#fafafc'
      }
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
      this.userlogout();
    },
    close() {
      this.$emit('close');
    },
    ...mapActions(['userlogout'])
  }
};
</script>

<style lang="less" scoped>
.user-option-info {
  display: flex;
  align-items: center;
  .user-name {
    margin-left: 20px;
  }
}
.user-option-dynamic {
  display: flex;
  margin-top: 30px;
  justify-content: space-evenly;
  p {
    margin-bottom: 0;
    color: #000;
  }
  .dynamic {
    width: 32%;
    text-align: center;
  }
}
.user-option-operate {
  margin-top: 20px;
  cursor: pointer;
  text-align: center;
  svg {
    margin-right: 10px;
  }
  span {
    color: #000;
  }
  border-top: 1px solid #eaeaea;
  padding: 10px;
}
.ant-divider {
  height: 2.4rem;
  line-height: 2.4rem;
}
</style>
