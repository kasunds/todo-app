<template>
    <div class="task-item bg-zinc-900 hover:shadow-md hover:bg-zinc-800 rounded-lg p-4 transform transition-all duration-300">
        <div class="flex flex-col lg:flex-row md:flex-row justify-between items-start">
            <div>
                <h3 class="font-bold">{{ todo.title }}</h3>
                <p class="text-sm text-gray-400">{{ todo.description }}</p>
            </div>
            <div class="flex mt-1 lg:m-0 md:m-0 items-center space-x-2">
                <button @click="completeTodo(todo.id)" :disabled="loading"
                    class="complete px-2 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors duration-300 cursor-pointer">
                    <div v-if="loading && selectedId == todo.id">
                        <i class="fa fa-spinner fa-pulse fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <i v-else class="fa fa-check"></i>
                </button>

                <button @click="deleteTodo(todo.id)" :disabled="loading"
                    class="delete px-2 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300 cursor-pointer">
                    <div v-if="loading && selectedId == todo.id">
                        <i class="fa fa-spinner fa-pulse fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <i v-else class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
    <v-snackbar v-model="alert" location="top">
        {{ text }}
    </v-snackbar>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import axios from 'axios'

defineProps({
  todo: Object
})

const emit = defineEmits(['fetch-todos'])
const loading = ref(false)
const selectedId = ref(null)
const alert = ref(false)
const text = ref(null)

const completeTodo = async (id) => {
    try {
        if (loading.value) false
        selectedId.value = id
        loading.value = true
        await axios.patch(`http://localhost:8000/api/todos/${id}`)
        text.value = 'Task Completed !'
        emit('fetch-todos')
    } catch (error) {
        text.value = 'Error :', error
    }
    alert.value = true
};

const deleteTodo = async (id) => {
    try {
        loading.value = true
        selectedId.value = id
        await axios.delete(`http://localhost:8000/api/todos/${id}`)
        text.value = 'Task Deleted !'
        emit('fetch-todos')
    } catch (error) {
        console.error('Error ', error);
    }
    alert.value = true
};
</script>