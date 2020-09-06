import Vue from 'vue';
import {
  message,
  Layout,
  Menu,
  Icon,
  Tabs,
  Divider,
  Avatar,
  Form,
  Input,
  Drawer,
  Button,
  Modal,
  Slider,
  Pagination,
  Spin
} from 'ant-design-vue';
Vue.component(Layout.name, Layout);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Slider.name, Slider);
Vue.component(Pagination.name, Pagination);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Icon.name, Icon);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Tabs.name, Tabs);
Vue.component(Drawer.name, Drawer);
Vue.component(Divider.name, Divider);
Vue.component(Avatar.name, Avatar);
Vue.component(Form.name, Form);
Vue.component(Spin.name, Spin);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Input.name, Input);
Vue.component(Input.Password.name, Input.Password);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component(Input.Search.name, Input.Search);
Vue.component(Button.name, Button);
Vue.component(Modal.name, Modal);
Vue.prototype.$message = message;
