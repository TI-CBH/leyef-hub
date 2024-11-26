import { Client, query as q } from 'faunadb'
import * as dotenv from 'dotenv'

dotenv.config()

const setupFaunaDB = async (client: Client) => {
  try {
    // Create Collections one by one
    console.log('Creating collections...')
    
    const collections = ['tasks', 'notes', 'projects', 'meetings']
    
    for (const name of collections) {
      try {
        await client.query(
          q.CreateCollection({ name })
        )
        console.log(`Created collection: ${name}`)
      } catch (error: any) {
        if (error.description === 'instance already exists') {
          console.log(`Collection ${name} already exists`)
        } else {
          throw error
        }
      }
    }

    // Create basic indexes
    console.log('\nCreating indexes...')
    const indexes = [
      {
        name: 'tasks_by_hub',
        source: 'tasks',
        terms: [{ field: ['data', 'hub_id'] }]
      },
      {
        name: 'notes_by_hub',
        source: 'notes',
        terms: [{ field: ['data', 'hub_id'] }]
      }
    ]

    for (const index of indexes) {
      try {
        await client.query(
          q.CreateIndex({
            name: index.name,
            source: q.Collection(index.source),
            terms: index.terms
          })
        )
        console.log(`Created index: ${index.name}`)
      } catch (error: any) {
        if (error.description === 'instance already exists') {
          console.log(`Index ${index.name} already exists`)
        } else {
          throw error
        }
      }
    }

    console.log('\nSetup completed successfully!')
  } catch (error) {
    console.error('Error setting up FaunaDB:', error)
    process.exit(1)
  }
}

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

setupFaunaDB(client) 