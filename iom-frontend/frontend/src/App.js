import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route } from 'react-router'
import {BrowserRouter, Redirect } from 'react-router-dom';
import StoreCreate from './components/Store';
import './App.css';

// import history from './history';

import {Link } from "react-router-dom";

const BasicExample = () => (
  <BrowserRouter >
  <Switch>
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">IOM</a>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a  className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a  className="nav-link" href="/register">Register</a>
            </li>
            <li className="nav-item">
              <a  className="nav-link" href="/users">Index</a>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
      <Route path="/register" component={UserForm}/>
      <Route path='/users' component={UserIndex}/>
      <Route path={'/update/:user_id'} component={UserForm}/>
      <Route path={'/delete/:user_id'} component={UserIndex}/>
      <Route path={'/store/:user_id'} component={Store}/>
    </div>
    </Switch>
  </BrowserRouter>
);

const Store = ({match}) => ( 
  <div>
  <StoreCreate 
  match = {match} />
</div>
)


class UserIndex extends Component {
  state = {value: '0',
    todos: []
  };

  async componentDidMount() {
    try {
      debugger
      if (this.props.match.url == "/users"){
        console.log('hh')
        this.state.value = 'users/'
      }
      if (this.props.match.url.includes('delete')){
        this.state.value = 'users/delete/'+this.props.match.params.user_id+'/'
      }
      const res = await fetch(`http://127.0.0.1:8000/${this.state.value}`)
      const todos = await res.json();
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }    

  }
  render() {
    console.log("entered")
    return (
      <div>
        <table className="table">
          <thead>
            <tr className ="text-center">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">EmployeeId</th>
              <th scope="col" colspan= "3" >Action</th>

            </tr>
          </thead>
          <tbody>
            {this.state.todos.map(user => (
              <tr className ="text-center">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.employee_id}</td>
                  <td><a href={`update/${user.id}`}>Update</a></td>
                  <td><a href={`delete/${user.id}`}>Delete</a></td>
                  <td><a href={`store/${user.id}`}>Add Store Idea</a></td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>  
    );
  } 
}

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = {'url':'/users/register' , 'value': '',}
    if( this.props.match.url.includes("update")){
      this.state.url = '/users/update'
      this.state.value =  this.props.match.params.user_id+'/'
    }

  }
  handleRedirect(res){
    debugger
    console.log(res.status === 204)
    if( res.status === 204 ){
      this.setState({redirect:'yes'})
     
    }else {
      console.log("bad")
    }

  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(`http://127.0.0.1:8000${this.state.url}/${this.state.value}`, {
      method: 'POST',
      body: data,
    }).then(this.handleRedirect)
  }
  
  render() {
    return (
      <div className="container">
        <h2>Manage Account</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Enter name: </label>
            <input id="name"  className="form-control" placeholder="Enter Name" name="name" type="text" />
            <br/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Enter your email: </label>
            <input id="email"  className="form-control" placeholder="Enter Email" name="email" type="email"/>
            <br/>
          </div>
          <div className="form-group">
            <label htmlFor="employee_id">Enter your Employee Id: </label>
            <input id="employee_id"  className="form-control" placeholder="Enter Employee ID" name="employee_id" type="text"/>
            <br/>
          </div>
          <button type="submit" className="btn btn-default">Register</button>
        </form>
        {this.state.redirect ? <Redirect to="/users"></Redirect> : null}
      </div>
      
      
    );
  }
}


export default BasicExample;  