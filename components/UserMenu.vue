<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <img
        v-if="auth.user?.user_metadata?.avatar_url"
        :src="auth.user.user_metadata.avatar_url"
        alt="User avatar"
        class="h-8 w-8 rounded-full"
      />
      <div
        v-else
        class="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"
      >
        {{ userInitials }}
      </div>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/profile"
              :class="[
                active ? 'bg-neutral-100 dark:bg-neutral-700' : '',
                'block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200'
              ]"
            >
              Profile Settings
            </NuxtLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="auth.logout"
              :class="[
                active ? 'bg-neutral-100 dark:bg-neutral-700' : '',
                'block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200'
              ]"
            >
              Sign Out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
const auth = useAuth()

const userInitials = computed(() => {
  const name = auth.user?.user_metadata?.full_name || auth.user?.email || ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script> 