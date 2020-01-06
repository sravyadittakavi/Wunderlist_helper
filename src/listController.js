const utils = require("./utils")();
const wunderlistHelper = require("./wunderlistHelper");
const defaultTasks = require("./tasks.config");

const todoHelper = wunderlistHelper();
const ListController = function() {
  const setupNextWeek = async function(lastWeekId) {
    // Get current week list name
    let currentWeek = utils.getCurrentWeekListName();
    let currentWeekId = await todoHelper.getListIdByName(currentWeek);

    // HACK: for testing
    currentWeekId = lastWeekId;

    // Get next week list name
    let nextWeek = utils.getNextWeekListName();

    console.log(`Current week: ${currentWeekId}`);
    console.log(`Next week: ${nextWeek}`);

    // Get all incomplete items in the current week
    let openTasks = await todoHelper.getAllOpenTasksFromList(currentWeekId);
    console.log(openTasks);
    // Remove due dates for all entries in the current list
    openTasks.map(async x => {
      return await todoHelper.removeDueDateForATask(x);
    });

    // Create new list for next week
    let nextWeekList = await todoHelper.createList(nextWeek);

    // Compile list of new tasks to be created
    let newTasks = openTasks.map(x => {
      return {
        list_id: nextWeekList.id,
        title: x.title
      };
    });

    let newDefaultTasks = defaultTasks.map(x => {
      return {
        list_id: nextWeekList.id,
        title: x
      };
    });

    newTasks = newTasks.concat(newDefaultTasks);
    const result = [];
    const map = new Map();
    for (const item of newTasks) {
      if (!map.has(item.title)) {
        map.set(item.title, true);
        result.push(item);
      }
    }

    // Create tasks in the new list from all incomplete tasks from last week
    await todoHelper.createTaskFromList(result);

    return result;
  };

  const getCategoryStats = function(listId) {
    if (!listId) {
      let currentWeek = utils.getCurrentWeekListName();
      //  listId = await todoHelper.getListIdByName(currentWeek);
    }

    // Get all the tasks
    // let openTasks = await todoHelper.getAllOpenTasksFromList(currentWeekId);
    // Compute the category stats
  };

  const updateTaskInList = async function(task, listId) {
    if (!task.id) {
      return await todoHelper.createTask(task);
    } else {
      return todoHelper.updateTaskInList(task, listId);
    }
  };

  const getAllTasksInList = function(listId) {
    return todoHelper.getAllTasksFromList(listId);
  };

  const allLists = function() {
    return todoHelper.getAllLists();
  };

  return {
    setupNextWeek: setupNextWeek,
    getCategoryStats: getCategoryStats,
    allLists: allLists,
    getAllTasksInList: getAllTasksInList,
    updateTaskInList: updateTaskInList
  };
};

module.exports = ListController;
