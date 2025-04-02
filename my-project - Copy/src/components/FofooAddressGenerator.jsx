import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCopy, FaCheck, FaArrowLeft, FaEdit, FaSave, FaTimes, FaTruck, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FofooAddressGenerator = () => {
  const [name, setName] = useState('');
  const [generatedAddress, setGeneratedAddress] = useState('');
  const [shippingMark, setShippingMark] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentId, setCurrentId] = useState('M856-FIM001');
  const [hasAddress, setHasAddress] = useState(false);
  const [existingAddress, setExistingAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  const baseAddress = 'M856+FOFOOFO+IMPORT 15015586074广东省佛山市南海区里水镇旗峰大道2号全顺祥物流基地18栋2号兴航仓（导航：兴航仓）M856 ';

  useEffect(() => {
    // Get the last used ID from localStorage
    const lastUserId = localStorage.getItem('lastUserId');
    if (lastUserId && lastUserId !== 'NaN') {
      // Extract the number part and increment it
      const numberPart = parseInt(lastUserId.split('-')[2]);
      if (!isNaN(numberPart)) {
        setCurrentId(`M856-FIM${(numberPart + 1).toString().padStart(3, '0')}`);
      } else {
        setCurrentId('M856-FIM001');
      }
    } else {
      // If no last ID exists or it's invalid, start with 001
      setCurrentId('M856-FIM001');
    }
    
    // Reset other state
    setHasAddress(false);
    setExistingAddress(null);
    setName('');
    setGeneratedAddress('');
    setShippingMark('');
  }, []);

  const generateAddress = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    // Check if user already has a shipping mark
    const savedMarks = JSON.parse(localStorage.getItem('shippingMarks') || '[]');
    const existingUserAddress = savedMarks.find(mark => mark.id === currentId);
    
    if (existingUserAddress) {
      setHasAddress(true);
      setExistingAddress(existingUserAddress);
      toast.info('You already have a shipping address. You can only modify your name.');
      return;
    }

    const newAddress = `${currentId} - ${name}\n${baseAddress}`;
    const newShippingMark = `${currentId}:${name}`;

    // Create new shipping mark object
    const newShippingMarkObj = {
      id: currentId,
      name: name,
      address: newAddress,
      shippingMark: newShippingMark,
      date: new Date().toISOString()
    };

    // Save to localStorage
    savedMarks.push(newShippingMarkObj);
    localStorage.setItem('shippingMarks', JSON.stringify(savedMarks));
    localStorage.setItem('lastUserId', currentId);

    // Update state
    setGeneratedAddress(newAddress);
    setShippingMark(newShippingMark);
    setHasAddress(true);
    setExistingAddress(newShippingMarkObj);

    // Increment ID for next user
    const numberPart = parseInt(currentId.split('-')[2]);
    if (!isNaN(numberPart)) {
      const nextId = `M856-FIM${(numberPart + 1).toString().padStart(3, '0')}`;
      setCurrentId(nextId);
      localStorage.setItem('lastUserId', nextId);
    } else {
      setCurrentId('M856-FIM001');
      localStorage.setItem('lastUserId', 'M856-FIM001');
    }

    // Show success message
    toast.success('Shipping address generated successfully! You can find it in your profile under Shipping Marks.');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy text. Please try again.');
    }
  };

  const handleEditName = () => {
    setTempName(name);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    if (!tempName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    // Update the name in localStorage
    const savedMarks = JSON.parse(localStorage.getItem('shippingMarks') || '[]');
    const updatedMarks = savedMarks.map(mark => {
      if (mark.id === existingAddress.id) {
        const updatedAddress = `${mark.id} - ${tempName}\n${mark.address.split('\n')[1]}`;
        const updatedShippingMark = `${mark.id}:${tempName}`;
        return {
          ...mark,
          name: tempName,
          address: updatedAddress,
          shippingMark: updatedShippingMark
        };
      }
      return mark;
    });
    localStorage.setItem('shippingMarks', JSON.stringify(updatedMarks));

    // Update state
    setName(tempName);
    setExistingAddress({
      ...existingAddress,
      name: tempName,
      address: `${existingAddress.id} - ${tempName}\n${existingAddress.address.split('\n')[1]}`,
      shippingMark: `${existingAddress.id}:${tempName}`
    });
    setIsEditing(false);

    toast.success('Name updated successfully!');
  };

  const handleCancelEdit = () => {
    setTempName('');
    setIsEditing(false);
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
      <div className='max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto'>
        {/* Back Button */}
        <Link
          to='/Shipping'
          className='inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6 group border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
        >
          <FaArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          <span className='font-medium'>Back to Shipping Dashboard</span>
        </Link>

        {/* Main Card */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
          {/* Card Header */}
          <div className='bg-primary/10 dark:bg-primary/20 p-8 lg:p-10 text-center'>
            <div className='flex justify-center mb-4'>
              <FaTruck className='text-5xl lg:text-6xl text-primary' />
            </div>
            <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2'>
              fofoofoimport Shipping Address Generator
            </h1>
            <p className='text-base lg:text-lg text-gray-600 dark:text-gray-400'>
              Generate your unique shipping address for fofoofoimport warehouse
            </p>
          </div>

          {/* Card Body */}
          <div className='p-8 lg:p-10'>
            {!existingAddress ? (
              <div className='mb-8'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                    Generate Shipping Address
                  </label>
                  <div className='flex gap-4'>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent'
                      placeholder='Enter your name'
                    />
                    <button
                      onClick={generateAddress}
                      className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap'
                    >
                      Generate Address
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='mb-8'>
                <div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4'>
                  <div className='flex items-start gap-2'>
                    <FaCheck className='text-green-500 mt-1' />
                    <div>
                      <p className='text-green-800 dark:text-green-200 font-medium mb-1'>Address Already Generated</p>
                      <p className='text-green-800 dark:text-green-200 text-sm'>
                        You have already generated your shipping address. You can view and copy it below.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-primary' />
                    Your Shipping Address
                  </h2>
                  <div className='flex gap-2'>
                    {!isEditing ? (
                      <button
                        onClick={handleEditName}
                        className='flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/90 transition-colors'
                      >
                        <FaEdit className='w-4 h-4' />
                        Edit Name
                      </button>
                    ) : (
                      <div className='flex gap-2'>
                        <button
                          onClick={handleSaveName}
                          className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                        >
                          <FaSave className='w-4 h-4' />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
                        >
                          <FaTimes className='w-4 h-4' />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Shipping Mark</p>
                    <div className="relative">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white break-all">{existingAddress.shippingMark}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(existingAddress.shippingMark)}
                        className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {copied ? <FaCheck className="w-5 h-5 text-green-500" /> : <FaCopy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Full Address</p>
                    <div className="relative">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white break-all whitespace-pre-line">{existingAddress.address}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(existingAddress.address)}
                        className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {copied ? <FaCheck className="w-5 h-5 text-green-500" /> : <FaCopy className="w-5 h-5" />}
                      </button>
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

export default FofooAddressGenerator; 