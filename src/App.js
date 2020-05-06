import React from 'react';
import { Route } from 'react-router-dom';
//import STORE from './dummy-store';
import Main from './Main';
import Folder from './Folder';
import Note from './Note';
import './App.css';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import config from './config';
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    folder_id: null,
    noteId: null,
    folderName: null
  }

  //when a folder is clicked on, to update the state accordingly in App.js
  handleFolderSelect = id => {
    this.setState({folder_id: id}, 
      ()=>console.log(this.state.folder_id));
  }

  //when a note is clicked on, to update the state accordingly in App.js
  handleNoteSelect = (idnote, idfolder) => {
    const nameFolder = this.state.folders.find(folder => folder.id === idfolder).name; //name of folder (e.g. "Important")
    this.setState({noteId: idnote, folder_id: idfolder, folderName: nameFolder},
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

  //handle when you add a folder
  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
      folder_id: folder.id
    })
  }

  //handle when you add a note
  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
      folder_id: note.folder_id
    })
  }

  
  componentDidMount(){
    Promise.all([
      fetch(`${config.API_ENDPOINT}/folders`),
      fetch(`${config.API_ENDPOINT}/notes`)
    ])
      .then(([foldersRes, notesRes]) => {
        if(!foldersRes.ok){
          return foldersRes.json().then(e => Promise.reject(e));
        }
        if(!notesRes.ok){
          return notesRes.json().then(e => Promise.reject(e));
        }
        return Promise.all([
          foldersRes.json(),
          notesRes.json()
        ])
      })
      .then(([folders, notes]) => {
        this.setState({folders, notes})
      })
      .catch(error => console.error({error})); 
  }

  render() {    
    console.log(this.state);
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      selectedFolder: this.handleFolderSelect,
      selectedNote: this.handleNoteSelect,
      folder_id: this.state.folder_id,
      noteId: this.state.noteId,
      folderName: this.state.folderName,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
    }

    return (

      <div className="App">
        <NotefulContext.Provider value = {contextValue}>
          {/* Main path */}
          <Route exact path = '/' 
                component = { Main } />
          {/* Folder path */}                             
          <Route path = {`/folder/${this.state.folder_id}`}
                component = {Folder} />

          <ErrorBoundary path={`/note/${this.state.noteId}`}>
            {/* Note path */}                    
            <Route path = {`/note/${this.state.noteId}`}
                  component = {Note} />
          </ErrorBoundary>      
   
          <ErrorBoundary path={'/add-folder'}>
            {/* Add Folder path */}         
            <Route path = {'/add-folder'}
                  component = {AddFolder} />
          </ErrorBoundary>      
      
          <ErrorBoundary path={'/add-note'}>
            {/* Add Note path */}
            <Route path = {'/add-note'}
                  component = {AddNote} />
          </ErrorBoundary>      
                    
        </NotefulContext.Provider>                              
      </div>
    );
  }    
}

export default App;



