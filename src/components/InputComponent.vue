<script setup>
import { useCurrencyStore } from '@/stores/counter'
import { computed, ref } from 'vue'

const props = defineProps(['label', 'currency', 'onChangeInput', 'value'])
const filtered = computed(() =>
  store.allCurrency.filter((item) =>
    props.label === 'Вы отдаете'
      ? item.id !== store.secondCurrency.id
      : item.id !== store.firstCurrency.id
  )
)
const filteredAndCategories = computed(() =>
  filtered.value.filter((item) => {
    if (type.value === 'Все') {
      return true
    }
    if (type.value === 'Стейблкоины') {
      return item.is_stablecoin
    }
    if (type.value === 'Классика') {
      return item.is_popular
    }
  })
)
const filteredAndCategoriesAndSearched = computed(() => {
  const search = searchInput.value.toLowerCase()
  return filteredAndCategories.value.filter(
    (item) =>
      item.name.toLowerCase().includes(search) || item.full_name.toLowerCase().includes(search)
  )
})

const searchInput = ref('')
const type = ref('Все')
const store = useCurrencyStore()
const changeNumbers = (e) => {
  let inputValue = e.target.value
  inputValue = inputValue.replace(/,/g, '.')

  if (!/^\d*\.?\d*$/.test(inputValue)) {
    e.target.value = props.value
    return
  }
  if (/^00\./.test(inputValue)) {
    e.target.value = props.value
    return
  }

  if (props.label === 'Вы отдаете') {
    store.setFrom(+inputValue)
    e.target.value = inputValue
    props.onChangeInput('from')
  } else {
    store.setTo(e.target.value)
    props.onChangeInput('to')
  }
}

const blockVisible = ref(false)
const block = ref(null)
const changeVisible = () => {
  if (!blockVisible.value) {
    blockVisible.value = true
    document.addEventListener('click', closeBlockOutside)
  } else {
    blockVisible.value = false
    document.removeEventListener('click', closeBlockOutside)
  }
}
const closeBlockOutside = (event) => {
  if (block.value && !block.value.contains(event.target)) {
    blockVisible.value = false
    document.removeEventListener('click', closeBlockOutside)
  }
}
</script>

<template>
  <div ref="block" class="relative">
    <p class="text-sm mb-[6px] text-[#5F5F5F] font-normal">{{ label }}</p>
    <div class="relative w-full h-[48px] rounded-md border-solid border border-[#F0F0F0]">
      <label class="label absolute flex top-[11px] left-3 text-[#3C3C3C] text-base font-normal">
        <span class="span" :data-val="label === 'Вы отдаете' ? store.from : store.to">
          <input
            maxlength="25"
            @input="changeNumbers"
            :value="label === 'Вы отдаете' ? store.from : store.to"
            class="input border-none outline-none bg-[none]"
          />
        </span>
        {{ label === 'Вы отдаете' ? store.firstCurrency?.name : store.secondCurrency?.name }}
      </label>

      <div
        @click="changeVisible"
        class="flex cursor-pointer items-center absolute top-[-1px] right-[-1px] p-3 h-[48px] w-[110px] rounded-md border-solid border border-[#F0F0F0]"
      >
        <img :src="currency?.icon" class="w-6 h-6 mr-[6px]" alt="" />
        <p class="font-normal text-sm text-[#3C3C3C]">{{ currency?.name }}</p>
        <span class="bg-[url('/arrow.svg')] w-[8px] h-[5px] ml-auto"></span>
      </div>
    </div>
    <div
      v-if="blockVisible"
      class="absolute max-h-[340px] overflow-hidden z-10 top-[74px] right-0 border-solid bg-white border border-[#F0F0F0] w-[265px] p-3 pr-0 rounded-md"
    >
      <div
        @click="changeVisible"
        class="bg-[url('/close.svg')] absolute w-2 h-2 top-[22px] right-[12px] cursor-pointer bg-contain bg-no-repeat"
      ></div>
      <p class="mb-3 mt-1 text-[#3C3C3C] font-normal text-sm">Выберите криптовалюту</p>
      <div class="mb-[10px] pr-3 relative">
        <input
          v-model="searchInput"
          placeholder="Название валюты..."
          class="w-full p-2 text-xs placeholder:text-[#939191] rounded-md text-[#575757] font-light border-solid border border-[#F0F0F0]"
        />
        <div
          class="absolute top-[6px] right-[20px] w-[20px] h-[20px] bg-[url('/search.svg')]"
        ></div>
      </div>
      <div class="mb-[10px] gap-[6px] pr-3 flex justify-between">
        <div
          @click="type = 'Все'"
          :class="{ active: type === 'Все' }"
          class="flex-1 text-[#5F5F5F] text-center rounded-[50px] bg-[#F1F3F9] leading-6 cursor-pointer text-[10px]"
        >
          Все
        </div>
        <div
          @click="type = 'Стейблкоины'"
          :class="{ active: type === 'Стейблкоины' }"
          class="flex-1 text-[#5F5F5F] text-center rounded-[50px] bg-[#F1F3F9] leading-6 cursor-pointer text-[10px]"
        >
          Стейблкоины
        </div>
        <div
          @click="type = 'Классика'"
          :class="{ active: type === 'Классика' }"
          class="flex-1 text-[#5F5F5F] text-center rounded-[50px] bg-[#F1F3F9] leading-6 cursor-pointer text-[10px]"
        >
          Классика
        </div>
      </div>
      <div class="flex flex-col overflow-y-scroll pr-2 max-h-[200px] items-center gap-[6px]">
        <div
          v-for="(item, index) in filteredAndCategoriesAndSearched"
          :key="index"
          @click="
            label === 'Вы отдаете' ? store.setFirstCurrency(item) : store.setSecondCurrency(item)
          "
          :class="{
            active:
              label === 'Вы отдаете'
                ? store.firstCurrency.name === item.name
                : store.secondCurrency.name === item.name
          }"
          class="flex items-center w-full cursor-pointer p-3 rounded-md border-solid border border-[#F1F3F9]"
        >
          <img :src="item.icon" class="w-5 h-5 mr-[6px]" alt="" />
          <p class="text-lg font-normal text-[#3C3C3C]">{{ item.name }}</p>
          <p class="text-[10px] font-light text-[#5F5F5F] ml-auto">{{ item.full_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  border: 1px solid #958ee8;
}
.input {
  border: none;
  outline: none;
  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 20px;
}
.input::-ms-clear {
  display: none;
}
.label {
  display: inline-block;
  min-width: 150px;
  line-height: 25px;
}

.span {
  position: relative;
}
.span::before {
  position: relative;
  display: inline-block;
  content: attr(data-val);
  white-space: pre;
  max-width: 300px;
  min-width: 3px;
  height: 20px;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f3f9;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bfbcdd;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #565469;
}
</style>
