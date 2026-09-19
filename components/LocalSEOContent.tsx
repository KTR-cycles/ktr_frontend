import Link from "next/link";
import { Bike, ShieldCheck, Truck, Wrench, MapPin } from "lucide-react";

export default function LocalSEOContent() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Main Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            Tirunelveli &amp; South Tamil Nadu
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Buy Cycles in Tirunelveli — Premier Showroom for Kids, Adults &amp; Electric Bicycles
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Welcome to <strong className="text-slate-900">KTR Cycle World</strong>, Tirunelveli’s premier cycle destination. 
            Whether you are looking for mountain bikes, high-performance geared cycles, stylish women’s bicycles, 
            or safe kids cycles, our 4 physical showrooms across <strong className="text-slate-800">Tirunelveli Town, Samathanapuram, Kayathar, and Kalakkad</strong> 
            bring you top international and national brands with authorized warranty and expert service.
          </p>
        </div>

        {/* Structured Category Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Mountain Bikes */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Mountain Bikes (MTB) in Tirunelveli
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Tackle rugged terrains with durable alloy and steel frame mountain bikes equipped with premium front suspension, 
              disc brakes, and wide knobby tires from Montra, Hercules, Schnell, and Ninety One.
            </p>
            <Link
              href="/products?category=mtb"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Explore Mountain Bikes &rarr;
            </Link>
          </div>

          {/* Geared Cycles */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Geared Cycles for Daily Commuting
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Smooth multi-speed Shimano gear systems designed for city commutes, fitness rides, and long-distance cycling 
              across Vannarpettai, Palayamkottai, and Tirunelveli roads.
            </p>
            <Link
              href="/products?category=geared"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Explore Geared Cycles &rarr;
            </Link>
          </div>

          {/* Kids Cycles */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Kids Cycles (Ages 2 to 14)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Ergonomic, colorful, and ultra-safe children’s bicycles featuring support training wheels, non-toxic paint, 
              and sturdy chain guards from BSA Champ, Hercules, and Oyekid.
            </p>
            <Link
              href="/products?category=kids"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Explore Kids Cycles &rarr;
            </Link>
          </div>

          {/* Women's Cycles */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Women’s &amp; Comfort Bicycles
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Step-through frame designs engineered for upright seating, easy mounting, basket utility, and maximum comfort 
              during everyday urban riding.
            </p>
            <Link
              href="/products?category=women"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Explore Women&apos;s Cycles &rarr;
            </Link>
          </div>

          {/* Electric Cycles */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Electric Cycles (E-Bikes)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Eco-friendly pedal-assist electric bicycles with detachable lithium-ion batteries and up to 40km per charge range 
              for effortless rides across South Tamil Nadu.
            </p>
            <Link
              href="/products?category=electric"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Explore Electric Cycles &rarr;
            </Link>
          </div>

          {/* Services & Maintenance */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-amber-300 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Cycle Repair &amp; Pickup Service
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Professional repair, tune-ups, gear adjustment, and doorstep delivery &amp; service pickup available in 
              Tirunelveli Town, Palayamkottai, and Vannarpettai.
            </p>
            <Link
              href="/contact"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              Book Service or Pickup &rarr;
            </Link>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Local Delivery</h4>
              <p className="text-[11px] text-slate-500">Tirunelveli &amp; nearby areas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">100% Genuine Brands</h4>
              <p className="text-[11px] text-slate-500">Authorized manufacturer warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Service &amp; Maintenance</h4>
              <p className="text-[11px] text-slate-500">Tune-ups &amp; pickup service</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">4 Showroom Locations</h4>
              <p className="text-[11px] text-slate-500">Town, Samathanapuram &amp; more</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
