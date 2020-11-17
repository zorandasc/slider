import React from "react"
import Navbar from "./components/Navbar"

const slides = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image:
      "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image:
      "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Four",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    title: "Five",
    subtitle: "Australia",
    description: "A piece of heaven",
    image:
      "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  }
];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {

    if (!ref.current || !active) {
      return
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    };

    //refence slike koja je aktivna
    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return
      }

      if (!state.rect) {
        //dobavi granice trenutne aktivne slike
        state.rect = el.getBoundingClientRect();
      }
      //DOBAVI POLOZAJ MISA
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      //px i py su brojevi od 0 do 1
      //relativni polazaji misa u odnosu na kartu
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      //a onda ih dalje sutenom prem css, kao css promjenjive
      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    }

    //PRATI POLOZAJ MISA NA AKTIVNOJ KARTI
    el.addEventListener("mousemove", handleMouseMove)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)

    }

  }, [active])

  return ref
}


function Slide({ slide, offset }) {
  //AKO JE OFSET 0 ONA JE ACTIV CLAS AKTIVNA
  const active = offset === 0 ? true : null;

  //for Triggering imperative animations samo u slucaju offset === 0
  //nas custom hook useTilt()
  const ref = useTilt(active)

  return (
    //HTML data-* Attributes
    //The data -* attributes consist of two parts:
    // Any attribute on any element whose attribute name 
    //starts with data- is a data attribute. Say you have an 
    //article and you want to store some extra information that 
    //doesn’t have any visual representation. Just use data attributes for that:
    //U OVOM SLUCAJU data-active JE NASA CUSTUMA ATIBUTE KOJI MOZEMO
    //REFENCIRATI U CSS
    <div
      ref={ref} //for Triggering imperative animations.
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}>
      {/*OVO JE ZATVORENI DIV SAM ZA SEBE KAO CIJELOKUPNI BACKGROUND */}
      <div className="slideBackground"
        style={{ backgroundImage: `url('${slide.image}')` }} />
      {/*OVO JE BACKGROUND SVAKE POJEDINACNE SLIKICE */}
      <div className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`
        }} >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </div>
      </div>
    </div>)
}

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

export default function Home() {

  //VRACA GLOBALNI STATE OBJEKAT, CIJE INICIJALNO STANJE JE
  //initialState, TO ZNACI DA JE state OBJEKAT SA PROMJENJIVOM
  //slideIndex 
  const [state, dispatch] = React.useReducer(slidesReducer, initialState)
  console.log("slides.lengt", slides.length)
  console.log("state.slideIndex", state.slideIndex)
  return (
    <>
      <Navbar></Navbar>
      <div className="slides">
        <button onClick={() => dispatch({ type: "PREV" })}>{"<"}</button>
        {[...slides, ...slides, ...slides].map((slide, i) => {
          //SVAK SLIKA CE IMATI SVOJ OFSET,
          //PRI CEMU NA POCETKIU ZADNJA SLIKA U NIZU IMA OFSET 0
          //A SAM PRIKAZA POJEDACNIH SLIKA OSTAVLJAMO CSS
          //DA NA OSNOVU ofseta ODLUCI IZGLED
          let offset = slides.length + (state.slideIndex - i);
          console.log("i", i)
          console.log("offset", offset)
          return <Slide slide={slide} offset={offset} key={i}></Slide>
        })}
        <button onClick={() => { dispatch({ type: "NEXT" }) }}>{">"}</button>
      </div>
    </>
  )
}
