import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import useTaskReducer from './hooks/taskReducer';

function App() {
  const [state, dispatch] = useTaskReducer()
  const taskReducer = {state,dispatch}

  return (
    <div className="App">
     <Header taskReducer={taskReducer}/>
     <Body taskReducer={taskReducer}/>
    </div>
  );
}

export default App;
