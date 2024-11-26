import { Client, query as q } from 'faunadb'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

interface FaunaCollection {
  ref: {
    id: string
  }
  ts: number
  name: string
}

interface FaunaResponse {
  data: FaunaCollection[]
}

const checkCollections = async (client: Client) => {
  try {
    console.log('Checking FaunaDB collections...')
    
    const collections = await client.query<FaunaResponse>(
      q.Map(
        q.Paginate(q.Collections()),
        q.Lambda('ref', 
          q.Let(
            { collection: q.Get(q.Var('ref')) },
            {
              name: q.Select(['name'], q.Var('collection')),
              ref: q.Select(['ref'], q.Var('collection')),
              ts: q.Select(['ts'], q.Var('collection'))
            }
          )
        )
      )
    )
    
    console.log('\nFound collections:')
    collections.data.forEach(col => {
      console.log(`- ${col.name}`)
    })
    
    // Check for required collections
    const requiredCollections = ['tasks', 'notes', 'projects', 'meetings']
    const existingCollections = collections.data.map(col => col.name)
    
    console.log('\nRequired collections:')
    requiredCollections.forEach(col => {
      const exists = existingCollections.includes(col)
      console.log(`- ${col}: ${exists ? '✅' : '❌'}`)
    })

  } catch (error) {
    console.error('Error checking collections:', error)
    process.exit(1)
  }
}

// Run check if FAUNA_KEY is provided
const key = process.env.FAUNA_KEY
if (!key) {
  console.error('FAUNA_KEY environment variable is required')
  process.exit(1)
}

const client = new Client({ secret: key })
checkCollections(client) 