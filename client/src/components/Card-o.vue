<template>
  <div class="card-popup popup-wrapper" @click="$emit('close')">
    <div @click.stop class="card-popup__inner card">
      <div class="popup-wrapper__cross" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" style="enable-background: new 0 0 490 490"
          xml:space="preserve">
          <path
            d="M11.387 490 245 255.832 478.613 490l10.826-10.826-233.63-234.178 233.63-234.185L478.613 0 245 234.161 11.387 0 .561 10.811l233.63 234.185L.561 479.174z" />
        </svg>
      </div>
      <div class="card-popup__edit" @click="showEdit = true" v-if="isAdmin">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20" height="20">
          <path
            d="M22.828 3c-.512 0-1.023.195-1.414.586L19 6l5 5 2.414-2.414a2 2 0 0 0 0-2.828l-2.172-2.172A1.994 1.994 0 0 0 22.828 3zM17 8 5.26 19.74s.918-.082 1.26.26c.342.342.06 2.58.48 3 .42.42 2.644.124 2.963.443.319.32.297 1.297.297 1.297L22 13l-5-5zM4 23l-.943 2.672A1 1 0 0 0 3 26a1 1 0 0 0 1 1 1 1 0 0 0 .328-.057 1 1 0 0 0 .01-.004l.025-.007a1 1 0 0 0 .006-.004L7 26l-1.5-1.5L4 23z" />
        </svg>
      </div>
      <div class="card-popup__content">
        <img :src="`/img/${product.img}.webp`" class="card-popup__img" alt="" />
        <div class="card-popup__text">
          <span class="card-popup__title">{{ product.title }}</span>
          <div class="card__features">
            <span>Страна-производитель: {{ product.country_manufacture }}</span>
            <span>Технология печати: {{ product.printing_technology }}</span>
            <span>Цветность печати: {{ product.print_color }}</span>
          </div>
          <span class="card-popup__price">{{ product.price }} ₽</span>
          <button v-if="isSignedIn" :disabled="inCart" class="card-popup__buy" @click="addToCart(product)">
            {{ inCart ? 'Уже в коризне' : 'В корзину' }}
          </button>
          <span v-else>Войдите в аккаунт чтобы купить</span>
        </div>
      </div>
      <div class="card-popup__description">
        {{ product.description }}
      </div>
    </div>
  </div>
  <teleport to="body"> </teleport>
  <edit-o v-if="showEdit" @close="showEdit = false" :item="product"></edit-o>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, computed, } from 'vue';
import { useStore } from '../store.ts';
import EditO from './Edit-o.vue';
import { Product } from '../types.ts'
import { useAuth } from 'vue-clerk'

const { product } = defineProps({
  product: { type: Object as PropType<Product>, required: true }
})
defineEmits(['close'])

const { isSignedIn } = useAuth()
const showEdit = ref(false)
const isAdmin = useStore().isAdmin
const cart = ref(useStore().cart)
const inCart = computed(() => !!cart.value.find((el: Product) => el.id == product.id))

function addToCart(product: Product) {
  useStore().addProductToCart(product)
}
</script>

<style>
.card__features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  margin-bottom: auto;
}

.card-popup__edit {
  position: absolute;
  right: 5px;
  bottom: 5px;
  cursor: pointer;
  border: 1px solid gray;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.card-popup__content {
  display: flex;
  border-bottom: 3px solid #e7e8ec;
  padding-bottom: 25px;
  margin-bottom: 25px;
}

.card-popup__img {
  width: 100%;
  max-width: 520px;
  max-height: 400px;
  height: 100%;
  object-fit: contain;
}

.card-popup__text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.card-popup__title {
  font-size: 22px;
  margin-bottom: 10px;
}

.card-popup__price {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 5px;
}

.card-popup__date {
  margin-top: auto;
  margin-bottom: 15px;
  font-size: 14px;
  color: #626d7a;
  margin-left: auto;
}

.card-popup__buy {
  background: #1c5383;
  border-radius: 15px;
  color: #fff;
  border: none;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  font-size: 22px;
}

.card-popup__buy:disabled {
  cursor: default;
  background: #e7e8ec;
  color: #000;
  border: 1px solid #626d7a;
}

.card-popup__description {
  white-space: pre-line;
}

@media (max-width: 768px) {
  .card-popup__content {
    flex-direction: column;
  }
}
</style>
