import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class index extends Component {
  render() {
    return (
      <Link className={this.props.className} to={"/todo/" + this.props.id}>
        <div>{this.props.title}</div>
      </Link>
    );
  }
}

const StyledIndex = styled(index)`
  & {
    text-decoration: none;
    div {
      padding: 10px;
      text-align: left;
      background-color: #ececec;
      border: 2px solid #ccc;
      color: #333;
    }
  }
`;

export default StyledIndex;
