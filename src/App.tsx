import { Switch, Route } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Layout from "@/shared/components/layout/Layout"
import DashboardPage from "@/pages/DashboardPage"
import AuthPage from "@/pages/AuthPage"
import AnimeListPage from "@/pages/AnimeListPage"
import AnimeDetailsPage from "@/pages/AnimeDetailsPage"
import ProfilePage from "@/pages/ProfilePage"
import SettingsPage from "@/pages/SettingsPage"
import NotFoundPage from "@/pages/NotFoundPage"

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,  
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path="/" component={DashboardPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/anime-list" component={AnimeListPage} />
          <Route path="/anime/:id" component={AnimeDetailsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
