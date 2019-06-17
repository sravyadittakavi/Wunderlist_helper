const utils = require("./utils")();
const wunderlistHelper = require("./wunderlistHelper");
const defaultTasks = require("./tasks.config");

const todoHelper = wunderlistHelper();
const ListController = function() {
  const setupNextWeek = async function() {
    // Get current week list name
    let currentWeek = utils.getCurrentWeekListName();
    let currentWeekId = await todoHelper.getListIdByName(currentWeek);

    // HACK: for testing
    currentWeekId = 396233857;

    // Get next week list name
    let nextWeek = utils.getNextWeekListName();

    console.log(`Current week: ${currentWeekId}`);
    console.log(`Next week: ${nextWeek}`);

    // Get all incomplete items in the current week
    let openTasks = await todoHelper.getAllOpenTasksFromList(currentWeekId);

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

    // Create tasks in the new list from all incomplete tasks from last week
    await todoHelper.createTaskFromList(newTasks);

    return newTasks;
  };

  const getCategoryStats = function(listId) {
    if (!listId) {
        let currentWeek = utils.getCurrentWeekListName();
        listId = await todoHelper.getListIdByName(currentWeek);        
    }

    // Get all the tasks
    let openTasks = await todoHelper.getAllOpenTasksFromList(currentWeekId);
    // Compute the category stats
  };

  return {
    setupNextWeek: setupNextWeek,
    getCategoryStats:getCategoryStats
  };
};

module.exports = ListController;
