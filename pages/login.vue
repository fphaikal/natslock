<script setup>
const colorMode = useColorMode()
const onClick = () => (colorMode.preference = (colorMode.preference === 'dark' ? 'light' : 'dark'))

const user = ref({
  users: '',
  pass: ''
})

const login = async () => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user.value)
  })
  const data = await response.json()
  console.log(data)
}
</script>

<template>
  <div class="flex flex-col h-screen p-10 justify-between">
    <h1 class="text-3xl font-bold text-center">Natslock</h1>
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold text-center">Login</h1>
      <input type="text" v-model="user.users" placeholder="Email" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <input type="password" v-model="user.pass" placeholder="Password" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <button class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full">Login</button>
    </div>
    <button aria-label="Color Mode"
      class="flex w-full items-center space-x-3 py-2 px-4 bg-blue-400 dark:bg-dark2 text-blue-50 dark:text-blue-50 rounded-full"
      @click="onClick">
      <ColorScheme placeholder="...">
        <Icon v-if="colorMode.value === 'dark'" name="heroicons-outline:moon" class="text-xl mx-auto" />
        <Icon v-else name="heroicons-outline:sun" class="text-xl mx-auto" />
      </ColorScheme>
    </button>
  </div>
</template>