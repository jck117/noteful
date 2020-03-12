import React from 'react';
import { Route } from 'react-router-dom';
//import STORE from './dummy-store';
import Main from './Main';
import Folder from './Folder';
import Note from './Note';
import './App.css';
import NotefulContext from './NotefulContext';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    folderId: null,
    noteId: null,
    folderName: null
  }

  //when a folder is clicked on, to update the state accordingly in App.js
  handleFolderSelect = id => {
    this.setState({folderId: id}, 
      ()=>console.log(this.state.folderId));
  }

  //when a note is clicked on, to update the state accordingly in App.js
  handleNoteSelect = (idnote, idfolder) => {
    const nameFolder = this.state.folders.find(folder => folder.id === idfolder).name; //name of folder (e.g. "Important")
    this.setState({noteId: idnote, folderId: idfolder, folderName: nameFolder},
      ()=>{console.log(this.state.noteId + " " + nameFolder)});
  }

  //set folders in state from API fetch
  setFolders = folders => {
    this.setState({
      folders: folders
    })
  }

  //set notes in state from API fetch
  setNotes = notes => {
    this.setState({
      notes: notes
    })
  }

  //handle when you click on delete note
  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({notes: newNotes})
  }

  componentDidMount(){
    //fetch folders
    fetch('http://localhost:9090/folders')
      .then(res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setFolders) //same as =>.then(resJson => this.setFolders(resJson))
      .catch(error => console.log(error))

    //fetch notes
    fetch('http://localhost:9090/notes')
      .then(res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setNotes)
      .catch(error => console.log(error))      
  }
  
  //test
  render() {    
    console.log(this.state);

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      selectedFolder: this.handleFolderSelect,
      selectedNote: this.handleNoteSelect,
      folderId: this.state.folderId,
      noteId: this.state.noteId,
      folderName: this.state.folderName,
      deleteNote: this.deleteNote,
    }

    return (
      <div className="App">
        <NotefulContext.Provider value = {contextValue}>
          {/* Main path */}
          <Route exact path = '/' 
                component = { Main } />
          {/* Folder path */}                             
          <Route path = {`/folder/${this.state.folderId}`}
                component = {Folder} />
          {/* Note path */}                    
          <Route path = {`/note/${this.state.noteId}`}
                component = {Note} />
        </NotefulContext.Provider>                              
      </div>
    );
  }    
}

export default App;

