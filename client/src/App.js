import React from "react";
import logo from "./logo.svg";
import AllLists from "./components/AllLists";
import styled from "styled-components";
import "./App.css";

function App(props) {
  return (
    <div className={props.className}>
      <AllLists />
    </div>
  );
}

const StyledApp = styled(App)`
  & {
    margin: 1px 0px;
  }
`;

export default StyledApp;
