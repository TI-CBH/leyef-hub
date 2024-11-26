<template>
  <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold">Project Status Board</h2>
      <button
        @click="$emit('add')"
        class="text-primary hover:text-primary-dark"
      >
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Planning Column -->
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-neutral-500">Planning</h3>
        <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg min-h-[12rem] space-y-2">
          <ProjectCard
            v-for="project in planningProjects"
            :key="project.id"
            :project="project"
            @click="$emit('edit', project)"
          />
        </div>
      </div>

      <!-- In Progress Column -->
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-neutral-500">In Progress</h3>
        <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg min-h-[12rem] space-y-2">
          <ProjectCard
            v-for="project in inProgressProjects"
            :key="project.id"
            :project="project"
            @click="$emit('edit', project)"
          />
        </div>
      </div>

      <!-- Review Column -->
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-neutral-500">Review</h3>
        <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg min-h-[12rem] space-y-2">
          <ProjectCard
            v-for="project in reviewProjects"
            :key="project.id"
            :project="project"
            @click="$emit('edit', project)"
          />
        </div>
      </div>

      <!-- Completed Column -->
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-neutral-500">Completed</h3>
        <div class="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg min-h-[12rem] space-y-2">
          <ProjectCard
            v-for="project in completedProjects"
            :key="project.id"
            :project="project"
            @click="$emit('edit', project)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline/index.js'
import type { Project } from '~/types'

const props = defineProps<{
  projects: Project[]
}>()

const planningProjects = computed(() => 
  props.projects.filter(p => p.status === 'planning')
)

const inProgressProjects = computed(() => 
  props.projects.filter(p => p.status === 'in-progress')
)

const reviewProjects = computed(() => 
  props.projects.filter(p => p.status === 'review')
)

const completedProjects = computed(() => 
  props.projects.filter(p => p.status === 'completed')
)

defineEmits<{
  (e: 'add'): void
  (e: 'edit', project: Project): void
}>()
</script> 