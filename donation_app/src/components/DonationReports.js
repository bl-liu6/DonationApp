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
    <div>
      <h2>Donation Reports</h2>
      <button onClick={handleRefreshClick}>Refresh Reports</button>
      <section>
        <h3>Donation Inventory Report</h3>
        <ul>
          {Object.entries(inventory).map(([type, amount]) => (
            <li key={type}>{`${type}: ${amount}`}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Donator Report</h3>
        <div>
          {Object.entries(donatorReport).map(([donor, donations]) => (
            <div key={donor}>
              <h4>{donor}</h4>
              <ul>
                {Object.entries(donations).map(([type, amount]) => (
                  <li key={type}>{`${type}: ${amount}`}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
