import { Client, query as q } from 'faunadb'

const createCollections = async (client: Client) => {
  try {
    // Create Tasks collection
    await client.query(
      q.CreateCollection({ name: 'tasks' })
    )
    
    // Create Notes collection
    await client.query(
      q.CreateCollection({ name: 'notes' })
    )

    // Create indexes
    await client.query(
      q.CreateIndex({
        name: 'tasks_by_hub',
        source: q.Collection('tasks'),
        terms: [{ field: ['data', 'hub_id'] }]
      })
    )

    await client.query(
      q.CreateIndex({
        name: 'notes_by_hub',
        source: q.Collection('notes'),
        terms: [{ field: ['data', 'hub_id'] }]
      })
    )

    console.log('Collections and indexes created successfully')
  } catch (error) {
    console.error('Error setting up database:', error)
  }
}

// Run setup if FAUNA_KEY is provided
const key = process.env.FAUNA_KEY
if (!key) {
  console.error('FAUNA_KEY environment variable is required')
  process.exit(1)
}

const client = new Client({ secret: key })
createCollections(client) 