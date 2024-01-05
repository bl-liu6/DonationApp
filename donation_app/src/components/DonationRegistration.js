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
        if (donation.donorName.trim() === '') {
            alert('Donor name cannot be empty.');
            return;
        }
        try {
            await addDonation(donation);
            setDonation({ donorName: '', type: 'money', amount: 0, date: '' }); // reset the form
            alert("Donation registered successfully!");
        } catch (error) {
            console.error("Error adding donation: ", error);
            alert("Failed to register donation.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>Donation Registration</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            Donor Name:
                            <input
                                name="donorName"
                                style={styles.input}
                                value={donation.donorName}
                                onChange={handleInputChange}
                                required
                                type="text"
                                pattern=".*\S.*"
                            />
                        </label>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            Type of Donation:
                            <select name="type" value={donation.type} onChange={handleInputChange} style={styles.input}>
                                <option value="money">Money</option>
                                <option value="food">Food</option>
                                <option value="clothing">Clothing</option>
                            </select>
                        </label>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            Amount/Quantity:
                            <input
                                name="amount"
                                type="number"
                                value={donation.amount}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            Time of Donation:
                            <input
                                name="date"
                                type="date"
                                value={donation.date}
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

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white', // Light background for the whole page
    },
    card: {
        width: '100%', // Width of the card
        maxWidth: '500px', // Maximum width of the card
        backgroundColor: '#4169E1', // Background color of the card
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Simple shadow
        padding: '20px', // Padding inside the card
        margin: '15px', // Margin around the card
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
        display: 'block', // Ensure the label is on a new line
        marginBottom: '5px',
        fontSize: '18px',
    },
    input: {
        fontSize: '16px',
        padding: '10px',
        width: '60%', // Make input take the full width of the card
        margin: '5px 0', // Space between label and input
    },
    button: {
        backgroundColor: '#FFEA00',
        padding: '10px 20px',
        fontSize: '18px',
        cursor: 'pointer',
        margin: '10px 0',
        width: '40%', // Make button take the full width of the card
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
    }
};
