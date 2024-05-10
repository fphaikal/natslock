<script setup>
const token = useCookie('token'); // get token from cookies

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/useAuthStore'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const _id = useCookie('_id'); // get token from cookies

const logout = () => {
  logUserOut();
  router.push('/login');
};
const config = useRuntimeConfig(); // get runtime config

const lockerData = ref([]);

const locker = async () => {
  lockerData.value = await $fetch(config.public.apiBase + '/api/lockerdb/all');
  console.log(lockerData);
};

onMounted(() => {
  locker();
});

const rentLocker = async (id) => {
  const res = await $fetch(config.public.apiBase + '/api/locker/request/rent', {
    method: 'POST',
    body: {
      lockers: id,
      users: _id.value,
    
    },
  });
  if (res) {
    locker();
  }
};

useSeoMeta({
  title: 'Natslock',
  description: 'Next-generation And Smart Lifestyle Locker',
  url: 'https://natslock.com',
});
</script>
<template>
  <div v-if="!token" class="h-screen bg-gradient-to-tl from-blue-700 to-blue-400 to-100% from-15% dark:from-dark dark:to-blue-400">
    <div class="flex flex-col justify-center h-full w-full p-10">
      <div class="flex flex-col">
        <h1 class="text-4xl font-bold text-blue-400">Next-generation And</h1>
        <h1 class="text-4xl font-bold text-blue-50">Smart Lifestyle Locker</h1>
      </div>
      <div class="flex">
        <NuxtLink to="/login" class="bg-blue-400 text-white font-bold py-2 px-4 rounded-full mt-5">Get Started
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-else class="h-screen pb-20">
    <div class="flex flex-col bg-secondary dark:bg-dark w-full p-10 justify-between h-full">
      <div class="flex mx-auto">
        <h1 class="text-2xl">Natslock</h1>
      </div>
      <div class="grid grid-cols-2 gap-3 my-auto">
        <button @click.prevent="rentLocker(l.uuid)" v-for="l in lockerData" :class="l.state ? 'btn bg-primary hover:bg-blue-600 text-secondary dark:bg-blue-400 border-0 shadow-lg shadow-primary/20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300':' bg-blue-200 dark:bg-dark2 border-0 cursor-default'"
          class="h-32 flex justify-center items-center rounded-xl">
          {{ l.name }}
        </button>
      </div>
    </div>
  </div>
</template>