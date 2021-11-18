/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react'


// Импорт файла приложения
import { TodoList } from './components/todoList';

// Основной файл
const App: () => Node = () => {
  return (
    <TodoList /> 
  );
};





export default App;
