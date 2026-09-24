import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface PublishedReview {
  id: string;
  name: string;
  message: string;
  rating: number;
  standout: string;
  quality: string;
  createdAt: string | null;
}

export function Testimonials() {
  const [reviews, setReviews] = useState<PublishedReview[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const res = await fetch('https://review.venomslayer.in/api/reviews/published');
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoaded(true);
      }
    };
    fetchPublished();
  }, []);

  if (!loaded || reviews.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mt-20 sm:mt-28">
      <div className="mb-10 sm:mb-14 text-center w-full px-2">
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#ff3333] mb-4">
          Client Reviews
        </p>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
          Words From Clients
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            className="flex flex-col p-6 sm:p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-[#ff3333]/40 transition-all duration-500 transform-gpu hover:-translate-y-1"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${s < review.rating ? 'fill-[#ff3333] text-[#ff3333]' : 'text-white/15'}`}
                />
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-1 mb-6">
              &ldquo;{review.message}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-9 h-9 rounded-full bg-[#ff3333]/10 border border-[#ff3333]/30 flex items-center justify-center text-[#ff3333] text-sm font-black uppercase">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="text-white text-sm font-bold uppercase tracking-wide">{review.name}</p>
                {review.standout && (
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{review.standout}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
