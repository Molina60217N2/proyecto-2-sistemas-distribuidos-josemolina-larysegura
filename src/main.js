// src/main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

// import './css/normalize.css';
// import './css/skeleton.css';
import "./css/index.css";

import movieIndex from "./movieIndex.vue";
import movieDetails from "./movieDetails.vue";
import movieCreate from "./movieCreate.vue";
import movieEdit from "./movieEdit.vue";
import albumIndex from "./albumIndex.vue";
import albumDetails from "./albumDetails.vue";
import albumEdit from "./albumEdit.vue";
import albumCreate from "./albumCreate.vue";

const routes = [
  { path: "/", component: movieIndex, props: true },
  {
    path: "/movies",
    component: movieIndex,
    props: true,
  },
  { path: "/movies/show/:id", component: movieDetails, props: { show: true } },
  {
    path: "/movies/create",
    component: movieCreate,
  },
  {
    path: "/movies/edit/:id",
    component: movieEdit,
  },
  {
    path: "/albums",
    component: albumIndex,
  },
  {
    path: "/albums/show/:id",
    component: albumDetails,
  },
  {
    path: "/albums/edit/:id",
    component: albumEdit,
  },
  {
    path: "/albums/create",
    component: albumCreate,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

let app = createApp(App);

app.use(router);

app.mount("#app");
