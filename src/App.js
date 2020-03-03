import React from 'react';
import { Route } from 'react-router-dom';
import STORE from './dummy-store';
import Main from './Main';
import Folder from './Folder';
import Note from './Note';
import './App.css'

class App extends React.Component {
  state = {
    store: STORE,
    folderId: null,
    noteId: null,
    folderName: null
  }

  //when a folder is clicked on, to update the state accordingly in App.js
  handleFolderSelect = id => {
    this.setState({folderId: id}, /*()=>console.log(this.state.folderId)*/);
  }

  //when a note is clicked on, to update the state accordingly in App.js
  handleNoteSelect = (idnote, idfolder) => {
    const nameFolder = this.state.store.folders.find(folder => folder.id === idfolder).name;
    this.setState({noteId: idnote, folderId: idfolder, folderName: nameFolder}, /*()=>{console.log(this.state.noteId + " " + nameFolder)}*/);
  }
  
  //noteful-updating-context
  
  render() {    
    //console.log(this.state.store);
    return (
      <div className="App">
        {/* Main path */}
        <Route exact path='/' 
               render={() => < Main store={this.state.store} 
                                    selectedFolder={this.handleFolderSelect}
                                    selectedNote={this.handleNoteSelect} />} />
        {/* Folder path */}                             
        <Route path={`/folder/${this.state.folderId}`}
               render={() => < Folder store={this.state.store} 
                                    selectedFolder={this.handleFolderSelect} 
                                    selectedNote={this.handleNoteSelect}
                                    folderId={this.state.folderId}/>} />
        {/* Note path */}                    
        <Route path={`/note/${this.state.noteId}`} 
               render={({history}) => < Note store={this.state.store}
                                    noteId={this.state.noteId}
                                    folderName={this.state.folderName}
                                    onClickGoBack={()=>history.goBack()} />} />
      </div>
    );
  }    

}

export default App;
