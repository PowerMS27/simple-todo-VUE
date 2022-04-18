<template>
  <div class="todo">
    <div class="todo__input">
      <input
        v-model="inputText" 
        @keydown.enter="addItem()"
        @focus="selectState = 'active'"
        class="todo__text" 
        type="text"
      >
      <span
        @click="addItem()" 
        class="todo__add">
      </span>
    </div>
    <select 
      v-model="selectState"
      class="todo__options"
    >
      <option value="active">активные</option>
      <option value="completed">завершённые</option>
      <option value="deleted">удалённые</option>
    </select>
    <ul class="todo__items">
      <li 
        v-for="item in selectedItems"
        :key="item.text"
        :data-todo-state="selectState"
        class="todo__item"
      >
        <span class="todo__task">{{item.text}}</span>
        <div class="date">
          <span>
            {{thisAction}}: {{item.date}}
          </span>
          
        </div>
        
        <span 
          v-if="selectState === 'active'"
          @click="executeItem(item)"
          :class="classObject"
          class="todo__action" 
        >
        </span>
        <span 
          v-if="selectState === 'completed' || selectState === 'deleted'"
          @click="restoreItem(item)"
          :class="classObject"
          class="todo__action" 
        >
        </span>
        
        <!-- <span class="todo__action todo__action_complete" data-todo-action="completed"></span> -->
        <span 
          @click="deleteItem(item)"
          class="todo__action todo__action_delete" 
        >
        </span>
      </li>
    </ul>
  </div>  
</template>

<script src="./app.js"></script>

<style src="./app.css"></style>
