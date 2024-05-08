import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', () => {
  const allCurrency = ref(null)
  const firstCurrency = ref(null)
  const secondCurrency = ref(null)
  const profitCurrency = ref(null)

  const from = ref(0)
  const to = ref(0)

  const swapCurrency = () => {
    const first = firstCurrency.value
    const second = secondCurrency.value
    const fromVal = from.value
    const toVal = to.value
    firstCurrency.value = second
    secondCurrency.value = first
    from.value = toVal
    to.value = fromVal
  }
  const setAllCurrency = (payload) => {
    allCurrency.value = payload
  }
  const setFirstCurrency = (payload) => {
    firstCurrency.value = payload
  }
  const setSecondCurrency = (payload) => {
    secondCurrency.value = payload
  }
  const setProfit = (payload) => {
    profitCurrency.value = payload
  }

  const setFrom = (payload) => {
    from.value = payload
  }
  const setTo = (payload) => {
    to.value = payload
  }

  return {
    allCurrency,
    firstCurrency,
    secondCurrency,
    profitCurrency,
    from,
    to,
    setAllCurrency,
    setFirstCurrency,
    setSecondCurrency,
    swapCurrency,
    setProfit,
    setFrom,
    setTo
  }
})
