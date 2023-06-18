// import CSS
import "./home.css";
import "./facilities.css";
import "./tourist_spots.css";

// import images
import hotel_image from "./images/hotel-image.jpg";
import facilities from "./images/facilities.png";
import breakfast from "./images/breakfast.jpg";
import conference from "./images/conference.jpg";
import parking from "./images/parking.jpg";
import tourist_spots from "./images/tourist-spots.png";

import {useEffect} from "react";

// import components
import Review from "../../components/Review";
import Header from "../../components/Header/Header";
import BookingForm from "../../components/BookingForm/BookingForm";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the review store
import {avgRating, getReviews} from "../../features/review/reviewSlice";

function Home() {

  const {avg} = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(avgRating());
  })

  return (
    <>
      <Header/>
      <main>
        <div className="container">
          <div className="hotel-image-container">
            <img className="hotel-image" src={hotel_image} alt="" />
          </div>
          
          <div >
            <BookingForm/>
          </div>
          
          <div className="facilities">
            <div className="facilities-introduction">
              <img id="facilty-image" src={facilities} alt=""/>
              <h1>Facilități</h1>
            </div>

            <div className="boxes-facilities">

              <div className="box-facility">
                <img src={parking} alt="" />
                <h2>Parcare</h2>
                <p>Hotelul oferă parcare gratuită, permițând oaspeților să își parcheze convenabil vehiculele fără a suporta taxe suplimentare.</p>
              </div>

              <div className="box-facility">
                <img src={breakfast} alt="" />
                <h2>Mic dejun</h2>
                <p>Mic dejun gratuit tuturor oaspeților ca parte a sejurului.</p>
              </div>

              <div className="box-facility">
                <img src={conference} alt="" />
                <h2>Sală de conferințe</h2>
                <p>Hotelul are la dispoziție spații concepute special pentru întâlniri de afaceri, seminarii și alte evenimente profesionale.</p>
              </div>

            </div>
          </div>

          <div className="tourist-spots">

            <div className="tourist-spots-introduction">
              <img src={tourist_spots} alt="" />
              <h1>Obiective turistice</h1>
            </div>

            <div className="boxes-tourist-spots">
              
              <div className="card" id="card1">
                <div className="card-content">
                  <h2 className="card-title">Faleza din Galați</h2>
                  <p className="card-body">Amenajată la jumătatea secolului al XX-lea în scop turistic și pentru a ameliora circulația motorizată, Faleza Dunării reprezintă unul dintre cele mai importante obiective turistice din Galați.</p>
                </div>
              </div>

              <div className="card" id="card2">
                <div className="card-content">
                  <h2 className="card-title">Grădina Publică</h2>
                  <p className="card-body">Grădina Publică are o suprafață de aprox. 100.000 mp, fiind o zonă de agrement, unde se organizează evenimentele orașului.</p>
                </div>
              </div>

              <div className="card" id="card3">
                <div className="card-content">
                  <h2 className="card-title">Grădina Botanică</h2>
                  <p className="card-body"> Patrimoniul Grădinii Botanice este format din peste 260.000 de exemplare de arbori, arbuști și flori, care se întinde pe o suprafață de aprox. 18 hectare.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Avg rating: {avg}    */}
        
        
        <div className="container">
          <div className="user-reviews">

            <div className="facilities-introduction">
              <img id="facilty-image" src={facilities} alt=""/>
              <h1>Părerile clienților</h1>
            </div>

            <Review/>  
          </div>
        </div>
            

      </main>
      
    </>
  )
}

export default Home
