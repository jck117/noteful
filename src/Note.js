import React from 'react';
import { Link } from 'react-router-dom';

function Note(props) {
        //the chosen note to be displayed
        const note = props.store.notes.find(note => note.id === props.noteId);

        //note route
        return (
            <div className="NotePage">
                <header>
                    <Link to={'/'}>
                        <h1>Noteful</h1>
                    </Link> 
                </header>    

                <div>
                    {/* Side Bar */}
                    <section className="SideBar">
                        <div>
                            <button onClick={props.onClickGoBack} type="button">Back</button>
                            <h1>{props.folderName}</h1>
                        </div>    
                    </section>     
                                   
                    {/* Main */}    
                    <main>
                        <div>
                            <div>
                                <h2>{note.name}</h2>
                                <p>Date modified on {note.modified.slice(0,10)}</p>
                                <button type="button">Delete Note</button>
                            </div>    
                            <p>{note.content}</p>     
                        </div>    
                    </main>
                </div>
            </div>
        )
}


export default Note;