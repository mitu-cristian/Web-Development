import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import uuid from 'react-uuid';
import About from './components/pages/about';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

class App extends Component {

  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: true
      },

      {
        id: 2,
        title: 'Dinner',
        completed: false
      },

      {
        id: 3,
        title: 'Programming',
        completed: false
      }
    ]
  }

  // Toggle complete 
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo => {
        if (todo.id === id)
          todo.completed = !todo.completed;
        return todo;
      }))
    })
  }

  // Delete ToDo
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }

  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(  ),
      title: title,
      completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <Router>      
        <div className="App">
          <div className='container'>
            <Header />
            <Routes>
            <Route path="/" element = {
              <React.Fragment>
                   <AddTodo addTodo={this.addTodo}/>
                    <Todos todos={this.state.todos} markComplete={this.markComplete}
                    delTodo={this.delTodo} />
               </React.Fragment>
            }/>
            <Route path="/about" element = {
              <About/>
            }/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;