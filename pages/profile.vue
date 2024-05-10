<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/useAuthStore'; // import the auth store we just created

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();

const logout = () => {
  logUserOut();
  router.push('/login');
};

const config = useRuntimeConfig(); // get runtime config
const id = useCookie('_id');

const { data } = await useFetch(config.public.apiBase + '/api/userdb/' + id.value);
</script>
<template>
  <div class="h-screen pb-10">
    <div class="flex flex-col justify-between h-full w-full p-10">
      <div class="flex mx-auto">
        <h1 class="text-2xl">Profile</h1>
      </div>
      <div class="flex flex-col gap-2">
        <div class="w-32 h-32 md:w-40 md:h-40 mx-auto border-white dark:border-dark rounded-full overflow-hidden mb-5">
          <img class="object-cover object-center" :src="data.Picture || ''" />
        </div>
        <h1 class="border-b pb-2">Name: {{ data.Name }}</h1>
        <h1 class="border-b pb-2">Email: {{ data.Email }}</h1>
        <h1>Phone: {{ data.Phone }}</h1>
      </div>
      <button @click="logout" class="btn bg-blue-400 text-white font-bold rounded-full ">Logout</button>
    </div>  
  </div>
</template>