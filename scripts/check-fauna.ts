import { Client, query as q } from 'faunadb'
import type { RequestResult } from 'faunadb'
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
    console.log('Checking FaunaDB connection and collections...')
    
    // First test the connection
    const dbInfo = await client.query(
      q.Get(q.Database('leyef-hub'))
    )
    console.log('Successfully connected to database:', dbInfo)
    
    // Then check collections
    const collections = await client.query<FaunaResponse>(
      q.Paginate(
        q.Collections()
      )
    )
    
    console.log('\nFound collections:')
    if (!collections.data || collections.data.length === 0) {
      console.log('No collections found - database is empty')
    } else {
      collections.data.forEach(col => {
        console.log(`- ${col.name || col.toString()}`)
      })
    }
    
    // Check for required collections
    const requiredCollections = ['tasks', 'notes', 'projects', 'meetings']
    const existingCollections = collections.data.map(col => 
      typeof col === 'string' ? col : col.name || col.toString()
    )
    
    console.log('\nRequired collections status:')
    requiredCollections.forEach(col => {
      const exists = existingCollections.includes(col)
      console.log(`- ${col}: ${exists ? '✅' : '❌'}`)
    })

  } catch (error) {
    if (error instanceof Error) {
      console.error('Database Error:', error.message)
      if ('description' in error) {
        console.error('Details:', (error as any).description)
      }
    } else {
      console.error('Unknown Error:', error)
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
  timeout: 30000,
  headers: {
    'X-Fauna-Source': 'Leyef-Hub'
  }
})

checkCollections(client) 