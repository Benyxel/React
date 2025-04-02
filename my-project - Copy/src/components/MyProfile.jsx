import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaTruck, FaBox, FaMapMarkerAlt, FaShoppingCart, FaFileInvoiceDollar, FaCopy, FaCheck, FaBell } from 'react-icons/fa';
import { trackingSystem } from './ShippingDashboard';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Yeboah Bernard',
    email: 'bernardyeboah@gmail.com',
    phone: '+233 54 000 0000',
    address: 'Accra, City, Ghana',
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [activeSubTab, setActiveSubTab] = useState('orders');
  const [userShipments, setUserShipments] = useState([]);
  const [copied, setCopied] = useState(false);
  const [shippingMarks, setShippingMarks] = useState([]);
  const [editingMarkId, setEditingMarkId] = useState(null);
  const [tempName, setTempName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load user shipments
    const userShipments = trackingSystem.getUserShipments('default');
    setUserShipments(userShipments);

    // Load shipping marks from localStorage
    const savedMarks = JSON.parse(localStorage.getItem('shippingMarks') || '[]');
    setShippingMarks(savedMarks);

    // Load favorites
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);

    // Load orders
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);

    // Load notifications
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    if (savedNotifications.length === 0) {
      const dummyNotifications = [
        {
          id: 1,
          title: "New Product Available",
          message: "Check out our latest product in the shop! We've just added a new collection of trendy items.",
          date: new Date().toISOString(),
          read: false
        },
        {
          id: 2,
          title: "Order Status Update",
          message: "Your order #12345 has been shipped and is on its way to you. Expected delivery in 3-5 days.",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          read: false
        },
        {
          id: 3,
          title: "Special Offer",
          message: "Get 20% off on all shipping fees this weekend! Don't miss out on this amazing deal.",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          read: true
        },
        {
          id: 4,
          title: "Welcome to Fofoo",
          message: "Thank you for joining Fofoo! We're excited to have you as part of our community.",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          read: true
        }
      ];
      localStorage.setItem('notifications', JSON.stringify(dummyNotifications));
      setNotifications(dummyNotifications);
      setUnreadCount(2); // 2 unread notifications
    } else {
      setNotifications(savedNotifications);
      const unread = savedNotifications.filter(notification => !notification.read).length;
      setUnreadCount(unread);
    }

    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'favorites') {
        const updatedFavorites = JSON.parse(e.newValue || '[]');
        setFavorites(updatedFavorites);
      } else if (e.key === 'orders') {
        const updatedOrders = JSON.parse(e.newValue || '[]');
        setOrders(updatedOrders);
      } else if (e.key === 'shippingMarks') {
        const updatedMarks = JSON.parse(e.newValue || '[]');
        setShippingMarks(updatedMarks);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const handleSave = () => {
    setIsEditing(false);
    addNotification(
      'Profile Updated',
      'Your profile information has been successfully updated.',
      'info'
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditName = () => {
    setTempName(userInfo.name);
    setIsEditing(true);
  };

  const handleSaveName = (mark) => {
    if (!tempName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    // Update the name in localStorage
    const updatedMarks = shippingMarks.map(m =>
      m.id === mark.id ? { ...m, name: tempName } : m
    );
    localStorage.setItem('shippingMarks', JSON.stringify(updatedMarks));

    // Update state
    setShippingMarks(updatedMarks);
    setUserInfo({
      ...userInfo,
      name: tempName,
      address: `${userInfo.address.split(' - ')[0]} - ${tempName}\n${userInfo.address.split('\n')[1]}`,
      shippingMark: `${userInfo.address.split(' - ')[0]}:${tempName}`
    });
    setIsEditing(false);

    toast.success('Name updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingMarkId(null);
    setTempName('');
  };

  const clearAddress = (markId) => {
    toast.info(
      <div>
        <p>Are you sure you want to clear this shipping address?</p>
        <p className="text-sm text-gray-500">This action cannot be undone.</p>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
        buttons: [
          <button
            key="confirm"
            onClick={() => {
              const updatedMarks = shippingMarks.filter(mark => mark.id !== markId);
              localStorage.setItem('shippingMarks', JSON.stringify(updatedMarks));
              setShippingMarks(updatedMarks);
              
              addNotification(
                'Shipping Mark Deleted',
                'Your shipping mark has been cleared successfully.',
                'shipping'
              );
              
              toast.success('Shipping address cleared successfully!');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-2"
          >
            Clear
          </button>,
          <button
            key="cancel"
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        ]
      }
    );
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    addNotification(
      'Notifications Cleared',
      'All notifications have been marked as read.',
      'info'
    );
  };

  // Add new function to handle adding notifications
  const addNotification = (title, message, type = 'info') => {
    const newNotification = {
      id: Date.now(), // Use timestamp as unique ID
      title,
      message,
      type,
      date: new Date().toISOString(),
      read: false
    };

    const updatedNotifications = [newNotification, ...notifications];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='max-w-6xl mx-auto'>
        {/* Profile Header */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8'>
          <div className='flex items-center gap-6'>
            <div className='relative'>
              <div className='w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                <FaUser className='w-12 h-12 text-gray-400' />
              </div>
              {isEditing && (
                <button className='absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors'>
                  <FaEdit className='w-4 h-4' />
                </button>
              )}
            </div>
            <div className='flex-1'>
              <h1 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
                {userInfo.name}
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>{userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar Navigation */}
          <div className='lg:col-span-1'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
              <nav className='space-y-2'>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaUser className='w-5 h-5' />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'tracking'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaTruck className='w-5 h-5' />
                  Tracking
                </button>
                <button
                  onClick={() => setActiveTab('buy4me')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'buy4me'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaShoppingCart className='w-5 h-5' />
                  Buy4Me
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaShoppingBag className='w-5 h-5' />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                    activeTab === 'favorites'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaBell className='w-5 h-5' />
                  Updates
                  {unreadCount > 0 && (
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[20px] text-center'>
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaCog className='w-5 h-5' />
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('shippingmark')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'shippingmark'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaMapMarkerAlt className='w-5 h-5' />
                  Shipping Mark
                </button>
                <button className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'>
                  <FaSignOutAlt className='w-5 h-5' />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className='lg:col-span-3'>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                    >
                      <FaEdit className='w-4 h-4' />
                      Edit Profile
                    </button>
                  ) : (
                    <div className='flex gap-2'>
                      <button
                        onClick={handleSave}
                        className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        <FaSave className='w-4 h-4' />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
                      >
                        <FaTimes className='w-4 h-4' />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type='text'
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                      />
                    ) : (
                      <p className='text-gray-900 dark:text-white'>{userInfo.name}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type='email'
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                      />
                    ) : (
                      <p className='text-gray-900 dark:text-white'>{userInfo.email}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type='tel'
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                      />
                    ) : (
                      <p className='text-gray-900 dark:text-white'>{userInfo.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                        rows='3'
                      />
                    ) : (
                      <p className='text-gray-900 dark:text-white'>{userInfo.address}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Mark Tab */}
            {activeTab === 'shippingmark' && (
              <div className='space-y-6'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Your Shipping Marks</h2>
                </div>

                {shippingMarks.length === 0 ? (
                  <div className='text-center py-8'>
                    <FaMapMarkerAlt className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-600 dark:text-gray-400'>No shipping marks found</p>
                    <Link
                      to='/fofoo-address'
                      className='inline-block mt-4 text-primary hover:text-primary/90'
                    >
                      Generate your first shipping mark →
                    </Link>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {shippingMarks.map((mark) => (
                      <div key={mark.id} className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
                        <div className='flex justify-between items-start mb-6'>
                          <div>
                            <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-1'>{mark.name}</h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>ID: {mark.id}</p>
                          </div>
                          {editingMarkId === mark.id ? (
                            <div className='flex gap-2'>
                              <button
                                onClick={() => handleSaveName(mark)}
                                className='p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                              >
                                <FaSave className='w-5 h-5' />
                              </button>
                              <button
                                onClick={() => handleCancelEdit()}
                                className='p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                              >
                                <FaTimes className='w-5 h-5' />
                              </button>
                            </div>
                          ) : (
                            <div className='flex gap-2'>
                              <button
                                onClick={() => {
                                  setTempName(mark.name);
                                  setEditingMarkId(mark.id);
                                }}
                                className='p-2 text-primary hover:text-primary/90'
                              >
                                <FaEdit className='w-5 h-5' />
                              </button>
                              <button
                                onClick={() => clearAddress(mark.id)}
                                className='p-2 text-red-600 hover:text-red-700'
                              >
                                <FaTimes className='w-5 h-5' />
                              </button>
                            </div>
                          )}
                        </div>

                        {editingMarkId === mark.id ? (
                          <input
                            type='text'
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent mb-6'
                            placeholder='Enter new name'
                          />
                        ) : (
                          <div className='space-y-6'>
                            <div>
                              <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Shipping Mark</p>
                              <div className='relative'>
                                <div className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                                  <p className='text-sm text-gray-900 dark:text-white break-all'>{mark.shippingMark}</p>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(mark.shippingMark)}
                                  className='absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                >
                                  {copied ? <FaCheck className='w-5 h-5 text-green-500' /> : <FaCopy className='w-5 h-5' />}
                                </button>
                              </div>
                            </div>

                            <div>
                              <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>Full Address</p>
                              <div className='relative'>
                                <div className='p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                                  <p className='text-sm text-gray-900 dark:text-white break-all whitespace-pre-line'>{mark.address}</p>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(mark.address)}
                                  className='absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                >
                                  {copied ? <FaCheck className='w-5 h-5 text-green-500' /> : <FaCopy className='w-5 h-5' />}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tracking Tab - Updated to show only tracking information */}
            {activeTab === 'tracking' && (
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Shipment Tracking</h2>
                  <Link
                    to='/Shipping'
                    className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                  >
                    <FaTruck className='w-4 h-4' />
                    Go to Shipping Dashboard
                  </Link>
                </div>

                <div className='space-y-4'>
                  {userShipments.length === 0 ? (
                    <div className='text-center py-8'>
                      <FaTruck className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                      <p className='text-gray-600 dark:text-gray-400'>No shipments to track</p>
                      <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                        Add your tracking numbers in the Shipping Dashboard to track them here
                      </p>
                      <Link
                        to='/Shipping'
                        className='inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        Go to Shipping Dashboard
                      </Link>
                    </div>
                  ) : (
                    userShipments.map((shipment) => (
                      <div key={shipment.TrackingNum} className='border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
                        <div className='flex justify-between items-start mb-4'>
                          <div>
                            <p className='font-medium text-gray-900 dark:text-white'>
                              Tracking Number: {shipment.TrackingNum}
                            </p>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                              Added on {new Date(shipment.AddedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(shipment.Status)}`}>
                            {shipment.Status}
                          </span>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='flex items-center gap-2'>
                            <FaBox className='text-gray-400' />
                            <div>
                              <p className='text-sm text-gray-600 dark:text-gray-400'>Product</p>
                              <p className='font-medium text-gray-900 dark:text-white'>{shipment.Product}</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <FaMapMarkerAlt className='text-gray-400' />
                            <div>
                              <p className='text-sm text-gray-600 dark:text-gray-400'>Quantity</p>
                              <p className='font-medium text-gray-900 dark:text-white'>{shipment.Quantity}</p>
                            </div>
                          </div>
                        </div>
                        <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Last Updated: {new Date(shipment.LastUpdated).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Buy4Me Tab */}
            {activeTab === 'buy4me' && (
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                {/* Buy4Me Sub-tabs */}
                <div className='flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700'>
                  <button
                    onClick={() => setActiveSubTab('orders')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeSubTab === 'orders'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaShoppingBag className='w-4 h-4 inline-block mr-2' />
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveSubTab('tracking')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeSubTab === 'tracking'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaTruck className='w-4 h-4 inline-block mr-2' />
                    Tracking
                  </button>
                  <button
                    onClick={() => setActiveSubTab('invoices')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeSubTab === 'invoices'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaFileInvoiceDollar className='w-4 h-4 inline-block mr-2' />
                    Invoices
                  </button>
                </div>

                {/* Buy4Me Orders Sub-tab */}
                {activeSubTab === 'orders' && (
                  <div className='space-y-4'>
                    <div className='text-center py-8'>
                      <FaShoppingCart className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                      <p className='text-gray-600 dark:text-gray-400'>No Buy4Me orders found</p>
                      <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                        Start shopping with our Buy4Me service
                      </p>
                      <Link
                        to='/Buy4Me'
                        className='inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        Go to Buy4Me
                      </Link>
                    </div>
                  </div>
                )}

                {/* Buy4Me Tracking Sub-tab */}
                {activeSubTab === 'tracking' && (
                  <div className='space-y-4'>
                    <div className='text-center py-8'>
                      <FaTruck className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                      <p className='text-gray-600 dark:text-gray-400'>No Buy4Me shipments to track</p>
                      <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                        Your Buy4Me shipments will appear here
                      </p>
                      <Link
                        to='/Buy4Me'
                        className='inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        Go to Buy4Me
                      </Link>
                    </div>
                  </div>
                )}

                {/* Buy4Me Invoices Sub-tab */}
                {activeSubTab === 'invoices' && (
                  <div className='space-y-4'>
                    <div className='text-center py-8'>
                      <FaFileInvoiceDollar className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                      <p className='text-gray-600 dark:text-gray-400'>No Buy4Me invoices found</p>
                      <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                        Your Buy4Me invoices will appear here
                      </p>
                      <Link
                        to='/Buy4Me'
                        className='inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                      >
                        Go to Buy4Me
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>Order History</h2>
                {orders.length === 0 ? (
                  <div className='text-center py-8'>
                    <FaShoppingBag className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-600 dark:text-gray-400'>No orders found</p>
                    <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                      Your order history will appear here
                    </p>
                    <Link
                      to='/Shop'
                      className='inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                    >
                      Go to Shop
                    </Link>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {orders.map((order) => (
                      <div key={order.id} className='border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
                        <div className='flex justify-between items-start mb-4'>
                          <div>
                            <p className='font-medium text-gray-900 dark:text-white'>Order #{order.id}</p>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        {order.items.map((item, index) => (
                          <div key={index} className='flex items-center gap-4 mb-4'>
                            <img
                              src={item.image}
                              alt={item.name}
                              className='w-20 h-20 rounded-lg object-cover'
                            />
                            <div className='flex-1'>
                              <p className='font-medium text-gray-900 dark:text-white'>{item.name}</p>
                              <p className='text-sm text-gray-500 dark:text-gray-400'>Quantity: {item.quantity}</p>
                              <p className='text-sm text-gray-500 dark:text-gray-400'>₵{item.price}</p>
                            </div>
                          </div>
                        ))}
                        <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                          <div className='flex justify-between items-center'>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                              Total Amount: <span className='font-semibold'>₵{order.total}</span>
                            </p>
                            <Link
                              to={`/order/${order.id}`}
                              className='text-sm text-primary hover:text-primary/90'
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Notifications Tab (formerly Favorites) */}
            {activeTab === 'favorites' && (
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Notifications</h2>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className='text-sm text-primary hover:text-primary/90'
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className='text-center py-8'>
                    <FaBell className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-600 dark:text-gray-400'>No notifications</p>
                    <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
                      You'll see your notifications here
                    </p>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className='flex items-start gap-4'>
                          <div className={`p-2 rounded-full ${
                            notification.type === 'order' ? 'bg-green-100 dark:bg-green-800' :
                            notification.type === 'shipping' ? 'bg-blue-100 dark:bg-blue-800' :
                            notification.type === 'product' ? 'bg-purple-100 dark:bg-purple-800' :
                            'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <FaBell className={`w-5 h-5 ${
                              notification.type === 'order' ? 'text-green-600 dark:text-green-400' :
                              notification.type === 'shipping' ? 'text-blue-600 dark:text-blue-400' :
                              notification.type === 'product' ? 'text-purple-600 dark:text-purple-400' :
                              'text-gray-600 dark:text-gray-400'
                            }`} />
                          </div>
                          <div className='flex-1'>
                            <div className='flex justify-between items-start'>
                              <h3 className='font-medium text-gray-900 dark:text-white'>{notification.title}</h3>
                              <span className='text-sm text-gray-500 dark:text-gray-400'>
                                {new Date(notification.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className='text-gray-600 dark:text-gray-400 mt-1'>{notification.message}</p>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className='text-sm text-primary hover:text-primary/90 mt-2'
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>Account Settings</h2>
                <div className='space-y-6'>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>Change Password</h3>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                          Current Password
                        </label>
                        <input
                          type='password'
                          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                          New Password
                        </label>
                        <input
                          type='password'
                          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                          Confirm New Password
                        </label>
                        <input
                          type='password'
                          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                        />
                      </div>
                      <button className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'>
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>Notification Settings</h3>
                    <div className='space-y-4'>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='rounded text-primary focus:ring-primary' />
                        <span className='text-gray-700 dark:text-gray-300'>Email notifications</span>
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='rounded text-primary focus:ring-primary' />
                        <span className='text-gray-700 dark:text-gray-300'>Order updates</span>
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='rounded text-primary focus:ring-primary' />
                        <span className='text-gray-700 dark:text-gray-300'>Promotional emails</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile; 