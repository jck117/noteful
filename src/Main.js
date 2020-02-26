import React from 'react';

class Main extends React.Component {
    render(){         
        const folders = this.props.store.folders.map((folder, i) => 
            <div key={i} onClick={()=>this.props.selectedFolder(folder.id) }>
                <h2>{folder.name}</h2>
            </div>
        )
        
        const notes = this.props.store.notes.map((note, i) => 
            <div key={i}>
                <h3>{note.name}</h3>
                <p>Date modified on {note.modified.slice(0,10)}</p>
                <button type="button">Delete Note</button>
            </div>
        )

        return (
            <div className="MainPage">
                <header>
                    <h1>Noteful</h1>
                </header>    

                <div>
                    <section className="SideBar">
                        {folders}
                        <button type="button">Add Folder</button>
                    </section>

                    <main>
                        {notes}
                    </main>
                </div>
            </div>
        )
    }
}


export default Main;