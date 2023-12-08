import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AddArticlePage from './pages/AddArticlePage';
import Articlespage from './pages/ArticlesPage';
import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';
import DraftsPage from './pages/drafts';


const App=() =>{
  return(
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>}/>
      <Route path="/articles" element={<Articlespage/>}/>
      <Route path="/articles/add" element={<AddArticlePage/>}/>
      <Route path="/search-results/:searchTerm" element={<SearchPage/>}/>
      <Route path="/drafts" element={<DraftsPage/>}/>
    </Routes>
    </Layout>
    </BrowserRouter>
  );
};

export default App