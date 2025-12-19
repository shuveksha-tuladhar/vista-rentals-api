const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Vista Rentals</h1>
          <p className="text-lg text-gray-600">
            Your Gateway to Perfect Vacation Rentals
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to Vista Rentals, a comprehensive property rental full-stack application developed with Ruby on Rails and React, 
            utilizing modern web technologies and best practices. This innovative platform empowers users to explore a diverse array of 
            vacation properties, enabling seamless booking directly from property owners. With an array of features including user 
            authentication, property management, image uploading, advanced search and filtering, booking management, and streamlined 
            Stripe integration for payments, Vista Rentals redefines the vacation rental experience.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The platform involves developing a comprehensive web-based rental marketplace. This platform enables users to discover and 
            book properties offered by various hosts, each offering unique accommodations with varying amenities, prices, and locations. 
            Property owners can list their properties with detailed descriptions, multiple images, and manage their bookings efficiently.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features:</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Sign up as a user with email and password</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Sign in with secure authentication</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Search for properties by location, dates, and number of guests</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Filter properties by state and city</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>View detailed property information with multiple images</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Interactive map view showing property locations</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Book properties with date selection and guest count</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>User dashboard for managing owned properties and bookings</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Upload and manage multiple images per property</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Leave reviews and ratings for properties</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Secure checkout and payment processing with Stripe</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Real-time availability checking to prevent double bookings</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">Ruby on Rails 7</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">React</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">TypeScript</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">Vite</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">SQLite</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">React Leaflet</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">Stripe</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">React Router</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">Zustand</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">HTML5</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">CSS</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">Git</span>
          </div>
        </div>

        <div className="rounded-lg p-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/shuveksha-tuladhar/vista-rentals-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://shuveksha-tuladhar.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Visit Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
