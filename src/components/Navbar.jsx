const Navbar = () => (
  <nav className="bg-green-600 text-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold">User Dashboard</h1>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            About
          </a>
          <a
            href="#"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Services
          </a>
          <a
            href="#"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="focus:outline-none focus:ring-2 focus:ring-green-400 p-2 rounded-md">
            {/* Hamburger icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {/* Mobile menu (hidden by default) */}
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-white hover:bg-green-700"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-white hover:bg-green-700"
        >
          About
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-white hover:bg-green-700"
        >
          Services
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-white hover:bg-green-700"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
