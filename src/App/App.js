import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import './App.css';
import DeleteContext from '../DeleteContext';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    handleDeleteNote = noteId => {
        console.log(noteId)
        const newNote = this.state.notes.filter(note =>
            note.id !== noteId)
        this.setState({
            notes: newNote
        })
    }



    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}  
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
            </>
        );
    }

    render() {
        // create a context value for deleteContext
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.handleDeleteNote
        }
        return (  
            <DeleteContext.Provider value={contextValue}> 
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </DeleteContext.Provider>
        );
        
    }
}

export default App;
