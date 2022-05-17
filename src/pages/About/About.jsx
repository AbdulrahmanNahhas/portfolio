import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import {AiOutlineArrowRight} from 'react-icons/ai';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
  <>
    <div className="about container" style={{minHeight: 'calc(100vh - 50px)'}}>
      <Navbar />
      <div className="hero">
        <h4 className='About-title'>About Me</h4>
        {/* <br /> */}
        <h1>What I do is what make me who I am</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eos quam vel, reiciendis quisquam distinctio officiis labore voluptatum vero? Expedita dicta voluptatem totam sed pariatur. Incidunt nisi provident velit laudantium?</p>
        <Link to="/Services">Check My Services <AiOutlineArrowRight/></Link>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default About