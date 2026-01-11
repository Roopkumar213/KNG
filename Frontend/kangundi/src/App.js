import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { HelmetProvider } from 'react-helmet-async';

const Home = React.lazy(() => import('./pages/Home'));
const Heritage = React.lazy(() => import('./pages/Heritage'));
const Bouldering = React.lazy(() => import('./pages/Bouldering'));
const Experiences = React.lazy(() => import('./pages/Experiences'));
const Itineraries = React.lazy(() => import('./pages/Itineraries'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Roadmap = React.lazy(() => import('./pages/Roadmap'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Events = React.lazy(() => import('./pages/Events'));
const Admin = React.lazy(() => import('./pages/Admin'));
const BlogList = React.lazy(() => import('./pages/BlogList'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-heritage-cream">
    <div className="w-12 h-12 border-4 border-heritage-sand border-t-heritage-charcoal rounded-full animate-spin"></div>
  </div>
);



function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/heritage" element={<Heritage />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/responsible-tourism" element={<Heritage />} />
              <Route path="/contact" element={<Contact />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Dedicated Bouldering Page */}
              <Route path="/bouldering" element={<Bouldering />} />

              {/* Strategic Roadmap */}
              <Route path="/roadmap" element={<Roadmap />} />

              {/* Admin Portal */}
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
