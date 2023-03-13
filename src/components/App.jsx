import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { pixabayAPI } from 'servises/pixabayAPI';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '') return;

    setLoading(true);
    setTotalHits(0);

    pixabayAPI(query, page)
      .then(images => {
        if (images.hits.length === 0) {
          setLoading(false);
          toast('Nothing was found according to your request.');
          return;
        }
        setItems(prevState => [...prevState, ...images.hits]);
        setTotalHits(images.totalHits);
      })
      .catch(error => {
        console.log(error);
        toast('Error!');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, query]);

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setItems([]);
  };

  const handleLoad = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Layout>
      <GlobalStyle />
      <Searchbar onSearch={handleSubmit} />
      {loading && <Loader />}
      <ImageGallery items={items} />
      {totalHits > 12 && <Button onLoad={handleLoad} />}
      <ToastContainer autoClose={3000} theme="light" />
    </Layout>
  );
}
