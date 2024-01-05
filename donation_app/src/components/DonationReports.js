import React, { useState, useEffect } from 'react';
import { getDonations, getDistributions } from '../services/firebaseService';

export default function DonationReports() {
  const [inventory, setInventory] = useState({});
  const [donatorReport, setDonatorReport] = useState({});

  const calculateReports = async () => {
    try {
      const donations = await getDonations();
      const distributions = await getDistributions();

      const tempInventory = {};
      const tempDonatorReport = {};

      // Process donations
      donations.forEach((donation) => {
        const amount = parseFloat(donation.amount);
        const type = donation.type;
        const donor = donation.donorName;

        // Update inventory
        tempInventory[type] = (tempInventory[type] || 0) + amount;

        // Update donator report
        if (!tempDonatorReport[donor]) {
          tempDonatorReport[donor] = {}; // Initialize if not exists
        }
        // Aggregate donation amounts by type for each donor
        tempDonatorReport[donor][type] = (tempDonatorReport[donor][type] || 0) + amount;
      });

      // Subtract distributions from inventory
      distributions.forEach((distribution) => {
        const amount = parseFloat(distribution.amount);
        const type = distribution.type;
        tempInventory[type] = (tempInventory[type] || 0) - amount;
      });

      setInventory(tempInventory);
      setDonatorReport(tempDonatorReport);
    } catch (error) {
      console.error('Error fetching reports: ', error);
    }
  };

  useEffect(() => {
    calculateReports();
  }, []);

  const handleRefreshClick = () => {
    calculateReports(); // Re-fetch and calculate reports
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Donation Reports</h2>
        <section style={styles.section}>
          <h3>Donation Inventory Report</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inventory).map(([type, amount]) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section style={styles.section}>
          <h3>Donator Report</h3>
          {Object.entries(donatorReport).map(([donor, donations]) => (
            <div key={donor} style={styles.donorSection}>
              <h4>{donor}</h4>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(donations).map(([type, amount]) => (
                    <tr key={type}>
                      <td>{type}</td>
                      <td>{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
        <button onClick={handleRefreshClick} style={styles.button}>Refresh</button>
      </div>
    </div>
  );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
    },
    card: {
        width: '400px',
        maxWidth: '700px',
        backgroundColor: '#4169E1',
        borderRadius: '10px',
        boxShadow: 'none',
        padding: '20px',
        margin: '15px',
        color: 'white',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
    },
    button: {
        backgroundColor: '#FFEA00',
        padding: '10px 20px',
        fontSize: '18px',
        cursor: 'pointer',
        margin: '10px 0',
        width: '50%',
    },
    section: {
        marginTop: '20px',
    },
    donorSection: {
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        textAlign: 'left',
        borderCollapse: 'collapse',
        border: '1px solid white',
    }
};