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
    
    // Using classic FQL syntax
    const collections = await client.query<FaunaResponse>(
      q.Paginate(
        q.Collections(),
        { size: 100 }
      )
    )
    
    console.log('\nFound collections:')
    if (!collections.data || collections.data.length === 0) {
      console.log('No collections found - database is empty')
    } else {
      collections.data.forEach(ref => {
        console.log(`- ${ref.toString()}`)
      })
    }
    
    // Check for required collections
    const requiredCollections = ['tasks', 'notes', 'projects', 'meetings']
    const existingCollections = collections.data.map(ref => 
      ref.toString().replace('Collection("', '').replace('")', '')
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
  timeout: 30000
})

checkCollections(client) 