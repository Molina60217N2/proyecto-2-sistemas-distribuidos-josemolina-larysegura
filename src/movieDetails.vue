<template>
  <div>
    <!-- <h1>movie detail</h1> -->
    <div class="flex flex-row content-start justify-start mt-32">
      <div v-if="movie && movie.imagen"
           :style="{ backgroundImage: `url(${movie.imagen})`, height: '400px', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }"
           class="max-w-sm bg-center bg-cover bg-no-repeat">
      </div>
      <div class="flex flex-col mx-auto my-auto">
        <h1 v-if="movie && movie.nombre" class="text-2xl font-bold text-center">{{ movie.nombre }}</h1>
        <div class="ml-10 mt-4 text-lg flex flex-col gap-5">
          <p v-if="movie && movie.actor_principal" class="font-semibold">Actor principal:
            <span class="text-blue-700">{{ movie.actor_principal }}</span>
          </p>
          <p v-if="movie && movie.anio_lanzamiento" class="font-semibold">Año de estreno:
            <span class="text-blue-700">{{ movie.anio_lanzamiento }}</span>
          </p>
          <p v-if="movie && movie.director" class="font-semibold">Director:
            <span class="text-blue-700">{{ movie.director }}</span>
          </p>
          <p v-if="movie && movie.genero" class="font-semibold">Género:
            <span class="text-blue-700">{{ movie.genero }}</span>
          </p>
          <p v-if="movie && movie.sinopsis" class="font-semibold">Sinopsis:
            <span class="font-normal">{{ movie.sinopsis }}</span>
          </p>
          <p v-if="movie && movie.album && movie.album.slug && movie.album.nombre" class="font-semibold">Álbum musical:
            <span class="text-purple-700">
              <RouterLink :to="'/albums/show/' + movie.album.id">{{ movie.album.nombre }}</RouterLink>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 mx-auto mt-10">
      <RouterLink :to="'/movies/edit/' + movie.id" class="p-4 bg-blue-700 flex items-center justify-center w-1/4 mx-auto rounded-md text-white mt-10">Editar este Registro</RouterLink>
      <button @click="deleteMovie" class="p-4 bg-red-700 flex items-center justify-center w-1/4 mx-auto rounded-md text-white mt-10">Eliminar este Registro</button>
    </div>
  </div>
</template>

<script>

import { useRoute } from 'vue-router'

export default {
  props: ['create', 'edit', 'show'],
  data: function () {
    return {
      title: "Book Data",
      // book: { 'title': '', 'edition': '', 'copyright': '', 'language': '', 'pages': '', 'author': "", 'publisher': '' },a
      movie: {}
    }
  },
  created() {
    const route = useRoute();
    this.findMovie(route.params.id);
  },
  methods: {
    findMovie: function (id) {
      fetch('/.netlify/functions/findMovie/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.movie = result[0];
        })
    },
    deleteMovie: function () {
    if (window.confirm('Seguro que desea eliminar esta película?')) {
      fetch('/.netlify/functions/deleteMovie/' + this.movie.id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE'
        })
        .then((response) => response)
        .then((result) => {
          console.log(result);
          this.$router.push({ path: '/movies' });
        })
    }
  }
  },

}
</script>