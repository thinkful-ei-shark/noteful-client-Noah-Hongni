import React from 'react';

const localeContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {}
});

export default localeContext;