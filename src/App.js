import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookCarousel from './components/BookCarousel';
import ProductGallery from './components/ProductGallery';



function App() {
  return (
    <div className="App">

        <Navbar />
        <BookCarousel />
        <ProductGallery/>
        <Footer/>
    </div>
  );
}

export default App;
