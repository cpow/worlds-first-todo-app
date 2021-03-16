import React, {useState, useMemo} from 'react';
import styled from 'styled-components';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodoName, setCurrentTodoName] = useState('');

  //not performant
  const doneTodos = todos.filter(todo => todo.done);

  const notDoneTodos = useMemo(() => {
    return todos.filter(todo => !todo.done);
  }, [todos]);

  function addTodo() {
   // {id: 1, name: whatever, done: false}
    const countOfTodos = todos.length;
    const newTodo = { id: countOfTodos + 1, done: false, name: currentTodoName};
    todos.push(newTodo);
    setTodos([...todos]);
    setCurrentTodoName('');
  }

  function toggleTodo(id) {
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        return {...todo, done: !todo.done};
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>Worlds first todo app</h1>
      <input
        type="text"
        value={currentTodoName}
        onChange={(e) => setCurrentTodoName(e.target.value)}
      />
      <button onClick={() => addTodo()}>Create Todo</button>
      <h2>NOT DONE TODOS</h2>
      {notDoneTodos.map((todo) => {
        return (
          <NotDoneTodo>
            <input type="checkbox" onClick={() => toggleTodo(todo.id)} checked={todo.done}/>
            {todo.name}
          </NotDoneTodo>
        )
      })}
      <h2>DONE TODOS</h2>
      {doneTodos.map((todo) => {
        return (
          <DoneTodo>
            <input type="checkbox" onClick={() => toggleTodo(todo.id)} checked={todo.done}/>
            {todo.name}
          </DoneTodo>
        )
      })}
    </div>
  );
}

export default App;

const DoneTodo  = styled.div`
  @keyframes appear {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  
  font-size: 24px;
  text-decoration: line-through;
  animation-name: appear;
  animation-duration: 2s;
`;

const NotDoneTodo = styled(DoneTodo)`
  text-decoration: none;
`;
