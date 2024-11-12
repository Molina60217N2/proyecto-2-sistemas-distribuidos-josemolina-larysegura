<template>
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-4xl font-bold mb-10">Editar Película</h1>
      <div class="w-full max-w-lg">
        <form @submit.prevent="updateMovie">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre:</label>
            <input v-model="movie.nombre" id="nombre" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="anio_lanzamiento">Año de Lanzamiento:</label>
            <input v-model="movie.anio_lanzamiento" id="anio_lanzamiento" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="director">Director:</label>
            <input v-model="movie.director" id="director" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="genero">Género:</label>
            <input v-model="movie.genero" id="genero" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="album">Álbum:</label>
            <select v-model="selectedAlbumId" id="album" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
              <option disabled value="">Seleccione un álbum</option>
              <option v-for="album in albums" :key="album.id" :value="album.id">
                {{ album.nombre }}
              </option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        movie: {
          nombre: '',
          anio_lanzamiento: '',
          director: '',
          genero: '',
          album: {}
        },
        albums: [],
        selectedAlbumId: ''
      };
    },
    methods: {
      async getMovie() {
        const movieId = this.$route.params.id;
        const response = await fetch(`/.netlify/functions/findMovie/${movieId}`);
        const data = await response.json();
        this.movie = data[0];
        // console.log(data[0].album)
        this.selectedAlbumId = data[0].album.id; // Asignar álbum actual seleccionado
      },
      async getAlbums() {
        const response = await fetch('/.netlify/functions/findAllAlbum');
        const data = await response.json();
        this.albums = data;
      },
      async updateMovie() {
        // Asignar el álbum seleccionado
        const selectedAlbum = this.albums.find(album => album.id === this.selectedAlbumId);
        if (selectedAlbum) {
          this.movie.album = {
            id: selectedAlbum.id,
            nombre: selectedAlbum.nombre,
            slug: selectedAlbum.slug
          };
        }
  
        // Enviar los datos actualizados de la película al backend
        const movieId = this.$route.params.id;
        const response = await fetch(`/.netlify/functions/updateMovie/${movieId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.movie)
        });
        const result = await response.text();
        console.log(result);
        this.$router.push('/movies'); // Redirigir después de actualizar
      }
    },
    mounted() {
      this.getMovie(); // Cargar datos de la película al montar el componente
      this.getAlbums(); // Cargar álbumes disponibles al montar el componente
    }
  };
  </script>
  