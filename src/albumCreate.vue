<template>
    <div class="flex flex-col items-center mt-10">
        <h1 class="text-4xl font-bold mb-10">Crear Nuevo Álbum</h1>
        <div class="w-full max-w-lg">
            <form @submit.prevent="createAlbum">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre del Álbum:</label>
                    <input v-model="album.nombre" id="nombre" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="anio_lanzamiento">Año de
                        Lanzamiento:</label>
                    <input v-model="album.anio_lanzamiento" id="anio_lanzamiento" type="number"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="genero">Género:</label>
                    <input v-model="album.genero" id="genero" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="pelicula">Película:</label>
                    <select v-model="selectedPeliculaId" id="pelicula"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                        <option disabled value="">Seleccione una película</option>
                        <option v-for="pelicula in peliculas" :key="pelicula.id" :value="pelicula.id">
                            {{ pelicula.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="compositor">Compositor:</label>
                    <select v-model="selectedCompositorId" id="compositor"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                        <option disabled value="">Seleccione un compositor</option>
                        <option v-for="compositor in compositores" :key="compositor.id" :value="compositor.id">
                            {{ compositor.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="imagen">Imagen del Álbum
                        (Placeholder):</label>
                    <p>Se utilizará un placeholder predeterminado.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear
                        Álbum</button>
                </div>
            </form>
        </div>
    </div>
    {{ albumcount }}
</template>

<script>
export default {
    data() {
        return {
            album: {
                id:0,
                nombre: '',
                anio_lanzamiento: '',
                genero: '',
                imagen: '/images/albumes/placeholder.png', // Placeholder predeterminado
                pelicula: {},
                compositor: {},
                slug: ''
            },
            peliculas: [],
            compositores: [],
            selectedPeliculaId: '',
            selectedCompositorId: '',
            albumcount: 0
        };
    },
    methods: {
        async createAlbum() {
            // Asignar un ID único al objeto álbum
            this.album.id = this.albumcount;
            this.album.slug = this.album.nombre.toLowerCase().replace(/\s+/g, '-');

            // Asignar la película seleccionada
            const selectedPelicula = this.peliculas.find(pelicula => pelicula.id === this.selectedPeliculaId);
            if (selectedPelicula) {
                this.album.pelicula = {
                    id: selectedPelicula.id,
                    nombre: selectedPelicula.nombre,
                    slug: selectedPelicula.slug
                };
            }

            // Asignar el compositor seleccionado
            const selectedCompositor = this.compositores.find(compositor => compositor.id === this.selectedCompositorId);
            if (selectedCompositor) {
                this.album.compositor = {
                    id: selectedCompositor.id,
                    nombre: selectedCompositor.nombre,
                    slug: selectedCompositor.slug
                };
            }

            // Enviar los datos del álbum al backend
            const response = await fetch('/.netlify/functions/insertAlbum', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.album)
            });

            const result = await response.text();
            console.log(result);
            this.$router.push('/albums'); // Redirigir después de crear
        },
        async getPeliculas() {
            const response = await fetch('/.netlify/functions/findAllMovies');
            const data = await response.json();
            this.peliculas = data;
            const response2 = await fetch('/.netlify/functions/findAllAlbum');
            const data2 = await response2.json();
            console.log(data2);
            this.albumcount = data2.length + 1;
        },
        async getCompositores() {
            const response = await fetch('/.netlify/functions/findAllComposers');
            const data = await response.json();
            this.compositores = data;
        }
    },
    mounted() {
        this.getPeliculas(); // Cargar las películas disponibles al montar el componente
        this.getCompositores(); // Cargar los compositores disponibles al montar el componente
    }
};
</script>