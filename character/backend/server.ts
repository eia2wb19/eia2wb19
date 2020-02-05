import * as Http from 'http'
// import * as Url from 'url'
import * as Mongo from 'mongodb'

export namespace EIA2_W19 {
  // interface Order {
  //   [type: string]: string | string[]
  // }

  let characters: Mongo.Collection

  let port: number | string | undefined = process.env.PORT
  if (port == undefined) port = 5001

  let databaseUrl: string = 'mongodb://0.0.0.0:27017'

  startServer(port)
  connectToDatabase(databaseUrl)

  function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer()
    console.log('Server starting on port:' + _port)

    server.listen(_port)
    server.addListener('request', handleRequest)
  }

  async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options)
    await mongoClient.connect()
    characters = mongoClient.db('EIA').collection('character')
    console.log('Database connection ', characters != undefined)
  }

  async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<any> {
    if (_request.url && _request.url.includes('/character')) {
      _response.setHeader('content-type', 'text/html; charset=utf-8') // TODO: Return json
      _response.setHeader('Access-Control-Allow-Origin', '*')

      switch (_request.method) {
        case 'POST':
          let bodyChunks: any = []
          _request
            .on('data', chunk => {
              bodyChunks.push(chunk)
            })
            .on('end', () => {
              const data = JSON.parse(Buffer.concat(bodyChunks).toString())
              if (data && data.character) {
                upsertCharacter(data.character)
              }
            })

          break

        case 'GET':
          const urlSegments = _request.url.split('/').filter(x => x !== '')
          if (urlSegments.length == 2) {
            _response.write(JSON.stringify(await findOne(urlSegments[1])))
          } else {
            _response.write(JSON.stringify(await findMany()))
          }
          break

        default:
          break
      }
    }

    return _response.end()
  }
  async function upsertCharacter(_character: any) {
    if (_character._id) {
      return await characters.updateOne({ _id: _character._id }, { $set: _character })
    } else {
      console.log('create')
      return characters.insertOne(_character)
    }
  }

  async function findOne(id: string) {
    const test = await characters.findOne({
      _id: '5e39c58de049892a3dfcf353'
    })
    console.log(test, id)
    return test
  }

  async function findMany() {
    return characters.find({}).toArray()
  }
}
