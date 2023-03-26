import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Addtask from './Components/Addtask'
import Todolist from './Components/Todolist'
import Updatetask from './Components/Updatetask'
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast} from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header'
function App() {
  const [todolist,setTodolist] = useState([])
  const [tasktoUpdate , setTasktoUpdate] = useState({})
  const [showPopup,setShowPopup] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks').then(res => {
      setTodolist(res.data)
    }).catch(err => console.log(err))
  },[])
  const addTask = newTask => {
    setTodolist([...todolist,newTask])
    toast.success("Added successfuly")
  }
  const taskComplete = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.isComplete = task.isComplete
        
      }
    })
    setTodolist(newList)
  }
  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id))
    setTodolist(newList)
  }
  const updatetask = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.todo = task.todo
        toast.success("Updated successfuly")
      }
    })
    setTodolist(newList)
  }
  return (
    <div>
      <Header></Header>
      <Addtask addTask = {addTask}/>
      <Todolist todolist = {todolist} taskComplete = {taskComplete} removeTask = {removeTask} tasktoUpdate = {task => setTasktoUpdate(task)} showPopup = {() => setShowPopup(!showPopup)}/>
    
      {showPopup && <Updatetask task = {tasktoUpdate} updatetask = {updatetask} removePopup = {() => setShowPopup(!showPopup)}/>}

      <ToastContainer/>
      
    </div>
  )
}

export default App
