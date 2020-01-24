import React, { Component } from "react";
import styled from "styled-components";

class index extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <label>Sort options:</label>
        <label>
          <input
            type="radio"
            value="Name"
            name="sortOptions"
            onChange={() =>
              this.props.onSortChange(this.props.SortOptions.Name)
            }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            value="Name"
            name="sortOptions"
            onChange={() =>
              this.props.onSortChange(this.props.SortOptions.DueDate)
            }
          />
          Due date
        </label>
        <label>
          <input
            type="radio"
            value="Name"
            name="sortOptions"
            onChange={() =>
              this.props.onSortChange(this.props.SortOptions.TaskName)
            }
          />
          Task name
        </label>
        <label className="setup-next-week">
          <input
            type="button"
            className="submit"
            value="setup next week"
            onClick={() => this.props.onSetupNextWeek(this.props.listId)}
          />
        </label>
      </div>
    );
  }
}

const StyledActionBar = styled(index)`
  & {
    background-color: #647687;
    color: #fff;
    padding: 10px;
    margin: 5px 0px;
    cursor: pointer;
    font-size: 12px;

    input[type="radio"] {
      margin-left: 10px;
      margin-right: -1px;
    }
    .setup-next-week {
      margin-left: 30px;
    }
  }
`;

export default StyledActionBar;
