import React from 'react';
import styled from "styled-components"

import slides from "../constants/lists"
import Slida from "./Slida"


const initialState = {
    slideIndex: 0
};

const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
        return {
            ...state,
            slideIndex: (state.slideIndex + 1) % slides.length
        }
    }
    if (event.type === "PREV") {
        return {
            ...state,
            slideIndex: state.slideIndex === 0 ? slides.length - 1 :
                state.slideIndex - 1
        }
    }
}


const Slides = () => {
    //VRACA GLOBALNI STATE OBJEKAT, CIJE INICIJALNO STANJE JE
    //initialState, TO ZNACI DA JE state OBJEKAT SA PROMJENJIVOM
    //slideIndex 
    const [state, dispatch] = React.useReducer(slidesReducer, initialState)
    console.log("slides.lengt", slides.length)
    console.log("state.slideIndex", state.slideIndex)
    return (
        <Wrapper >
            <button onClick={() => dispatch({ type: "PREV" })}>{"<"}</button>
            {
                [...slides, ...slides, ...slides].map((slide, i) => {
                    //SVAK SLIKA CE IMATI SVOJ OFSET,
                    //PRI CEMU NA POCETKIU ZADNJA SLIKA U NIZU IMA OFSET 0
                    //A SAM PRIKAZA POJEDACNIH SLIKA OSTAVLJAMO CSS
                    //DA NA OSNOVU ofseta ODLUCI IZGLED
                    let offset = slides.length + (state.slideIndex - i);
                    console.log("i", i)
                    console.log("offset", offset)
                    return <Slida slide={slide} offset={offset} key={i}></Slida>
                })
            }
            <button onClick={() => { dispatch({ type: "NEXT" }) }}>{">"}</button>
        </Wrapper >
    );
};

const Wrapper = styled.div`
  display: grid;
 
  button{   
    appearance: none;
    background: transparent;
    border: none;
    color: whitesmoke;
    position: absolute;
    top: 30%;
    z-index: 5;
    width: 5rem;
    height: 5rem;
    opacity: 0.7;
    transition: opacity 0.3s;
    font-size: 2rem;
}

button:hover{
    opacity: 1;
}

button:focus {
      outline: none;
    }

button:first-child{
    left: -50%;
}
button:last-child{
    right: -50%;
}

`


export default Slides;
