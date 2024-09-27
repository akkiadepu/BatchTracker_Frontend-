import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Page2 from './component/Page2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrainerComponent from './component/tableComponents/TrainerComponent';
import SubjectComponent from './component/tableComponents/SubjectComponent';
import BatchComponent from './component/tableComponents/BatchComponent';
import SubjectForm from './component/SubjectForm';
import BatchForm from './component/BatchForm';
import TrainerForm from './component/TrainerForm';

function App() {
  return (


       <BrowserRouter>
    <div className="App"> 
  
       {/* <Header/>  */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/TrainerComponent" element={<TrainerForm/>}/>
        <Route path="/SubjectComponent" element={<SubjectForm/>}/>
        <Route path="/BatchComponent" element={<BatchForm/>}/>
      </Routes>

    </div>
    </BrowserRouter>


    
  );
}

export default App;
