<template>
    <div>
      <div class="flex flex-row content-start justify-start mt-32">
        <div v-if="album && album.imagen"
             :style="{ backgroundImage: `url(${album.imagen})`, height: '400px', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }"
             class="max-w-sm bg-center bg-cover bg-no-repeat">
        </div>
        <div class="flex flex-col mx-auto my-auto">
          <h1 v-if="album && album.nombre" class="text-2xl font-bold text-center">{{ album.nombre }}</h1>
          <div class="ml-10 mt-4 text-lg flex flex-col gap-5">
            <p v-if="album && album.compositor && album.compositor.nombre" class="font-semibold">Compositor:
              <span class="text-purple-700">
                <RouterLink v-if="album.compositor.slug" :to="'/composers/' + album.compositor.id">
                  {{ album.compositor.nombre }}
                </RouterLink>
              </span>
            </p>
            <p v-if="album && album.anio_lanzamiento" class="font-semibold">Año de lanzamiento:
              <span class="text-blue-700">{{ album.anio_lanzamiento }}</span>
            </p>
            <p v-if="album && album.genero" class="font-semibold">Género:
              <span class="text-blue-700">{{ album.genero }}</span>
            </p>
            <p v-if="album && album.pelicula && album.pelicula.nombre" class="font-semibold">Película:
              <span class="text-purple-700">
                <RouterLink v-if="album.pelicula" :to="'/movies/show/' + album.pelicula.id">
                  {{ album.pelicula.nombre }}
                </RouterLink>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 mx-auto mt-10">
        <RouterLink :to="'/albums/edit/' + album.id" class="p-4 bg-blue-700 flex items-center justify-center w-1/4 mx-auto rounded-md text-white mt-10">Editar este Registro</RouterLink>
        <button @click="deleteAlbum" class="p-4 bg-red-700 flex items-center justify-center w-1/4 mx-auto rounded-md text-white mt-10">Eliminar este Registro</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        album: []
      };
    },
  
    methods: {
      async getAlbum() {
        const albumId = this.$route.params.id;
        const response = await fetch(`/.netlify/functions/findAlbum/${albumId}`);
        const data = await response.json();
        this.album = data[0];
      },
      async deleteAlbum() {
        const albumId = this.$route.params.id;
        if (confirm('¿Estás seguro de que quieres eliminar este álbum?')) {
          const response = await fetch(`/.netlify/functions/deleteAlbum/${albumId}`, {
            method: 'DELETE'
          });
          const result = await response.text();
          console.log(result);
          this.$router.push('/albums'); // Redirige a la lista de álbumes después de eliminar
        }
      }
    },
  
    mounted() {
      this.getAlbum(); // Cargar los datos del álbum al montar el componente
    }
  };
  </script>
  