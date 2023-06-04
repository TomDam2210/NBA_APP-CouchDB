import React from "react"

const Igrac = ({player}) => {
    return (
        <tr>
            <td>{player.Player}</td>
            <td>{player.height}</td>
            <td>{player.weight}</td>
            <td>{player.collage}</td>
            <td>{player.born}</td>
            <td>{player.birth_city}</td>
            <td>{player.birth_state}</td>
        </tr>
    )
}

export default Igrac