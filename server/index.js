import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error('Missing MONGODB_URI in server/.env')
  process.exit(1)
}

app.use(cors({ origin: 'http://localhost:5175' }))
app.use(express.json())

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Staff', 'Admin'], default: 'Student' },
}, { timestamps: true })

const issueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  building: { type: String, required: true },
  location: { type: String, default: '' },
  desc: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' },
  reporter: { type: String, required: true },
  reporterEmail: { type: String, required: true },
  photoUrl: { type: String, default: '' },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
const Issue = mongoose.model('Issue', issueSchema)

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed, role })
    return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Registration failed.' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    return res.json({ id: user._id, name: user.name, email: user.email, role: user.role })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Login failed.' })
  }
})

app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 })
    return res.json(issues)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Could not load issues.' })
  }
})

app.post('/api/issues', async (req, res) => {
  try {
    const { category, building, location, desc, priority, reporter, reporterEmail, photoUrl } = req.body
    if (!category || !building || !desc || !reporter || !reporterEmail) {
      return res.status(400).json({ message: 'category, building, description, reporter and reporterEmail are required.' })
    }

    const issue = await Issue.create({ category, building, location: location || '', desc, priority: priority || 'Medium', reporter, reporterEmail, photoUrl: photoUrl || '' })
    return res.status(201).json(issue)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Could not create issue.' })
  }
})

app.patch('/api/issues/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const allowed = ['status', 'priority', 'location', 'desc', 'photoUrl']
    const payload = {}
    for (const key of Object.keys(updates)) {
      if (allowed.includes(key)) payload[key] = updates[key]
    }

    const issue = await Issue.findByIdAndUpdate(id, payload, { new: true })
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found.' })
    }
    return res.json(issue)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Could not update issue.' })
  }
})

app.listen(port, async () => {
  await connectDb()
  console.log(`Server listening on http://localhost:${port}`)
})
