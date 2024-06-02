<template>
  <div class="c-item card">
    <img :src="`/img/${product.img}.webp`" @click="showCardModalF(product)" :alt="product.title" class="c-item__img" />
    <span class="c-item__title">{{ product.title }}</span>
    <div class="c-item__bottom">
      <span class="c-item__price">{{ product.price }}₽</span>
      <button v-if="isSignedIn" class="c-item__button" :disabled="inCart(product)" @click="addProductToCart(product)">
        {{ inCart(product) ? 'Уже в корзине' : "Купить" }}
      </button>
    </div>
  </div>
  <teleport to="body">
    <card-o v-if="currentItem" :product="currentItem" @close="currentItem = undefined" />
  </teleport>
</template>

<script setup lang="ts">
import CardO from './Card-o.vue'
import { PropType, computed, ref } from 'vue';
import { Product } from '../types.ts';
import { useStore } from '../store.ts';
import { useAuth } from 'vue-clerk'

const { product } = defineProps({
  product: { type: Object as PropType<Product>, required: true },
})

let currentItem = ref<Product>()
let showCardModal = ref(false)

const { isSignedIn, } = useAuth()
const { addProductToCart } = useStore()

const cart = computed(() => useStore().cart)

function inCart(product: Product) {
  return !!cart.value.find((el) => el.id == product.id
  )
}

function showCardModalF(product: Product) {
  showCardModal.value = true
  currentItem.value = product
}

</script>


<style>
.c-item__button:disabled {
  background: gray;
}

.c-item {
  min-width: 240px;
  display: flex;
  flex-direction: column;
  max-width: 240px;
  height: 320px;
  padding: 5px;
}

.c-item__img {
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  border: 2px solid #edeef0;
}

.c-item__title {
  color: #626d7a;
  margin-bottom: 5px;
  padding-left: 5px;
  margin-top: 5px;
}

.c-item__bottom {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  align-items: center;
}

.c-item__price {
  font-weight: 700;
  padding-left: 5px;
}

.c-item__button {
  color: white;
  background: royalblue;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>