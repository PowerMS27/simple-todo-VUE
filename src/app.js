/* eslint-disable prettier/prettier */

export default {
   name: "App",
   data() {
      return {
         inputText: "",
         todoItems: [],
         selectState: "active",
         thisDate: null,
         thisAction: null
      };
   },
   created() {
      const todosData = JSON.parse(localStorage.getItem("todos1"));
      this.todoItems = todosData;
   },
   computed: {
      classObject() {
         if (this.selectState === "active") {
            return "todo__action_complete"
         }
         if (this.selectState === "completed" || this.selectState === "deleted") {
            return "todo__action_restore"
         }
      },
      selectedItems() {
         return this.todoItems.filter(item => item.section === this.selectState)
      },
      
   },
   methods: {
      addItem() {
         const currentInput = {
            text: "",
            section: "active",
            date: ""
         }
         currentInput.text = this.inputText;
         currentInput.date = this.currentDate();
         this.todoItems = [...this.todoItems, currentInput];
         this.inputText = "";
      },
      deleteItem(currentItem) {
         if (currentItem.section === "deleted") {
            this.todoItems = this.todoItems.filter(item => item != currentItem);
         }
         currentItem.section = "deleted";
         currentItem.date = this.currentDate();
         this.returnToActive();
      },
      executeItem(currentItem) {
         currentItem.section = "completed"
         currentItem.date = this.currentDate();
         this.returnToActive();
      },
      restoreItem(currentItem) {
         currentItem.section = "active"
         currentItem.date = this.currentDate();
         this.returnToActive();
      },
      returnToActive() {
         if (this.selectedItems.length === 0) {
            this.selectState = "active"
         }
      },
      currentDate() {
         var date = new Date();

         var options = {
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
         };

         return date.toLocaleString("ru", options)

      },
   },
   watch: {
      selectedItems() {
         localStorage.setItem("todos1", JSON.stringify(this.todoItems));

         if (this.selectState === "active") {
            this.thisAction = "Добавлено"
         }
         if (this.selectState === "completed") {
            this.thisAction = "Завершено"
         }
         if (this.selectState === "deleted") {
            this.thisAction = "Удалено"
         }
      },
   }
};