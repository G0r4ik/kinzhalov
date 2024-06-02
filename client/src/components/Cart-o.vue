<template>
  <div class="cart popup-wrapper" @click="$emit('close')">
    <div class="cart__inner card" @click.stop>
      <div class="popup-wrapper__cross" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" style="enable-background: new 0 0 490 490"
          xml:space="preserve">
          <path
            d="M11.387 490 245 255.832 478.613 490l10.826-10.826-233.63-234.178 233.63-234.185L478.613 0 245 234.161 11.387 0 .561 10.811l233.63 234.185L.561 479.174z" />
        </svg>
      </div>
      <div v-if=!isBuy>
        <div class="cart__title">Корзина</div>
        <div class="cart__item" v-for="item in cart" :key="item.id">
          <img :src="`/img/${item.img || item.img}.webp`" alt="" class="cart__img" />
          <div class="cart__text">
            <div class="cart__id">Код: {{ item.id || item.id }}</div>
            <div class="cart__title-item">
              {{ item.title }}
            </div>
            <div class="count__price">{{ item.price * item.count }} ₽</div>
          </div>
          <div style="display: flex;">
            <div class="cart__count">
              <div id="cart-countMinus" class="cart__count-btn" @click="decreaseCount(item)">
                -
              </div>
              <output class="cart__count-n" :value="item.count" />
              <!-- @input="changeCount($event, item)" -->
              <div id="cart-countPlus" class="cart__count-btn" @click="increaseCount(item)">
                +
              </div>
            </div>
            <div class="count__remove" @click="deleteOneProduct(item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20" height="20">
                <path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                  d="M6 5h18M13 4h4" />
                <path d="M6 8v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8H6z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="cart__totalsum" :style="{
          textAlign: cart.length ? 'right' : 'left',
          fontSize: cart.length ? '22px' : '16px',
        }">
          {{ cart.length ? totalSum + ' ₽' : 'Ничего нет' }}
        </div>
        <button v-if="cart.length" class="cart__finalyBuy" @click="buy">Купить</button>
      </div>
      <div v-else>
        <br>
        <br>
        Менеджер с вами свяжется
        <br>
        <br>
      </div>
    </div>
  </div>



</template>

<script setup>
import { useUser } from 'vue-clerk';
import { useStore } from '../store.ts';
import { computed, ref } from 'vue'


const { deleteOneProduct, increaseCount, decreaseCount } = useStore()
const isBuy = ref(false)
const { user } = useUser()

function buy() {
  isBuy.value = true
  useStore().clearCart(user.value.id)
}

let cart = useStore().cart
const totalSum = computed(() => {
  return cart.reduce((s, el) => {
    for (let i = 0; i < el.count; i++) s += +el.price
    return s
  }, 0);

});
</script>

<style>
.cart__items-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  right: -5px;
  width: 20px;
  height: 20px;
  background: #06f;
  color: #fff;
  border-radius: 50%;
}

.cart__totalsum {
  font-size: 22px;
  text-align: right;
  margin-bottom: 5px;
}

.cart__finalyBuy {
  background: #1c5383;
  padding: 5px 20px;
  border-radius: 15px;
  color: #fff;
  border: none;
  cursor: pointer;
  display: block;
  margin-left: auto;
}

.cart__inner {
  width: 850px;
}

.cart__title {
  font-size: 24px;
  margin-bottom: 25px;
}

.cart__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #edeef0;
  padding-bottom: 10px;
}

.cart__img {
  height: 150px;
  border-radius: 15px;
  margin-right: 15px;
}

.cart__title-item {
  max-width: 300px;
  margin-bottom: 20px;
}

.cart__text {
  margin-right: auto;
}

.cart__id {
  font-size: 14px;
  color: #626d7a;
  margin-bottom: 10px;
}

.cart__count {
  margin-right: 50px;
  border: 1px solid #e7e8ec;
  padding: 5px;
  border-radius: 15px;
}

.cart__count-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

#cart-countMinus {
  margin-right: 5px;
}

#cart-countPlus {
  margin-left: 5px;
}

.cart__count-n {
  display: inline-block;
  width: 50px;
  border-radius: 15px;
  padding: 1px 5px;
  border: 1px solid #e7e8ec;
  text-align: center;
}

.count__price {
  margin-right: 50px;
  font-size: 20px;
}

.count__remove {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #e7e8ec;
  cursor: pointer;
  padding: 5px;
}

@media (max-width: 768px) {
  .cart__item {
    flex-direction: column;
  }
}
</style>
