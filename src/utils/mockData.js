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

// Save user registration to localStorage
export const saveUserRegistration = (userData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
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
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const normalizedEmail = email.trim().toLowerCase()

  return users.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
  ) || null
}

// Get current logged-in user (from localStorage)
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null')
}

// Set current logged-in user
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user))
}
