import React, { Component } from "react";
import styled from "styled-components";
import * as utils from "../../shared/utils";
require("dotenv").config();

class index extends Component {
  constructor(props) {
    super(props);
    this.onTaskCreated = this.onTaskCreated.bind(this);
    if (this.props.task) {
      this.state = {
        title: this.props.task.title.split("-")[1],
        category: this.props.task.title.split("-")[0],
        id: this.props.task.id,
        revision: this.props.task.revision,
        //dueDate: null
        dueDate: utils.getLocalTime(this.props.task.due_date)
      };
    } else {
      this.state = {
        title: "",
        category: "",
        dueDate: null
      };
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onDueDateSelected = this.onDueDateSelected.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.dates = [];
    for (const [key, value] of Object.entries(this.props.dueDate)) {
      this.dates.push(
        <label key={key}>
          <input
            type="radio"
            value={value}
            id={key}
            name="dueDates"
            onChange={this.onDueDateSelected}
            defaultChecked={
              value == utils.getLocalTime(this.state.dueDate).toDateString()
            }
          />
          {key.substr(0, 3)}
        </label>
      );
    }
  }
  onKeyUp(e) {
    console.log(e.keyCode);
    console.log(this.props.dueDate);
    this.setState({
      dueDate: new Date(Object.entries(this.props.dueDate)[0][1])
    });
  }
  onTaskCreated() {
    let task = {
      title: this.state.category + " - " + this.state.title,
      list_id: parseInt(this.props.listId),
      due_date: this.state.dueDate && this.state.dueDate.toISOString(),
      created_at: new Date().toISOString(),
      id: this.state.id,
      revision: this.state.revision,
      created_by_id: 12622839,
      starred: false,
      type: "task"
    };
    console.log(task);
    this.props.onTaskCreated(task);
  }

  onTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  onDueDateSelected(e) {
    this.setState({
      dueDate: new Date(e.target.value)
    });
  }

  onCategoryChange(e) {
    this.setState({
      category: e.target.value
    });
  }

  render() {
    return (
      <div className={this.props.className} onKeyDown={e => this.onKeyUp(e)}>
        <input
          type="text"
          placeholder="category"
          value={this.state.category}
          onChange={this.onCategoryChange}
          className="categoryInput"
        />
        <label className="separator">-</label>
        <input
          type="text"
          placeholder="task"
          value={this.state.title}
          onChange={this.onTitleChange}
          className="taskInput"
        />
        <span className="dueDateContainer">{this.dates}</span>
        <input
          type="button"
          className="submit"
          value={this.props.task ? "Save" : "Add"}
          onClick={this.onTaskCreated}
        />
      </div>
    );
  }
}

const StyledIndex = styled(index)`
  & {
    padding: 10px;
    background-color: #3b4650;
    color: #fff;
    padding: 7px 10px;
    margin: 5px 0px;
    margin-top: 0px;
  }
  .separator {
    margin: 0px 3px;
  }

  input[type="text"] {
    height: 20px;
  }
  input[type="radio"] {
    display: inline;
    margin-right: 0px;
  }

  .dueDateContainer label {
    padding: 0px 3px;
    font-size: 10px;
  }

  .categoryInput {
    width: 50px;
  }

  .taskInput {
    width: 50%;
  }

  .submit {
    margin-left: 20px;
  }
`;

export default StyledIndex;
