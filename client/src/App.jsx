import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Pricing from './pages/Pricing';
import CaseStudies, { CaseDetail } from './pages/CaseStudies';
import Contact from './pages/Contact';
import StartProject from './pages/StartProject';
import Login from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
import { Privacy, Terms, Refund } from './pages/Legal';
import Admin from './pages/admin/Admin';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/start-project" element={<StartProject />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/success" element={<Payment />} />
                <Route path="/payment/failure" element={<Payment />} />
                <Route path="/payment/callback" element={<Payment />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
