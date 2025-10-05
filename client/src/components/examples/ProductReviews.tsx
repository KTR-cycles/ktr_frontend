import ProductReviews from '../ProductReviews';

export default function ProductReviewsExample() {
  const reviews = [
    {
      id: "1",
      userName: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent cycle! Perfect for mountain trails. The build quality is outstanding and it handles rough terrain beautifully.",
      date: "2 weeks ago",
      helpful: 12
    },
    {
      id: "2",
      userName: "Priya Sharma",
      rating: 4,
      comment: "Great value for money. Comfortable ride and smooth gears. Only minor issue is the seat could be more cushioned.",
      date: "1 month ago",
      helpful: 8
    },
    {
      id: "3",
      userName: "Amit Patel",
      rating: 5,
      comment: "Best purchase ever! I've been cycling daily for 3 months now. The performance is consistent and maintenance is minimal.",
      date: "3 months ago",
      helpful: 15
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <ProductReviews reviews={reviews} averageRating={4.7} totalReviews={156} />
    </div>
  );
}
