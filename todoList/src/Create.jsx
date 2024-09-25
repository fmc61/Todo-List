import { useState } from "react"
import axios from "axios";

function Create() {
    const [task, setTask] = useState();
    const handleAdd = () =>{
        try {
            const result = axios.post('http://localhost:3001/add', {task: task})
            location.reload();
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className="create_form">
        <input type="text" placeholder="Enter Task" onChange={(e) => setTask(e.target.value) }/>
        <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create