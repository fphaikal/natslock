<script setup>
const menus = [
  {
    title: 'Home',
    url: '/',
    icon: 'mingcute:home-5-line',
    activeIcon: 'mingcute:home-5-fill',
    mobile: true,
    size: '28'
  },
  {
    title: 'History',
    url: '/history',
    icon: 'mingcute:history-line',
    activeIcon: 'mingcute:history-fill',
    mobile: true,
    isAdmin: false,
    isLogin: true,
    size: '28'
  },
  {
    title: 'yourLocker',
    url: '/yourLocker',
    icon: 'mingcute:storage-line',
    activeIcon: 'mingcute:storage-fill',
    mobile: true,
    isAdmin: false,
    isLogin: true,
    size: '28'
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: 'mingcute:user-3-line',
    activeIcon: 'mingcute:user-3-fill',
    mobile: true,
    isLogin: true,
    size: '28'
  },
]

</script>
<template>
  <div>
    <LayoutMobile :menus="menus">
      <slot />
    </LayoutMobile>
  </div>
</template>