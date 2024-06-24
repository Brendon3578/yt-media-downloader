import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen w-full flex flex-col">
          <Header />
          <div className="p-2 pb-16 mx-auto w-full max-w-xl md:max-w-5xl mt-8">
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
