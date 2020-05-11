import "./style.css";

/* recupération des differents documents de notre liste*/

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form>input");

/* creation de la liste des tâches */

const todos = [
  {
    text: "Je suis une todo",
    done:"false",
    editMode:true
  },
  {
    text: "Faire du Javascript",
    done:"true",
    editMode:false
  }
];
/* rajout de nouvelle element à notre formulaire */

 form.addEventListener("submit", event  => {
   event.preventDefault();
   const value = input.value;
   input.value = "";
   addTodo(value);
 });


/*creation de la fonction de notre liste de tâches*/

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if(todo.editMode) {
      return createTodoEditElement(todo, index);
    }
    else {
      return createTodoElement(todo, index);
    }  
  });

  ul.innerHTML = "";
  ul.append(...todosNode);
};


/* creation de notre fonction d'affichage des liste de taches */

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Editer";
  buttonEdit.classList.add("primary");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML ="Supprimer";
  buttonDelete.classList.add("danger");

  buttonDelete.addEventListener("click", event => {
    event.stopPropagation();
    deleteTodo(index);
  });

  buttonEdit.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode();
  });

  li.innerHTML = `
    <span class = "todo ${todo.done? "done":""}"></span>
    <p class="${todo.done? "done":""}"> ${todo.text}</p>
  `;
  li.append(buttonDelete);

  li.addEventListener("click", event => {
    toggleTodo(index);
  });



  return li;
};

/* creation de notre fonction d'affichage des liste en mode edition */

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = "todo.text";
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  buttonSave.classList.add("success");
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.classList.add("primary");

  buttonSave.addEventListener("click", event => {
    event.stopPropagation();
    editTodo(index, input);
  });

  buttonCancel.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });

/*empecher le dblclick de changer deux fois de suite le statut de la todo*/

  let timer;
  li.addEventListener("click", event => {
    if(event.detail === 1) {
      timer = setTimeout(() => {
        toggleTodo(index);}, 200);
    } 
    else if (event.detail > 1) {
      clearTimeout(timer);
      toggleEditMode(index);
    }
  });


  li.append(input, buttonSave, buttonCancel);

  return li;

}


/* creation de la methode d'ajout de todo - addTodo*/

/* empecher l'ajout de todo vide*/

const addTodo = text => {
  text = text.trim(); /* meth.trim()supprime les espaces vide av/ap une cc */
  if (text){
    todos.push({
      text:`${text[0].toUpperCase()}${text.slice(1)}`,
      done:false
  });
  displayTodo();
  }
};

/* creation de la methode de suppression de todo - deleTodo*/

const deleteTodo = index => {
  todos.splice(index, 1);
  displayTodo();
};

/* creation de la methode toggle pour faire le switch de todo */

const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
}

/* craetion de la methode toggle pour faire le switch de l'edition */

const toggleEditMode = index => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();

};

/* cration de la methode edit qui fera l'edition de la todo */

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

/* creation d'ecouteur pour sauvegarder l'edition avec la touche entrée */

input.addEventListener("keydown", event => {
  if(event.key === "Enter") {
    editTodo(index, input);
  }
});


/* 1ere invocation de la fonction displayTodo*/
/* cette fonction sera réinvoquée a chaque fois qu'il y des methodes supplementaires*/

displayTodo();