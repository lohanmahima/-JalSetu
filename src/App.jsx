import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import MapPage from './pages/MapPage.jsx';
import GetHelpPage from './pages/GetHelpPage.jsx';
import VolunteerPage from './pages/VolunteerPage.jsx';
import DonatePage from './pages/DonatePage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import MatchCenterPage from './pages/MatchCenterPage.jsx';
import CommandCenterPage from './pages/CommandCenterPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="get-help" element={<GetHelpPage />} />
        <Route path="volunteer" element={<VolunteerPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="matches" element={<MatchCenterPage />} />
        <Route path="command-center" element={<CommandCenterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
