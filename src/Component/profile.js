import React, { useState, useEffect } from 'react';
import './profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [userInfo, setUserInfo] = useState({
    name: 'first login',
    email: 'first login',
    phone: 'first login',
    memberSince: 'first login',
    location: 'first login',
    orders: [],
  });

  const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/profile-data') 
      .then((response) => response.json())
      .then((data) => {
        setUserInfo({
          name: data.name || 'first login',
          email: data.email || 'first login',
          phone: data.phone || 'first login',
          memberSince: data.date || 'first login',
          location: data.location || 'India',
          orders: [], 
        });
      })
      .catch((error) => {
        console.error('Error fetching profile details:', error);
      });
  }, []);

  const fetchOrders = () => {
    if (!isOrdersLoaded) {
      fetch('http://localhost:5000/profile-order') 
        .then((response) => response.json())
        .then((data) => {
          setUserInfo((prevState) => ({
            ...prevState,
            orders: data.orders || [], 
          }));
          setIsOrdersLoaded(true);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'orders') {
      fetchOrders(); // Fetch orders when the "Orders" tab is clicked
    }
  };

  return (
    <div className="container">
      <div className="profile-header">
        <img src="./images/user-icon.jpg" className="profile-pic" alt="User-Picture" />
        <div className="profile-info">
          <h1>{userInfo.name}</h1>
          <p>Email: {userInfo.email}</p>
          <p>Phone: {userInfo.phone}</p>
          <p>Member Since: {userInfo.memberSince}</p>
          <p>Location: {userInfo.location}</p>
        </div>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'orders' ? 'active-tab' : ''}`}
          onClick={() => handleTabClick('orders')}
        >
          Order History
        </div>
        <div
          className={`tab ${activeTab === 'settings' ? 'active-tab' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          Account Settings
        </div>
      </div>

      <div id="orders" className={`content ${activeTab === 'orders' ? 'active' : ''}`}>
        <div className="order-row">
          {userInfo.orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            userInfo.orders.map((order) => (
              <div className="order-item" key={order.id}>
                <h3>{`Order #${order.id}`}</h3>
                <p>Date: {order.date}</p>
                <p>Total: {order.total} rupees</p>
                <p>Status: {order.status}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div id="settings" className={`content ${activeTab === 'settings' ? 'active' : ''}`}>
        <div className="setting-item">
          <h3>Change Password</h3>
          <button style={{ background: 'none', color: '#ff5722', border: 'none', cursor: 'pointer' }}>
            Click here to change your password.
          </button>
        </div>
        <div className="setting-item">
          <h3>Update Email Address</h3>
          <button style={{ background: 'none', color: '#ff5722', border: 'none', cursor: 'pointer' }}>
            Click here to update your email address.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
