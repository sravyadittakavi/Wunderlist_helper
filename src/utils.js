const utils = function() {
  const getCurrentWeekListName = function() {
    return getNextSundayWithOffset(0);
  };

  const getNextWeekListName = function() {
    return getNextSundayWithOffset(7);
  };

  const getNextSundayWithOffset = function(offset) {
    // Get current date
    let date = new Date();

    // Get day of the week
    let day = date.getDay();

    // Compute number of days to the immediate Sunday
    let daysToAdd = offset;

    if (day !== 0) {
      daysToAdd = offset + 7 - (day % 7);
    }

    // Add the days and return the list name
    date.setTime(date.getTime() + daysToAdd * 86400000);

    //date.setTime(date.getTime() + 2 * 86400000);
    return getListNameFromDate(date);
  };

  const getListNameFromDate = function(date) {
    const monthName = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December"
    };
    //let date = new Date();
    if (date instanceof Date) {
      // Get Month
      let month = date.getMonth();

      // Get Day
      let day = date.getDate();

      // Get year
      let year = date.getFullYear();

      // Return formatted string
      return `${monthName[month]} ${day}, ${year}`;
    }
  };

  return {
    getCurrentWeekListName: getCurrentWeekListName,
    getNextWeekListName: getNextWeekListName
  };
};

module.exports = utils;
