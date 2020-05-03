import React, {Component} from 'react';
import './AddNote.css';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import ValidationError from './ValidationError';
import config from './config';

class AddNote extends Component {

    static contextType = NotefulContext;

    constructor(props){
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            folder: {
                value: '',
                touched: false
            }
        }
    }

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        })
    }

    updateFolder(folder) {
        this.setState({
            folder: {
                value: folder,
                touched: true
            }
        })
    }
    
    validateName(){
        const name = this.state.name.value.trim();
        if(name.length===0){
            return "Name is required";
        }
    }

    validateFolder(){
        const folder_id = this.state.folder.value;
        if(folder_id==="None" || folder_id===''){
            return "Please select a folder";
        }
    }

    handleSubmit = e => {
       e.preventDefault();
       const newNote = {
           name: this.state.name.value, //e.target['new-note-name'].value,
           modified: new Date(),
           folder_id: this.state.folder.value, //e.target['folder-select'].value,
           content: e.target['new-note-content'].value,
       };
       //console.log(newNote.folder_id)
       fetch(`${config.API_ENDPOINT}/notes`, {
           method: 'POST',
           headers: {
                'content-type': 'application/json'
           },
           body: JSON.stringify(newNote),
       })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            //console.log(res.json());
            return res.json();
        })
        .then(note => {
            this.context.addNote(note);
            this.props.history.push(`/folder/${note.folder_id}`);
        })
        .catch(error => {
            console.error({error})
        })
    }

    render(){
        const options = this
          .context
          .folders
          .map(
            folder => <option value={folder.id} key={folder.id}>{folder.name}</option>
          );

        return (
            <>
                <header>
                    {/* Link to '/' path */}
                    <Link to={'/'}>
                        <h1>Noteful</h1>
                    </Link>    
                </header>
                <div className="add-note-section">
                    <div>
                        {/* Back Button */}
                        <button onClick={this.props.history.goBack} type="button">Back</button>
                    </div>

                    <div>
                        <h2>Create a New Note</h2>

                        <form className="add-new-note" onSubmit={this.handleSubmit}>

                            <label htmlFor="new-note-name">Name:</label>
                            <input type="text" name="new-note-name" id="new-note-name" maxlength="25" onChange={e => this.updateName(e.target.value)}/>
                            <ValidationError message={this.validateName()} />

                            <label htmlFor="new-note-content">Content:</label>
                            <textarea name="new-note-content" id="new-note-content" maxlength="500" rows="5"/>

                            <label htmlFor="folder-select">Folder:</label>
                            <select id="folder-select" name="folder-select" onChange={e => this.updateFolder(e.target.value)}>
                                <option value="None">...</option>
                                {options}
                            </select>
                            <ValidationError message={this.validateFolder()}/>

                            <div>
                                {/* Add Note Button */}
                                <button type="submit" disabled={this.validateName()||this.validateFolder()}>Add Note</button>
                            </div>              
                        </form>
                    </div>
                </div>
            </>
        )
    }
}



export default AddNote;
