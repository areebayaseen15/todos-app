#! /usr/bin/env node
//        Project 03: Todos
import inquirer from "inquirer"
import chalk from "chalk";

let todos = [];
let condition = true;

console.log(
  chalk.bold.greenBright.italic(`\n
*****************************************************************************************************

                            WELCOME TO MY TODOS APP!!!!!

 ***************************************************************************************************\n`)
);
let create = await inquirer.prompt({
    name: "todolist",
    type: "input",
    message: chalk.bgGray("Create your own todos list."),
    validate: function (input) {
      if (input.trim() == "") {
        return "Please enter a non-empty item...";
      }
      return true;
    },
  });
  if (create.todolist.trim() !== "") {
    todos.push(create.todolist);
    todos.forEach(todo =>console.log(chalk.magenta.bold.italic(todo)
  ))
  }
  while (condition) {
    let operations = await inquirer.prompt({
        name: "selectTask",
    type: "list",
    message:chalk.bold.grey("Select anyone"),
    choices: [
      "Add task",
      "Delete task",
      "update task",
      "view-todo-list",
      "Exit",
    ],
  });
  if (operations.selectTask === "Add task") {
    let add_task = await inquirer.prompt({
      name: "addMore",
      type: "input",
      message: chalk.red("What do you want to add in your todoslist?"),
      validate: function (input) {
        if (input.trim() == "") {
          return chalk.arguments("Please enter a non-empty item...");
        }return true;
    },
  });
  if (add_task.addMore.trim() !== "") {
    todos.push(add_task.addMore);
    todos.forEach((todo) => console.log(chalk.bold.italic.magenta(todo)));
  }
}

if (operations.selectTask === "update task") {
  let update = await inquirer.prompt({
    name: "updatelist",
    type: "list",
    message: chalk.red("Update tasks in the list"),
    choices: todos.map((task) => task),
  });
  let add_task = await inquirer.prompt({
    name: "addMore",
    type: "input",
    message: chalk.red("Add new task to replace in your todoslist?"),
    validate: function (input) {
      if (input.trim() == "") {
        return "Please enter a non-empty item...";
      }
      return true;
    },
  });
  if (add_task.addMore.trim() !== "") {
    let newTodos: any = todos.filter((val) => val !== update.updatelist);
    todos = [...newTodos, add_task.addMore];
    console.log(chalk.bold.italic.yellow(
      `Your todoslist is successfully updated!!.Your new updated todolist is`
    ));

    todos.forEach((todo) => console.log(chalk.magenta(todo)));
  }
}

if (operations.selectTask === "view-todo-list") {
  console.log(chalk.yellowBright(`******** Your Todo-list is *****`));
  todos.forEach((todo) => console.log(chalk.magentaBright(todo)));
}

if (operations.selectTask === "Delete task") {
  let DeleteTask = await inquirer.prompt({
    name: "delete",
    type: "list",
    message: chalk.red("Select the task you want to delete from the list"),
    choices: todos.map((task) => task),
  });
  let newTodos: any = todos.filter((val) => val !== DeleteTask.delete);
  todos = [...newTodos];
  
  todos.forEach((todo) => console.log(chalk.magentaBright(todo)));
}

if (operations.selectTask === "Exit") {
  console.log(chalk.bold.yellowBright.italic(`Thanks for using the todos App!!!`));
  condition = false;
}
}
