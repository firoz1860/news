import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, Menu, X } from 'lucide-react';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', category: 'general' },
    { name: 'Business', href: '/business', category: 'business' },
    { name: 'Entertainment', href: '/entertainment', category: 'entertainment' },
    { name: 'Health', href: '/health', category: 'health' },
    { name: 'Science', href: '/science', category: 'science' },
    { name: 'Sports', href: '/sports', category: 'sports' },
    { name: 'Technology', href: '/technology', category: 'technology' }
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Newspaper size={24} />
            </div>
            <span className={styles.logoText}>NewsMonkey</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${styles.navLink} ${isActiveLink(item.href) ? styles.activeLink : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.menuButton}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavContent}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`${styles.mobileNavLink} ${isActiveLink(item.href) ? styles.activeMobileLink : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

