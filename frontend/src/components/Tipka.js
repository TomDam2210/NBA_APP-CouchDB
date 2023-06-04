import React from 'react'
import './Tipka.css'

const Tipka = (props) => {
    return (
        <>
            <button onClick={props.klik}>{props.naslov}</button>
        </>
    )
}

export default Tipka