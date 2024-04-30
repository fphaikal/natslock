<template>
  <div class="h-screen bg-cover" style="background-image: linear-gradient(to top, rgba(0,0,0,0.8) , rgba(255,255,255,0)), url(banner.jpeg)">
    <div class="flex flex-col justify-center h-full w-full p-10">
      <div class="flex flex-col">
        <h1 class="text-4xl font-bold text-blue-400">Next-generation And</h1>
        <h1 class="text-4xl font-bold text-blue-50">Smart Lifestyle Locker</h1>
      </div>
      <div class="flex">
        <NuxtLink to="/login" class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full mt-5">Get Started</NuxtLink>
      </div>
    </div>
  </div>
</template>