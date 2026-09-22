function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="TravelWise Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">TravelWise</h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
