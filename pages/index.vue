<script setup>
const token = useCookie('token'); // get token from cookies

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/useAuthStore'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const _id = useCookie('_id'); // get token from cookies

const logout = () => {
  logUserOut();
  router.push('/login');
};
const config = useRuntimeConfig(); // get runtime config

const lockerData = ref([]);
const code = ref('');
const selectedLockerId = ref(null);

const locker = async () => {
  lockerData.value = await $fetch(config.public.apiBase + '/api/lockerdb/all');
  console.log(lockerData);
};

onMounted(() => {
  locker();
});

const rentLocker = async (id) => {
  selectedLockerId.value = id;
  const res = await $fetch(config.public.apiBase + '/api/locker/request/rent', {
    method: 'POST',
    body: {
      lockers: id,
      users: _id.value,
    },
  });
  if (res.code === 200) {
    document.getElementById("enterCode").showModal();
  }
};

const enterCodeReq = async () => {
  const res = await $fetch(config.public.apiBase + '/api/locker/verify/rent', {
    method: 'POST',
    body: {
      lockers: selectedLockerId.value,
      users: _id.value,
      code: code.value,
    },
  });
  if (res.code === 200) {
    document.getElementById("enterCode").close();
  }
};

useSeoMeta({
  title: 'Natslock',
  description: 'Next-generation And Smart Lifestyle Locker',
  url: 'https://natslock.com',
});

// Computed property to get user's UUID
const userUUID = computed(() => parseInt(_id.value));

const getLockerClass = (locker) => {
  if (locker.OnGoing && locker.OnGoing.User.UUID === userUUID.value) {
    return 'bg-green-500 text-white';
  } else if (locker.state) {
    return 'btn bg-primary hover:bg-blue-600 text-secondary dark:bg-blue-400';
  } else {
    return 'bg-blue-200 dark:bg-dark2 cursor-default';
  }
};

const openUserModal = (id) => {
  selectedLockerId.value = id;
  document.getElementById("userModal").showModal();
};

const openLocker = async () => {
  // Logic to extend the rental
  const res = await $fetch(config.public.apiBase + '/api/locker/request/open', {
    method: 'POST',
    body: {
      lockers: selectedLockerId.value,
      users: _id.value,
    },
  });
  if (res.code === 200) {
    document.getElementById("userModal").close();
    document.getElementById("enterOpenCode").showModal();
  }
};

const enterOpenCodeReq = async () => {
  const res = await $fetch(config.public.apiBase + '/api/locker/verify/open', {
    method: 'POST',
    body: {
      lockers: selectedLockerId.value,
      users: _id.value,
      code: code.value,
    },
  });
  if (res.code === 200) {
    document.getElementById("enterOpenCode").close();
  }
};

const endRental = async () => {
  // Logic to end the rental
  const res = await $fetch(config.public.apiBase + '/api/locker/request/unrent', {
    method: 'POST',
    body: {
      lockers: selectedLockerId.value,
      users: _id.value,
    },
  });
  if (res.code === 200) {
    document.getElementById("userModal").close();
    document.getElementById("enterUnrentCode").showModal();
  }
};

const enterUnrentCodeReq = async () => {
  const res = await $fetch(config.public.apiBase + '/api/locker/verify/unrent', {
    method: 'POST',
    body: {
      lockers: selectedLockerId.value,
      users: _id.value,
      code: code.value,
    },
  });
  if (res.code === 200) {
    document.getElementById("enterUnrentCode").close();
  }
};
</script>

<template>
  <div v-if="!token"
    class="h-screen bg-gradient-to-tl from-blue-700 to-blue-400 to-100% from-15% dark:from-dark dark:to-blue-400">
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
        <button 
          v-for="l in lockerData" 
          :key="l.uuid"
          @click.prevent="l.OnGoing && l.OnGoing.User.UUID === userUUID ? openUserModal(l.uuid) : rentLocker(l.uuid)"
          class="flex"
          :class="[getLockerClass(l), 'h-32 flex flex-col justify-center items-center rounded-xl border-0 shadow-lg shadow-primary/20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300']">
          {{ l.name }}
          <div v-if="l.OnGoing && l.OnGoing.User.UUID === userUUID">{{ l.OnGoing.duration }}</div>
        </button>
      </div>
    </div>
  </div>

  <dialog id="enterCode" class="modal">
    <div class="modal-box bg-primary dark:bg-dark">
      <h3 class="font-bold text-lg">Enter Code!</h3>
      <div class="flex flex-row gap-2 mt-5 mx-auto justify-center items-center">
        <input type="text" v-model="code" placeholder="Enter Code" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
        <button @click="enterCodeReq" class="btn rounded-full">Submit</button>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog id="enterOpenCode" class="modal">
    <div class="modal-box bg-primary dark:bg-dark">
      <h3 class="font-bold text-lg">Enter Code!</h3>
      <div class="flex flex-row gap-2 mt-5 mx-auto justify-center items-center">
        <input type="text" v-model="code" placeholder="Enter Code" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
        <button @click="enterOpenCodeReq" class="btn rounded-full">Submit</button>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog id="enterUnrentCode" class="modal">
    <div class="modal-box bg-primary dark:bg-dark">
      <h3 class="font-bold text-lg">Enter End Rent Code!</h3>
      <div class="flex flex-row gap-2 mt-5 mx-auto justify-center items-center">
        <input type="text" v-model="code" placeholder="Enter Code" class="py-2 px-4 bg-gray-100 dark:bg-dark2 text-black dark:text-white rounded-full" />
        <button @click="enterUnrentCodeReq" class="btn rounded-full">Submit</button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  
  <dialog id="userModal" class="modal">
    <div class="modal-box bg-primary dark:bg-dark">
      <h3 class="font-bold text-lg">Locker Options</h3>
      <div class="flex gap-4 mt-5 mx-auto justify-center items-center">
        <button @click="openLocker" class="btn rounded-full text-center">Open Locker</button>
        <button @click="endRental" class="btn rounded-full">End Rental</button>
      </div>
    </div>
  </dialog>
</template>
