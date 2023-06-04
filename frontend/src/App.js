import React, {useEffect, useState} from "react"
import './App.css'
import axios from 'axios'

import Igrac from "./components/Igrac"
import Tipka from "./components/Tipka"

const App = () => {

    const [players, setPlayers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchPlayer, setSearchPlayer] = useState("")
    const pageSize = 10
    //const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        getPlayers()
    },[currentPage])

    const getPlayers = () => {
        axios.get('http://localhost:3001/api/players', {
            params: {
                page: currentPage,
                pageSize: pageSize
            }
        })
        .then(odg => {
            console.log(odg.data)
            setPlayers(odg.data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    const handleSearch = (e) => {
        setSearchPlayer((e.target.value).toString())
        console.log(searchPlayer)
    }

    const handleNextPage = () => {
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
        }
    }

    

return (
    <div>
        <h1>NBA PLAYERS</h1> 
        <div>
            <input 
                type="text"
                placeholder="Pretraži igrače..."
                value={searchPlayer}
                onChange={handleSearch}
            >
            </input>
            <button>Pretraži</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th className="th">Player</th>
                    <th className="th">Height</th>
                    <th className="th">Weight</th>
                    <th className="th">Collage</th>
                    <th className="th">Born</th>
                    <th className="th">BirthCity</th>
                    <th className="th">BirthState</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(player => ( 
                        <Igrac key={player.id} player={player.value} />
                    ))
                }
            </tbody>
        </table>
        <div className="pagination">
            <Tipka klik={handlePrevPage} naslov="Nazad" disabled={currentPage === 1} /> 
            <Tipka klik={handleNextPage} naslov="Naprijed" />
        </div>
    </div>
)
}

export default App