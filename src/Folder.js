import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Folder(props) {
   
        //array of all folders with their relevant html markup
        const folders = props.store.folders.map((folder, i) => 
            <NavLink to={`/folder/${folder.id}`} activeClassName="selectedLink">
                <li key={i} onClick={()=>props.selectedFolder(folder.id) } >
                    <h2 >{folder.name}</h2>
                </li>  
            </NavLink>
        )

        //array of all notes related to the selected folder with their relevant html markup
        const notes = props.store.notes.filter(note => note.folderId === props.folderId).map((note, i) => 
            <li key={i}>
                <Link to={`/note/${note.id}`}>
                    <h3 onClick={()=>props.selectedNote(note.id, note.folderId)}>{note.name}</h3>
                </Link>
                <p>Date modified on {note.modified.slice(0,10)}</p>
                <button type="button">Delete Note</button>
            </li>
        );    
        
        //folder route
        return (
            <div className="FolderPage">
                <header>
                    <Link to={'/'}>
                        <h1>Noteful</h1>
                    </Link>   
                </header>    

                <div>
                    {/* Side Bar */}
                    <section className="SideBar">
                        <ul>{folders}</ul>
                        <button type="button">Add Folder</button>
                    </section>  

                    {/* Main */}
                    <main>
                        <ul>{notes}</ul>
                    </main>
                </div>
            </div>
        )
    
}


export default Folder;