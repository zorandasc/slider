import React from 'react';
import styled from "styled-components"


//nasa custom made hook funkcija
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




const Slida = ({ className, slide, offset }) => {
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
            className={className}
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
        </div>
    );
};


export default styled(Slida)`
    
    grid-area: 1 / -1;


.slideContent{
    width: 30vw;
    /*JA DODDAO MAX-WIDH*/
    max-width: 25vw;
    height: 40vw;
    /*JA DODDAO MAX-HEIGHT*/
    max-height: 35vw;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.7;
    display: grid;
    align-content: center;
    transform-style: preserve-3d;
    transform: perspective(1000px) translateX(calc(100% * var(--offset)))
    rotateY(calc(-45deg * var(--dir)));
    transition: transform 0.5s ease-in-out;
}
.slideContentInner{
    transform-style: preserve-3d;
    transform: translateZ(2rem);
    transition: opacity 0.3s linear;
    text-shadow: 0 0.1rem 1rem #000;
    opacity: 0;
}
.slideSubtitle,
  .slideTitle{
      font-size: 2rem;
      font-weight: normal;
      letter-spacing: 0.2ch;
      text-transform: uppercase;
      margin: 0;
  }
  .slideSubtitle::before{
    content: "— ";
  }

.slideDescription{
    margin: 0;
    font-size: 0.8rem;
    letter-spacing: 0.2ch;
}
.slideBackground{
    position: fixed;
    top:0;
    bottom: 0;
    left: -10%;
    right: -10%;
    z-index: -1;
    background-size: cover;
    background-position: center center;
    opacity: 0;
    transition: opacity 0.3s linear, transform 0.3s ease-in-out;
    pointer-events: none;
    transform: translateX(calc(10% * var(--dir)));
    
}
&[data-active] {
    z-index: 2;
    pointer-events: auto;
}

&[data-active] .slideBackground {
    opacity: 0.2;
}
&[data-active] .slideContentInner {
    opacity: 1;
}
&[data-active] .slideContent{
    /*POSTO SU px i py KOJE DOBIJAMO OD REACTA IZMEDJU 0 i 1  
    mi oduzimamo od tig brojeva 0.5, da bi opseg bio imedju 
    -0.5 i 0.5
    */
    --x:calc(var(--px) - 0.5);
    --y:calc(var(--py) - 0.5);
    opacity: 1;
    transform: perspective(1000px);
}

&[data-active] .slideContent:hover{
    transition: none;
    transform: perspective(1000px) rotateY(calc(var(--x) * 45deg)) rotateX(calc(var(--y) * 45deg));
}




`;