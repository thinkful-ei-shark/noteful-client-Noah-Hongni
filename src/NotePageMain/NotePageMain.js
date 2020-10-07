import React, { Component } from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import DeleteContext from '../DeleteContext'
import { findNote } from '../notes-helpers'

export default class NotePageMain extends Component {

  static defaultProps = {
    note: {
      content: '',
    }
  }

  static contextType = DeleteContext;

  render() {
    const {noteId} = this.props.match.params
    const {notes=[]} = this.context;
    const note = findNote(notes, noteId) || { content: '' }

  
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

}


