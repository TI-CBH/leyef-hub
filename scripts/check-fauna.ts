import { Client, query as q } from 'faunadb'

const checkCollections = async (client: Client) => {
  try {
    const collections = await client.query(
      q.Map(
        q.Paginate(q.Collections()),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )
    console.log('Collections:', collections)
  } catch (error) {
    console.error('Error checking collections:', error)
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