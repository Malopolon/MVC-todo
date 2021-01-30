var tasks = [];

function toLocal(task) {
    var strTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', strTasks);
}



class View {
  constructor(model) {
    this.input = document.createElement("input");
    this.addButton = document.createElement("button");
    this.showButton = document.createElement("button");
    this.mainBlock = document.querySelector("div#app");
    this.inputWrapp = document.createElement('div');
    this.model = model;
  }
  
  initReneder() {
    this.inputWrapp.append(this.input, this.addButton, this.showButton);
    this.mainBlock.append(this.inputWrapp);
    this.addButton.innerHTML = "ADD";
    this.showButton.textContent = 'Show to Do list';
  }
  
}

class ViewList {
  constructor(model, view) {
    this.mainBlock = document.querySelector("div#app");
    this.listWrapp = document.createElement('div.list_wrapp');
    this.backButton = document.createElement("button");
      this.backButton.addEventListener('click', () => this.view.mainBlock.replaceChild(this.view.inputWrapp, this.listWrapp));
      this.backButton.addEventListener('click', () => this.taskList.innerHTML ='');
      this.backButton.textContent = 'Back';
    this.taskList = document.createElement("div");
    this.model = model;
    this.view = view;
  }

  initListrender() {
  this.mainBlock.append(this.listWrapp);
  this.mainBlock.replaceChild(this.listWrapp, this.view.inputWrapp);
  this.listWrapp.append(this.backButton, this.taskList);

    let returnTasks = JSON.parse(localStorage.getItem('tasks'));
    returnTasks.forEach(element => {
        let itemWrapp = document.createElement('div')
        itemWrapp.classList.add('item_wrapp');
      const itemTask = document.createElement("div");
        itemTask.classList.add('item');
        itemTask.innerHTML = element;
      const itemRemove = document.createElement("button");
        itemRemove.textContent = 'X';
        itemRemove.classList.add('remove');
        itemRemove.addEventListener('click', () => itemWrapp.remove());
        itemRemove.addEventListener('click', () => this.model.removeTask(element));
      itemWrapp.append(itemTask, itemRemove);
      this.taskList.append(itemWrapp);
    });
  }
}

class Controller {
  constructor(model, view, view2) {
    this.model = model;
    this.view = view;
    this.view2 = view2;
  }
  
  addData() {
    let value = this.view.input.value;
    this.model.addTask(value);
    this.view.input.value = '';
  }

  addHandle() {
    this.view.addButton.addEventListener("click", () => this.addData());
  }

  renderList() {
    this.view.showButton.addEventListener("click", () => this.view2.initListrender());
  }
}

class Model {
  addTask(value) {
    tasks.push(value);
    toLocal();
  } 
  removeTask(value) {
    tasks.splice(tasks.indexOf(value),1);
    toLocal();
    console.log(tasks);
  }
}

(function init() {
  const model = new Model();
  const view = new View(model);
  const view2 = new ViewList(model, view);
  const controller = new Controller(model, view, view2);
  view.initReneder();
  controller.addHandle();
  controller.renderList();
})();