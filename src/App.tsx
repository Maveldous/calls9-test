import { QueryClientProvider } from "react-query"

import { Header } from "components/Header"
import { Main } from "components/Main"
import { Footer } from "components/Footer"

import { queryClient } from "@/services"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <Main />
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
