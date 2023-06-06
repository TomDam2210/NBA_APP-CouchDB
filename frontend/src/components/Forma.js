import React, {useState} from 'react'
import './Forma.css'

const Forma = (props) => {
    const [unosPlayer, setPlayer] = useState('');
    const [unosHeight, setHeight] = useState(0);
    const [unosWeight, setWeight] = useState(0);
    const [unosCollage, setCollage] = useState('');
    const [unosBorn, setBorn] = useState(0);
    const [unosBirthCity, setBirthCity] = useState('');
    const [unosBirthState, setBirthState] = useState('');

    const onPlayerChange = (e) => {
        setPlayer((e.target.value).toString())
        console.log(unosPlayer)
    }
    const onHeightChange = (e) => {
        setHeight(Number(e.target.value))
        console.log(unosHeight)
    }
    const onWeightChange = (e) => {
        setWeight(Number(e.target.value))
        console.log(unosWeight)
    }
    const onCollageChange = (e) => {
        setCollage((e.target.value).toString())
        console.log(unosCollage)
    }

    const onBornChange = (e) => {
        setBorn(Number(e.target.value))
        console.log(unosBorn)
    }

    const onBirthCityChange = (e) => {
        setBirthCity((e.target.value).toString())
        console.log(unosBirthCity)
    }

    const onBirthStateChange = (e) => {
        setBirthState((e.target.value).toString())
        console.log(unosBirthState)
    }

    const noviIgrac = (e) => {
        e.preventDefault();

        props.spremiIgraca({
            Player: unosPlayer,
            height: unosHeight,
            weight: unosWeight,
            collage: unosCollage,
            born: unosBorn,
            birth_city: unosBirthCity,
            birth_state: unosBirthState
        }) 

        setPlayer('')
        setHeight(0)
        setWeight(0)
        setCollage('')
        setBorn(0)
        setBirthCity('')
        setBirthState('')
    }


    return (
        <div className='okvir'>
            <form onSubmit={noviIgrac}>
                <p>NEW PLAYER</p>
                <div className='unos'>
                    <div className='odabir'>
                        <label for="player">Player:</label>
                        <input id="player" value={unosPlayer} onChange={onPlayerChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="height">Height:</label>
                        <input id="height" type="number" value={unosHeight} onChange={onHeightChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="weight">Weight:</label>
                        <input id="weight" type="number" value={unosWeight} onChange={onWeightChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="collage">Collage:</label>
                        <input id="collage" type="text" value={unosCollage} onChange={onCollageChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="born">Born:</label>
                        <input id="born" type="number" value={unosBorn} onChange={onBornChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="birth_city">BirthCity:</label>
                        <input id="birth_city" type="text" value={unosBirthCity} onChange={onBirthCityChange}></input>
                    </div>
                    <div className='odabir'>
                        <label for="birth_state">BirthState:</label>
                        <input id="birth_state" type="text" value={unosBirthState} onChange={onBirthStateChange}></input>
                    </div>
                </div>
                <div className="tipke">
                    <button id="ok" type="submit"> Spremi</button>
                    <button id="odustani" onClick={props.odustani}>Odustani</button>    
                </div>
            </form>
        </div>
    )
}


export default Forma