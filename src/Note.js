import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import config from './config';

//Note Route

class Note extends React.Component {
    static contextType = NotefulContext;

    handleDeleteNote(noteId, callback) {
        console.log(noteId)
        /*
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
            this.props.history.push('/');
        })
        .catch(error => console.error({error}))
        */
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
                    {/* Delete Note Button */}
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
                    {/* Link to '/' path */}
                    <Link to={'/'}>
                        <h1>Noteful</h1>
                    </Link> 
                </header>    

                <div>
                    {/* Side Bar */}
                    <section className="SideBar">
                        <div>
                            {/* Go Back Button */}
                            <button onClick={this.props.history.goBack} type="button">Back</button>
                            <h1>{folderName}</h1>
                        </div>    
                    </section>     
                                
                    {/* Main Section */}    
                    <main>
                           {notefound}
                    </main>
                </div>
            </div>
        )
    }

}


export default Note;



