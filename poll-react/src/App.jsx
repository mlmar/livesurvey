import './css/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './js/components/create/Create.jsx';

/*
  App where users can create a poll with multiple questions on their comptuer 
  and users with a link can vote on answers from any device.
*/
const App = () => {
  return (
    <div className="app flex-col items-center place-content-center bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
