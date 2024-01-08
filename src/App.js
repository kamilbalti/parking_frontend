import './App.css';
import MyRouter from './Router';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <Router>
                <MyRouter />
            </Router>
        </div>
    );
}

export default App;
