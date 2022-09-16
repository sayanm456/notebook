import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Notes from './components/Notes';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <> 
     <NoteState>
     <Router>
        <Navbar/>
        {/* <Alert message="This is Amazing Course" alert={alert} /> */}
        <div className="container-fluid">
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/notes" element={<Notes/>}></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
