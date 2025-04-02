import React, { useState } from "react";

const Shipping = () => {
  const [shippingAddress, setShippingAddress] = useState([
    "M856+FOFOOFO+IMPORT 15015586074广东省佛山市南海区里水镇旗峰大道2号全顺祥物流基地18栋2号兴航仓（导航：兴航仓）M856",
  ]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // Single message state
  const [copySuccess, setCopySuccess] = useState("");
  const [combinedAddress, setCombinedAddress] = useState(""); // Store the combined address separately

  const handleAddress = () => {
    if (name.trim() === "") {
      setMessage("Name is required");
    } else {
      const newCombinedAddress = `${shippingAddress[0]} ${name}`;
      setShippingAddress([...shippingAddress, newCombinedAddress]);
      setCombinedAddress(newCombinedAddress); // Save the combined address
      setMessage(
        `Dear ${name},\n\n` +
        `Your Shipping Address has been successfully generated:\n` +
        `(${newCombinedAddress})\n\n` +
        `Shipping Mark: M856:${name}\n\n` +
        `NOTE: Please add all your tracking numbers in the "Add a Tracking Number" section.\n` +
        `\n---\n` +
        `Thank you for using our service! If you have any questions, feel free to contact our support team.\n` +
        `We wish you a smooth and hassle-free shipping experience!`
      );
      setCopySuccess(""); // Reset copy success message
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedAddress).then(() => {
      setCopySuccess("Address copied to clipboard!");
    });
  };

  // Tracking
  const [tracking, setTracking] = useState([]);
  const [adminInput, setAdminInput] = useState({
    trackNum: "",
    name: "",
    status: "",
  });
  const [userInput, setUserInput] = useState({
    trackNum: "",
    name: "",
    quantity: "",
    product: "",
  });
  const [checkTrackNum, setCheckTrackNum] = useState("");

  const handleAdminAdd = () => {
    const { trackNum, name, status } = adminInput;
    if (trackNum && name && status) {
      setTracking((prev) => [
        ...prev,
        { TrackingNum: trackNum, Sender: name, Status: status },
      ]);
      setMessage(`Tracking number ${trackNum} has been added successfully.`);
    } else {
      setMessage("All fields are required for Admin Add.");
    }
  };

  const handleUserAdd = () => {
    const { trackNum, name, quantity, product } = userInput;
    if (trackNum && name && quantity && product) {
      setTracking((prev) => [
        ...prev,
        {
          TrackingNum: trackNum,
          Sender: name,
          Quantity: quantity,
          Product: product,
        },
      ]);
      setMessage(
        `Tracking number ${trackNum} has been added successfully with ${quantity} quantity for username ${name}.`
      );
    } else {
      setMessage("All fields are required for User Add.");
    }
  };

  const handleUserCheck = () => {
    const found = tracking.find((item) => item.TrackingNum === checkTrackNum);
    if (found) {
      setMessage(
        `Tracking number: ${found.TrackingNum}, name: ${found.Sender}, quantity: ${found.Quantity || "N/A"}, product: ${found.Product || "N/A"}`
      );
    } else {
      setMessage(
        `Tracking number ${checkTrackNum} is not found. This could be that the package is not updated yet or still in transit.`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          FofoofoImport Shipping Address Generator
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleAddress}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Generate Address
        </button>
        <pre className="mt-4 bg-gray-100 p-4 rounded-md text-gray-700 whitespace-pre-wrap">
          {message}
        </pre>
        {combinedAddress && (
          <button
            onClick={handleCopy}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
          >
            Copy Address to Clipboard
          </button>
        )}
        {copySuccess && (
          <p className="text-green-600 text-center mt-2">{copySuccess}</p>
        )}
      </div>

      <div className="mt-10 bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Tracking System
        </h1>

        {/* Admin Add Section */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Admin Add</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter tracking number"
            value={adminInput.trackNum}
            onChange={(e) =>
              setAdminInput({ ...adminInput, trackNum: e.target.value.toUpperCase() })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter user name"
            value={adminInput.name}
            onChange={(e) =>
              setAdminInput({ ...adminInput, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter package status"
            value={adminInput.status}
            onChange={(e) =>
              setAdminInput({ ...adminInput, status: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdminAdd}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add as Admin
          </button>
        </div>

        {/* User Add Section */}
        <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">User Add</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter tracking number"
            value={userInput.trackNum}
            onChange={(e) =>
              setUserInput({ ...userInput, trackNum: e.target.value.toUpperCase() })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter name"
            value={userInput.name}
            onChange={(e) =>
              setUserInput({ ...userInput, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Enter quantity"
            value={userInput.quantity}
            onChange={(e) =>
              setUserInput({ ...userInput, quantity: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter product"
            value={userInput.product}
            onChange={(e) =>
              setUserInput({ ...userInput, product: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUserAdd}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add as User
          </button>
        </div>

        {/* User Check Section */}
        <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">User Check</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter tracking number to check"
            value={checkTrackNum}
            onChange={(e) => setCheckTrackNum(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUserCheck}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Check Tracking Number
          </button>
        </div>

        {/* Message Section */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8">Message</h3>
        <pre className="mt-2 bg-gray-100 p-4 rounded-md text-gray-700 whitespace-pre-wrap">
          {message}
        </pre>
      </div>
    </div>
  );
};

export default Shipping;
