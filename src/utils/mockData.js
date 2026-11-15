// Mock database of people
export const mockPeople = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@gmail.com',
    phone: '+1 (415) 555-0124',
    company: 'Google',
    department: 'Engineering',
    position: 'Software Engineer',
    bio: 'I build scalable cloud products and enjoy solving technical challenges with human-centered design.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'Chen',
    email: 'james.chen@gmail.com',
    phone: '+1 (408) 555-0170',
    company: 'Microsoft',
    department: 'Product',
    position: 'Product Manager',
    bio: 'I connect customer insight with roadmap strategy and lead product discovery across AI-enabled experiences.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    firstName: 'Emma',
    lastName: 'Rodriguez',
    email: 'emma.rodriguez@gmail.com',
    phone: '+1 (206) 555-0173',
    company: 'Amazon',
    department: 'Engineering',
    position: 'Senior Engineer',
    bio: 'I lead distributed systems work and care deeply about building performant, reliable software for customers.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    firstName: 'Michael',
    lastName: 'Park',
    email: 'michael.park@gmail.com',
    phone: '+1 (310) 555-0198',
    company: 'Meta',
    department: 'Design',
    position: 'UX Designer',
    bio: 'I bring clarity to complex user flows and design experiences that feel intuitive, inclusive, and useful.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@gmail.com',
    phone: '+1 (646) 555-0114',
    company: 'Google',
    department: 'Sales',
    position: 'Account Executive',
    bio: 'I partner with customers to shape growth strategies and build long-term relationships grounded in trust.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    firstName: 'David',
    lastName: 'Kumar',
    email: 'david.kumar@gmail.com',
    phone: '+1 (415) 555-0189',
    company: 'Apple',
    department: 'Engineering',
    position: 'Software Engineer',
    bio: 'I enjoy building polished experiences, improving system design, and mentoring teammates across product teams.',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    firstName: 'Sophia',
    lastName: 'Martinez',
    email: 'sophia.martinez@gmail.com',
    phone: '+1 (213) 555-0141',
    company: 'Netflix',
    department: 'Engineering',
    position: 'Backend Engineer',
    bio: 'I design resilient services and performance optimizations for customer-facing digital products at scale.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.thompson@gmail.com',
    phone: '+1 (512) 555-0159',
    company: 'Tesla',
    department: 'Product',
    position: 'Product Designer',
    bio: 'I turn user insight into tangible product direction and design systems that scale across teams.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
  }
]

export const mockAccounts = mockPeople.map((person) => ({
  ...person,
  password: 'demo123'
}))

const normalizeEmail = (email) => email.trim().toLowerCase()

const publicProfile = (user) => {
  const { password, ...profile } = user
  return profile
}

const readLocalList = (key) => JSON.parse(localStorage.getItem(key) || '[]')

// Save user registration to localStorage
export const saveUserRegistration = (userData) => {
  const users = readLocalList('users')
  const newUser = {
    id: Date.now(),
    ...userData,
    joinedDate: new Date().toLocaleString()
  }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  return newUser
}

export const authenticateUser = (email, password) => {
  const normalizedEmail = normalizeEmail(email)
  const users = [...readLocalList('users'), ...mockAccounts]
  return users.find((user) => normalizeEmail(user.email) === normalizedEmail && user.password === password) || null
}

// Get current logged-in user (from localStorage)
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null')
}

// Set current logged-in user
export const setCurrentUser = (user) => {
  const profile = publicProfile(user)
  localStorage.setItem('currentUser', JSON.stringify(profile))
  return profile
}

export const getConnectionStatus = (fromEmail, toEmail) => {
  if (!fromEmail || !toEmail) return 'none'

  const request = readLocalList('connectionRequests')
    .filter((item) => item.fromEmail === normalizeEmail(fromEmail) && item.toEmail === normalizeEmail(toEmail))
    .pop()
  return request?.status || 'none'
}

export const createConnectionRequest = (fromUser, toUser) => {
  const fromEmail = normalizeEmail(fromUser.email)
  const toEmail = normalizeEmail(toUser.email)
  if (fromEmail === toEmail) {
    throw new Error('You cannot connect with yourself.')
  }

  const requests = readLocalList('connectionRequests')
  const existing = requests.find(
    (item) => item.fromEmail === fromEmail && item.toEmail === toEmail &&
      (item.status === 'pending' || item.status === 'accepted')
  )
  if (existing) return existing

  const request = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    fromEmail,
    toEmail,
    fromProfile: publicProfile(fromUser),
    toProfile: publicProfile(toUser),
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  requests.push(request)
  localStorage.setItem('connectionRequests', JSON.stringify(requests))
  return request
}

export const getIncomingConnectionRequests = (email) => {
  const normalizedEmail = normalizeEmail(email)
  return readLocalList('connectionRequests').filter(
    (request) => request.toEmail === normalizedEmail && request.status === 'pending'
  )
}

export const respondToConnectionRequest = (requestId, response) => {
  if (!['accepted', 'declined'].includes(response)) {
    throw new Error('Unsupported connection request response.')
  }

  const requests = readLocalList('connectionRequests')
  const request = requests.find((item) => item.id === requestId && item.status === 'pending')
  if (!request) return false

  request.status = response
  request.respondedAt = new Date().toISOString()
  localStorage.setItem('connectionRequests', JSON.stringify(requests))

  if (response === 'accepted') {
    const chats = readLocalList('chats')
    const chatId = [request.fromEmail, request.toEmail].sort().join(':')
    if (!chats.some((chat) => chat.id === chatId)) {
      chats.push({
        id: chatId,
        participantEmails: [request.fromEmail, request.toEmail],
        participants: [request.fromProfile, request.toProfile],
        messages: []
      })
      localStorage.setItem('chats', JSON.stringify(chats))
    }
  }

  return true
}

export const getChatsForUser = (email) => {
  const normalizedEmail = normalizeEmail(email)
  return readLocalList('chats').filter((chat) => chat.participantEmails.includes(normalizedEmail))
}

export const sendChatMessage = (chatId, senderEmail, text) => {
  const chats = readLocalList('chats')
  const chat = chats.find(
    (item) => item.id === chatId && item.participantEmails.includes(normalizeEmail(senderEmail))
  )
  if (!chat) {
    throw new Error('Chat not found for this user.')
  }

  const message = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    senderEmail: normalizeEmail(senderEmail),
    text: text.trim(),
    createdAt: new Date().toISOString()
  }
  if (!message.text) return chat

  chat.messages.push(message)
  localStorage.setItem('chats', JSON.stringify(chats))
  return chat
}
