import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-2xl">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          className="relative w-40 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Wheel */}
          <motion.div
            className="absolute left-0 top-4 w-16 h-16 rounded-full border-4 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute left-0 top-4 w-16 h-16 rounded-full border-4 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Front Wheel */}
          <motion.div
            className="absolute right-0 top-4 w-16 h-16 rounded-full border-4 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute right-0 top-4 w-16 h-16 rounded-full border-4 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Cycle Frame - Improved Geometry */}
          {/* Top tube (horizontal from seat to head tube) */}
          <motion.div
            className="absolute top-2 left-8 w-24 h-0.5 bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          {/* Down tube (diagonal from head tube to bottom bracket) */}
          <motion.div
            className="absolute top-6 left-8 w-24 h-0.5 bg-primary origin-left"
            style={{ transform: 'rotate(-15deg)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          {/* Seat tube (vertical from bottom bracket to seat) */}
          <motion.div
            className="absolute top-2 left-8 w-0.5 h-8 bg-primary origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          
          {/* Chain stay (horizontal from bottom bracket to rear wheel) */}
          <motion.div
            className="absolute top-6 left-8 w-16 h-0.5 bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          
          {/* Head tube (vertical at front) */}
          <motion.div
            className="absolute top-2 right-8 w-0.5 h-8 bg-primary origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          
          {/* Fork (from head tube to front wheel) */}
          <motion.div
            className="absolute top-6 right-8 w-0.5 h-8 bg-primary origin-top"
            style={{ transform: 'rotate(-10deg)' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          
          {/* Seat */}
          <motion.div
            className="absolute w-3 h-2 bg-primary rounded-sm"
            style={{ left: 6, top: 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          />
          
          {/* Handlebar */}
          <motion.div
            className="absolute w-6 h-0.5 bg-primary rounded-full"
            style={{ right: 5, top: 1 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.3 }}
          />
          
          {/* Wheel Spokes */}
          <motion.svg
            className="absolute left-0 top-4 w-16 h-16"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="6"
              fill="currentColor"
              className="text-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M50 25 L50 15 M50 85 L50 75 M25 50 L15 50 M85 50 L75 50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "50px", originY: "50px" }}
            />
          </motion.svg>
          
          <motion.svg
            className="absolute right-0 top-4 w-16 h-16"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="6"
              fill="currentColor"
              className="text-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M50 25 L50 15 M50 85 L50 75 M25 50 L15 50 M85 50 L75 50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "50px", originY: "50px" }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.p
            className="text-xl font-semibold text-foreground"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading KTR Cycle World...
          </motion.p>
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
