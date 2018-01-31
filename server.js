var express = require('express')
var bodyParser = require('body-parser')
var pgp = require('pg-promise')()
var db = pgp('postgres://ldarkins:WeNeedAGimm1ck!@localhost:5432/mydb')

var app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('trying to get...')
})

app.get('/pastTenseVerb', (req, res) => {
  db.any('SELECT * FROM past_tense_verbs')
    .then(function(data) {
      return res.send(data).status(200)
    })
    .catch(function(error) {
      return res.sendStatus(500, error)
    });
})

app.post('/pastTenseVerb', (req, res) => {
  const word = req.body.word

  if (!word) return res.sendStatus(400)

  db.none('INSERT INTO past_tense_verbs(word) VALUES($1)', [word])
    .then(() => {
      return res.sendStatus(200)
    })
    .catch(error => {
      return res.send(error).status(500)
    });
})

const getRandomPastTenseVerb = () => {
  return db.one('SELECT COUNT(*) FROM past_tense_verbs')
    .then((data) => {
      data.count

      const randomInt = Math.ceil(Math.random() * Math.floor(data.count))
      const randomIntString = randomInt + ''

      return db.one(`SELECT * FROM past_tense_verbs WHERE id = '${randomInt}'`)
        .then(data => {
          return data.word
        })
    })
    .catch((error) => {
      console.log(error)
    })
}

app.get('/madlib', (req, res) => {
  getRandomPastTenseVerb().then(pastTenseVerb => {
    res.send(`We wanted to ____ but then we ${pastTenseVerb} and soon we will ___`)
  })
})

app.listen(3000, () => {
  console.log('its happening')
})
