import React, { Component } from "react";
import styled from "styled-components";

class index extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <label>
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
    background-color: #f7f7f7;
    padding: 10px;
    margin: 5px 0px;
    cursor: pointer;
  }
`;

export default StyledActionBar;
