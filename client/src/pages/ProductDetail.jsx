import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import api from '../services/api';
import { fallbackProducts } from '../utils/fallbackData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

// PDP Subcomponents
import ProductGallery from '../components/pdp/ProductGallery';
import ProductAccordion from '../components/pdp/ProductAccordion';
import ProductStory from '../components/pdp/ProductStory';
import CustomerReviewsSection from '../components/pdp/CustomerReviewsSection';
import RelatedProducts from '../components/pdp/RelatedProducts';
import RecentlyViewed from '../components/pdp/RecentlyViewed';
import ProductSkeleton from '../components/pdp/ProductSkeleton';

export default function ProductDetail() {
  const { identifier } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState('Unstitched Standard');

  const { addToCart, setIsCartOpen } = useCart();
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
      if (res.data && typeof res.data === 'object' && res.data._id) {
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
    const found = fallbackProducts.find(p => p._id === identifier || p.slug === identifier || identifier.includes(p._id)) || fallbackProducts[0];
    setProduct(found);
    if (found) document.title = `${found.name} | VASANA`;
    setLoading(false);
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
  const originalBasePrice = product.originalPrice || product.price;
  const discountPercent = product.discount || (product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0);
  const baseUnitPrice = product.discount ? Math.round(originalBasePrice * (1 - discountPercent / 100)) : product.price;

  // Extra tailoring fee calculation (+₹1,490 for Custom Tailored)
  const isCustomTailored = blouseOption.includes('1,490') || blouseOption.includes('Custom');
  const extraTailoringFee = isCustomTailored ? 1490 : 0;

  // Dynamically calculated unit price (Base Unit Price + Tailoring Option Price)
  const unitPrice = baseUnitPrice + extraTailoringFee;
  const unitOriginalPrice = originalBasePrice + extraTailoringFee;

  // Dynamic Total Price = (base unit price + selected tailoring option price) × quantity
  const totalPrice = unitPrice * quantity;

  // Numeric star rating (e.g. 4.7)
  const ratingValue = typeof product.rating === 'number' ? product.rating : parseFloat(product.rating) || 4.7;
  const reviewCount = product.reviewCount || 19;

  const handleAddToCart = () => {
    addToCart(product, quantity, blouseOption, unitPrice);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, blouseOption, unitPrice);
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

              {/* Precise Partial Star Rating Rendering */}
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center text-[#B4975A]">
                  {[0, 1, 2, 3, 4].map((index) => {
                    const fillPercentage = Math.max(0, Math.min(100, (ratingValue - index) * 100));
                    return (
                      <div key={index} className="relative w-4 h-4 mr-0.5">
                        {/* Background Empty Star */}
                        <Star className="w-4 h-4 text-gray-300 absolute inset-0" />
                        {/* Foreground Partial/Filled Star */}
                        {fillPercentage > 0 && (
                          <div
                            className="absolute inset-0 overflow-hidden text-[#B4975A]"
                            style={{ width: `${fillPercentage}%` }}
                          >
                            <Star className="w-4 h-4 fill-current text-[#B4975A]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <span className="text-xs font-sans text-gray-600 font-medium">
                  {ratingValue.toFixed(1)} ({reviewCount} Reviews)
                </span>
              </div>
            </div>

            {/* Dynamic Price Box (Reflects Tailoring Option + Discounts) */}
            <div className="p-4 bg-white border border-[#EFE7DC] flex items-baseline space-x-3 shadow-sm relative overflow-hidden">
              <span className="font-sans text-3xl font-bold text-[#241C18]">
                ₹{unitPrice.toLocaleString('en-IN')}
              </span>
              {discountPercent > 0 && (
                <span className="font-sans text-sm text-gray-400 line-through">
                  ₹{unitOriginalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-sans font-bold bg-[#B4975A] text-[#241C18] px-2 py-0.5 uppercase tracking-wider ml-auto">
                  {discountPercent}% OFF
                </span>
              )}
              {isCustomTailored && (
                <span className="absolute bottom-1 right-2 text-[9px] font-bold text-[#B4975A] uppercase tracking-wider">
                  +₹1,490 Tailoring Included
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
              <span>In Stock ({product.stock || 18} pieces available)</span>
            </div>

            {/* Blouse Stitching Selection */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18] block">
                BLOUSE TAILORING OPTION:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                {['Unstitched Standard', 'Custom Tailored (+₹1,490)'].map((opt) => {
                  const active = blouseOption === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBlouseOption(opt)}
                      className={`py-3 px-3 border text-left flex items-center justify-between transition-all ${
                        active
                          ? 'border-[#241C18] bg-[#EFE7DC] text-[#241C18] font-semibold shadow-inner'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-[#B4975A]'
                      }`}
                    >
                      <span>{opt}</span>
                      {active && <Check className="w-4 h-4 text-[#241C18]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18]">
                QUANTITY:
              </span>
              <div className="flex items-center border border-gray-300 bg-white rounded shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold focus:outline-none"
                  aria-label="Decrease Quantity"
                >
                  −
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-[#241C18]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold focus:outline-none"
                  aria-label="Increase Quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* DYNAMIC TOTAL PRICE CALCULATION LINE */}
            <div className="p-4 bg-[#FAF6F0] border border-[#EFE7DC] rounded-lg flex items-center justify-between font-sans shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-super-wide text-[#B4975A] block">
                  TOTAL AMOUNT
                </span>
                <span className="text-[11px] text-gray-500 font-light">
                  (₹{unitPrice.toLocaleString('en-IN')} × {quantity} {quantity === 1 ? 'item' : 'items'})
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#241C18]">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                {extraTailoringFee > 0 && (
                  <span className="block text-[9px] text-[#B4975A] font-semibold">
                    Includes ₹1,490 Custom Tailoring
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#241C18] hover:bg-[#322722] text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B4975A]" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
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
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all shadow-luxury"
              >
                BUY IT NOW (₹{totalPrice.toLocaleString('en-IN')})
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

        {/* Customer Reviews & Ratings Section */}
        <CustomerReviewsSection product={product} />

        {/* You May Also Like */}
        <RelatedProducts currentProduct={product} />

        {/* Recently Viewed */}
        <RecentlyViewed currentProductId={product._id} />

      </div>

      {/* Sticky Mobile Bottom Bar with Live Total Price */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#EFE7DC] p-3 flex lg:hidden items-center space-x-3 shadow-2xl">
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`p-3 border transition-colors ${
            wishlisted ? 'bg-[#241C18] text-[#B4975A] border-[#241C18]' : 'bg-white text-[#241C18] border-gray-300'
          }`}
        >
          <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-[#241C18] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#B4975A]" />
          <span>ADD TO BAG</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 py-3 bg-[#B4975A] text-[#241C18] text-[11px] font-bold uppercase tracking-wider text-center"
        >
          BUY NOW (₹{totalPrice.toLocaleString('en-IN')})
        </button>
      </div>
    </div>
  );
}
