var WunderlistSDK = require("wunderlist");
require("dotenv").config();
var wunderlistAPI = new WunderlistSDK({
  accessToken: process.env.WUNDERLIST_ACCESS_TOKEN,
  clientID: process.env.WUNDERLIST_CLIENT_ID
});

var allLists = [];
const wunderlistHelper = function() {
  const getAllLists = async function() {
    let allLists = await wunderlistAPI.http.lists.all();
    return allLists;
  };
  const getListIdByName = async function(name) {
    if (allLists.length == 0) {
      allLists = await getAllLists();
    }

    let list = allLists.filter(x => {
      return x.title == name;
    });

    if (list.length > 0) {
      return list[0].id;
    } else {
      return -1;
    }
  };

  const updateTaskInList = async function(task, listId) {
    let revision = task.revision;
    delete task.revision;

    console.log(task);

    let data = await wunderlistAPI.http.tasks.update(task.id, revision, task);
    console.log(`data:`);
    console.log(data);
    return data;
  };

  const createTaskInList = async function(title, listId) {
    console.log({
      title: title,
      list_id: listId
    });
    let data = await wunderlistAPI.http.tasks.create({
      title: title,
      list_id: listId
    });

    return data;
  };

  const getAllTasksFromList = async function(listId) {
    let openTasks = await getAllOpenTasksFromList(listId);
    let completedTasks = await getAllCompletedTasksFromList(listId);
    //console.log(openTasks.concat(completedTasks));
    return openTasks.concat(completedTasks);
  };

  const getAllOpenTasksFromList = async function(listId) {
    return wunderlistAPI.http.tasks.forList(listId);
  };

  const getAllCompletedTasksFromList = async function(listId) {
    return wunderlistAPI.http.tasks.forList(listId, true);
  };

  const removeDueDateForATask = function(task) {
    let taskId = task.id;
    let revision = task.revision;
    let updatedData = {
      due_date: undefined
    };
    return wunderlistAPI.http.tasks.update(taskId, revision, updatedData);
  };

  const createList = function(listName) {
    return wunderlistAPI.http.lists.create({
      title: listName
    });
  };

  const createTask = function(task) {
    return wunderlistAPI.http.tasks.create(task);
  };

  const createTaskFromList = function(taskList) {
    taskList.map(async x => {
      return await createTask(x);
    });
  };

  return {
    getAllLists: getAllLists,
    getListIdByName: getListIdByName,
    getAllTasksFromList: getAllTasksFromList,
    getAllOpenTasksFromList: getAllOpenTasksFromList,
    removeDueDateForATask: removeDueDateForATask,
    createList: createList,
    createTask: createTask,
    createTaskFromList: createTaskFromList,
    updateTaskInList: updateTaskInList,
    createTaskInList: createTaskInList
  };
};

module.exports = wunderlistHelper;
