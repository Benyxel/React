import React from 'react'
import Tag from './Tag'
import delicon from '../assets/delete.png'
import './css/TaskCard.css'



const TaskCard = () => {
  return (
      <article className='task_card'>
          <p className='task_text'>This is a sample text</p>

          <div className='task_card_btn_l'>
              <div className='task_card_tags'>
                  <Tag tagName='HTLM' />
                  <Tag tagName='CSS' />
              </div>
              <div className='task_del'>
                  <img src={delicon} className='del_icon' alt=''/>
              </div>
          </div>
    </article>
  )
}

export default TaskCard
