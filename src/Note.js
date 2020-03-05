import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class Note extends React.Component {
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
            callback(noteId);
            this.props.history.push('/');
        })
        .catch(error => console.log(error))
    } 

    render(){
        const { notes, noteId, folderName, deleteNote } = this.context;

        //the chosen note to be displayed
        const note = notes.find(note => note.id === noteId);
        const notefound = note ?
            <div>
                <div>
                    <h2>{note.name}</h2>
                    <p>Date modified on {note.modified.slice(0,10)}</p>
                    <button type="button" onClick={()=>this.handleDeleteNote(note.id, deleteNote)}>Delete Note</button>
                </div>    
                <p>{note.content}</p>     
            </div> 
            :
            <div></div> 

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
                            <button onClick={()=> this.props.history.goBack()} type="button">Back</button>
                            <h1>{folderName}</h1>
                        </div>    
                    </section>     
                                
                    {/* Main */}    
                    <main>
                           {notefound}
                    </main>
                </div>
            </div>
        )
    }

}


export default Note;