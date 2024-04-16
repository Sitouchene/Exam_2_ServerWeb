//Importations des modules necessaires
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'

//Creation de notre application 

//Voir le contenu de .env
import dotenv from 'dotenv'

const env = dotenv.config().parsed

console.log('env',env)

//importer la base de donnee

import database from './config/connexion.js'

// importer les routers
import routerRole from './routes/routingRole.js'
import routerUser from './routes/routingUser.js'
import routerClient from './routes/routingClient.js'
import routerTraining from './routes/routingTraining.js'
import routerGroup from './routes/routingGroup.js'

import routerTutor from './routes/routingTutor.js'
import routerStudent from './routes/routingStudent.js'
import routerContract from './routes/routingContract.js'
import routerGroupStudent from './routes/routingGroupStudent.js'
import routerSession from './routes/routingSession.js'
import routeAuth from './routes/routeAuth.js'

//database.sync()
database.sync({alter:true})

const app = express()

//Utilisation des modules importes
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//Une route pour tester
const callbackfn = (req, res) => {  //Un controleur
    const name = req.params.name
    res.send(`Bonjour ${name}, tout va bien?`)
}

app.get('/salutation/:name', callbackfn)



app.use("/roles", routerRole)
app.use("/users",routerUser)
app.use("/clients",routerClient)
app.use("/trainings", routerTraining)
app.use("/groups",routerGroup)
app.use("/tutors",routerTutor)
app.use("/students",routerStudent)
app.use("/contracts",routerContract)
app.use("/sessions",routerSession)
app.use("/groupsstudents",routerGroupStudent)

app.use('/login', routeAuth)


const port = 5000

app.listen(port, () => console.log(`Notre serveur tourne sur le port ${port}`))


