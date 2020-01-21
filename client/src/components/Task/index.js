import React, { Component } from "react";
import styled from "styled-components";
import AddTask from "../AddTask";
import * as utils from "../../shared/utils";

class index extends Component {
  render() {
    //  console.log(this.props);
    return this.props.task.isEditMode ? (
      <AddTask
        onTaskCreated={this.props.onTaskUpdated}
        listId={this.props.listId}
        dueDate={this.props.dueDate}
        task={this.props.task}
      />
    ) : (
      <div className={this.props.className}>
         <label>
          <input
            type="button"
            className="submit"
            value="X"
            onClick={() => this.props.onTaskDeleted(this.props.task)}
          />
        </label>
        <label>
          <input
            type="button"
            className="submit"
            value="Edit"
            onClick={() => this.props.onEditTask(this.props.task)}
          />
        </label>
        <input
          type="checkbox"
          id={this.props.task.id}
          checked={this.props.task.completed}
          onChange={() =>
            this.props.onTaskChecked(
              this.props.task,
              !this.props.task.completed
            )
          }
          onClick={() =>
            this.props.onTaskChecked(
              this.props.task,
              !this.props.task.completed
            )
          }
        />
        <label>{this.props.task.title}</label>
        <label className="dueDate">
          {utils.getDayFromNumber(
            utils.getLocalTime(this.props.task.due_date).getDay()
          )}
        </label>
      </div>
    );
  }
}

const StyledIndex = styled(index)`
  & {
    background-color: #f7f7f7;
    padding: 10px;
    margin: 5px 0px;
    cursor: pointer;

    label {
      cursor: pointer;
    }

    .dueDate {
      margin: 0px 5px;
      font-size: 10px;
      color: #666;
    }
  }
`;

export default StyledIndex;
