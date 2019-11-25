import React, { Component } from "react";
import axios from "axios";
import Task from "../Task";
import AddTask from "../AddTask";
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
    this.state = {
      id: this.props.match.params.id,

      tasks: [],
      listDate: this.getListEndDate(this.props.match.params.id)
    };
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
      .post("http://localhost:5000/list/tasks", {
        task: task,
        id: this.state.id
      })
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
  render() {
    if (this.state.tasks.length == 0) {
      return <h2>Loading tasks...</h2>;
    } else {
      return (
        <div className={this.props.className}>
          <div className="taskList">
            <h2>Tasks</h2>
            <AddTask
              onTaskCreated={this.onTaskCreated}
              listId={this.state.id}
              dueDate={utils.getAllDaysInList(this.state.listDate)}
            />
            {this.state.tasks.map(x => (
              <Task
                key={x.id}
                task={x}
                onTaskChecked={this.onTaskChecked}
                listId={this.state.id}
                dueDate={utils.getAllDaysInList(this.state.listDate)}
                onEditTask={this.onEditTask}
                onTaskUpdated={this.onTaskUpdated}
              />
            ))}
          </div>
          {/* <div className="add">
         
          </div> */}
        </div>
      );
    }
  }
}

const StyledIndex = styled(index)`
  & {
  }
`;

export default StyledIndex;
