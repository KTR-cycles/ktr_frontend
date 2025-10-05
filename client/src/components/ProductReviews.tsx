import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", { rating, comment });
    setFeedbackOpen(false);
    setRating(0);
    setComment("");
  };

  return (
    <section className="py-8">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-primary text-primary"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </div>
          </div>

          <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="rounded-full" data-testid="button-give-feedback">
                Give Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
                <DialogDescription>
                  Help others by sharing your thoughts about this product
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="hover-elevate active-elevate-2 p-1 rounded-lg transition-all"
                        data-testid={`button-rating-${star}`}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating ? "fill-primary text-primary" : "text-border"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Share your thoughts about this cycle..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="rounded-xl"
                    data-testid="input-review-comment"
                  />
                </div>
                <Button
                  onClick={handleSubmitFeedback}
                  className="w-full rounded-full"
                  disabled={rating === 0 || !comment.trim()}
                  data-testid="button-submit-feedback"
                >
                  Submit Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border-t border-border pt-6 first:border-t-0 first:pt-0"
              data-testid={`review-${review.id}`}
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {review.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-primary text-primary" : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed mb-3">{review.comment}</p>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate active-elevate-2 px-3 py-1 rounded-lg">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
