import React, {useEffect, useState} from "react"
import './App.css'
import axios from 'axios'

import Igrac from "./components/Igrac"
import Tipka from "./components/Tipka"

const App = () => {

    const [players, setPlayers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchPlayer, setSearchPlayer] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const pageSize = 10
    //const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        if (searchPlayer === '') {
          getPlayers();
        } else {
          searchPlayers();
        }
      }, [currentPage, searchPlayer]);

    const getPlayers = () => {
        if(searchPlayer === '') {
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
    }

    const searchPlayers = () => {
        const query = {
          selector: {
            Player: {
              $regex: `(?i)${searchPlayer}`
            }
          },
          limit: pageSize,
          skip: (currentPage - 1) * pageSize
        };
    
        axios
          .post('http://localhost:3001/api/players/search', query)
          .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
    const brisiIgraca = (id, rev) => {
        axios
          .delete(`http://localhost:3001/api/players/${id}`, {
            data: {_rev: rev}
          })
          .then(() => {
            setCurrentPage(1); // Vrati se na prvu stranicu
            getPlayers(); // Osvježi tablicu
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const handleSearch = () => {
        setCurrentPage(1)
        /*setSearchPlayer((e.target.value).toString())
        console.log(searchPlayer)*/
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
                onChange={(e) => setSearchPlayer(e.target.value)}
            >
            </input>
            <button onClick={handleSearch}>Pretraži</button>
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
                {searchPlayer === ''
                    ? players.map((player) => (
                        <Igrac key={player.id} player={player.value} brisi={() => brisiIgraca(player.id, player.value.rev)}/>
                        ))
                    : searchResults.map((player) => (
                        <Igrac key={player._id} player={player} brisi={() => brisiIgraca(player._id, player._rev)} />
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