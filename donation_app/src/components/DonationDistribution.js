import React, { useState, useEffect } from 'react';
import { getDonationTypes, distributeDonation } from '../services/firebaseService'; // Adjusted functions

export default function DonationDistribution() {
  const [donationTypes, setDonationTypes] = useState([]); // To hold all types of donations
  const [distribution, setDistribution] = useState({
    type: '',
    amount: 0,
    date: ''
  });

  useEffect(() => {
    // Fetch donation types when the component mounts
    const fetchDonationTypes = async () => {
      const fetchedTypes = await getDonationTypes();
      setDonationTypes(fetchedTypes);
    };

    fetchDonationTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDistribution({ ...distribution, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await distributeDonation(distribution);
      alert('Distribution logged successfully!');
    } catch (error) {
      console.error('Error logging distribution: ', error);
      alert('Failed to log distribution.');
    }
  };

  return (
    <div>
      <h2>Log Donation Distribution</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type of Donation:
          <select name="type" value={distribution.type} onChange={handleInputChange}>
            <option value="">Select a donation type</option>
            {donationTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount/Quantity Distributed:
          <input
            name="amount"
            type="number"
            value={distribution.amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Distribution:
          <input
            name="date"
            type="date"
            value={distribution.date}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Log Distribution</button>
      </form>
    </div>
  );
}
