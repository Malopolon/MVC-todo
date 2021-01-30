class View {
  constructor(model) {
    this.input = document.createElement("input");
    this.addButton = document.createElement("button");
    this.mainBlock = document.querySelector("div#app");
    this.taskList = document.createElement("div");
    this.model = model;
    this.removeTask = this.model.removeTask.bind(this);
  }
  
  initReneder() {
    this.mainBlock.append(this.input, this.addButton, this.taskList);
    this.addButton.innerHTML = "ADD";
  }
  
  
  renderTask(value) {
    let itemWrapp = document.createElement('div')
        itemWrapp.classList.add('item_wrapp');
    const item = document.createElement("div");
        item.classList.add('item');
    item.innerHTML = value;
    const itemRemove = document.createElement("button");
      itemRemove.textContent = 'X';
      itemRemove.classList.add('remove');
      itemRemove.addEventListener('click', () => itemWrapp.remove());
      itemRemove.addEventListener('click', () => this.model.removeTask(value));
    itemWrapp.append(item, itemRemove);
    this.taskList.append(itemWrapp);
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  addData() {
    let value = this.view.input.value;
    this.model.addTask(value);
    this.view.renderTask(value);
    this.view.input.value = '';
  }
  
  addHandle() {
    this.view.addButton.addEventListener("click", () => this.addData());
  }

 
}

class Model {
  constructor() {
    this.tasks = [];
  }
  
  addTask(value) {
    this.tasks.push(value);
  } 
  removeTask(value) {
    this.tasks.splice(this.tasks.indexOf(value),1);
    console.log(this.tasks);
  }
}

(function init() {
  const model = new Model();
  const view = new View(model);
  const controller = new Controller(model, view);
  view.initReneder();
  controller.addHandle();
})();