import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/find-music/recommend',
  },
  {
    path: '/find-music',
    name: 'FindMusic',
    component: () => import('../views/find-music/find-music.vue'),
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: () =>
          import('../views/find-music/recommendation/recommendation.vue'),
      },
      {
        path: 'new-music',
        name: '/newMusic',
        component: () =>
          import('../views/find-music/recommendation/new-music/new-music.vue'),
      },
      {
        path: 'singer',
        name: 'Singer',
        component: () =>
          import(
            '../views/find-music/recommendation/singer-list/singer-list.vue'
          ),
      },
      {
        path: 'play-list',
        name: 'PlayList',
        component: () =>
          import(
            '../views/find-music/recommendation/top-play-list/top-play-list.vue'
          ),
      },
    ],
  },
  {
    path: '/recommend-songs',
    name: 'RecommendSong',
    component: () =>
      import(
        '../views/find-music/recommendation/recommend-songs/recommend-songs.vue'
      ),
  },
  {
    path: '/like-song-list',
    name: 'LikeSongList',
    component: () => import('../views/like-song-list/like-song-list.vue'),
  },
  {
    path: '/album-list',
    name: 'AlbumList',
    component: () => import('../views/ablum-list/album-list.vue'),
  },
  {
    path: '/singerDetail',
    name: 'SingerDetail',
    component: () => import('../views/singer-detail/singer-detail.vue'),
  },
  {
    path: '/mvDetail',
    name: 'MvDetail',
    component: () => import('../views/mv-detail/mv-detail.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/search.vue'),
  },
  {
    path: '/mv-list',
    name: 'MvList',
    children: [
      {
        path: 'choiceness',
        name: 'Choiceness',
        component: () => import('../views/mv-list/choiceness/choicceness.vue'),
      },
      {
        path: 'rank',
        name: 'Rank',
        component: () => import('../views/mv-list/rank/rank.vue'),
      },
      {
        path: 'all-mv',
        component: () => import('../views/mv-list/all-mv/all-mv.vue'),
      },
    ],
    component: () => import('../views/mv-list/mv-list.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
