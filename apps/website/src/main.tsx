import React from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource-variable/inter';
import './styles.css';
import {App} from './App';
import {MotionProvider} from './components/Effects';
import './black.css';
import './polish.css';
import './workspace.css';
import './interaction.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><MotionProvider><App/></MotionProvider></React.StrictMode>);

