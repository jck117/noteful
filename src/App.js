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
    folderId: null
  }

  handleFolderSelect = id => {
    this.setState({folderId: id});
  }
  
  render(){    
    console.log(this.state.store);
    return (
      <div className="App">
        <Route exact path='/' 
               render={() => <Main store={this.state.store} selectedFolder={this.handleFolderSelect}/>} />
        <Route path='/folder/<with-a-folder-id-here>' component={Folder} />
        <Route path='/note/<with-a-note-id-here>' component={Note} />
      </div>
    );
  }    

}

export default App;
