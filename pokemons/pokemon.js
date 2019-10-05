const mongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID
const DB_URL = 'mongodb+srv://Luna:Luna6533@luna-calky.gcp.mongodb.net/admin?retryWrites=true&w=majority'
const DB_NAME = 'example'

let pokemons = []
mockPokemon()

function Pokemon(name, type) {
    this.name = name
    this.type = type
    this.id = null
    this.type2 = null
}

async function savePokemon(name, type) {
    let p = createPokemon(name, type)
    // pokemons.push(p)


    // mongoClient.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    //     if (err) {
    //         return false
    //     }
    // })

    // database = client.db(DB_NAME)
    // collection = database.collection('pokemons')
    // collection.insert(p,(err,result) => {
    //     if (err) {
    //         return false
    //     }
    // })
    
    // return true
    const option = {useNewUrlParser: true, useUnifiedTopology: true }
    var collection, database
            
    var client = await mongoClient.connect(DB_URL,option)
                                .catch(err => console.error(err))

    database = client.db(DB_NAME)
    collection = database.collection('pokemons')
    try {
        var result = await collection.insert(p)
        return true
    } catch(err) {
        console.error(err)
        return false
    } finally {
        client.close()
    }


}

async function getPokemon() {
    const option = {useNewUrlParser: true, useUnifiedTopology: true }
    var collection, database
            
    var client = await mongoClient.connect(DB_URL,option)
                                .catch(err => console.error(err))

    database = client.db(DB_NAME)
    collection = database.collection('pokemons')
    try {
        var result = await collection.find({}).toArray()
        return result
    } catch(err) {
        console.error(err)
        return false
    } finally {
        client.close()
    }
}

async function getOnePokemon(id) {
    const option = {useNewUrlParser: true, useUnifiedTopology: true }
    var collection, database
            
    var client = await mongoClient.connect(DB_URL,option)
                                .catch(err => console.error(err))

    database = client.db(DB_NAME)
    collection = database.collection('pokemons')
    try {
        var result = await collection.findOne({_id: ObjectID(id)}).toArray()
        var pokemon = result[0]
        console.log(result)
        return result
    } catch(err) {
        console.error(err)
        return false
    } finally {
        client.close()
    }
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

function mockPokemon() {
    pokemons.push(createPokemon('Pikachu', 'Electric'))
    pokemons.push(createPokemon('Paras', 'Bug'))
}

function generateNewId(num) {
    return num + 1
}

function isPokemonExisted(id) {
    return pokemons[id-1] !== undefined && pokemons[id-1] !== null
}

// function getPokemon(id) {
//     return pokemons[id - 1]
// }

function update(pokemon) {
    pokemons[pokemon.id - 1] = pokemon
    return true
}

module.exports.isPokemonExisted = isPokemonExisted
module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.getOnePokemon = getOnePokemon
module.exports.update = update