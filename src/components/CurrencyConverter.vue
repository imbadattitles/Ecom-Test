<script setup>
import { useCurrencyStore } from '@/stores/counter'
import InputComponent from './InputComponent.vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Api from '@/API/Api'
const currencyStore = useCurrencyStore()

const store = useCurrencyStore()

const rate = ref('')
const refs = storeToRefs(store)
watch(refs.firstCurrency, async () => {
  const res = await Api.profitAmount('from', 1, store.firstCurrency.code, store.secondCurrency.code)
  rate.value = res.profit_rate
})
let abortController = new AbortController()
const inputChange = async (from) => {
  if (from === 'from' && store.from > 0) {
    abortController.abort()
    abortController = new AbortController()
    const res = await Api.profitAmount(
      from,
      store.from,
      store.firstCurrency.code,
      store.secondCurrency.code,
      abortController.signal
    )
    currencyStore.setTo(res.profit_rate)
  } else if (from === 'to' && +store.to > 0) {
    abortController.abort()
    abortController = new AbortController()
    const res = await Api.profitAmount(
      from,
      store.to,
      store.firstCurrency.code,
      store.secondCurrency.code,
      abortController.signal
    )
    currencyStore.setFrom(res.profit_rate)
  }
}
</script>
<template>
  <div class="relative w-[450px] h-[480px] rounded-[20px] p-8 pb-[52px] bg-white">
    <p
      class="mb-[26px] w-[330px] text-[#23262F] text-[28px] font-semibold leading-[33px] tracking-[0.01em]"
    >
      Введите сумму обмена и выберите валюты
    </p>
    <InputComponent
      :value="store.from"
      :on-change-input="inputChange"
      :currency="currencyStore.firstCurrency"
      label="Вы отдаете"
    />
    <div class="mb-[20px] relative mt-[10px]">
      <p
        class="inline relative text-[#5F5F5F] text-xs font-normal after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-[#cccccc] after:left-0 after:bottom-[-7px]"
      >
        1 {{ store.firstCurrency?.name }} ~ {{ rate }} {{ store.secondCurrency?.name }}
      </p>
      <div
        @click="store.swapCurrency()"
        class="absolute right-0 top-[18px] cursor-pointer w-6 h-6 bg-[url('/swap.svg')]"
      ></div>
    </div>

    <InputComponent
      :value="store.to"
      :on-change-input="inputChange"
      :currency="currencyStore.secondCurrency"
      label="Вы получаете"
    />
    <button
      class="border-0 mt-[50px] text-[16px] p-3 rounded-[90px] font-medium text-white w-full cursor-pointer bg-[#4A40C6]"
    >
      Продолжить
    </button>
  </div>
</template>
