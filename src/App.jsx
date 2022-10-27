import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

function App() {


  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todos")
    if (savedItems) {
      return JSON.parse(savedItems)
    } else {
      return []
    }
  })

  const [currentItemText, setCurrentItemText] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items))
  }, [items])


  const handleNewItem = () => {
    setItems([...items, {
      id: nanoid(),
      text: currentItemText
    }])
  }

  const handleDeleteTodo = (id) => {
    const deleteItem = items.filter((todo) => {
      return todo.id !== id
    })
    setItems(deleteItem)
  }

  return (
    <div className='mx-4 sm:mx-20 lg:mx-44 xl:mx-96 mt-4 text-center'>
      <p className='text-xl'>To-do list</p>
      <br />
      <div className='flex flex-col text-center w-1/2 m-auto'>
        <input type="text" placeholder="Type your item here" className='border-2 border-black rounded-lg text-center p-2'
          value={currentItemText}
          onChange={(e) => setCurrentItemText(e.target.value)} />

        <button className='w-1/4 border-2 border-white bg-white text-black m-auto mt-4 mb-4'
          onClick={() => {
            handleNewItem();
            setCurrentItemText("")
          }}>Send
        </button>
      </div>
      <hr />

      <div className='mt-4' />
      {items.length != 0 ?
        <div className='flex flex-col'>
          {items.map((item, index) => {
            return (
              <div className='flex justify-between items-center m-auto gap-4' key={item.id}>
                <div>{item.text}</div>
                <button className='border-2 border-white bg-white text-black m-auto mt-4 mb-4' onClick={() => handleDeleteTodo(item.id)}>Remove</button>

              </div>
            )
          })}
        </div>
        :
        <div>
          Add something to your to-do list!
        </div>
      }

    </div >
  )
}

export default App
