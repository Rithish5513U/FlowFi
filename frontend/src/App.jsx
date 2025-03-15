import Login from './components/Login';
import SignUp from './components/SignUp';
import Homepage from './component/homepage';
import NewsCard from './component/NewsCard';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PreferencesForm from './component/PreferencesForm';
import Dashboard from './component/Dashboard';
import Platform from './component/Platform';
import FileUpload from './component/fileupload';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/upload" element={<FileUpload/>}></Route>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/preference" element={<PreferencesForm/>}/>
          <Route path="/insights" element={<NewsCard/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/platform' element={<Platform/>}/>
          <Route path='/upload' element={<FileUpload/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
