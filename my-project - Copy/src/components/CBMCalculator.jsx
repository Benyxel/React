import React, { useState } from 'react';
import { FaCalculator, FaRuler } from 'react-icons/fa';

const CBMCalculator = () => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  });
  const [result, setResult] = useState(null);

  const calculateCBM = (length, width, height) => {
    return (length * width * height) / 1000000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { length, width, height } = dimensions;
    const cbm = calculateCBM(Number(length), Number(width), Number(height));
    const shippingFee = cbm * 250 ;
    const shippingFeeCedis = cbm * 250 *16.1;
    
    setResult({
      cbm: cbm.toFixed(4),
      shippingFee: shippingFee.toFixed(2),
      shippingFeeCedis: shippingFeeCedis.toFixed(2)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FaCalculator className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          CBM Calculator
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Length (cm)
            </label>
            <input
              type="number"
              name="length"
              value={dimensions.length}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Width (cm)
            </label>
            <input
              type="number"
              name="width"
              value={dimensions.width}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={dimensions.height}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
              min="0"
              step="0.1"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <FaRuler className="w-5 h-5" />
          Calculate CBM
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            Calculation Results
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">CBM:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {result.cbm} m³
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Shipping Fee Dollar :</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ${result.shippingFee}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Shipping Fee Cedis:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
              ₵{result.shippingFeeCedis}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CBMCalculator; 