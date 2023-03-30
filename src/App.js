import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import ScatterPlot from './components/ScatterPlot';
import Dashboard from './components/Dashboard';
import BarChart from './components/BarChart';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/data' element={<ScatterPlot/>}/>
          <Route path='/data/dash' element={<Dashboard/>}/>
          <Route path='/data/bar' element={<BarChart/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
