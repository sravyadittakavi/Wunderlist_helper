import React, { Component } from "react";
import axios from "axios";
import ListItem from "../ListItem"; 
import { Link, Route, Switch, withRouter } from "react-router-dom";
import ListPage from "../ListPage";
import styled from "styled-components";
require("dotenv").config();

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
    this.refreshLists = this.refreshLists.bind(this);
  }

  componentDidMount() {    
    // TODO: Make a call to API
    this.refreshLists();
  }

  refreshLists() {
    console.log("refreshed");
    this.setState({
      lists: []
    });
    let url =
      process.env.REACT_APP_LIST_BASE_URL + process.env.REACT_APP_GET_ALL_LISTS;
    axios.get(url).then(response =>
      this.setState({
        lists: response.data.sort((x, y) => -1)
      })
    );
  }

  render() {
    return this.state.lists.length == 0 ? (
      <div>Loading lists...</div>
    ) : (
      <div className={this.props.className}>
        <div className="left">
          {this.state.lists.map(x => (
            <ListItem key={x.id} {...x} />
          ))}
        </div>
        <div className="right">
          <div className="taskBoard">
            <Route
              path="/todo/:id"
              render={routeProps => (
                <ListPage
                  {...routeProps}
                  lists={this.state.lists}
                  refreshLists={this.refreshLists}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const StyledIndex = styled(index)`
  & {
    .left {
      float: left;
      width: 20%;
    }

    .right {
      float: left;
      width: 80%;
      padding: 0px 0px;

      .taskBoard {
        margin: 0px 10px;
      }
    }
  }
`;
export default StyledIndex;
