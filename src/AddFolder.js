import React, {Component} from 'react';
import './AddFolder.css';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import config from './config';
import ValidationError from './ValidationError';


class AddFolder extends Component {

    static contextType = NotefulContext;
    
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false,
            }
        }
    }

    updateName(name){
        this.setState({
            name: {value: name, touched: true}
        })
    }

    validateName(){
        const name = this.state.name.value.trim();
        if(name.length===0){
            return 'Name is required';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const folder = {
            name: this.state.name.value, //e.target['new-folder'].value,
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then(folder => {
            this.context.addFolder(folder);
            this.props.history.push(`/folder/${folder.id}`);
        })
        .catch(error => {
            console.error({error})
        })
    }
    
    render() {
        return (
            <>
                <header>
                    {/* Link to '/' path */}
                    <Link to={'/'}>
                        <h1>Noteful</h1>
                    </Link>    
                </header>
                <div className="add-folder-section">
                    <div>
                        {/* Back Button */}
                        <button onClick={this.props.history.goBack} type="button">Back</button>
                    </div>

                    <div>
                        <h2>Create a New Folder</h2>
                        <form className="add-new-folder" onSubmit={this.handleSubmit}>
                            <label htmlFor="new-folder">Name:</label>
                            <input type="text" name="new-folder" id="new-folder" maxlength="25" onChange={(e)=>this.updateName(e.target.value)}/>
                            <ValidationError message={this.validateName()}/>
                            <div>
                                {/* Add Folder Button */}
                                <button type="submit" disabled={this.validateName()}>Add Folder</button>
                            </div>              
                        </form>
                    </div>
                </div>
            </>
        )
    }
}


export default AddFolder;




