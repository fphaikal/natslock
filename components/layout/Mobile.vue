<script setup>
const colorMode = useColorMode()
const onClick = () => (colorMode.preference = (colorMode.value === 'light' ? 'dark' : 'light'))

const props = defineProps({
  menus: Array,
});

const menus = computed(() => {
  const isLoggedIn = !!token.value; // Check token

  return props.menus?.filter(
      (i) => i?.mobile && (!i.isLogin || isLoggedIn)
  );
  return props.menus?.filter(i => i?.mobile)
})



const route = useRoute()
const token = useCookie('token'); // get token from cookies

</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-full">
        <slot />
    </div>
    <div class="btm-nav max-w-[720px] mx-auto">
      <NuxtLink :to="m.url" v-for="m in menus" :class="route.path === m.url ? 'active': ''" class="bg-punch-70 dark:bg-dark">
        <Icon :name="m.activeIcon" class="text-xl mx-auto" />
      </NuxtLink>
      <button aria-label="Color Mode"
        class="bg-punch-70 dark:bg-dark"
        @click="onClick">
        <ColorScheme placeholder="...">
          <Icon v-if="colorMode.value === 'dark'" name="heroicons-outline:moon" class="text-xl mx-auto" />
          <Icon v-else name="heroicons-outline:sun" class="text-xl mx-auto" />
        </ColorScheme>
      </button>
    </div>
  </div>
</template>