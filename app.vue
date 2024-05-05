<script setup>
const router = useRouter();
const token = useCookie("token"); // useCookie new hook in nuxt 3
import { useAuthStore } from '~/store/useAuthStore';

const { sessionWatcher } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());


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


