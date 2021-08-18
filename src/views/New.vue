<template>
  <form class="card" @submit.prevent="newTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="taskName">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="taskDate">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="taskText"></textarea>
    </div>

    <button class="btn primary" @click="submitNewTask">Создать</button>
  </form>
</template>


<script>
</script>
