<template>
    <div class="flex flex-col items-center mt-32">
      <h1 class="text-4xl text-center capitalize font-bold mt-10">Álbumes</h1>
      <div class="grid grid-cols-3 mt-20 w-full mx-auto gap-10">
        <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="album in albums" :key="album.id">
          <RouterLink v-if="album && album.id" :to="'/albums/show/' + album.id">
            <div v-if="album.imagen" :style="{ backgroundImage: `url(${album.imagen})` }"
                 class="max-w-sm h-[400px] mx-auto mt-10 bg-center bg-cover bg-no-repeat"></div>
            <div class="px-6 py-4">
              <div v-if="album.nombre" class="font-bold text-xl mb-2">{{ album.nombre }}</div>
              <p v-if="album.anio_lanzamiento || album.genero" class="text-gray-700 text-base">
                <span v-if="album.anio_lanzamiento">{{ album.anio_lanzamiento }}</span> 
                <span v-if="album.genero"> - {{ album.genero }}</span>
              </p>
              <p v-if="album.compositor && album.compositor.nombre" class="text-gray-700 text-base">
                <span>Compositor: {{ album.compositor.nombre }}</span>
              </p>
              <p v-if="album.pelicula && album.pelicula.nombre" class="text-gray-700 text-base">
                <span>Película: {{ album.pelicula.nombre }}</span>
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
      <RouterLink to="/albums/create" class="mt-20 p-4 bg-green-700 text-slate-100 rounded-md mb-20">Crear un nuevo registro</RouterLink>

    </div>
  </template>

<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            albums: [],
            title: 'Lista de Álbumes'
        }
    },

    methods: {
        async getalbums() {
            const response = await fetch('/.netlify/functions/findAllAlbum');
            const data = await response.json();
            console.log(data);
            this.albums = data;
        }
    },

    mounted(){
        this.getalbums();
    }
}
</script>