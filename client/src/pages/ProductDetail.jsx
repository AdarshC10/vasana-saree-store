import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import api from '../services/api';
import { fallbackProducts } from '../utils/fallbackData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ReviewSection from '../components/ReviewSection';

export default function ProductDetail() {
  const { identifier } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState('Unstitched Standard');
  const [activeTab, setActiveTab] = useState('description');

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
      if (res.data) setProduct(res.data);
      else findFallback();
    } catch (error) {
      findFallback();
    } finally {
      setLoading(false);
    }
  };

  const findFallback = () => {
    const found = fallbackProducts.find(p => p._id === identifier || p.slug === identifier) || fallbackProducts[0];
    setProduct(found);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3ED] pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#B4975A]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F3ED] pt-32 text-center p-8">
        <h2 className="font-serif text-3xl text-[#241C18]">Product Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block text-[#B4975A] underline">Return to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product._id);
  const originalPrice = product.price;
  const discountedPrice = product.discount
    ? Math.round(originalPrice * (1 - product.discount / 100))
    : originalPrice;

  const images = product.images?.length
    ? product.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'];

  const handleBuyNow = () => {
    addToCart(product, quantity, blouseOption);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#29231F] pt-32 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs font-sans text-gray-500 mb-8 space-x-2">
          <Link to="/" className="hover:text-[#B4975A]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#B4975A]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#B4975A]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#241C18] font-medium truncate inline-block max-w-xs align-bottom">{product.name}</span>
        </div>

        {/* Top Split: Gallery Left, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-[#241C18] border border-[#EFE7DC] overflow-hidden shadow-luxury">
              <img
                src={images[selectedImgIdx]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.newArrival && (
                  <span className="bg-[#241C18] text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1">
                    NEW ARRIVAL
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-[#B4975A] text-[#241C18] text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`w-20 h-24 border overflow-hidden transition-all shrink-0 ${
                      selectedImgIdx === idx ? 'border-[#B4975A] ring-2 ring-[#B4975A]/20' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-sans text-[#B4975A] font-bold uppercase tracking-super-wide mb-1">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.collectionType || 'Silk Stories'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-sans text-gray-600 font-medium">
                  {product.rating || 4.8} ({product.reviewCount || 18} Customer Reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-[#EFE7DC] flex items-baseline space-x-3 shadow-sm">
              <span className="font-sans text-3xl font-bold text-[#241C18]">
                ₹{discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.discount > 0 && (
                <span className="font-sans text-base text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] font-sans font-semibold text-green-700 bg-green-50 px-2 py-0.5 ml-auto">
                Inclusive of all taxes & duties
              </span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans p-4 bg-[#EFE7DC]/50 border border-[#EFE7DC]">
              <div>
                <span className="text-gray-500 block">Fabric</span>
                <strong className="text-[#241C18]">{product.fabric}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Color</span>
                <strong className="text-[#241C18]">{product.color}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Saree Length</span>
                <strong className="text-[#241C18]">{product.sareeLength || '5.5 meters'}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Blouse Piece</span>
                <strong className="text-[#241C18]">{product.blouseLength || '0.8 meters unstitched'}</strong>
              </div>
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

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-3">
                <button
                  onClick={() => addToCart(product, quantity, blouseOption)}
                  className="flex-1 py-4 bg-[#241C18] hover:bg-[#322722] text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B4975A]" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-all ${
                    wishlisted ? 'border-[#241C18] bg-[#241C18] text-white' : 'border-gray-300 bg-white text-[#241C18] hover:border-[#241C18]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current text-[#B4975A]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all shadow-luxury"
              >
                BUY NOW WITH EXPRESS CHECKOUT
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#EFE7DC] grid grid-cols-3 gap-2 text-[11px] font-sans text-gray-600">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-[#B4975A] shrink-0" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B4975A] shrink-0" />
                <span>Authentic SilkMark</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <RotateCcw className="w-4 h-4 text-[#B4975A] shrink-0" />
                <span>7 Days Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specs, Craft Story & Reviews */}
        <div className="bg-white border border-[#EFE7DC] p-6 sm:p-10 shadow-luxury mb-16">
          <div className="flex space-x-8 border-b border-[#EFE7DC] pb-4 mb-6 overflow-x-auto no-scrollbar">
            {['description', 'craftsmanship', 'care', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-serif text-lg uppercase tracking-wider transition-colors relative pb-2 ${
                  activeTab === tab
                    ? 'text-[#241C18] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B4975A]'
                    : 'text-gray-400 hover:text-[#241C18]'
                }`}
              >
                {tab === 'description' && 'Product Details'}
                {tab === 'craftsmanship' && 'Artisanal Craft Story'}
                {tab === 'care' && 'Care & Storage'}
                {tab === 'reviews' && `Reviews (${product.reviewCount || 0})`}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="space-y-4 text-sm font-sans text-gray-700 leading-relaxed max-w-4xl font-light">
              <p>{product.description}</p>
              <h4 className="font-serif text-lg text-[#241C18] mt-4 font-normal">Product Specifications:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>SKU Code:</strong> {product.sku}</li>
                <li><strong>Occasion:</strong> {product.occasion}</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Design Pattern:</strong> Authentic handloom zari weave</li>
              </ul>
            </div>
          )}

          {activeTab === 'craftsmanship' && (
            <div className="space-y-4 text-sm font-sans text-gray-700 leading-relaxed max-w-4xl font-light">
              <p>{product.craftStory || 'Handcrafted meticulously by hereditary master weavers preserving centuries-old weaving traditions.'}</p>
              <div className="p-4 bg-[#EFE7DC]/50 border-l-4 border-[#B4975A] text-xs font-serif italic text-[#241C18]">
                "Each VASANA saree undergoes multi-tier quality inspections to guarantee authentic silk purity and zari metal standard."
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-3 text-xs font-sans text-gray-700 leading-relaxed max-w-4xl font-light">
              <p>{product.careInstructions || 'Dry clean only. Store wrapped in clean white muslin cloth to allow silk fiber breathability.'}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewSection productId={product._id} />
          )}

        </div>

      </div>
    </div>
  );
}
