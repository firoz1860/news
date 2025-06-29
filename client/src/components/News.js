
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './News.module.css';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 12,
    category: 'general',
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      error: null,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} News - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    try {
      // const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;
      const url = `${process.env.REACT_APP_API_BASE}/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;

      this.props.setProgress(30);
      const response = await fetch(url);
      const data = await response.json();
      this.props.setProgress(70);

      if (data.status === 'ok') {
        this.setState({
          articles: data.articles || [],
          totalResults: data.totalResults || 0,
          error: null,
        });
      } else {
        this.setState({ error: data.message || 'Failed to fetch news' });
      }
    } catch (error) {
      this.setState({ error: 'Network error. Please check your connection.' });
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    try {
      // const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const url = `${process.env.REACT_APP_API_BASE}/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;

      this.setState({ loading: true });
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'ok') {
        this.setState({
          articles: data.articles || [],
          totalResults: data.totalResults || 0,
          loading: false,
          error: null,
        });
      } else {
        this.setState({
          loading: false,
          error: data.message || 'Failed to fetch news',
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: 'Network error. Please check your connection.',
      });
    }
  }

  fetchMoreData = async () => {
    this.props.setProgress(10);
    const nextPage = this.state.page + 1;
    try {
      // const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=${nextPage}&pageSize=${this.props.pageSize}`;
      const url = `${process.env.REACT_APP_API_BASE}/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'ok') {
        this.setState({
          articles: this.state.articles.concat(data.articles || []),
          totalResults: data.totalResults || 0,
          page: nextPage,
        });
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
    this.props.setProgress(100);
  };

  render() {
    const { articles, loading, totalResults, error } = this.state;

    return (
      <div className={styles.newsContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {this.capitalizeFirstLetter(this.props.category)} News
            </h1>
            <p className={styles.subtitle}>
              Stay updated with the latest {this.props.category} headlines
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.errorContainer}>
              <div className={styles.errorCard}>
                <h3 className={styles.errorTitle}>Unable to load news</h3>
                <p className={styles.errorMessage}>{error}</p>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && <Spinner />}

          {/* No Articles */}
          {!loading && !error && articles.length === 0 && (
            <div className={styles.noArticlesContainer}>
              <div className={styles.noArticlesCard}>
                <h3 className={styles.noArticlesTitle}>No articles found</h3>
                <p className={styles.noArticlesMessage}>
                  Try refreshing the page or check back later for new content.
                </p>
              </div>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && articles.length > 0 && (
            <InfiniteScroll
              dataLength={articles.length}
              next={this.fetchMoreData}
              hasMore={articles.length < totalResults}
              loader={<Spinner />}
              endMessage={
                <div className={styles.endMessage}>
                  <p className={styles.endMessageText}>
                    You've reached the end! 🎉
                  </p>
                </div>
              }
            >
              <div className={styles.articlesGrid}>
                {articles.map((article, index) => (
                  <NewsItem
                    key={`${article.url}-${index}`}
                    title={article.title || 'No title available'}
                    description={article.description || 'No description available'}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source?.name || 'Unknown Source'}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    );
  }
}

export default News;



// import React, { Component } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import styles from './News.module.css';

// export class News extends Component {
//   static defaultProps = {
//     country: 'us',
//     pageSize: 12,
//     category: 'general',
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0,
//       error: null,
//     };
//     document.title = `${this.capitalizeFirstLetter(this.props.category)} News - NewsMonkey`;
//   }

//   async updateNews() {
//     this.props.setProgress(10);
//     try {
//       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
//       this.props.setProgress(30);
//       const response = await fetch(url);
//       const data = await response.json();
//       this.props.setProgress(70);
      
//       if (data.status === 'ok') {
//         this.setState({
//           articles: data.articles || [],
//           totalResults: data.totalResults || 0,
//           error: null,
//         });
//       } else {
//         this.setState({ error: data.message || 'Failed to fetch news' });
//       }
//     } catch (error) {
//       this.setState({ error: 'Network error. Please check your connection.' });
//     }
//     this.props.setProgress(100);
//   }

//   async componentDidMount() {
//     try {
//       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//       this.setState({ loading: true });
//       const response = await fetch(url);
//       const data = await response.json();
      
//       if (data.status === 'ok') {
//         this.setState({
//           articles: data.articles || [],
//           totalResults: data.totalResults || 0,
//           loading: false,
//           error: null,
//         });
//       } else {
//         this.setState({ 
//           loading: false, 
//           error: data.message || 'Failed to fetch news' 
//         });
//       }
//     } catch (error) {
//       this.setState({ 
//         loading: false, 
//         error: 'Network error. Please check your connection.' 
//       });
//     }
//   }

//   fetchMoreData = async () => {
//     this.props.setProgress(10);
//     const nextPage = this.state.page + 1;
//     try {
//       // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
//       const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;

      
//       const response = await fetch(url);
//       const data = await response.json();
      
//       if (data.status === 'ok') {
//         this.setState({
//           articles: this.state.articles.concat(data.articles || []),
//           totalResults: data.totalResults || 0,
//           page: nextPage,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching more data:', error);
//     }
//     this.props.setProgress(100);
//   };

//   render() {
//     const { articles, loading, totalResults, error } = this.state;
    
//     return (
//       <div className={styles.newsContainer}>
//         <div className={styles.container}>
//           {/* Header */}
//           <div className={styles.header}>
//             <h1 className={styles.title}>
//               {this.capitalizeFirstLetter(this.props.category)} News
//             </h1>
//             <p className={styles.subtitle}>
//               Stay updated with the latest {this.props.category} headlines
//             </p>
//           </div>

//           {/* Error State */}
//           {error && (
//             <div className={styles.errorContainer}>
//               <div className={styles.errorCard}>
//                 <h3 className={styles.errorTitle}>
//                   Unable to load news
//                 </h3>
//                 <p className={styles.errorMessage}>{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && <Spinner />}

//           {/* No Articles State */}
//           {!loading && !error && articles.length === 0 && (
//             <div className={styles.noArticlesContainer}>
//               <div className={styles.noArticlesCard}>
//                 <h3 className={styles.noArticlesTitle}>
//                   No articles found
//                 </h3>
//                 <p className={styles.noArticlesMessage}>
//                   Try refreshing the page or check back later for new content.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Articles */}
//           {!loading && !error && articles.length > 0 && (
//             <InfiniteScroll
//               dataLength={articles.length}
//               next={this.fetchMoreData}
//               hasMore={articles.length < totalResults}
//               loader={<Spinner />}
//               endMessage={
//                 <div className={styles.endMessage}>
//                   <p className={styles.endMessageText}>
//                     You've reached the end! 🎉
//                   </p>
//                 </div>
//               }
//             >
//               <div className={styles.articlesGrid}>
//                 {articles.map((article, index) => (
//                   <NewsItem
//                     key={`${article.url}-${index}`}
//                     title={article.title || 'No title available'}
//                     description={article.description || 'No description available'}
//                     imageUrl={article.urlToImage}
//                     newsUrl={article.url}
//                     author={article.author}
//                     date={article.publishedAt}
//                     source={article.source?.name || 'Unknown Source'}
//                   />
//                 ))}
//               </div>
//             </InfiniteScroll>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default News;


