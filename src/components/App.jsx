import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { pixabayAPI } from 'servises/pixabayAPI';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: null,
    items: [],
    page: 1,
    loading: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    //console.log(page);

    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ loading: true, totalHits: 0 });

      pixabayAPI(query, page)
        .then(images => {
          //console.log(images);

          if (images.hits.length === 0) {
            this.setState({ loading: false });
            toast('Nothing was found according to your request.');
            return;
          }

          this.setState(prevState => ({
            items: [...prevState.items, ...images.hits],
            totalHits: images.totalHits,
          }));
        })
        .catch(error => {
          console.log(error);
          toast('Error!');
          this.setState({ loading: false });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleSubmit = value => {
    this.setState({ query: value, page: 1, items: [] });
  };

  handleLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Layout>
        <GlobalStyle />
        <Searchbar onSearch={this.handleSubmit} />
        {this.state.loading && <Loader />}
        <ImageGallery items={this.state.items} />
        {this.state.totalHits > 12 && <Button onLoad={this.handleLoad} />}
        <ToastContainer autoClose={3000} theme="light" />
      </Layout>
    );
  }
}
