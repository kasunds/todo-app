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
              <div v-for="todo in todos" :key="todo.id"
                class="task-item bg-zinc-900 hover:shadow-md hover:bg-zinc-800 rounded-lg p-4 transform transition-all duration-300">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddTodo @fetch-todo="fetchTodos" />
    <v-snackbar v-model="alert" location="top">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import AddTodo from './AddTodo.vue'

export default {
  data() {
    return {
      todos: [],
      selectedId: null,
      loading: false,
      alert: false,
      text: ''
    }
  },
  components: { AddTodo },
  mounted() {
    this.fetchTodos()
  },
  methods: {
    async completeTodo(id) {
      if (this.loading) false
      this.selectedId = id
      this.loading = true
      await axios.patch(`http://localhost:8000/api/todos/${id}`)
      this.text = 'Task Completed !'
      this.fetchTodos()
      this.alert = true
    },
    async deleteTodo(id) {
      this.loading = true
      this.selectedId = id
      await axios.delete(`http://localhost:8000/api/todos/${id}`)
      this.text = 'Task Deleted !'
      this.fetchTodos()
      this.alert = true
    },
    async fetchTodos() {
      const res = await axios.get('http://localhost:8000/api/todos')
      const todos = res.data
      this.todos = todos.filter(item => item.completed == false)
      this.loading = false
    }
  }
}
</script>