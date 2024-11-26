import { Client, query as q } from 'faunadb'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const checkCollections = async (client: Client) => {
  try {
    console.log('Checking FaunaDB collections...')
    
    const collections = await client.query(
      q.Map(
        q.Paginate(q.Collections()),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )
    
    console.log('Found collections:', collections)
    
    // Check for required collections
    const requiredCollections = ['tasks', 'notes', 'projects', 'meetings']
    const existingCollections = collections.data.map((col: any) => col.name)
    
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