<!-- src/authorIndex.vue -->
<template>
  <div class="flex flex-col items-center justify-center mt-32">
    <h1 class="text-4xl text-center capitalize font-bold mt-10">Películas</h1>
    <div class="grid grid-cols-3 mt-20 w-full mx-auto gap-10">
      <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="movie in movies" :key="movie.id">
        <RouterLink v-if="movie && movie.id" :to="'/movies/show/' + movie.id">
          <div v-if="movie.imagen" :style="{ backgroundImage: `url(${movie.imagen})` }"
            class="max-w-sm h-[400px] mx-auto mt-10 bg-center bg-cover bg-no-repeat"></div>
          <div class="px-6 py-4">
            <div v-if="movie.nombre" class="font-bold text-xl mb-2">{{ movie.nombre }}</div>
            <p v-if="movie.anio_lanzamiento || movie.director" class="text-gray-700 text-base">
              <span v-if="movie.anio_lanzamiento">{{ movie.anio_lanzamiento }}</span>
              <span> - </span>
              <span v-if="movie.director">{{ movie.director }}</span>
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
    <RouterLink to="/movies/create" class="mt-20 p-4 bg-green-700 text-slate-100 rounded-md mb-20">Crear un nuevo
      registro</RouterLink>
  </div>
</template>
<script>

export default {
  data() {
    return {
      movies: [],
      title: 'Movies List'
    }
  },
  methods: {
    async allMovies() {
      const response = await fetch('/.netlify/functions/findAllMovies');
      const data = await response.json();
      console.log(data);
      this.movies = data;
    },
  },
  mounted() {
    this.allMovies()
  }
}
</script>