import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

class index extends Component {
  render() {
    return (
      <NavLink className={this.props.className} to={"/todo/" + this.props.id} activeClassName="active">
        <div>{this.props.title}</div>
      </NavLink>
    );
  }
}

const StyledIndex = styled(index)`
  & {
    text-decoration: none;
    background-color: #ececec;
    color: #333;
    div {
      padding: 10px;
      text-align: left;
      background-color: inherit;
      border: 2px solid #ccc;
    }

    &.active{
      background-color: #647687;
      color:#fff ;
      font-weight:bold;
    }
   
  }
`;

export default StyledIndex;
