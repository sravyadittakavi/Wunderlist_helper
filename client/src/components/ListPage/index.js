import React, { Component } from "react";
import axios from "axios";
import Task from "../Task";
import AddTask from "../AddTask";
import ActionBar from "../ActionBar";
import styled from "styled-components";
import * as utils from "../../shared/utils";

require("dotenv").config();

class index extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;

    this.getListEndDate = this.getListEndDate.bind(this);

    this.getTasks = this.getTasks.bind(this);
    this.onTaskChecked = this.onTaskChecked.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.onTaskCreated = this.onTaskCreated.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onTaskUpdated = this.onTaskUpdated.bind(this);
    this.onTaskDeleted = this.onTaskDeleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onSetupNextWeek = this.onSetupNextWeek.bind(this);
    this.sortList = this.sortList.bind(this);
    this.state = {
      id: this.props.match.params.id,

      tasks: [],
      listDate: this.getListEndDate(this.props.match.params.id)
    };
  }

  SortOptions = {
    Name: "Name",
    DueDate: "DueDate",
    TaskName: "TaskName"
  };

  onSetupNextWeek(listId) {
    console.log("Clicked setup next week: " + listId);
    axios
      .get(
        process.env.REACT_APP_LIST_BASE_URL +
          process.env.REACT_APP_SETUP_NEXT_WEEK +
          listId
      )
      .then(response => {
        this.props.refreshLists();
      });
  }

  getTasks(listId) {
    this.setState({
      tasks: []
    });
    axios
      .get(
        process.env.REACT_APP_LIST_BASE_URL +
          process.env.REACT_APP_GET_TASKS_IN_LIST +
          listId
      )
      .then(response => {
        this.setState({
          tasks: response.data
        });
      });
  }

  getListEndDate(id) {
    let listTitle = this.props.lists.filter(x => x.id == id);
    return utils.getListEndDate(listTitle[0].title);
  }
  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.match.params.id != this.props.match.params.id) {
      this.setState({
        id: this.props.match.params.id,
        tasks: [],
        listDate: this.getListEndDate(this.props.match.params.id)
      });

      this.getTasks(this.props.match.params.id);
    }
  }
  componentDidMount() {
    this.getTasks(this.state.id);
  }

  onTaskCreated(task) {
    this.updateTask(task, true);
  }

  onEditTask(task) {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(x => {
        if (x.id == task.id) {
          x.isEditMode = true;
        } else {
          x.isEditMode = false;
        }
        return x;
      })
    }));
    console.log(task);
  }

  onTaskChecked(task, isChecked) {
    if (task.isUpdating) {
      return;
    }

    this.setState(prevState => ({
      tasks: prevState.tasks.map(x => {
        if (x.id == task.id) {
          x.isUpdating = true;
          x.completed = isChecked;
          x.isEditMode = false;
        }
        return x;
      })
    }));

    this.updateTask(task);
  }

  onTaskUpdated(task) {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(x => {
        if (x.id == task.id) {
          x.isEditMode = false;
        }
        return x;
      })
    }));
    this.updateTask(task, false);
  }

  updateTask(task, refresh = false) {
    axios
      .post(
        process.env.REACT_APP_LIST_BASE_URL +
          process.env.REACT_APP_GET_TASKS_IN_LIST,
        {
          task: task,
          id: this.state.id
        }
      )
      .then(response => {
        this.setState(prevState => ({
          tasks: prevState.tasks.map(x => {
            if (x.id == response.data.id) {
              x = Object.assign({}, response.data);
            }
            return x;
          })
        }));

        if (refresh) {
          this.getTasks(this.state.id);
        }
      });

    console.log(this.state.tasks);
  }

  onTaskDeleted(task) {
    console.log("entered");
    this.deleteTask(task);
  }

  deleteTask(task) {
    console.log(
      process.env.REACT_APP_LIST_BASE_URL +
        process.env.REACT_APP_DELETE_TASK_IN_LIST
    );
    axios
      .post(
        process.env.REACT_APP_LIST_BASE_URL +
          process.env.REACT_APP_DELETE_TASK_IN_LIST,
        {
          task: task,
          id: this.state.id
        }
      )
      .then(response => {
        this.getTasks(this.state.id);
        console.log(response.data);
      });
  }
  sortList(sortOption) {
    switch (sortOption) {
      case this.SortOptions.Name: {
      }
    }
    console.log("entered");
    let newTasks = Object.assign([], this.state.tasks);
    newTasks.sort((x, y) => x.title - y.title);
    console.log(newTasks);
    this.setState(prevState => ({
      tasks: newTasks
    }));
  }

  render() {
    // if (this.state.tasks.length == 0) {
    //   return <h2>Loading tasks...</h2>;
    // } else {
    return (
      <div className={this.props.className}>
        <div className="taskList">
          <h2>Tasks</h2>
          <AddTask
            onTaskCreated={this.onTaskCreated}
            listId={this.state.id}
            dueDate={utils.getAllDaysInList(this.state.listDate)}
          />
          <ActionBar
            listId={this.state.id}
            onSetupNextWeek={this.onSetupNextWeek}
            onSortChange={this.sortList}
          ></ActionBar>
          {this.state.tasks.length == 0 ? (
            <h2>Loading tasks...</h2>
          ) : (
            this.state.tasks.map(x => (
              <Task
                key={x.id}
                task={x}
                onTaskChecked={this.onTaskChecked}
                listId={this.state.id}
                dueDate={utils.getAllDaysInList(this.state.listDate)}
                onEditTask={this.onEditTask}
                onTaskDeleted={this.onTaskDeleted}
                onTaskUpdated={this.onTaskUpdated}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
//}

const StyledIndex = styled(index)`
  & {
  }
`;

export default StyledIndex;
