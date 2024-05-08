<script setup>
import CurrencyConverter from './CurrencyConverter.vue'
</script>

<template>
  <div
    class="rounded-3xl relative overflow-hidden bg-[#F9F9F9] w-[1120px] h-[670px] p-[60px] pr-[95px] flex items-start justify-between gap-6"
  >
    <div class="w-[400px]">
      <h1 class="mb-6 text-[#23262F] text-4xl font-bold leading-[43px] tracking-[0.01em]">
        Обмен криптовалюты <span class="text-[#4A40C6]">без ограничений</span>
      </h1>
      <h4 class="text-[#3C3C3C] font-light leading-6 text-lg">
        Обменивайте Bitcoin, Litecoin, Ethereum, Tether и более 50 альткоинов быстрым, простым и
        безопасным способом.
      </h4>
      <img src="/leftPic.png" alt="pic" class="absolute left-0 top-[213px]" />
    </div>
    <CurrencyConverter />
  </div>
</template>
