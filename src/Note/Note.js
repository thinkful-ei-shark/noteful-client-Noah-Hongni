import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import DeleteContext from './DeleteContext'


function deleteItem(noteId, cb){
  fetch(`/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      if(!res.ok){
        return res.json().then(error=>{
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      console.log({data})
      cb(noteId)
    })
    .catch(error=>{
      console.log(error)
    })
}


export default function Note(props) {
  return (
    <DeleteContext.Consumer>
      {(context) => 
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={()=>{
        deleteItem(
          props.id,
          context.deleteNote
        )
      }}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
    }
    </DeleteContext.Consumer>
  )
}
