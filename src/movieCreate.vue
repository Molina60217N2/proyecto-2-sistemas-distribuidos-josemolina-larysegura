<template>
    <div class="flex flex-col items-center mt-32">
        <h1 class="text-4xl font-bold mb-10">Crear Nueva Película</h1>
        <div class="w-full max-w-lg">
            <form @submit.prevent="createMovie">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre de la
                        Película:</label>
                    <input v-model="movie.nombre" id="nombre" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="actor_principal">Actor
                        Principal:</label>
                    <input v-model="movie.actor_principal" id="actor_principal" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="anio_lanzamiento">Año de
                        Lanzamiento:</label>
                    <input v-model="movie.anio_lanzamiento" id="anio_lanzamiento" type="number"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="director">Director:</label>
                    <input v-model="movie.director" id="director" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="genero">Género:</label>
                    <input v-model="movie.genero" id="genero" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="sinopsis">Sinopsis:</label>
                    <textarea v-model="movie.sinopsis" id="sinopsis"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="album">Álbum Musical:</label>
                    <select v-model="selectedAlbumId" id="album"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required>
                        <option disabled value="">Seleccione un álbum</option>
                        <option v-for="album in albums" :key="album.id" :value="album.id">
                            {{ album.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="imagen">Imagen de la Película (Usando
                        Placeholder):</label>
                    <p>Se utilizará un placeholder predeterminado.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Crear Película
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
                id: 0,
                nombre: '',
                actor_principal: '',
                anio_lanzamiento: '',
                director: '',
                genero: '',
                sinopsis: '',
                album: {},
                imagen: '/images/peliculas/placeholder.png'
            },
            albums: [],
            selectedAlbumId: '',
            moviecount: 0,
        };
    },
    methods: {
        async getAlbums() {
            const response = await fetch('/.netlify/functions/findAllAlbum');
            const data = await response.json();
            this.albums = data;
            fetch('/.netlify/functions/findAllMovies',
                { headers: { 'Accept': 'application/json' } })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result.length)
                    this.moviecount = result.length + 1;
                })
        },
        async createMovie() {
            // Asigna un ID único al objeto movie si el backend no lo está haciendo automáticamente

            this.movie.id = this.moviecount; // Ejemplo de cómo generar un ID único

            const selectedAlbum = this.albums.find(album => album.id === this.selectedAlbumId);
            if (selectedAlbum) {
                this.movie.album = {
                    id: selectedAlbum.id,
                    nombre: selectedAlbum.nombre,
                    slug: selectedAlbum.slug
                };
            }

            const response = await fetch('/.netlify/functions/insertMovie', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.movie)
            });

            const result = await response.text();
            console.log(result);
            this.$router.push('/movies'); // Redirige a la lista de películas después de crear
        }
    },
    mounted() {
        this.getAlbums(); // Cargar los álbumes disponibles al montar el componente
    }
};
</script>