import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()
async function getter() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
  return response.data;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}
function Todos() {
  const {data,isLoading,error} = useQuery({ queryKey: ['posts'], queryFn: getter })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <ul>{data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
    </div>
  )
}

export default App
