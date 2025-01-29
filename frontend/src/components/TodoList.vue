<template>
    <div class="bg-zinc-950 text-white min-h-screen">
      <div class="container mx-auto px-4 py-8 max-w-5xl">
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Tasks List -->
          <div class="md:col-span-3">
            <div class="bg-[#111] rounded-xl p-4 lg:p-6 shadow-lg border border-purple-500/20">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Active Tasks</h2>
  
                <button onclick="openModal('newTaskModal')"
                  class="add-new-task bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-1 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <i class="fa fa-plus mr-2"></i> New Task
                </button>
              </div>
              
              <div v-if="!todos.length" >
                <v-skeleton-loader v-for="n in 5" :key="n" class="my-4"
                  color="secondary"
                  type="list-item-two-line"
                ></v-skeleton-loader>
              </div>
  
              <div v-else id="taskList" class="space-y-4 h-[480px] max-h-full overflow-y-auto pr-2">                
                <TodoItem 
                    v-for="todo in todos" 
                    :key="todo.id" 
                    :todo="todo" 
                    @fetch-todos="fetchTodos"
                />    
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTodo @fetch-todos="fetchTodos" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'
import AddTodo from './AddTodo.vue'
import axios from 'axios'

const todos = ref([])
const loading = ref(false)

const fetchTodos = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/todos')
    const data = res.data
    todos.value = data.filter(item => item.completed == false)
    loading.value = false
  } catch (error) {
    console.error('Error ', error)
  }
}

onMounted(fetchTodos)

</script>