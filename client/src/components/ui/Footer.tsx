import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-3">Jambo</h2>
          <p className="text-sm text-gray-700">
            Empowering citizens by simplifying complaint tracking and resolution.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-black transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-800 transition">About Us</Link></li>
            <li><Link href="/track" className="hover:text-gray-800 transition">Track Complaint</Link></li>
            <li><Link href="/contact" className="hover:text-gray-800 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:kellykelvinaime@gmail.com" className="hover:text-gray-800">kellykelvinaime@gmail.com</a></li>
            <li>Phone: <a href="tel:+250791234567" className="hover:text-gray-800">+250 791 234 567</a></li>
            <li>Address: Kigali, Rwanda</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="https://instagram.com/shimmw.a" target="_blank" rel="noopener noreferrer">
                <svg className="w-7 h-7 hover:text-gray-300" fill="black" viewBox="0 0 24 24">
                  <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9zm9 2c1.93 0 3.5 1.57 3.5 3.5v9c0 1.93-1.57 3.5-3.5 3.5h-9C5.57 20 4 18.43 4 16.5v-9C4 5.57 5.57 4 7.5 4h9zm-4.5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
              </a>
            </li>
            {/* Add more social icons if needed */}

             <li>
              <a href="https://instagram.com/shimmw.a" target="_blank" rel="noopener noreferrer">
                <svg className="w-7 h-7 hover:text-gray-300" fill="black" viewBox="0 0 24 24">
  <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H8.1v-2.9h2.34V9.41c0-2.31 1.38-3.59 3.48-3.59.7 0 1.43.12 1.43.12v2.53h-.8c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.9h-2.34V22c4.78-.8 8.44-4.93 8.44-9.93z"/>
</svg>

              </a>
            </li>

             <li>
              <a href="https://instagram.com/shimmw.a" target="_blank" rel="noopener noreferrer">
                <svg className="w-7 h-7 hover:text-gray-300" fill="black" viewBox="0 0 24 24">
  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.29 4.29 0 001.88-2.37 8.57 8.57 0 01-2.72 1.04 4.26 4.26 0 00-7.3 3.88A12.1 12.1 0 013 4.84a4.26 4.26 0 001.32 5.68 4.21 4.21 0 01-1.93-.53v.05a4.27 4.27 0 003.42 4.18 4.28 4.28 0 01-1.92.07 4.27 4.27 0 003.98 2.96A8.56 8.56 0 012 19.54a12.06 12.06 0 006.56 1.92c7.87 0 12.18-6.52 12.18-12.18 0-.19 0-.39-.01-.58A8.68 8.68 0 0022.46 6z"/>
</svg>

              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Aime. All rights reserved.
      </div>
    </footer>
  );
}
