import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router'
import {BrowserRouter, Redirect } from 'react-router-dom';
import './Store.css';
import Pagination from "react-js-pagination";



class StoreCreate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.state = {'value': '',  todos: [], activePage: 1, perPage: 10, totalCount: 0}
        if( this.props.match.url.includes("store")){
          this.state.value =  this.props.match.params.user_id+'/'
        }    
      }

      async componentDidMount() {
        try {
          const res = await fetch(`http://127.0.0.1:8000/users/${this.state.value}store/${this.state.perPage}/${this.state.activePage}`)
          const response_obj = await res.json();
          const todos = response_obj.store_data
          const totalCount = response_obj.total_count;

          this.setState({
            todos,
            totalCount
          });
        } catch (e) {
          console.log(e);
        }    
        console.log(this.state.todos)

      }
      //  shouldComponentUpdate(nextProps, nextState){
      //    debugger
      //    console.log(nextState.totalCount !== this.state.totalCount)
      //   return nextState.totalCount !== this.state.totalCount
      // }
      //  async componentWillUpdate(){
      //   try {
      //     const res = await fetch(`http://127.0.0.1:8000/users/${this.state.value}store/${this.state.perPage}/${this.state.activePage}`)
      //     const response_obj =  await res.json();
      //     const todos = response_obj.store_data
      //     const totalCount = response_obj.total_count;

      //     this.setState({
      //       todos,
      //       totalCount
      //     });
      //   } catch (e) {
      //     console.log(e);
      //   }    
      //   console.log("fer")

      //   console.log(this.state.todos)

      // }
    async handlePageChange(pageNumber) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/users/${this.state.value}store/${this.state.perPage}/${pageNumber}`)
        const response_obj =  await res.json();
        const todos = response_obj.store_data
        const totalCount = response_obj.total_count;

        this.setState({
          todos,
          totalCount,
          activePage: pageNumber,
          perPage: this.state.perPage
        });
      } catch (e) {
        console.log(e);
      }    
      console.log("fer")

      console.log(this.state.todos)
    }
    handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(`http://127.0.0.1:8000/users/${this.state.value}store/`,
    {
      method: 'POST',
      body: data,
    }).then(this.handleRedirect)
  }
  handleRedirect(res){
    console.log(res.status)
    if( res.status === 200 ){
        window.location.reload()
        }else {
      // Something went wrong here
        }
    }
    render() {
      let table = ''
      let paginate = ''
            if (this.state.todos.length){
              paginate =                 <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={this.state.totalCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              />
        table  =  <table className="table border">
      <thead>
          <tr className ="text-center">
          <th scope="col">Employee Name</th>
          <th scope="col">Team Name</th>
          <th scope="col">Manager Name</th>
          <th scope="col">Idea</th>
          <th scope="col" >Application</th>
          </tr>
      </thead>
          <tbody>
              {this.state.todos.map(store => (
                  <tr className ="text-center">
                      <td>{store.store_user_id.name}</td>
                      <td>{store.team_name}</td>
                      <td>{store.manager_name}</td>
                      <td>{store.idea}</td>
                      <td>{store.application}</td>
                  </tr>
              )
              )}
          </tbody>
      </table>}
      else{
        table = ''
        paginate = ''
      }
      return (
        <div className="container">
            <div>
              {paginate}
            </div>
            <div >
              {table}
            </div>
            <div>
              <h3> Add New Idea</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <label htmlFor="team_name">Team Name : </label>
                <input type="team_name" className="form-control" id="team_name" placeholder="Enter Team Name" name="team_name"/>
                </div>
                <div className="form-group">
                <label htmlFor="manager_name">Manager Name : </label>
                <input id="manager_name" className="form-control" placeholder="Enter Manager Name" name="manager_name" type="text"/>
                </div>
                <div className="form-group">
                <label htmlFor="idea">Innovation / Idea : </label>
                <textarea id="idea" className="form-control" placeholder="Enter Idea" name="idea" type="text"/>
                </div>
                <div className="form-group">
                <label htmlFor="application">Application / Uses : </label>
                <textarea id="application" className    ="form-control" placeholder="Enter Applications" name="application" type="text"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
            </div>
        </div>  

      );
    }
  }

//   class StoreIndex extends Component {
//     state = {value: '0',
//     todos: []
//   };

//   async componentDidMount() {
//     try {
//       if (this.props.match.url == "/users"){
//         this.state.value = 'users/'
//       }
//       if (this.props.match.url.includes('delete')){
//         this.state.value = 'users/delete/'+this.props.match.params.user_id+'/'
//       }
//       const res = await fetch(`http://127.0.0.1:8000/${this.state.value}`)
//       const todos = await res.json();
//       this.setState({
//         todos
//       });
//     } catch (e) {
//       console.log(e);
//     }    

//   }
//   render() {
//     return (
//       <div>
//         {this.state.todos.map(user => (
//           <div key={user.name}>
//             <span>{user.id}</span>
//             <span>{user.name}</span>
//             <span>{user.email}</span>
//         <span>{user.employee_id}</span>

//             <div>
//             <Link to={`update/${user.id}`}>Update</Link>
//             <Link to={`delete/${user.id}`}>Delete</Link>
//             <Link to={`store/${user.id}`}>Add Store Idea</Link>

//             </div>    
//           </div>
//         ))}

//       </div>  
//     );
//   } 
//   }


  export default StoreCreate;  