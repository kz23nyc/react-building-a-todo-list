/* eslint-disable react/jsx-key */
import { useReducer,useState } from 'react';
import { initialState } from './todos-data';
import TodoItem from './components/TodoItem';
import "./styles.css";

function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case "add-todo": {
      //create a new todo object with title id and completed
      const newTodo = {
        title: action.payload.title,
        completed: false,
        id: Date.now(),
       };
       console.log(newTodo);
       return[newTodo,...state];       
    }

      case "delete-todo": {
        console.log(action.payload.id);
        return state.filter((todo) => todo.id !== action.payload.id)      
      }
      
      default:
        throw new Error(`Action not found ${action.type}`);
  }
}

export default function App() {
  const [todos, todosDispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    todosDispatch({type: "add-todo", payload: {title}})
    setTitle("");    
  };

  return (
    <div className='App'>
      <h1>Todo List App</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add</button>
      </form>

      {todos.map((todo) => (
        <TodoItem todo={todo} todosDispatch={todosDispatch} />
      ))}
    </div>

  )
}