import React from 'react';

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    selectedFolder: () => {},
    selectedNote: () => {},
    folder_id: null,
    noteId: null,
    folderName: null
})


export default NotefulContext;