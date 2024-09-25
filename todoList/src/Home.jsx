import { useEffect, useState } from "react"
import Create from "./Create"
import axios from "axios"
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await axios.get('http://localhost:3001/get');
                setTodos(result.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTodos();
    }, []);

    const handleEdit = (id) =>{
        try {
            const data = axios.put('http://localhost:3001/update/' + id)
            location.reload()
        } catch (error) {
            console.log(error);  
        }
    }

    const handleDelete = (id) =>{
        try {
            const data = axios.delete('http://localhost:3001/delete/' + id)
            location.reload()
        } catch (error) {
            console.log(error);  
        }
    }
    
  return (
    <div className="home">
        <h2>Todo List</h2>
        <Create />
        {
            todos.length === 0 ?
            <div><h2>No Record</h2></div>
            :
            todos.map(todo => (
                <div className="task">
                    <div className="checkbox" onClick = {() => handleEdit(todo._id)}>
                        {todo.done ? <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                        : <BsCircleFill className='icon'/>
                        }
                       
                        <p className={todo.done ? "line_through" : ""}>{todo.task}</p> 
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                  
                </div>
            ))
        }
    </div>
  )
}

export default Home