import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="container" style={{minHeight: 'calc(100vh - 50px)'}}>
        <Navbar />
        <div className="hero"></div>
        <p className="nothing">
          Nothing yet
        </p>
        {/* <div className="clients">
          <h3>Client We helped</h3>
          <div className="clients-imgs">
            <p className="nothing">
              Nothing yet
            </p>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export default Home