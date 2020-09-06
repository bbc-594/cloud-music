<template>
  <div class="app-index">
    <a-layout id="components-layout-demo-responsive">
      <a-layout-sider
        breakpoint="lg"
        theme="light"
        collapsedWidth="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <div class="logo" />
        <a-menu theme="light" mode="inline" :defaultSelectedKeys="['4']">
          <a-menu-item key="1">
            <a-icon type="search" />
            <span class="nav-text">搜索</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera" />
            <span class="nav-text">发现音乐</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload" />
            <span class="nav-text">MV</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="team" />
            <span class="nav-text">朋友</span>
          </a-menu-item>
        </a-menu>
        <div class="user">
          <div class="user-avatar"></div>
          <div class="user-name"></div>
          <div class="user-message"></div>
          <div class="user-option"></div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{ background: '#fff', padding: 0 }" />
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="textAlign: center"
          >Ant Design ©2018 Created by Ant UED</a-layout-footer
        >
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  methods: {
    onCollapse(collapsed, type) {
    },
    onBreakpoint(broken) {
    }
  }
};
</script>

<style lang="less" scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  // background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-layout {
  background-color: #fff;
  .ant-menu {
    border: none;
    .ant-menu-item {
      text-align: left;
    }
  }
  .ant-layout-sider {
    border-right: 1px solid #eaeaea;
  }
}
</style>
