\<!-- src/App.vue -->
<template>
  <div id="app" class="max-w-[1110px] mx-auto">
    <!-- <div class="row" style="margin-top: 5%">
      <router-link class="button button-primary" 
       style="margin-right: 10px;" to="/book">Books
      </router-link> 
      <router-link class="button button-primary" 
       style="margin-right: 10px;" to="/author">Authors
      </router-link>
      <router-link class="button button-primary" 
       to="/publisher">Publishers
      </router-link>
    </div> -->
    <header
      class="fixed inset-x-0 top-0 z-30 mx-auto w-fit max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div class="px-4">
        <div class="flex items-center justify-between">
          <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
            <router-link aria-current="page"
              class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              to="/movies">Movies</router-link>
            <router-link
              class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              to="/albums">Albums</router-link>
            <router-link
              class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              to="/composers">Composers</router-link>
          </div>
        </div>
      </div>
    </header>
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
}
</script>