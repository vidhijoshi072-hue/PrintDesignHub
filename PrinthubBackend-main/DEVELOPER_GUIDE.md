# Developer Quick Reference Guide

## 🎯 Common Tasks

### Adding a New Page

**Step 1: Create the page component**
```bash
touch src/pages/NewPage.tsx
```

**Step 2: Add route to App.tsx**
```typescript
import NewPage from './pages/NewPage'

<Route path="/new-page" element={<NewPage />} />
```

**Step 3: Add navigation link**
```typescript
// In Navigation.tsx
<Link to="/new-page">New Page</Link>
```

**Step 4: Create Redux slice if needed**
```bash
touch src/store/slices/newSlice.ts
```

---

### Creating Redux Actions

**File: src/store/slices/exampleSlice.ts**
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@services/api'

export const fetchData = createAsyncThunk(
  'example/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/endpoint', { params })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

const exampleSlice = createSlice({
  name: 'example',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export default exampleSlice.reducer
```

**Using in component:**
```typescript
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@store/slices/exampleSlice'

export default function MyComponent() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector((state: RootState) => state.example)

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return <div>{loading ? 'Loading...' : JSON.stringify(data)}</div>
}
```

---

### Making API Calls

**Basic GET Request**
```typescript
import api from '@services/api'

api.get('/endpoint')
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
```

**POST with Data**
```typescript
api.post('/endpoint', {
  name: 'John',
  email: 'john@example.com'
})
```

**File Upload**
```typescript
const formData = new FormData()
formData.append('file', fileInput.files[0])
formData.append('title', 'My Title')

api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
```

---

### Working with Forms

**Using React Hook Form**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
})

export default function MyForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
    </form>
  )
}
```

---

### Using State Management

**Reading from Redux**
```typescript
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

const user = useSelector((state: RootState) => state.auth.user)
```

**Dispatching Actions**
```typescript
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@store/index'
import { login } from '@store/slices/authSlice'

const dispatch = useDispatch<AppDispatch>()
dispatch(login({ email, password }))
```

**Using LocalStorage Hook**
```typescript
import { useLocalStorage } from '@hooks'

const [theme, setTheme] = useLocalStorage('theme', 'light')
```

---

### Creating Animations

**Using Framer Motion**
```typescript
import { motion } from 'framer-motion'

// Fade in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Stagger animation
<motion.div>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

### Error Handling

**Using React Hot Toast**
```typescript
import toast from 'react-hot-toast'

// Success
toast.success('Operation successful!')

// Error
toast.error('Something went wrong')

// Loading
const loading = toast.loading('Processing...')
```

---

### Real-time Chat

**Sending Messages**
```typescript
import { sendMessage, onReceiveMessage, connectSocket } from '@services/socket'

useEffect(() => {
  connectSocket()
  onReceiveMessage((data) => {
    console.log('New message:', data)
  })
}, [])

const handleSend = () => {
  sendMessage({
    user: 'John',
    text: 'Hello!'
  })
}
```

---

## 📁 File Organization

### Components Folder
```
components/
├── Navigation.tsx    # Main navbar
├── Footer.tsx        # Footer
└── ProtectedRoute.tsx # Auth wrapper
```

### Pages Folder
```
pages/
├── HomePage.tsx
├── DashboardPage.tsx
├── auth/
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── OrderPage.tsx
└── ...
```

### Services Folder
```
services/
├── api.ts         # Axios instance
├── socket.ts      # Socket.io client
└── payment.ts     # Razorpay integration
```

### Store Folder
```
store/
├── index.ts       # Store configuration
└── slices/
    ├── authSlice.ts
    ├── designSlice.ts
    ├── orderSlice.ts
    ├── cartSlice.ts
    └── userSlice.ts
```

---

## 🎯 Common Patterns

### Protected Component
```typescript
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedComponent() {
  const { isAuthenticated } = useSelector(state => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  return <YourComponent />
}
```

### Loading State
```typescript
{loading ? (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
) : (
  <YourContent />
)}
```

### Conditional Rendering
```typescript
{data ? (
  <div>Show data</div>
) : (
  <div>No data</div>
)}
```

### Error Display
```typescript
{error && (
  <div className="bg-red-100 text-red-800 p-4 rounded-lg">
    {error}
  </div>
)}
```

---

## 🚀 Performance Tips

### 1. Use React.memo for components
```typescript
export default React.memo(MyComponent)
```

### 2. Lazy load pages
```typescript
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))

<Suspense fallback={<Loading />}>
  <HomePage />
</Suspense>
```

### 3. useCallback for functions
```typescript
const handleClick = useCallback(() => {
  // handler
}, [])
```

### 4. useMemo for expensive calculations
```typescript
const expensive = useMemo(() => {
  return complexCalculation(data)
}, [data])
```

---

## 📝 Naming Conventions

### Components
```typescript
// PascalCase, descriptive
UserProfileCard.tsx
DesignCard.tsx
ProductModal.tsx
```

### Functions
```typescript
// camelCase
handleSubmit()
fetchUserData()
calculateTotal()
```

### Constants
```typescript
// UPPER_SNAKE_CASE
const MAX_ITEMS = 10
const API_URL = 'http://...'
```

### Redux Slices
```typescript
// lowercase with description
authSlice
designSlice
orderSlice
```

---

## 🔍 Debugging Tips

### 1. Redux DevTools
Install Redux DevTools extension in your browser to trace state changes.

### 2. Console Logging
```typescript
console.log('Debug:', data)
console.error('Error:', error)
console.table(arrayData)
```

### 3. Network Tab
Check API calls in browser DevTools > Network tab.

### 4. React DevTools
Use React Firefox/Chrome extension to inspect component tree.

---

## 📦 Adding Dependencies

```bash
# Add new package
npm install package-name

# Tailwind utilities
npx tailwindcss -i ./src/index.css -o ./dist/output.css

# Type definitions
npm install -D @types/package-name
```

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of change"

# Push and create PR
git push origin feature/your-feature-name
```

---

## 📊 Component State Flow

```
Redux Store (Global State)
        ↓
Component (Local Props)
        ↓
useState (Local State)
        ↓
UI Rendering
```

---

## 🎨 Tailwind Common Classes

```scss
// Spacing
p-4     /* padding */
m-2     /* margin */
gap-3   /* gap between items */

// Colors
bg-purple-600   /* background */
text-gray-700   /* text color */
border-blue-400 /* border */

// Layout
flex    /* flexbox */
grid    /* grid layout */
w-full  /* width 100% */
h-screen /* height 100vh */

// Responsive
md:    /* medium screen and up */
lg:    /* large screen and up */
sm:    /* small screen and up */

// Animations
animate-spin
animate-bounce
hover:  /* on hover */
```

---

## 🔗 File Dependencies Flow

```
App.tsx
├── RootLayout
│   ├── Navigation
│   ├── [Page]
│   └── Footer
├── AuthLayout
│   └── LoginPage / RegisterPage
└── Store (Redux)
    ├── authSlice
    ├── designSlice
    ├── orderSlice
    └── cartSlice

services/
├── api.ts (Axios client)
├── socket.ts (WebSocket)
└── payment.ts (Razorpay)
```

---

## ✅ Pre-commit Checklist

- [ ] Code compiles without errors
- [ ] All TypeScript types are correct
- [ ] Component props are properly typed
- [ ] Redux state is structured correctly
- [ ] API calls use correct endpoints
- [ ] Error handling is implemented
- [ ] Loading states are shown
- [ ] Mobile responsiveness tested
- [ ] No console errors/warnings
- [ ] Component naming is clear

---

## 🎓 Learning Resources

- [React Patterns](https://react-patterns.com/)
- [Redux Style Guide](https://redux.js.org/style-guide/style-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module '@services/api'"
**Solution**: Check tsconfig.json paths configuration

### Issue: "Redux action not dispatching"
**Solution**: Verify action is exported and imported correctly

### Issue: "Styling not applying"
**Solution**: Clear node_modules/.cache and rebuild

### Issue: "API calls failing"
**Solution**: Verify backend is running and CORS is configured

---

**Pro Tips:**
- Use keyboard shortcuts for IDE productivity
- Keep components small and focused
- Write tests for critical functions
- Use TypeScript strictly
- Comment complex logic
- Follow console warnings

---

*Last Updated: 2024*
Created for Printhub Development Team
