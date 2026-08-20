import Review from '../models/Review.js';
import Product from '../models/Product.js';

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { rating, comment, images } = req.body;
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await Review.create({
      user: req.user._id,
      userName: req.user.name,
      product: productId,
      rating: Number(rating),
      comment,
      images: images || [],
      verifiedPurchase: true
    });

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    product.rating = Number(avgRating.toFixed(1));
    product.reviewCount = reviews.length;
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
