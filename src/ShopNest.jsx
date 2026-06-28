import { useState, useMemo, useCallback, useRef } from "react";
import RequestShopForm from "./RequestShopForm.jsx";
import {
  Search, MapPin, Star, Phone, Clock, ChevronRight, ChevronLeft,
  ShoppingBag, Pill, Smartphone, Shirt, UtensilsCrossed, Cake,
  Hammer, Sofa, Store, Scissors, Gem, PenTool,
  BarChart3, Package, Users, Lock, Cloud, ClipboardList,
  Menu, X, Quote, ArrowRight, CheckCircle2
} from "lucide-react";

const CATEGORIES = [
  { name: "Grocery", icon: ShoppingBag, count: 482 },
  { name: "Pharmacy", icon: Pill, count: 213 },
  { name: "Electronics", icon: Smartphone, count: 156 },
  { name: "Fashion", icon: Shirt, count: 327 },
  { name: "Restaurants", icon: UtensilsCrossed, count: 591 },
  { name: "Bakery", icon: Cake, count: 144 },
  { name: "Hardware", icon: Hammer, count: 98 },
  { name: "Furniture", icon: Sofa, count: 76 },
  { name: "Mobile Store", icon: Store, count: 112 },
  { name: "Salon", icon: Scissors, count: 203 },
  { name: "Jewellery", icon: Gem, count: 89 },
  { name: "Stationery", icon: PenTool, count: 67 },
];

const SHOPS = [
  {
    name: "Greenfield Grocers", category: "Grocery", rating: 4.8,
    address: "12 Market Lane, Riverside", city: "Riverside", state: "CA",
    hours: "7:00 AM – 10:00 PM",
    phone: "+1 (555) 014-2231",
    desc: "Fresh produce, daily essentials, and friendly faces since 1998.",
    products: ["produce", "groceries", "vegetables", "dairy"],
    color: "#2563EB",
  },
  {
    name: "Velvet & Vine Bakery", category: "Bakery", rating: 4.9,
    address: "45 Baker Street, Hilltown", city: "Hilltown", state: "CA",
    hours: "6:00 AM – 8:00 PM",
    phone: "+1 (555) 098-7712",
    desc: "Sourdough, pastries, and custom cakes baked fresh every morning.",
    products: ["bread", "pastries", "cakes", "coffee"],
    color: "#10B981",
  },
  {
    name: "Nova Mobile Hub", category: "Mobile Store", rating: 4.6,
    address: "9 Tech Plaza, Eastgate", city: "Eastgate", state: "CA",
    hours: "10:00 AM – 9:00 PM",
    phone: "+1 (555) 442-0091",
    desc: "Latest phones, repairs, and accessories with same-day service.",
    products: ["phones", "accessories", "repairs"],
    color: "#0F172A",
  },
  {
    name: "The Clip & Curl Salon", category: "Salon", rating: 4.7,
    address: "3 Mirror Row, Westend", city: "Westend", state: "CA",
    hours: "9:00 AM – 7:00 PM",
    phone: "+1 (555) 671-3340",
    desc: "Full-service styling, color, and grooming for the whole family.",
    products: ["haircut", "styling", "color", "grooming"],
    color: "#F59E0B",
  },
  {
    name: "Anchor Hardware Co.", category: "Hardware", rating: 4.5,
    address: "78 Industrial Rd, Southport", city: "Southport", state: "CA",
    hours: "8:00 AM – 6:00 PM",
    phone: "+1 (555) 213-9087",
    desc: "Tools, fixtures, and expert advice for every home project.",
    products: ["tools", "fixtures", "paint", "plumbing"],
    color: "#2563EB",
  },
  {
    name: "Luma Jewellers", category: "Jewellery", rating: 4.9,
    address: "21 Crown Court, Midtown", city: "Midtown", state: "CA",
    hours: "11:00 AM – 8:00 PM",
    phone: "+1 (555) 556-2200",
    desc: "Handcrafted fine jewellery and custom engagement pieces.",
    products: ["rings", "necklaces", "watches", "custom jewellery"],
    color: "#10B981",
  },
];

const PLANS = [
  { name: "Starter", price: 19, tagline: "For new shops getting started", features: ["1 staff account", "Up to 100 products", "Basic sales reports", "Email support"] },
  { name: "Business", price: 49, tagline: "For growing shops", features: ["5 staff accounts", "Up to 2,000 products", "Inventory + order management", "Priority email support"], highlight: true },
  { name: "Professional", price: 99, tagline: "For multi-location shops", features: ["20 staff accounts", "Unlimited products", "Advanced analytics", "Phone & chat support"] },
  { name: "Enterprise", price: null, tagline: "For large operations", features: ["Unlimited staff accounts", "Custom integrations", "Dedicated account manager", "SLA-backed support"] },
];

const TESTIMONIALS = [
  { name: "Maria Chen", business: "Velvet & Vine Bakery", review: "ShopNest made it effortless for customers to find us, and the inventory tools save me hours every week.", rating: 5 },
  { name: "David Okafor", business: "Anchor Hardware Co.", review: "The order management dashboard is the best I've used. Setup took one afternoon, start to finish.", rating: 5 },
  { name: "Priya Nair", business: "Luma Jewellers", review: "Our online presence finally matches the quality of our shop. Bookings are up since we joined.", rating: 4 },
];

const FEATURES = [
  { icon: ClipboardList, title: "Dedicated Shop Software", desc: "A management system built just for your business." },
  { icon: Cloud, title: "Cloud Based", desc: "Access your shop from anywhere, anytime." },
  { icon: Lock, title: "Secure Login", desc: "Bank-grade security for you and your staff." },
  { icon: Package, title: "Inventory Management", desc: "Track stock levels in real time." },
  { icon: ShoppingBag, title: "Order Management", desc: "Process and fulfill orders without the chaos." },
  { icon: BarChart3, title: "Sales Reports", desc: "Clear insights into what's selling, and when." },
  { icon: Users, title: "Staff Management", desc: "Assign roles and permissions with ease." },
  { icon: Users, title: "Customer Management", desc: "Keep track of regulars and their preferences." },
  { icon: Smartphone, title: "Multi-device Access", desc: "Works on desktop, tablet, and mobile." },
  { icon: CheckCircle2, title: "Subscription Plans", desc: "Flexible pricing that grows with you." },
];

const STEPS = [
  { title: "Submit your request", desc: "Tell us about your shop in a short form." },
  { title: "We verify your business", desc: "Our team confirms your details, usually within 24 hours." },
  { title: "Your software is created", desc: "We provision your dedicated shop management system." },
  { title: "Start managing your business", desc: "Log in and take control of inventory, orders, and sales." },
];

function classNames(...c) { return c.filter(Boolean).join(" "); }

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Browse Shops", id: "shops" },
  { label: "Categories", id: "categories" },
  { label: "Pricing", id: "pricing" },
  { label: "Features", id: "features" },
  { label: "About Us", id: "about" },
  { label: "Contact", id: "contact" },
];

function isShopOpen(hours) {
  const match = hours.match(/(\d+):(\d+)\s*(AM|PM)\s*–\s*(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return true;
  const toMinutes = (h, m, period) => {
    let hour = parseInt(h, 10);
    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
    return hour * 60 + parseInt(m, 10);
  };
  const open = toMinutes(match[1], match[2], match[3]);
  const close = toMinutes(match[4], match[5], match[6]);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= open && current <= close;
}

export default function ShopNest() {
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(false);
  const [openNowFilter, setOpenNowFilter] = useState(false);
  const searchInputRef = useRef(null);

  const openRequestForm = useCallback(() => setActivePage("request"), []);
  const goHome = useCallback(() => setActivePage("home"), []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filteredShops = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SHOPS.filter((shop) => {
      const matchesQuery = !q || [
        shop.name, shop.category, shop.desc, shop.address, shop.city, shop.state,
        ...(shop.products || []),
      ].some((field) => field.toLowerCase().includes(q));

      const matchesCategory = !categoryFilter || shop.category === categoryFilter;
      const matchesRating = !ratingFilter || shop.rating >= 4.7;
      const matchesOpen = !openNowFilter || isShopOpen(shop.hours);

      return matchesQuery && matchesCategory && matchesRating && matchesOpen;
    });
  }, [searchQuery, categoryFilter, ratingFilter, openNowFilter]);

  const handleSearch = () => scrollTo("shops");

  const handleCategoryClick = (name) => {
    setCategoryFilter((prev) => (prev === name ? "" : name));
    scrollTo("shops");
  };

  const openDirections = (address) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  if (activePage === "request") {
    return <RequestShopForm onBack={goHome} />;
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1E293B", background: "#F8FAFC" }} className="w-full min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button type="button" onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight" style={{ color: "#0F172A" }}>ShopNest</span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("pricing")}
              className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] transition-colors"
            >
              Shop Owner Login
            </button>
            <button
              type="button"
              onClick={openRequestForm}
              className="text-sm font-semibold text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
              style={{ background: "#2563EB" }}
            >
              Request Your Shop
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-600 text-left"
              >
                {link.label}
              </button>
            ))}
            <hr className="border-slate-200" />
            <button type="button" onClick={() => scrollTo("pricing")} className="text-sm font-semibold text-slate-700 text-left">Shop Owner Login</button>
            <button type="button" onClick={openRequestForm} className="text-sm font-semibold text-white px-4 py-2 rounded-full" style={{ background: "#2563EB" }}>
              Request Your Shop
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden scroll-mt-16">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(1200px 500px at 80% -10%, rgba(37,99,235,0.08), transparent), radial-gradient(900px 500px at 10% 0%, rgba(16,185,129,0.08), transparent)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(16,185,129,0.1)", color: "#0F172A" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              Trusted by 1,200+ local businesses
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight" style={{ color: "#0F172A" }}>
              Grow Your Business with ShopNest
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-lg">
              Create your own online business, manage your inventory, customers, sales, and orders with a powerful cloud-based shop management system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo("shops")}
                className="px-6 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                style={{ background: "#2563EB" }}
              >
                Explore Shops <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={openRequestForm}
                className="px-6 py-3 rounded-full font-semibold border-2 transition-colors hover:bg-slate-50"
                style={{ borderColor: "#0F172A", color: "#0F172A" }}
              >
                Request Your Shop
              </button>
            </div>
          </div>

          {/* Dashboard preview illustration */}
          <div className="relative">
            <div className="rounded-2xl shadow-2xl border border-slate-200 bg-white p-5" style={{ borderRadius: 20 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-800">Shop Dashboard</span>
                <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}>Live</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1"><BarChart3 className="w-3.5 h-3.5" /> Sales</div>
                  <div className="text-xl font-extrabold" style={{ color: "#0F172A" }}>$8,420</div>
                  <div className="text-xs font-semibold" style={{ color: "#22C55E" }}>+12.4%</div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1"><Package className="w-3.5 h-3.5" /> Inventory</div>
                  <div className="text-xl font-extrabold" style={{ color: "#0F172A" }}>1,284</div>
                  <div className="text-xs text-slate-500">items in stock</div>
                </div>
              </div>
              <div className="rounded-xl p-3 mb-3" style={{ background: "#F8FAFC" }}>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" /> Orders</span>
                  <span>Today</span>
                </div>
                <div className="flex items-end gap-1.5 h-14">
                  {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? "#2563EB" : "#CBD5E1" }} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl p-3" style={{ background: "#F8FAFC" }}>
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><Users className="w-3.5 h-3.5" /> Customers</div>
                <div className="text-sm font-bold" style={{ color: "#0F172A" }}>312 active</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl shadow-xl p-4 bg-white border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full" style={{ background: "#10B981" }} />
                <div>
                  <div className="text-xs font-bold text-slate-800">New order received</div>
                  <div className="text-[11px] text-slate-500">2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-20 relative z-10 scroll-mt-20">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5" style={{ borderRadius: 20 }}>
          <div className="flex items-center gap-3 border border-slate-200 rounded-full px-4 py-3 mb-4">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by Shop Name, Category, Product or City..."
              className="w-full outline-none text-sm placeholder:text-slate-400"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo("categories")}
              className="text-xs font-semibold px-3.5 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              Category
            </button>
            <button
              type="button"
              onClick={() => { searchInputRef.current?.focus(); setSearchQuery(""); }}
              className="text-xs font-semibold px-3.5 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              City
            </button>
            <button
              type="button"
              onClick={() => { searchInputRef.current?.focus(); setSearchQuery(""); }}
              className="text-xs font-semibold px-3.5 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              State
            </button>
            <button
              type="button"
              onClick={() => setRatingFilter((v) => !v)}
              className={classNames(
                "text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors",
                ratingFilter ? "border-[#2563EB] text-[#2563EB] bg-blue-50" : "border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
              )}
            >
              Rating 4.7+
            </button>
            <button
              type="button"
              onClick={() => setOpenNowFilter((v) => !v)}
              className={classNames(
                "text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors",
                openNowFilter ? "border-[#2563EB] text-[#2563EB] bg-blue-50" : "border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
              )}
            >
              Open Now
            </button>
            {(searchQuery || categoryFilter || ratingFilter || openNowFilter) && (
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setCategoryFilter(""); setRatingFilter(false); setOpenNowFilter(false); }}
                className="text-xs font-semibold px-3.5 py-2 rounded-full border border-slate-200 text-slate-500 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleSearch}
              className="ml-auto text-xs font-semibold px-5 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ background: "#2563EB" }}
            >
              Search
            </button>
          </div>
          {(searchQuery || categoryFilter || ratingFilter || openNowFilter) && (
            <p className="text-xs text-slate-500 mt-3">
              {filteredShops.length} shop{filteredShops.length !== 1 ? "s" : ""} found
              {categoryFilter ? ` in ${categoryFilter}` : ""}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </p>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: "#0F172A" }}>Featured Categories</h2>
            <p className="text-slate-500 mt-1">Browse businesses by what they offer.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategoryClick(cat.name)}
                className={classNames(
                  "text-left bg-white rounded-2xl border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all",
                  categoryFilter === cat.name ? "border-[#2563EB] shadow-md ring-2 ring-[#2563EB]/20" : "border-slate-200"
                )}
                style={{ borderRadius: 18 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(37,99,235,0.08)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#2563EB" }} />
                </div>
                <div className="font-bold text-sm" style={{ color: "#0F172A" }}>{cat.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{cat.count} shops</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Shops */}
      <section id="shops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: "#0F172A" }}>Featured Shops</h2>
            <p className="text-slate-500 mt-1">Loved by their local communities.</p>
          </div>
          <button type="button" onClick={() => { setSearchQuery(""); setCategoryFilter(""); setRatingFilter(false); setOpenNowFilter(false); }} className="text-sm font-semibold flex items-center gap-1 text-[#2563EB]">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {filteredShops.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">No shops found</p>
            <p className="text-sm text-slate-500 mt-1">Try a different search term or clear your filters.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setCategoryFilter(""); setRatingFilter(false); setOpenNowFilter(false); }}
              className="mt-4 text-sm font-semibold px-5 py-2 rounded-full text-white"
              style={{ background: "#2563EB" }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <div key={shop.name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group" style={{ borderRadius: 20 }}>
              <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${shop.color}, ${shop.color}99)` }}>
                <div className="absolute -bottom-6 left-5 w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100">
                  <Store className="w-6 h-6" style={{ color: shop.color }} />
                </div>
              </div>
              <div className="p-5 pt-9">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>{shop.name}</h3>
                    <span className="text-xs font-medium text-slate-500">{shop.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
                    <Star className="w-3 h-3 fill-current" /> {shop.rating}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{shop.desc}</p>
                <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {shop.address}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {shop.hours}</div>
                  <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {shop.phone}</div>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => scrollTo("map")}
                    className="flex-1 text-xs font-semibold py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
                    style={{ background: "#2563EB" }}
                  >
                    View Shop
                  </button>
                  <button
                    type="button"
                    onClick={() => openDirections(shop.address)}
                    className="flex-1 text-xs font-semibold py-2.5 rounded-full border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Interactive Map */}
      <section id="map" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: "#0F172A" }}>Find Shops Near You</h2>
        <p className="text-slate-500 mb-8">Explore every registered business on the map.</p>
        <div className="rounded-2xl border border-slate-200 overflow-hidden relative" style={{ height: 380, background: "#E2E8F0", borderRadius: 20 }}>
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium">
            Interactive map placeholder — connects to Google Maps
          </div>
          {[
            { top: "30%", left: "25%" }, { top: "55%", left: "45%" }, { top: "40%", left: "65%" },
            { top: "70%", left: "30%" }, { top: "20%", left: "75%" },
          ].map((pos, i) => (
            <div key={i} className="absolute w-7 h-7 rounded-full flex items-center justify-center shadow-md -translate-x-1/2 -translate-y-1/2" style={{ ...pos, background: "#2563EB" }}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose ShopNest */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: "#0F172A" }}>Why Choose ShopNest</h2>
        <p className="text-slate-500 mb-8">Everything you need to run your business, in one place.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-5" style={{ borderRadius: 18 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(16,185,129,0.1)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#10B981" }} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "#0F172A" }}>{f.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-center" style={{ color: "#0F172A" }}>How It Works</h2>
        <p className="text-slate-500 mb-12 text-center">From request to running your shop, in four steps.</p>
        <div className="grid sm:grid-cols-4 gap-6 relative">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center relative">
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-extrabold text-white mb-4" style={{ background: "#2563EB" }}>
                {i + 1}
              </div>
              <div className="font-bold text-sm mb-1.5" style={{ color: "#0F172A" }}>{step.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{step.desc}</div>
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-[calc(50%+30px)] w-[calc(100%-60px)] h-px bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-center" style={{ color: "#0F172A" }}>Simple, Transparent Pricing</h2>
        <p className="text-slate-500 mb-10 text-center">Choose the plan that fits the size of your business.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={classNames(
                "rounded-2xl p-6 border",
                plan.highlight ? "shadow-xl scale-[1.02]" : "shadow-sm"
              )}
              style={{
                borderRadius: 20,
                borderColor: plan.highlight ? "#2563EB" : "#E2E8F0",
                background: plan.highlight ? "#0F172A" : "white",
                color: plan.highlight ? "white" : "#1E293B",
              }}
            >
              {plan.highlight && (
                <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "#10B981", color: "white" }}>
                  MOST POPULAR
                </span>
              )}
              <div className="font-extrabold text-lg mt-3">{plan.name}</div>
              <div className="text-xs opacity-70 mb-4">{plan.tagline}</div>
              <div className="mb-5">
                {plan.price ? (
                  <span className="text-3xl font-extrabold">${plan.price}<span className="text-sm font-medium opacity-60">/mo</span></span>
                ) : (
                  <span className="text-2xl font-extrabold">Custom</span>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: plan.highlight ? "#10B981" : "#2563EB" }} />
                    <span className={plan.highlight ? "opacity-90" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openRequestForm}
                className="w-full text-sm font-semibold py-2.5 rounded-full transition-all hover:opacity-90"
                style={{
                  background: plan.highlight ? "#2563EB" : "#0F172A",
                  color: "white",
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight mb-10" style={{ color: "#0F172A" }}>What Shop Owners Say</h2>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 relative" style={{ borderRadius: 20 }}>
          <Quote className="w-8 h-8 mx-auto mb-4" style={{ color: "#2563EB" }} />
          <p className="text-lg text-slate-700 leading-relaxed mb-6">{TESTIMONIALS[testimonialIdx].review}</p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4" style={{ color: i < TESTIMONIALS[testimonialIdx].rating ? "#F59E0B" : "#E2E8F0" }} fill={i < TESTIMONIALS[testimonialIdx].rating ? "#F59E0B" : "none"} />
            ))}
          </div>
          <div className="font-bold text-sm" style={{ color: "#0F172A" }}>{TESTIMONIALS[testimonialIdx].name}</div>
          <div className="text-xs text-slate-500">{TESTIMONIALS[testimonialIdx].business}</div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-12">
            <button onClick={prevTestimonial} className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-12">
            <button onClick={nextTestimonial} className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setTestimonialIdx(i)} className="w-2 h-2 rounded-full" style={{ background: i === testimonialIdx ? "#2563EB" : "#CBD5E1" }} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-20">
        <div className="rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#2563EB,#0F172A)", borderRadius: 24 }}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">Ready to Grow Your Business?</h2>
          <p className="text-blue-100 mb-8">Join hundreds of businesses using ShopNest.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={openRequestForm}
              className="px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "white", color: "#0F172A" }}
            >
              Request Your Shop
            </button>
            <button
              type="button"
              onClick={openRequestForm}
              className="px-6 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10 text-slate-300">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-white">ShopNest</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">The platform connecting local businesses with the customers who love them.</p>
          </div>
          <div>
            <div className="font-bold text-white text-sm mb-3">Company</div>
            <ul className="space-y-2 text-xs">
              {[{ l: "About", id: "about" }, { l: "Careers", id: "contact" }, { l: "Blog", id: "home" }, { l: "Contact", id: "contact" }].map(({ l, id }) => (
                <li key={l}><button type="button" onClick={() => scrollTo(id)} className="hover:text-white">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-white text-sm mb-3">Platform</div>
            <ul className="space-y-2 text-xs">
              {[{ l: "Browse Shops", id: "shops" }, { l: "Categories", id: "categories" }, { l: "Pricing", id: "pricing" }, { l: "Features", id: "features" }].map(({ l, id }) => (
                <li key={l}><button type="button" onClick={() => scrollTo(id)} className="hover:text-white">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-white text-sm mb-3">Support</div>
            <ul className="space-y-2 text-xs">
              {["Help Center", "Documentation", "FAQs", "Privacy Policy", "Terms & Conditions"].map((l) => <li key={l}><a href="#" className="hover:text-white">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="font-bold text-white text-sm mb-3">Stay Updated</div>
            <p className="text-xs text-slate-400 mb-3">Get product news and shop tips in your inbox.</p>
            <div className="flex gap-2">
              <input placeholder="Email address" className="flex-1 text-xs rounded-full px-3 py-2 bg-white/10 text-white placeholder:text-slate-500 outline-none" />
              <button className="text-xs font-semibold px-4 py-2 rounded-full" style={{ background: "#2563EB", color: "white" }}>Join</button>
            </div>
            <div className="flex gap-3 mt-4 text-slate-400">
              {["Facebook", "Instagram", "LinkedIn", "X"].map((s) => (
                <a key={s} href="#" className="text-xs hover:text-white">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
          © 2026 ShopNest. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
