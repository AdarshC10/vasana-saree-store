import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { fallbackProducts } from '../utils/fallbackData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

// PDP Subcomponents
import ProductGallery from '../components/pdp/ProductGallery';
import ProductAccordion from '../components/pdp/ProductAccordion';
import ProductStory from '../components/pdp/ProductStory';
import RelatedProducts from '../components/pdp/RelatedProducts';
import RecentlyViewed from '../components/pdp/RecentlyViewed';
import ProductSkeleton from '../components/pdp/ProductSkeleton';

export default function ProductDetail() {
  const { identifier } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState('Unstitched Standard');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [identifier]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${identifier}`);
      if (res.data) {
        setProduct(res.data);
        document.title = `${res.data.name} | VASANA`;
      } else {
        findFallback();
      }
    } catch (error) {
      findFallback();
    } finally {
      setLoading(false);
    }
  };

  const findFallback = () => {
    const found = fallbackProducts.find(p => p._id === identifier || p.slug === identifier) || fallbackProducts[0];
    setProduct(found);
    if (found) document.title = `${found.name} | VASANA`;
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  // 404 Error State
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F3ED] pt-36 text-center p-8 font-sans space-y-4">
        <span className="text-[10px] font-bold tracking-super-wide text-[#B4975A] uppercase">VASANA ATELIER</span>
        <h2 className="font-serif text-4xl text-[#241C18]">THIS SAREE HAS LEFT THE LOOM</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">The saree you're looking for is no longer available.</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 bg-[#241C18] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#322722] shadow-luxury"
        >
          EXPLORE SAREES
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product._id);
  const originalPrice = product.originalPrice || product.price;
  const discountPercent = product.discount || (product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0);
  const currentPrice = product.discount ? Math.round(originalPrice * (1 - discountPercent / 100)) : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, blouseOption);
    addToast(`Added "${product.name}" to your bag!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, blouseOption);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#29231F] pt-32 pb-24 font-sans selection:bg-[#241C18] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs Navigation */}
        <div className="text-xs font-sans text-gray-500 mb-8 space-x-2">
          <Link to="/" className="hover:text-[#B4975A]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#B4975A]">Sarees</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#B4975A]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#241C18] font-semibold truncate inline-block max-w-xs align-bottom">{product.name}</span>
        </div>

        {/* Desktop Split: Gallery Left, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Image Gallery Column */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Right Product Info & Actions Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-sans text-[#B4975A] font-bold uppercase tracking-widest mb-1">
                <span>{product.fabric || 'HANDLOOM'}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center text-[#B4975A]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-sans text-gray-600 font-medium">
                  {product.rating || 4.8} ({product.reviewCount || 124} Reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-[#EFE7DC] flex items-baseline space-x-3 shadow-sm">
              <span className="font-sans text-3xl font-bold text-[#241C18]">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {discountPercent > 0 && (
                <span className="font-sans text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-sans font-bold text-[#241C18] bg-[#B4975A] text-[#241C18] px-2 py-0.5 uppercase tracking-wider ml-auto">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs font-sans text-gray-700 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Availability */}
            <div className="flex items-center space-x-2 text-xs text-green-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>In Stock ({product.stock || 12} pieces available)</span>
            </div>

            {/* Blouse Stitching Selection */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18] block">
                Blouse Tailoring Option:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                {['Unstitched Standard', 'Custom Tailored (+₹1,490)'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBlouseOption(opt)}
                    className={`py-3 px-3 border text-left flex items-center justify-between transition-all ${
                      blouseOption === opt
                        ? 'border-[#241C18] bg-[#EFE7DC] text-[#241C18] font-semibold'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#B4975A]'
                    }`}
                  >
                    <span>{opt}</span>
                    {blouseOption === opt && <Check className="w-4 h-4 text-[#241C18]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18]">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  −
                </button>
                <span className="px-4 py-1.5 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#241C18] hover:bg-[#322722] text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B4975A]" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-all ${
                    wishlisted ? 'border-[#241C18] bg-[#241C18] text-[#B4975A]' : 'border-gray-300 bg-white text-[#241C18] hover:border-[#241C18]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all shadow-luxury"
              >
                BUY IT NOW
              </button>
            </div>

            {/* Expandable Information Accordions */}
            <div className="pt-6">
              <ProductAccordion product={product} />
            </div>

          </div>

        </div>

        {/* Product Craft Story Section */}
        <ProductStory product={product} />

        {/* You May Also Like */}
        <RelatedProducts currentProduct={product} />

        {/* Recently Viewed */}
        <RecentlyViewed currentProductId={product._id} />

      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#EFE7DC] p-3 flex lg:hidden items-center space-x-3 shadow-2xl">
        <button
          onClick={() => toggleWishlist(product)}
          className={`p-3 border transition-colors ${
            wishlisted ? 'bg-[#241C18] text-[#B4975A] border-[#241C18]' : 'bg-white text-[#241C18] border-gray-300'
          }`}
        >
          <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-[#241C18] text-white text-xs font-bold uppercase tracking-wider"
        >
          ADD TO BAG
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 bg-[#B4975A] text-[#241C18] text-xs font-bold uppercase tracking-wider"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
