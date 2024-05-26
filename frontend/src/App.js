import React from 'react';
import TicketComponent from './components/TicketComponent';
import PersonneComponent from './components/PersonnesComponent';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<TicketComponent />} />
                <Route path="/personnes" element={<PersonneComponent />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
