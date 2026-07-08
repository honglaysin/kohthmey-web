import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AboutUs from "./components/AboutUs";
import Brands from "./components/Brands";
import Services from "./components/Services";
import routes from "tempo-routes";
import News from "./components/News";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import Careers from "./components/Careers";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./components/AdminDashboard";
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/brands" element={<Brands />} />
          {/* <Route path="/news" element={<News />} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/contactform" element={<ContactForm />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
