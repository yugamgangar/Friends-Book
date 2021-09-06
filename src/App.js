import React from 'react'
import './App.scss'
import ListPage from './components/ListPage'
import ListProvider from './contexts/ListContext'
import { setLocalStorage } from './utils/helper'

function App() {

  // Function to set mock data
  let data = localStorage.getItem('friendsBook')
  const mockData = [
    {
      name: "Rahul Gupta",
      value: "rahul-gupta",
      favourite: true
    },
    {
      name: "Shivangi Sharma",
      value: "shivangi-sharma",
      favourite: false
    },
    {
      name: "Akash Singh",
      value: "akash-singh",
      favourite: false
    },
  ]
  if (data === null)
    setLocalStorage(mockData)

  return (
    <div>
      <ListProvider>
        <ListPage />
      </ListProvider>
    </div>
  );
}

export default App;
