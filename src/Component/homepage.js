import './homepage.css';
import Header from './header';
import Footer from './footer';

function Home() {
    return (
        <div id="main-div">
            <Header />
            <div id="section-div">
                <div className="section-inside-div">
                    <a href="/foodOrder"> <img src="/images/food.jpeg" alt="img1" /> </a>
                </div>
                <div className="section-inside-div">
                    <a href="/groceryOrder"><img src="/images/gocery.jpeg" alt="img2" /> </a>
                </div>
                <div className="section-inside-div">
                   <a href="/medicineOrder"><img src="/images/medicine.jpeg" alt="img3" /> </a>
                </div>
                <div className="section-inside-div">
                    <a href="/parcelOrder"><img src="/images/parcel.jpeg" alt="img4" /> </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;