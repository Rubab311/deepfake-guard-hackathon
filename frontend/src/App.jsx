import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AnalysisProvider } from './context/AnalysisContext';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import FAQ from './pages/FAQ';
import About from './pages/About';
import CyberRules from './pages/CyberRules';
import HelpGuide from './pages/HelpGuide';

function AppRoutes() {
  const { path } = useRouter();

  if (path === '/analyze') return <AnalysisProvider><Analyze /></AnalysisProvider>;
  if (path === '/faq') return <FAQ />;
  if (path === '/about') return <About />;
  if (path === '/cyber-rules') return <CyberRules />;
  if (path === '/help') return <HelpGuide />;
  return <Home />;
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppRoutes />
      </RouterProvider>
    </ThemeProvider>
  );
}
