import React, { useState, useEffect } from 'react';
import { FaTruck, FaPlus, FaSearch, FaBox, FaMapMarkerAlt, FaCalendarAlt, FaUserShield, FaUser, FaShoppingCart, FaFileInvoiceDollar, FaAddressCard, FaCalculator, FaRuler } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CBMCalculator from './CBMCalculator';

// Admin class
class AdminUpdate {
  constructor() {
    this.adminTracking = []; // Admin's tracking numbers
  }

  adminAdd(trackNum, name, status) {
    this.adminTracking.push({
      TrackingNum: trackNum,
      Sender: name,
      Status: status
    });
    return `Tracking number ${trackNum} has been added successfully by admin`;
  }

  adminCheck(trackNum) {
    return this.adminTracking.find(i => i.TrackingNum === trackNum);
  }
}

// User class
class UserAdd extends AdminUpdate {
  constructor() {
    super();
    this.userTracking = new Map(); // Store shipments by user ID
    this.statusHistory = new Map(); // Store status history for each tracking number
  }

  userAdd(trackNum, name, quantity, product, userId) {
    // Check if admin has added this tracking number
    const adminShipment = this.adminCheck(trackNum);
    
    if (!adminShipment) {
      return {
        success: false,
        message: 'This tracking number has not been added by admin yet. The product might be in the Transit or not received yet in our warehouse.'
      };
    }

    // Get user's shipments
    const userShipments = this.userTracking.get(userId) || [];

    // Check if user has already added this tracking number
    const existingUserShipment = userShipments.find(i => i.TrackingNum === trackNum);
    if (existingUserShipment) {
      return {
        success: false,
        message: 'You have already added this tracking number.'
      };
    }

    // Add the shipment with initial status
    userShipments.push({
      TrackingNum: trackNum,
      Sender: name,
      Quantity: quantity,
      Product: product,
      Status: adminShipment.Status,
      AddedDate: new Date().toISOString(),
      LastUpdated: new Date().toISOString()
    });

    // Update user's shipments
    this.userTracking.set(userId, userShipments);

    // Initialize status history
    this.statusHistory.set(trackNum, [{
      status: adminShipment.Status,
      date: new Date().toISOString(),
      details: 'Initial status from admin'
    }]);

    // Save to localStorage
    this.saveToLocalStorage();

    return {
      success: true,
      message: `Tracking number ${trackNum} has been added successfully with ${quantity} quantity username ${name}`
    };
  }

  // Get all shipments for a specific user
  getUserShipments(userId) {
    return this.userTracking.get(userId) || [];
  }

  // Get a specific shipment for a user
  getUserShipment(userId, trackNum) {
    const userShipments = this.userTracking.get(userId) || [];
    return userShipments.find(shipment => shipment.TrackingNum === trackNum);
  }

  // Save data to localStorage
  saveToLocalStorage() {
    const data = {
      userTracking: Array.from(this.userTracking.entries()),
      statusHistory: Array.from(this.statusHistory.entries()),
      adminTracking: this.adminTracking
    };
    localStorage.setItem('shippingData', JSON.stringify(data));
  }

  // Load data from localStorage
  loadFromLocalStorage() {
    const data = localStorage.getItem('shippingData');
    if (data) {
      const parsedData = JSON.parse(data);
      this.userTracking = new Map(parsedData.userTracking);
      this.statusHistory = new Map(parsedData.statusHistory);
      this.adminTracking = parsedData.adminTracking;
    }
  }

  userCheck(trackNum, userId) {
    // First check if user has added this tracking number
    const userShipment = this.getUserShipment(userId, trackNum);
    
    if (!userShipment) {
      // If user hasn't added it, check if admin has
      const adminShipment = this.adminCheck(trackNum);
      
      if (adminShipment) {
        return {
          found: false,
          message: `
            ⚠️ Tracking Number Not Found in Your Account
            ===========================================
            
            The tracking number ${trackNum} exists in our system, but you haven't added it to your account yet.
            
            To track this shipment:
            1. Click the "Add New Shipment" button
            2. Enter your details (name, quantity, product)
            3. Submit the form
            
            After adding the shipment, you'll be able to track it here.
          `,
          needsUserAdd: true
        };
      }
      
      return {
        found: false,
        message: `
          ❌ Tracking Number Not Found
          ===========================
          
          The tracking number ${trackNum} is not found in our system.
          
          Please follow these steps:
          1. Contact the admin to add this tracking number to the system
          2. Once added, you can add it to your account
          3. Then you can track it here
          
          Need help? Contact support at support@example.com
        `,
        needsUserAdd: false
      };
    }

    // Get current date for estimated delivery
    const currentDate = new Date();
    const estimatedDelivery = new Date(currentDate);
    estimatedDelivery.setDate(currentDate.getDate() + 60); // Add 60 days for estimated delivery

    // Get status history
    const history = this.getStatusHistory(trackNum);
    const historySection = history.length > 1 ? `
      📋 Status History:
      -----------------
      ${history.map(entry => `
        ${new Date(entry.date).toLocaleString()}: ${entry.status}
      `).join('\n')}
    ` : '';

    // Get status-specific message
    let statusMessage = '';
    switch (userShipment.Status) {
      case 'Delivered':
        statusMessage = '✅ Delivery Status: Your package has been successfully delivered to your address!';
        break;
      case 'In Transit':
        statusMessage = '🚚 Delivery Status: Your package is currently in transit and on its way to you.';
        break;
      case 'Pending':
        statusMessage = '⏳ Delivery Status: Your package is pending processing at our facility.';
        break;
      case 'On Return':
        statusMessage = '⚠️ Delivery Status: Your package is being returned to the sender. Please contact your seller for more information.';
        break;
      case 'In China Warehouse':
        statusMessage = '🏭 Delivery Status: Your package is currently in our China warehouse awaiting shipping.';
        break;
      case 'On Way to Warehouse':
        statusMessage = '🚛 Delivery Status: Your package is on its way to our warehouse for shipping.';
        break;
      default:
        statusMessage = 'ℹ️ Delivery Status: Your package is being received by the warehouse.';
    }

    // Format the message with better structure and details
    const message = `
      📦 Shipment Tracking Information
      ==============================
      
      🔍 Tracking Details:
      -------------------
      Tracking Number: ${userShipment.TrackingNum}
      Customer Name: ${userShipment.Sender}
      Product: ${userShipment.Product}
      Quantity: ${userShipment.Quantity}
      Added to Profile: ${new Date(userShipment.AddedDate).toLocaleDateString()}
      
      📊 Status Information:
      ---------------------
      Current Status: ${userShipment.Status}
      Last Updated: ${new Date(userShipment.LastUpdated).toLocaleString()}
      ${userShipment.Status !== 'On Return' ? `Estimated Delivery: ${estimatedDelivery.toLocaleDateString()}` : ''}
      
      ${statusMessage}
      
      ${historySection}
      
      📞 Need Help?
      -------------
      If you have any questions about your shipment, please contact our support team at:
      Email: support@fofoofogroup.com
      Phone: 233-540266839
      
      Thank you for choosing our shipping service!
    `;

    return {
      found: true,
      message: message,
      needsUserAdd: false
    };
  }

  getAllShipments() {
    // Return all shipments for all users (for admin view)
    return Array.from(this.userTracking.values()).flat();
  }

  // Update status history when admin changes status
  updateStatusHistory(trackNum, newStatus) {
    const history = this.statusHistory.get(trackNum) || [];
    history.push({
      status: newStatus,
      date: new Date().toISOString(),
      details: `Status updated to ${newStatus}`
    });
    this.statusHistory.set(trackNum, history);
    this.saveToLocalStorage();
  }

  // Get status history for a tracking number
  getStatusHistory(trackNum) {
    return this.statusHistory.get(trackNum) || [];
  }
}

// Create a single instance of the tracking system
const trackingSystem = new UserAdd();

// Load saved data when the component mounts
trackingSystem.loadFromLocalStorage();

// Export the tracking system instance
export { trackingSystem };

const ShippingDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipments, setShipments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [needsUserAdd, setNeedsUserAdd] = useState(false);
  
  const [newShipment, setNewShipment] = useState({
    trackingNumber: '',
    name: '',
    quantity: '',
    product: '',
    status: ''
  });

  // Load shipments on component mount and when they change
  useEffect(() => {
    setShipments(trackingSystem.getAllShipments());
  }, []);

  const handleAddShipment = (e) => {
    e.preventDefault();
    let result;
    
    if (isAdmin) {
      result = trackingSystem.adminAdd(
        newShipment.trackingNumber.toUpperCase(),
        newShipment.name,
        newShipment.status
      );
      setMessage(result);
      
      // Update status history if admin changes status
      const userShipment = trackingSystem.userTracking.find(
        i => i.TrackingNum === newShipment.trackingNumber.toUpperCase()
      );
      if (userShipment) {
        userShipment.Status = newShipment.status;
        userShipment.LastUpdated = new Date().toISOString();
        trackingSystem.updateStatusHistory(
          newShipment.trackingNumber.toUpperCase(),
          newShipment.status
        );
      }
    } else {
      result = trackingSystem.userAdd(
        newShipment.trackingNumber.toUpperCase(),
        newShipment.name,
        parseInt(newShipment.quantity),
        newShipment.product,
        'default'
      );
      setMessage(result.message);
      if (result.success) {
        setShipments(trackingSystem.getAllShipments());
      }
    }

    setShowAddForm(false);
    setNewShipment({
      trackingNumber: '',
      name: '',
      quantity: '',
      product: '',
      status: ''
    });
  };

  const handleSearch = () => {
    if (!isAdmin) {
      const result = trackingSystem.userCheck(trackingNumber.toUpperCase(), 'default');
      setSearchResult(result);
      setNeedsUserAdd(result.needsUserAdd);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'on return':
        return 'bg-red-100 text-red-800';
      case 'in china warehouse':
        return 'bg-purple-100 text-purple-800';
      case 'on way to warehouse':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-20 border-b-2 border-gray-200 pb-4'>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Shipping Address Generator</h1>
          <div className='flex gap-4 w-full sm:w-auto'>
            <Link
              to='/fofoo-address'
              className='group flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
            >
              <div className='relative'>
                <FaMapMarkerAlt className='w-5 h-5' />
                <div className='absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse'></div>
              </div>
              <span className='font-medium'>FIMPORT Address Generator</span>
              <span className='text-sm opacity-75 group-hover:translate-x-1 transition-transform'>→</span>
            </Link>
          </div>
        </div>

        {/* Section 1: Dashboard Header */}
        <div className='bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-lg shadow-md p-4 sm:p-6 mb-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
            <div className='flex items-center gap-4'>
              <FaTruck className='text-2xl sm:text-3xl text-primary' />
              <div>
                <h1 className='text-xl sm:text-2xl font-bold text-gray-800 dark:text-white'>Shipping Dashboard</h1>
                <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
                  {isAdmin ? 'Admin Panel - Manage Shipments' : 'Track your shipments and manage deliveries'}
                </p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto'>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className='flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto'
              >
                {isAdmin ? <FaUser className='w-4 h-4' /> : <FaUserShield className='w-4 h-4' />}
                {isAdmin ? 'Switch to User' : 'Switch to Admin'}
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className='flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto'
              >
                <FaPlus className='w-4 h-4' />
                {isAdmin ? 'Add Admin Shipment' : 'Add New Shipment'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Tracking Section */}
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-md p-6 mb-8'>
          {/* Search Bar */}
          <div className='mb-8'>
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
              <div className='flex-1 relative'>
                <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Enter tracking number...'
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
              <button 
                onClick={handleSearch}
                className='w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
              >
                Track
              </button>
            </div>
          </div>

          {/* Search Result */}
          {searchResult && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-8'>
              <div className='whitespace-pre-line text-base sm:text-lg'>
                {searchResult.message}
              </div>
              {needsUserAdd && (
                <div className='mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4'>
                  <button
                    onClick={() => {
                      setNewShipment(prev => ({ ...prev, trackingNumber: trackingNumber.toUpperCase() }));
                      setShowAddForm(true);
                    }}
                    className='w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2'
                  >
                    <FaPlus className='w-4 h-4' />
                    Add This Tracking Number
                  </button>
                  <button
                    onClick={() => setTrackingNumber('')}
                    className='w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
                  >
                    Try Another Number
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Shipments List */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {shipments.map((shipment) => (
              <div
                key={shipment.TrackingNum}
                className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow flex flex-col'
              >
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4'>
                  <div>
                    <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1'>
                      Tracking Number: {shipment.TrackingNum}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Sender: {shipment.Sender}</p>
                  </div>
                  {shipment.Status && (
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(shipment.Status)}`}>
                      {shipment.Status}
                    </span>
                  )}
                </div>
                <div className='grid grid-cols-1 gap-4 mt-auto'>
                  {shipment.Quantity && (
                    <div className='flex items-center gap-2'>
                      <FaBox className='text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Quantity</p>
                        <p className='font-medium text-gray-800 dark:text-white'>{shipment.Quantity}</p>
                      </div>
                    </div>
                  )}
                  {shipment.Product && (
                    <div className='flex items-center gap-2'>
                      <FaBox className='text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Product</p>
                        <p className='font-medium text-gray-800 dark:text-white'>{shipment.Product}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: CBM Calculator */}
        <div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-md p-6'>
          <div className='flex items-center gap-4 mb-8'>
            <FaCalculator className='text-2xl sm:text-3xl text-primary' />
            <div>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800 dark:text-white'>CBM Calculator</h2>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
                Calculate shipping costs based on package dimensions
              </p>
            </div>
          </div>
          <CBMCalculator />
        </div>
      </div>

      {/* Add New Shipment Form Modal */}
      {showAddForm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg sm:text-xl font-semibold text-gray-800 dark:text-white'>
                {isAdmin ? 'Add Admin Shipment' : 'Add New Shipment'}
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddShipment} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Tracking Number
                </label>
                <input
                  type='text'
                  value={newShipment.trackingNumber}
                  onChange={(e) => setNewShipment({ ...newShipment, trackingNumber: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  value={newShipment.name}
                  onChange={(e) => setNewShipment({ ...newShipment, name: e.target.value })}
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
              {!isAdmin && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Quantity
                    </label>
                    <input
                      type='number'
                      value={newShipment.quantity}
                      onChange={(e) => setNewShipment({ ...newShipment, quantity: e.target.value })}
                      className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Product
                    </label>
                    <input
                      type='text'
                      value={newShipment.product}
                      onChange={(e) => setNewShipment({ ...newShipment, product: e.target.value })}
                      className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                      required
                    />
                  </div>
                </>
              )}
              {isAdmin && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                    Status
                  </label>
                  <select
                    value={newShipment.status}
                    onChange={(e) => setNewShipment({ ...newShipment, status: e.target.value })}
                    className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In China Warehouse">In China Warehouse</option>
                    <option value="On Way to Warehouse">On Way to Warehouse</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On Return">On Return</option>
                  </select>
                </div>
              )}
              <div className='flex flex-col sm:flex-row gap-2'>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                >
                  Add Shipment
                </button>
                <button
                  type='button'
                  onClick={() => setShowAddForm(false)}
                  className='flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className='fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50'>
          <p className={`text-lg ${message.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingDashboard; 