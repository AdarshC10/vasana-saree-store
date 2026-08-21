import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const { setIsCartOpen, totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, logout } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SHOP', path: '/shop' },
    { name: 'COLLECTIONS', path: '/shop?collection=Silk+Stories' },
    { name: 'WEDDING', path: '/wedding' },
    { name: 'VISUALIZER', path: '/visualizer' },
    { name: 'CRAFT', path: '/craft' },
    { name: 'OUR STORY', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || !isHome
            ? 'bg-vasana-bg/95 backdrop-blur-md shadow-sm border-b border-vasana-rose/50 py-3 text-vasana-dark'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Left Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-current hover:text-vasana-gold transition-colors focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-current hover:text-vasana-gold transition-colors ml-1"
                aria-label="Search Sarees"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link to="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-super-wide uppercase font-bold text-current group-hover:text-vasana-gold transition-colors">
                  VASANA
                </span>
                <span className="block text-[9px] sm:text-[10px] tracking-widest text-vasana-gold uppercase font-sans -mt-1 font-medium">
                  Woven for your moments
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs tracking-widest font-sans font-medium hover:text-vasana-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-vasana-gold hover:after:w-full after:transition-all after:duration-300 ${
                    location.pathname === link.path ? 'text-vasana-gold after:w-full' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions: Search, Wishlist, Account, Cart */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center space-x-1.5 text-xs tracking-wider font-sans hover:text-vasana-gold transition-colors py-1 px-2"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="font-medium">SEARCH</span>
              </button>

              <Link
                to="/wishlist"
                className="relative p-2 text-current hover:text-vasana-gold transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-vasana-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <div className="relative group">
                <Link
                  to={user ? (isAdmin ? '/admin' : '/account') : '/login'}
                  className="p-2 text-current hover:text-vasana-gold transition-colors flex items-center space-x-1"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                  {isAdmin && (
                    <span className="hidden sm:inline-block text-[10px] bg-vasana-gold text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">
                      ADMIN
                    </span>
                  )}
                </Link>

                {/* Dropdown Menu on hover for logged in user */}
                {user && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-vasana-rose shadow-luxury opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 p-2 text-vasana-dark">
                    <div className="px-3 py-2 border-b border-vasana-rose/40">
                      <p className="text-xs font-semibold truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-3 py-2 text-xs hover:bg-vasana-bg text-vasana-burgundy font-semibold transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 mr-2" /> Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/account"
                      className="block px-3 py-2 text-xs hover:bg-vasana-bg transition-colors"
                    >
                      My Account & Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-3 py-2 text-xs hover:bg-vasana-bg transition-colors"
                    >
                      Wishlist ({wishlistCount})
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-vasana-rose/40 mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Drawer Toggle */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-current hover:text-vasana-gold transition-colors flex items-center"
                aria-label="Open Cart Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-vasana-burgundy text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {totalItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-vasana-bg text-vasana-dark h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-vasana-rose">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl font-bold tracking-widest uppercase text-vasana-burgundy"
                >
                  VASANA
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-vasana-dark hover:text-vasana-gold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm tracking-widest font-sans font-medium text-vasana-dark hover:text-vasana-burgundy py-2 border-b border-vasana-rose/30"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-vasana-gold" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-vasana-rose pt-6 space-y-3">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Logged in as: <strong className="text-vasana-burgundy">{user.name}</strong></div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 bg-vasana-burgundy text-white text-xs font-semibold tracking-wider uppercase"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 border border-vasana-burgundy text-vasana-burgundy text-xs font-semibold tracking-wider uppercase"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-center py-2 text-xs text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 border border-vasana-burgundy text-vasana-burgundy text-xs font-semibold tracking-wider uppercase"
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 bg-vasana-burgundy text-white text-xs font-semibold tracking-wider uppercase"
                  >
                    REGISTER
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Overlay Component */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
