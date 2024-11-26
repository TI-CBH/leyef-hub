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
    
    // Using FQL v9 syntax
    const collections = await client.query<FaunaResponse>(
      q.Let(
        {
          collections: q.Paginate(q.Collections())
        },
        {
          data: q.Select(['data'], q.Var('collections'))
        }
      )
    )
    
    console.log('\nFound collections:')
    if (collections.data.length === 0) {
      console.log('No collections found')
    } else {
      collections.data.forEach(col => {
        console.log(`- ${col.name}`)
      })
    }
    
    // Check for required collections
    const requiredCollections = ['tasks', 'notes', 'projects', 'meetings']
    const existingCollections = collections.data.map(col => col.name)
    
    console.log('\nRequired collections:')
    requiredCollections.forEach(col => {
      const exists = existingCollections.includes(col)
      console.log(`- ${col}: ${exists ? '✅' : '❌'}`)
    })

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error checking collections:', error.message)
    } else {
      console.error('Error checking collections:', error)
    }
    process.exit(1)
  }
}

// Run check if FAUNA_KEY is provided
const key = process.env.FAUNA_KEY
if (!key) {
  console.error('FAUNA_KEY environment variable is required')
  process.exit(1)
}

const client = new Client({
  secret: key,
  domain: 'db.fauna.com',
  scheme: 'https',
  headers: {
    'X-Fauna-Source': 'leyef-hub'
  }
})

checkCollections(client) 