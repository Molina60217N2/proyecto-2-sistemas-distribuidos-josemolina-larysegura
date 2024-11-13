<template>
    <div class="flex flex-col items-center mt-32">
      <h1 class="text-4xl font-bold mb-10">Editar Compositor</h1>
      <div class="w-full max-w-lg">
        <form @submit.prevent="updateComposer">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre del Compositor:</label>
            <input v-model="compositor.nombre" id="nombre" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="anio_nacimiento">Año de Nacimiento:</label>
            <input v-model="compositor.anio_nacimiento" id="anio_nacimiento" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="fecha_nacimiento">Fecha de Nacimiento:</label>
            <input v-model="compositor.fecha_nacimiento" id="fecha_nacimiento" type="text" placeholder="March 26, 1950" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="lugar_origen">Lugar de Origen:</label>
            <input v-model="compositor.lugar_origen" id="lugar_origen" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="pelicula">Película:</label>
            <select v-model="selectedPeliculaId" id="pelicula" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
              <option disabled value="">Seleccione una película</option>
              <option v-for="pelicula in peliculas" :key="pelicula.id" :value="pelicula.id">
                {{ pelicula.nombre }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="imagen">Imagen del Compositor:</label>
            <p>Se utilizará el placeholder predeterminado o la imagen actual.</p>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        compositor: {
          nombre: '',
          anio_nacimiento: '',
          fecha_nacimiento: '',
          lugar_origen: '',
          imagen: '/images/compositores/placeholder.jpg', // Placeholder predeterminado
          pelicula: {},
          slug: ''
        },
        peliculas: [],
        selectedPeliculaId: ''
      };
    },
    methods: {
      async getComposer() {
        const compositorId = this.$route.params.id;
        const response = await fetch(`/.netlify/functions/findComposer/${compositorId}`);
        const data = await response.json();
        this.compositor = data[0];
        this.selectedPeliculaId = data[0].pelicula.id; // Asignar la película actual seleccionada
      },
      async getPeliculas() {
        const response = await fetch('/.netlify/functions/findAllMovies');
        const data = await response.json();
        this.peliculas = data;
      },
      async updateComposer() {
        // Asignar la película seleccionada
        const selectedPelicula = this.peliculas.find(pelicula => pelicula.id === this.selectedPeliculaId);
        if (selectedPelicula) {
          this.compositor.pelicula = {
            id: selectedPelicula.id,
            nombre: selectedPelicula.nombre,
            slug: selectedPelicula.slug
          };
        }
  
        // Enviar los datos actualizados del compositor al backend
        const response = await fetch(`/.netlify/functions/updateComposer/${this.compositor.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.compositor)
        });
  
        const result = await response.text();
        console.log(result);
        this.$router.push('/composers'); // Redirigir después de actualizar
      }
    },
    mounted() {
      this.getComposer(); // Cargar los datos del compositor al montar el componente
      this.getPeliculas(); // Cargar las películas disponibles al montar el componente
    }
  };
  </script>
  