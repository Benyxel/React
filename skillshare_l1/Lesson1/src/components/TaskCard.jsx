import React from 'react'
import Tag from './Tag'
import delicon from '../assets/delete.png'
import './css/TaskCard.css'



const TaskCard = ({ title, tags, handleDelete, index }) => {
    


  return (
      <article className='task_card' draggable>
          <p className='task_text'>{title}</p>

          <div className='task_card_btn_l'>
              <div className='task_card_tags'>
                 {tags.map((tag, index) => <Tag key={index} tagName={tag} selected/>)}
              </div>
              <div className='task_del' onClick={ () => handleDelete(index)}>
                  <img src={delicon} className='del_icon' alt=''/>
              </div>
          </div>
    </article>
  )
}

export default TaskCard
