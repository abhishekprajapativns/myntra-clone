function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 py-10 px-10">
      {/* Top Section - SARE 4 COLUMNS ANDAR */}
      <div className="flex justify-between">
        {/* Column 1 - Online Shopping */}
        <div>
          <h4 className="font-bold mb-3">Online Shopping</h4>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-pink-600">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Women
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Kids
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Beauty
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Myntra Insider
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 - Customer Policies */}
        <div>
          <h4 className="font-bold mb-3">Customer Policies</h4>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-pink-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Track Orders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-600">
                Cancellation
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - App + Social */}
        <div>
          <h4 className="font-bold mb-3">Experience Myntra App on Mobile</h4>
          <div className="flex gap-2 mb-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.myntra.android"
              className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M3.18 23.76c.34.19.73.21 1.1.05l12.47-7.2-2.65-2.65-10.92 9.8zm-1.14-20.7C1.77 3.4 1.5 3.82 1.5 4.35v15.3c0 .53.27.95.54 1.29l.09.08 8.58-8.58v-.2L2.13 3.06l-.09.01zm17.07 8.4l-2.3-1.33-2.93 2.93 2.93 2.93 2.31-1.33c.66-.38.66-1.81-.01-2.2zM4.28.18c-.37-.16-.76-.14-1.1.06l10.92 9.8 2.65-2.65L4.28.18z" />
              </svg>
              <div className="flex flex-col text-xs">
                <span>GET IT ON</span>
                <span className="font-bold">Google Play</span>
              </div>
            </a>
            <a
              href="https://apps.apple.com/in/app/myntra-fashion-shopping-app/id671497087"
              className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="flex flex-col text-xs">
                <span>Download on the</span>
                <span className="font-bold">App Store</span>
              </div>
            </a>
          </div>
          <h4 className="font-bold mb-2">Keep In Touch</h4>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/myntra"
              className="hover:text-pink-600"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.twitter.com/myntra"
              className="hover:text-pink-600"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/myntra"
              className="hover:text-pink-600"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/myntra"
              className="hover:text-pink-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 4 - Trust Badges */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/footer/original.png"
              alt="original"
              className="w-12 h-12"
            />
            <div>
              <strong className="text-sm">100% ORIGINAL guarantee</strong>
              <p className="text-gray-600 text-xs">
                for all products at myntra.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="/footer/Return-Window-image.png"
              alt="return"
              className="w-12 h-12"
            />
            <div>
              <strong className="text-sm">Return within 14 days</strong>
              <p className="text-gray-600 text-xs">of receiving your order</p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Top Section band */}
      {/* Bottom */}
      <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
        <p>© 2026 www.myntra.com. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
