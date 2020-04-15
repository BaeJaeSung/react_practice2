import React, {useState, useRef, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList'


function createBulkTodos(){
  const array = [];
  for (let i=1; i <= 2500; i++){
    array.push({
      id:i,
      text:'work ${i}' + i,
      checked:false
    });
  }
  return array;
}


const App = () => {
  /*
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'react',
      checked:true
    },
    {
      id:2,
      text:'react2',
      checked:true
    },
    {
      id:3,
      text:'react3',
      checked:true
    },
  ])
  */
  const [todos, setTodos] = useState(createBulkTodos);


  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id:nextId.current,
        text,
        checked:false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
        todo.id === id? {...todo, checked: !todo.checked} : todo,),
      );
    }, [todos],
  );


  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );

}

export default App;
