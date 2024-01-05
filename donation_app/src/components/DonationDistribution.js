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
      setDistribution({ type: '', amount: 0, date: '' }); // reset the form
      alert('Distribution logged successfully!');
    } catch (error) {
      console.error('Error logging distribution: ', error);
      alert('Failed to log distribution.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Log Donation Distribution</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Type of Donation:
              <select name="type" value={distribution.type} onChange={handleInputChange} style={styles.input}>
                <option value="">Select a donation type</option>
                {donationTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </label>        
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Amount/Quantity Distributed:
              <input
                name="amount"
                type="number"
                value={distribution.amount}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>        
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Date of Distribution:
              <input
                name="date"
                type="date"
                value={distribution.date}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
          </div>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

// Reuse the same styles object from the DonationRegistration component
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
    },
    card: {
        width: '80%',
        maxWidth: '500px',
        backgroundColor: '#4169E1',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '15px',        
        color: 'white',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '18px',
    },
    input: {
        fontSize: '16px',
        padding: '10px',
        width: '60%',
        margin: '5px 0',
    },
    button: {
        backgroundColor: '#FFEA00',
        padding: '10px 20px',
        fontSize: '18px',
        cursor: 'pointer',
        margin: '10px 0',
        width: '40%',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
    }
};
