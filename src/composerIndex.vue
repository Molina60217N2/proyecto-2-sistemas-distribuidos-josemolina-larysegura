<template>
    <div class="flex flex-col items-center mt-32">
      <h1 class="text-4xl text-center capitalize font-bold mt-10">Compositores</h1>
      <div class="grid grid-cols-3 mt-20 w-full mx-auto gap-10">
        <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="composer in composers" :key="composer.id">
          <RouterLink v-if="composer && composer.id" :to="'/composers/show/' + composer.id">
            <div v-if="composer.imagen" :style="{ backgroundImage: `url(${composer.imagen})` }"
                 class="max-w-sm h-[400px] mx-auto mt-10 bg-center bg-cover bg-no-repeat"></div>
            <div class="px-6 py-4">
              <div v-if="composer.nombre" class="font-bold text-xl mb-2">{{ composer.nombre }}</div>
              <p v-if="composer.anio_nacimiento || composer.lugar_origen" class="text-gray-700 text-base">
                <span v-if="composer.anio_nacimiento">{{ composer.anio_nacimiento }}</span> 
                <span v-if="composer.lugar_origen"> - {{ composer.lugar_origen }}</span>
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
      <RouterLink to="/composers/create" class="mt-20 p-4 bg-green-700 text-slate-100 rounded-md mb-20">Crear un nuevo registro</RouterLink>
    </div>
  </template>
<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            composers: [],
            title: 'Lista de Compositores'
        }
    },

    methods: {
        async getcomposers() {
            const response = await fetch('/.netlify/functions/findAllComposers');
            const data = await response.json();
            console.log(data);
            this.composers = data;
        }
    },

    mounted(){
        this.getcomposers();
    }
}
</script>