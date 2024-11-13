<template>
    <div class="flex flex-row content-start justify-start mt-32">
        <div v-if="composer && composer.imagen"
            :style="{ backgroundImage: `url(${composer.imagen})`, height: '400px', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }"
            class="max-w-sm bg-center bg-cover bg-no-repeat">
        </div>
        <div class="flex flex-col mx-auto my-auto">
            <h1 v-if="composer && composer.nombre" class="text-2xl font-bold text-center">{{ composer.nombre }}</h1>
            <div class="ml-10 mt-4 text-lg flex flex-col gap-5">
                <p v-if="composer && composer.nombre" class="font-semibold">Nombre:
                    <span class="text-blue-700">{{ composer.nombre }}</span>
                </p>
                <p v-if="composer && composer.anio_nacimiento" class="font-semibold">Año de nacimiento:
                    <span class="text-blue-700">{{ composer.anio_nacimiento }}</span>
                </p>
                <p v-if="composer && composer.lugar_origen" class="font-semibold">Lugar de Origen:
                    <span class="text-blue-700">{{ composer.lugar_origen }}</span>
                </p>
                <p v-if="composer && composer.fecha_nacimiento" class="font-semibold">Fecha de Nacimiento:
                    <span class="text-blue-700">{{ composer.fecha_nacimiento }}</span>
                </p>
                <div v-if="composer && composer.peliculas && composer.peliculas.length" class="peliculas">
                    <h2 class="font-semibold">Películas:</h2>
                    <ul>
                        <li v-for="pelicula in composer.peliculas" :key="pelicula.id">
                            <RouterLink :to="`/movies/show/${pelicula.id}`" class="text-purple-700 font-semibold">
                                {{ pelicula.nombre }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-4 mx-auto mt-10">
    <RouterLink :to="'/composers/edit/' + composer.id" class="p-4 bg-blue-700 flex items-center justify-center w-1/4 mx-auto rounded-md text-white mt-10">Editar este Registro</RouterLink>
    <button @click="deleteComposer" class="p-4 bg-red-700 flex items-center justify-center w-1/4 mx-auto rounded-md text-white mt-10">Eliminar este Registro</button>
  </div>    
</template>

<script>
export default {
    data() {
        return {
            composer: []
        };
    },

    methods: {
        async getcomposer() {
            const composerId = this.$route.params.id; // Obtener el ID desde la URL
            const response = await fetch(`/.netlify/functions/findComposer/${composerId}`);
            const data = await response.json();
            console.log(data);
            this.composer = data[0];
        },
        async deleteComposer() {
        const composerId = this.$route.params.id;
        if (confirm('¿Estás seguro de que quieres eliminar este compositor?')) {
          const response = await fetch(`/.netlify/functions/deleteComposer/${composerId}`, {
            method: 'DELETE'
          });
          const result = await response.text();
          console.log(result);
          this.$router.push('/composers'); // Redirige a la lista de películas después de eliminar
        }
      }
    },

    mounted() {
        this.getcomposer(); // Llamar al método cuando el componente se monta
    }
};
</script>