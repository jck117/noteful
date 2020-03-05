import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class Main extends React.Component {

        static contextType = NotefulContext;

        handleDeleteNote(noteId, callback) {
            fetch(`http://localhost:9090/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                if(!res.ok){
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(data => {
                //console.log(data) //=> {}
                //call the callback when the request is successful
                callback(noteId)
            })
            .catch(error => console.log(error))
        }

        render(){
            const {folders, notes, selectedFolder, selectedNote, deleteNote } = this.context;

            //array of all folders with their relevant html markup
            const folders_html = folders.map((folder, i) => 
                <NavLink key={i} to={`/folder/${folder.id}`} activeClassName="selectedLink">
                    <li onClick={()=>selectedFolder(folder.id) } >
                        <h2 >{folder.name}</h2>
                    </li>  
                </NavLink>
            )
            
            //array of all notes with their relevant html markup
            const notes_html = notes.map((note, i) => 
                <li key={i}>
                    <Link to={`/note/${note.id}`}>
                        <h3 onClick={()=>selectedNote(note.id, note.folderId)}>{note.name}</h3>
                    </Link>
                    <p>Date modified on {note.modified.slice(0,10)}</p>
                    <button type="button" onClick={()=>this.handleDeleteNote(note.id, deleteNote)}>Delete Note</button>
                </li>
            )
            
            //main route
            return (
                <div className="MainPage">
                    <header>
                        <Link to={'/'}>
                            <h1>Noteful</h1>
                        </Link>    
                    </header>    

                    <div>
                        {/* Side Bar */}
                        <section className="SideBar">
                            <ul>{folders_html}</ul>
                            <button type="button">Add Folder</button>
                        </section>
                        
                        {/* Main */}
                        <main>
                            <ul>{notes_html}</ul>
                        </main>
                    </div>
                </div>  
            )
        }   
}


export default Main;