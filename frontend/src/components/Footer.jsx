const Footer = () => {
    return (
      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          {/* Footer Links */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              Support
            </a>
          </div>
  
          {/* Copyright */}
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  