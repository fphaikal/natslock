<script setup>
const router = useRouter();
const token = useCookie("token"); // useCookie new hook in nuxt 3


const sessionWatcher = async () => {
  const data  = await $fetch('https://natslock.my.id/api/session/check', {
    method: 'POST',
    body: {
      users: localStorage.getItem('email')?.replace(/"/g, ''),
      sessionid: token.value,
    },
  });
  console.log(data);
  if (data) {
    console.log('session exists');
    return;
  }
  console.log('session does not exist');
  router.push('/login');
};

onMounted(() => {
  sessionWatcher();
  setInterval(() => {
    sessionWatcher();
  }, 10000);
});
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
