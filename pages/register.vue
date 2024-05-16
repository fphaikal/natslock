<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/useAuthStore';

const { registerUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter()

const colorMode = useColorMode()
const onClick = () => (colorMode.preference = (colorMode.preference === 'dark' ? 'light' : 'dark'))

const user = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  verifyPassword: '',
  role: 'user',
})

const error = ref(false)
const errorMessage = ref('')

const register = async () => {
  error.value = false
  try {
    await registerUser(user.value)
  } catch (error) {
    error.value = true    
    console.log(err)
    errorMessage.value = err 
  }
}

</script>

<template>
  <div class="flex flex-col h-screen p-10 justify-between">
    <div class="flex ">
      <NuxtLink to="/" class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full">X</NuxtLink>
      <h1 class="text-3xl font-bold text-center mx-auto my-auto">Natslock</h1>
    </div>
    <div class="flex flex-col gap-3">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <div v-if="error" role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{{ errorMessage.message }}</span>
      </div>
      <input type="name" v-model="user.name" placeholder="Name" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <input type="username" v-model="user.username" placeholder="Username" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <input type="email" v-model="user.email" placeholder="Email" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <div class="flex gap-3 w-full">
        <p class="p-2 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full text-center w-12">62</p>
        <input type="number" v-model="user.phone" placeholder="Phone Number" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full w-full" />
      </div>
      <input type="password" v-model="user.password" placeholder="Password" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <input type="password" v-model="user.verifyPassword" placeholder="Verify Password" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <button @click.prevent="register" class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full">Register</button>
      <p class="text-center text-dark dark:text-secondary">Sudah Memiliki Akun? Silahkan Untuk <NuxtLink to="/login" class="text-primary">Login</NuxtLink></p>
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