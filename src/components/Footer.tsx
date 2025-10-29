import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-purple-900 text-gray-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-full md:col-span-1 text-center md:text-left">
            <img src="/assets/brandlogo.png" alt="Demola Logo" className="h-10 w-auto mx-auto md:mx-0 mb-4" />
            <p className="text-sm">&copy; {new Date().getFullYear()} Demola. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Story Wall</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">My Investment</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <ul className="space-y-2 mb-4">
              <li><a href="#" className="hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Support</a></li>
            </ul>
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.791-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.079 1.443-4.696 2.313-7.548 2.313-.489 0-.972-.029-1.447-.085 2.985 1.943 6.507 3.08 10.357 3.08 12.45 0 19.334-10.376 19.334-19.333 0-.297-.01-.59-.029-.883z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
