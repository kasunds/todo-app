<template>
  <!-- Create Task Modal -->
  <div id="newTaskModal" class="modal">
    <div class="modal-content bg-zinc-800">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">New Task</h3>
        <button onclick="closeModal('newTaskModal')" class="text-gray-400 hover:text-white transition-colors cursor-pointer">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Title</label>
        <input id="title" v-model="title" type="text"
          class="w-full bg-zinc-700 rounded-lg p-2 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Description</label>
        <textarea id="description" v-model="description" rows="3"
          class="w-full bg-zinc-700 rounded-lg p-2 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"></textarea>
      </div>
      <div class="flex justify-end space-x-4">
        <button type="button" onclick="closeModal('newTaskModal')"
          class="close px-4 py-1 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
          Close
        </button>
        <button @click="addTodo()" :disabled="loading || (title == '' || description == '')"
          class="save-task px-4 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 "
          :class="!loading && (title != '' || description != '') ? 'cursor-pointer' : 'cursor-not-allowed'">
          <i v-if="loading" class="fa fa-spinner fa-pulse fa-fw"></i>
          <span v-if="loading" class="sr-only">Loading...</span>
          Save
        </button>
      </div>
    </div>
    <v-snackbar v-model="alert" location="top">
      {{text}}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import axios from "axios"

const emit = defineEmits(['fetch-todos'])
const loading = ref(false)
const title = ref('')
const description = ref('')
const text = ref(null)
const alert = ref(false)

const addTodo = async () => {
  try {
    alert.value = false
    loading.value = true
    await axios.post("http://localhost:8000/api/todos", { title: title.value, description: description.value })
    title.value = ""
    description.value = ""
    emit("fetch-todos")
    loading.value = false
    text.value = "Task Saved"
  } catch (error) {
    text.value = 'Error ', error
  }
  alert.value = true
}
</script>