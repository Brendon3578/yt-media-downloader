import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <div className="p-2 mx-auto w-full max-w-xl md:max-w-5xl mt-8">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
