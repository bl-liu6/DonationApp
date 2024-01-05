import React, { useState } from "react";
import { addDonation } from "../services/firebaseService";

export default function DonationRegistration() {
    const [donation, setDonation] = useState({
        donorName: '',
        type: 'money',
        amount: 0,
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDonation({ ...donation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDonation(donation);
            setDonation({ donorName: '', type: '', amount: 0, date: '' }); // reset the form
            alert("Donation registered successfully!");
        } catch (error) {
            console.error("Error adding donation: ", error);
            alert("Failed to register donation.");
        }
    };

    return (
        <div>
            <h2>Donation Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Donor Name:
                    <input
                        name="donorName"
                        value={donation.donorName}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Type of Donation:
                    <select name="type" value={donation.type} onChange={handleInputChange}>
                        <option value="money">Money</option>
                        <option value="food">Food</option>
                        <option value="clothing">Clothing</option>
                    </select>
                </label>
                <label>
                    Amount/Quantity:
                    <input
                        name="amount"
                        type="number"
                        value={donation.amount}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Time of Donation:
                    <input
                        name="date"
                        type="date"
                        value={donation.date}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}