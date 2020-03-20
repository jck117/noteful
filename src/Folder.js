import React, {Fragment} from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import config from './config';

//Folder Route

class Folder extends React.Component {

        static contextType = NotefulContext;
        
        handleDeleteNote(noteId, callback) {
            fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json();
            })
            .then(data => {
                //console.log(data) //=> {}
                //call the callback when the request is successful
                callback(noteId);
                //this.props.history.push('/');
            })
            .catch(error => console.error({error}))
        }         

        render(){
            const {folders, notes, selectedNote, selectedFolder, folderId, deleteNote } = this.context;

            //array of all folders with their relevant html markup
            const folders_html = folders.map((folder, i) => 
                    <li>
                        {/* Link to '/folder/folder.id' path */}
                        <NavLink onClick={()=>selectedFolder(folder.id) } key={i} to={`/folder/${folder.id}`} activeClassName="selectedLink">
                            <h2 >{folder.name}</h2>
                        </NavLink>
                    </li>  
            )

            //array of all notes related to the selected folder with their relevant html markup
            const notes_html = notes.filter(note => note.folderId === folderId).map((note, i) => 
                <li key={i}>
                    {/* Link to '/note/note.id' path */}
                    <Link onClick={()=>selectedNote(note.id, note.folderId)} to={`/note/${note.id}`}>
                        <h3 >{note.name}</h3>
                    </Link>
                    <p>Date modified on {note.modified.slice(0,10)}</p>
                    {/* Delete Note Button */}
                    <button type="button" onClick={()=>this.handleDeleteNote(note.id, deleteNote)}>Delete Note</button>
                </li>
            );    
            
            //folder route
            return (
                
                    <div className="FolderPage">
                        <header>
                            {/* Link to '/' path */}
                            <Link to={'/'}>
                                <h1>Noteful</h1>
                            </Link>   
                        </header>    

                        <div>
                            {/* Side Bar */}
                            <section className="SideBar">
                                <ul>{folders_html}</ul>
                                {/* Link to '/add-folder' path */}
                                <Link to={'/add-folder'}>
                                    {/* Add Folder Button */}
                                    <button className="add-folder-button" type="button">Add Folder</button>
                                </Link>                          
                            </section>  

                            {/* Main Section */}
                            <main>
                                <ul>{notes_html}</ul>
                                {/* Link to '/add-note' path */}
                                <Link to={'/add-note'}>
                                    {/* Add Note Button */}
                                    <button className="add-note-button" type="submit">Add Note</button>
                                </Link>                           
                            </main>
                        </div>
                    </div>
                
            )
        }

    
}


export default Folder;

