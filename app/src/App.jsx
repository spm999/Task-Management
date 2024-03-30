import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskComponent from './TaskComponent';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<TaskComponent />} />
      </Routes>
    </Router>
  )
}

export default App
