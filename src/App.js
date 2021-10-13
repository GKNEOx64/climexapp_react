import React from 'react';
import './App.css';
import reactDom from 'react-dom';
import Apx from './components/component';
import axios from 'axios';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


class App extends React.Component {
  render() {
    return (
      //iniciando o componente da aplicação
      <Apx />
    );
  }
}
export default App;
