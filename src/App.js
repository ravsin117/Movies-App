import './App.css';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import Pagination from './Components/Pagination';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Favourite from './Components/Favourite';


function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={
        <>
        <Banner/>
        <Movies/>
        {/* <Pagination/>  */}
        </>
        }/>
        <Route path='/favourites' element={<Favourite/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
