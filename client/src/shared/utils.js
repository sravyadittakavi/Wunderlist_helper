/**
 * Retuns the list date object
 * @param {name} List name
 */
export const getListEndDate = function(name) {
  let endDate = new Date(name);
  return endDate;
};

/**
 * Returns an array of all the days in the list
 * @param {listEndDate} listEndDate
 */
export const getAllDaysInList = function(listEndDate) {
  let days = {};
  let dayIterator = [6, 5, 4, 3, 2, 1, 0];
  //console.log(listEndDate);
  dayIterator.map(x => {
    let newDate = new Date(listEndDate);

    newDate = new Date(newDate.setDate(newDate.getDate() - x));
    let day = getDayFromNumber(newDate.getDay());
    days[day] = newDate.toDateString();
  });

  return days;
};

export const getDayFromNumber = function(number) {
  if (number < 0 || number > 6) {
    return null;
  }
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };

  return days[number];
};

export const getLocalTime = function(date) {
  return new Date(date + " GMT-0800");
};
