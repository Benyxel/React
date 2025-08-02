import React, { useState } from "react";
import "./css/TaskForm.css";
import Tag from "./Tag";

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags:[],
  });
  const handleChanges = (e) => {
    const {name, value} = e.target
    setTaskData((prev) => {
      return { ...prev, [name ]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
  }
  
  const selectTag = (tag) => {
    if (taskData.tags.some(item => item === tag)) {
      const filterTags = taskData.tags.filter(item => item !== tag)
      setTaskData(prev => {
        return {...prev, tags: filterTags}
      })
      
    } else {
      setTaskData(prev => {
        return {...prev, tags:[...prev.tags, tag]}
      })
    }
  }
    console.log(taskData.tags)
  return (
    <div>
      <header className="app_header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            className="task_input"
            placeholder="Enter your task"
            onChange={handleChanges}
          />
          <h1>{ [taskData.task,taskData.status, taskData.tags] }</h1>
          <div className="task_f_btn_l">
            <div>
              <Tag tagName="HTML" selectTags ={selectTag} />
              <Tag tagName="CSS" selectTags ={selectTag} />
              <Tag tagName="JavaScript" selectTags ={selectTag}/>
              <Tag tagName="Python" selectTags ={selectTag} />
              <Tag tagName="Node.js" selectTags ={selectTag} />
            </div>

            <div>
              <select
                className="task_status"
                onChange={handleChanges}
                name="status"
              >
                <option className="opt" value="todo" key="todo">
                  To do
                </option>
                <option className="opt" value="doing" key="doing">
                  Doing
                </option>
                <option className="opt" value="done" key="done">
                  Done
                </option>
              </select>
              <button type="submit" className="task_submit">
                {" "}
                + Add Task
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
};

export default TaskForm;
