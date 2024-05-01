<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/useAuthStore';

const { authenticateUser, validationUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const router = useRouter()

const colorMode = useColorMode()
const onClick = () => (colorMode.preference = (colorMode.preference === 'dark' ? 'light' : 'dark'))

const user = ref({
  users: '',
  pass: '',
  force: false
})

const error = ref(false)
const errorMessage = ref('')

const login = async () => {
  try {
    await authenticateUser(user.value);
    if (authenticated.value) { 
      router.push('/') 
    }
    error.value = false
  } catch (err) {
    error.value = true    
    console.log(err)
    errorMessage.value = err 
  }
}

const forceLogin = () => {
  user.value.force = true
  login()
}

const verificationOtp = () => {
  validationUser(user.value.users)

  if(validationUser.value){
    router.push('/register')
  
  }
}
</script>

<template>
  <div class="flex flex-col h-screen p-10 justify-between">
    <div class="flex ">
      <NuxtLink to="/" class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full">X</NuxtLink>
      <h1 class="text-3xl font-bold text-center mx-auto my-auto">Natslock</h1>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <div v-if="error" role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{{ errorMessage.message }}</span>
        <div>
          <button v-if="errorMessage.code === 401" @click.prevent="forceLogin" class="btn btn-sm btn-primary">Accept</button>
          <button v-if="errorMessage.code === 403" @click.prevent="verificationOtp" class="btn btn-sm btn-primary">Accept</button>
        </div>
      </div>
      <input type="text" v-model="user.users" placeholder="Email" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <input type="password" v-model="user.pass" placeholder="Password" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
      <button @click.prevent="login" class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full">Login</button>
      <p class="text-center text-dark">Belum Memiliki Akun? Silahkan Untuk <NuxtLink to="/register" class="text-primary">Register</NuxtLink></p>
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
  <!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</template>