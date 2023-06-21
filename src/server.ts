import app from './config/app'
import 'dotenv/config'

const port = process.env.PORT ?? 5000
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
