import React from "react"
import './Igrac.css'

const Igrac = ({player, brisi}) => {
    return (
        <tr>
            <td>{player.Player}</td>
            <td>{player.height}</td>
            <td>{player.weight}</td>
            <td>{player.collage}</td>
            <td>{player.born}</td>
            <td>{player.birth_city}</td>
            <td>{player.birth_state}</td>
            <td>
                <button onClick={brisi} id="button-brisi">Briši</button>
            </td>
        </tr>
    )
}

export default Igrac