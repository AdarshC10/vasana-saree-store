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

  // Do not render main website Navbar inside dedicated Admin Suite
  if (location.pathname.startsWith('/admin')) return null;

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

  const leftNavLinks = [
    { name: 'NEW ARRIVALS', path: '/shop?sort=newest' },
    { name: 'SAREES', path: '/shop' },
    { name: 'COLLECTIONS', path: '/shop?collection=Silk+Stories' },
    { name: 'OCCASIONS', path: '/wedding' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 font-sans">
        {/* Main Navigation Bar */}
        <nav
          className={`transition-all duration-500 ${
            isScrolled || !isHome
              ? 'bg-[#F7F3ED]/95 backdrop-blur-md shadow-luxury border-b border-[#EFE7DC] py-3 text-[#29231F]'
              : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4 text-white'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">

              {/* Mobile Layout: Left Menu Button */}
              <div className="flex items-center lg:hidden space-x-1">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 -ml-2 hover:text-[#B4975A] transition-colors focus:outline-none flex items-center space-x-1"
                  aria-label="Open Menu"
                >
                  <Menu className="w-5 h-5" />
                  <span className="text-[11px] tracking-widest font-semibold uppercase">MENU</span>
                </button>
              </div>

              {/* Desktop Left Nav Links */}
              <div className="hidden lg:flex items-center space-x-7 text-[11px] tracking-widest font-medium">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="hover:text-[#B4975A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B4975A] hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Desktop & Mobile Center Brand Logo */}
              <div className="text-center">
                <Link to="/" className="inline-block group">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-super-wide uppercase font-bold text-current group-hover:text-[#B4975A] transition-colors block">
                    VASANA
                  </span>
                  <span className="block text-[8px] sm:text-[9px] tracking-widest text-[#B4975A] uppercase font-sans -mt-1 font-medium">
                    Woven for your moments
                  </span>
                </Link>
              </div>

              {/* Right Action Icons (Search, Account, Wishlist, Bag) */}
              <div className="flex items-center space-x-3 sm:space-x-5 text-[11px] tracking-widest">
                
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden sm:flex items-center space-x-1.5 hover:text-[#B4975A] transition-colors py-1"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden lg:inline font-semibold">SEARCH</span>
                </button>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="relative p-1.5 hover:text-[#B4975A] transition-colors hidden sm:block"
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#B4975A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Account / User */}
                <div className="relative group hidden sm:block">
                  <Link
                    to={user ? (isAdmin ? '/admin' : '/account') : '/login'}
                    className="p-1.5 hover:text-[#B4975A] transition-colors flex items-center space-x-1"
                    aria-label="Account"
                  >
                    <User className="w-4 h-4" />
                    {isAdmin && (
                      <span className="text-[9px] bg-[#B4975A] text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">
                        ADMIN
                      </span>
                    )}
                  </Link>

                  {user && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#EFE7DC] shadow-luxury opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 p-2 text-[#29231F]">
                      <div className="px-3 py-2 border-b border-[#EFE7DC]">
                        <p className="text-xs font-semibold truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-3 py-2 text-xs hover:bg-[#F7F3ED] text-[#241C18] font-semibold transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2 text-[#B4975A]" /> Admin Dashboard
                        </Link>
                      )}
                      <Link to="/account" className="block px-3 py-2 text-xs hover:bg-[#F7F3ED] transition-colors">
                        My Account & Orders
                      </Link>
                      <Link to="/wishlist" className="block px-3 py-2 text-xs hover:bg-[#F7F3ED] transition-colors">
                        Wishlist ({wishlistCount})
                      </Link>
                      <button
                        onClick={() => { logout(); navigate('/', { replace: true }); }}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-[#EFE7DC] mt-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Bag / Cart Drawer Toggle */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 hover:text-[#B4975A] transition-colors flex items-center space-x-1"
                  aria-label="Bag"
                >
                  <ShoppingBag className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline font-semibold">BAG</span>
                  {totalItemCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#241C18] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#B4975A]">
                      {totalItemCount}
                    </span>
                  )}
                </button>

              </div>

            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#F7F3ED] text-[#29231F] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EFE7DC]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl font-bold tracking-widest uppercase text-[#241C18]"
                >
                  VASANA
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#29231F] hover:text-[#B4975A]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4 font-sans text-xs tracking-widest font-semibold uppercase">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-[#29231F] hover:text-[#B4975A] py-2.5 border-b border-[#EFE7DC]"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#B4975A]" />
                  </Link>
                ))}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[#29231F] hover:text-[#B4975A] py-2.5 border-b border-[#EFE7DC]"
                >
                  <span>OUR STORY</span>
                  <ChevronRight className="w-4 h-4 text-[#B4975A]" />
                </Link>
                <Link
                  to="/craft"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[#29231F] hover:text-[#B4975A] py-2.5 border-b border-[#EFE7DC]"
                >
                  <span>CRAFT</span>
                  <ChevronRight className="w-4 h-4 text-[#B4975A]" />
                </Link>
              </div>
            </div>

            <div className="border-t border-[#EFE7DC] pt-6 space-y-3 font-sans text-xs">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Logged in as: <strong className="text-[#241C18]">{user.name}</strong></div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 bg-[#241C18] text-white font-semibold tracking-wider uppercase"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 border border-[#241C18] text-[#241C18] font-semibold tracking-wider uppercase"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); navigate('/', { replace: true }); }}
                    className="block w-full text-center py-2 text-xs text-[#241C18] hover:text-[#B4975A]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 border border-[#241C18] text-[#241C18] font-semibold tracking-wider uppercase"
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 bg-[#241C18] text-white font-semibold tracking-wider uppercase"
                  >
                    REGISTER
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
