import "./bookingForm.css"
import "./dropdown.css"

// React general
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function BookingForm() {

    const toggleDropdown = () => {
        var dropdownMenu = document.getElementById("dropdown-menu");
        if(dropdownMenu)
            dropdownMenu.style.display = (dropdownMenu.style.display === "none" ? "block" : "none");
      }
    
    const selectOption = (option) => {

        // console.log(typeof(+option.target.textContent)) for useState

// Access the id of that element
        const htmlString = option.target.outerHTML;
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlString;
        const elementId = tempElement.firstChild.id;
        const extractedString = elementId.slice(0, -1);
        console.log("extractedString ", extractedString)
// toggle the checked class
        const dropdownItem = document.getElementById(elementId);
            if(dropdownItem.className === "checked") {
                console.log(dropdownItem.className)
                dropdownItem.classList.remove('checked');
            }
            else
                dropdownItem.classList.add('checked');

    // toggle drop down menu
        var dropdownMenu = document.getElementById("dropdown-menu");
            dropdownMenu.style.display = "block";
      }
      
  return (
    <div className="container">
        <div className="booking-form">
            <p className="greeting">Fă o rezervare</p>
            <div className="vertical-line"></div>

            <div className="booking-box" onClick= {() => toggleDropdown()} >
                
                <div className="text">
                    <p className="description">Nr. de adulți</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </div>

                <p class="chosen-option">1 adult</p>
                
                <div id="dropdown" class="dropdown">
                    <div id="dropdown-menu" style= {{display: 'none'}}>
                        <div class="dropdown-item adult" id="adult1" onClick= {(e) => selectOption(e)}>1</div>
                        <div class="dropdown-item adult" id="adult2" onClick= {(e) => selectOption(e)}>2</div>
                    </div>
                </div>


            </div>
        </div>
    </div>
  )
}

export default BookingForm
