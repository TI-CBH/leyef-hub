import { Client, query as q } from 'faunadb'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const setupFaunaDB = async (client: Client) => {
  try {
    // Create Collections
    console.log('Creating collections...')
    await client.query(
      q.Do(
        q.CreateCollection({ name: 'tasks' }),
        q.CreateCollection({ name: 'notes' }),
        q.CreateCollection({ name: 'projects' }),
        q.CreateCollection({ name: 'meetings' })
      )
    )

    // Create Indexes
    console.log('Creating indexes...')
    await client.query(
      q.Do(
        q.CreateIndex({
          name: 'tasks_by_hub',
          source: q.Collection('tasks'),
          terms: [{ field: ['data', 'hub_id'] }]
        }),
        q.CreateIndex({
          name: 'notes_by_hub',
          source: q.Collection('notes'),
          terms: [{ field: ['data', 'hub_id'] }]
        }),
        q.CreateIndex({
          name: 'meetings_by_date',
          source: q.Collection('meetings'),
          terms: [{ field: ['data', 'start_date'] }]
        })
      )
    )

    console.log('Setup completed successfully!')
  } catch (error) {
    console.error('Error setting up FaunaDB:', error)
    process.exit(1)
  }
}

// Run setup if FAUNA_KEY is provided
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
    'X-Fauna-Version': '4'
  }
})

setupFaunaDB(client) 