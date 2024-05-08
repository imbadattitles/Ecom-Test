<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useCurrencyStore } from './stores/counter'
import Api from './API/Api'

const currencyStore = useCurrencyStore()
onMounted(async () => {
  const allCurrency = await Api.getAllCurrency()
  currencyStore.setAllCurrency(allCurrency)
  currencyStore.setFirstCurrency(allCurrency[0])
  currencyStore.setSecondCurrency(allCurrency[1])
})
</script>

<template>
  <RouterView />
</template>
<style>
* {
  box-sizing: border-box;
}
</style>
