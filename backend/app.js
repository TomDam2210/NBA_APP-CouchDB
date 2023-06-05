const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const NodeCouchDb = require('node-couchdb')

const couch = new NodeCouchDb(
    {
        auth: {
            user:'tomdam',
            pass: 'tomo2210'
        }
    }
)

const dbName = 'players'
const viewUrl = '_design/all_players/_view/all'

couch.listDatabases().then((dbs) => {
    console.log(dbs)
})

const app = express()
const cors = require('cors')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/players', (req,res) => {
    const { page, pageSize } = req.query
    const skip = (page - 1) * pageSize

    couch.get(dbName, viewUrl, {limit: pageSize, skip: skip})
        .then(({ data }) => {
            console.log(data.rows)
            res.json(data.rows.map(row => row))
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({error: 'Internal Server Error'})
        })
        
})

app.post('/api/players/search', (req, res) => {
    const { page, pageSize } = req.query;
    const skip = (page - 1) * pageSize;
    const query = req.body;
  
    couch.mango(dbName, query)
      .then(({ data }) => {
        console.log(data.docs);
        res.json(data.docs);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

app.delete('/api/players/:id', (req, res) => {
    const playerId = req.params.id
    const rev = req.body._rev
    console.log(playerId)
    console.log(rev)

    couch.del(dbName, playerId, rev)
      .then(() => {
        console.log('Igrač uspješno izbrisan');
        res.sendStatus(204); // No Content - uspješno izbrisano
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Greška prilikom brisanja igrača' });
      });
  });

app.listen(3001, () => {
    console.log("Server je pokrenut!")
})