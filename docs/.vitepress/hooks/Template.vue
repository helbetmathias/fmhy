<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <span
    tw="w-full h-full flex flex-col"
    :style="{
      background:
        'linear-gradient(135deg, #090b10 0%, #101722 55%, #17112b 100%)'
    }"
  >
    <span
      tw="absolute rounded-full"
      :style="{
        width: '620px',
        height: '620px',
        right: '-110px',
        top: '-230px',
        background: 'rgba(89, 111, 255, 0.22)'
      }"
    />
    <span
      tw="absolute rounded-full"
      :style="{
        width: '520px',
        height: '520px',
        right: '210px',
        bottom: '-310px',
        background: 'rgba(176, 82, 255, 0.18)'
      }"
    />
    <span
      tw="p-10 w-full min-h-0 grow flex flex-col items-center justify-between"
    >
      <span tw="w-full flex justify-between items-center text-5xl font-medium">
        <span tw="flex items-center">
          <span tw="text-zinc-100 ml-2 mt-1 font-semibold">Mathy Repo</span>
        </span>
      </span>
      <span tw="w-full pr-56 flex flex-col items-start justify-end">
        <span style="color: #f3f4f6" tw="text-6xl font-bold" v-html="title" />
        <span style="color: #c0caf5" tw="mt-2 text-4xl" v-html="description" />
      </span>
    </span>
  </span>
</template>
