import React, { useState, useEffect } from "react";
import { getDonations, getDistributions } from "../services/firebaseService";

export default function DonationReports() {
    const [inventory, setInventory] = useState({});
    const [donatorReport, setDonatorReport] = useState({});

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const donations = await getDonations();
                const distributions = await getDistributions();  
                
                // process donations
                const tempInventory = {};
                const tempDonatorReport = {};

                donations.forEach(donation => {
                    // update inventory
                    const type = donation.type;
                    tempInventory[type] = (tempInventory[type] || 0) + donation.amount;
                    // update donator report
                    const donor = donation.donorName;
                    tempDonatorReport[donor] = (tempDonatorReport[donor] || 0) + donation.amount;
                });

                // update distributions from inventory
                distributions.forEach(distribution => {
                    const type = distribution.type;
                    tempInventory[type] = (tempInventory[type] || 0) - distribution.amount;
                });

                setInventory(tempInventory);
                setDonatorReport(tempDonatorReport);
            } catch (error) {
                console.log("Error fetching reports: ", error);
            }            
        };

        fetchReports();
    }, []);

    return (
        <div>
          <h2>Donation Inventory Report</h2>
          <ul>
            {Object.entries(inventory).map(([type, amount]) => (
              <li key={type}>{`${type}: ${amount}`}</li>
            ))}
          </ul>
    
          <h2>Donator Report</h2>
          <ul>
            {Object.entries(donatorReport).map(([donorName, totalDonation]) => (
              <li key={donorName}>{`${donorName}: $${totalDonation}`}</li>
            ))}
          </ul>
        </div>
    );
    
}

