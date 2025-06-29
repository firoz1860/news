import React from 'react';
import { Calendar, User, ExternalLink } from 'lucide-react';
import styles from './NewsItem.module.css';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const defaultImage = "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800";

  return (
    <div className={styles.newsCard}>
      {/* Image */}
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl || defaultImage} 
          className={styles.image} 
          alt={title}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        {/* Source Badge */}
        <div className={styles.sourceBadgeContainer}>
          <span className={styles.sourceBadge}>
            {source}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>
          {title}
        </h3>

        {/* Description */}
        <p className={styles.description}>
          {description}
        </p>

        {/* Meta Information */}
        <div className={styles.metaContainer}>
          {author && (
            <div className={styles.metaItem}>
              <User size={12} />
              <span>By {author}</span>
            </div>
          )}
          {date && (
            <div className={styles.metaItem}>
              <Calendar size={12} />
              <span>{formatDate(date)}</span>
            </div>
          )}
        </div>

        {/* Read More Button */}
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.readMoreButton}
        >
          Read More
          <ExternalLink size={12} className={styles.externalIcon} />
        </a>
      </div>
    </div>
  );
};

export default NewsItem;


