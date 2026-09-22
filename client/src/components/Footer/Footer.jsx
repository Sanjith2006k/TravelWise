function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-gray-400">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="TravelWise Logo" className="w-5 h-5 opacity-70" />
          <p>© 2026 TravelWise AI</p>
        </div>
        <p className="text-xs text-gray-500">
          Made by <a href="https://github.com/Sanjith2006k" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Sanjith2006k</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
