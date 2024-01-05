import React from "react";
import DonationDistribution from "./components/DonationDistribution";
import DonationRegistration from "./components/DonationRegistration";
import DonationReports from "./components/DonationReports";

function App() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>Shelter Donation Management System</h1>
      </header>
      <main style={styles.main}>
        <DonationRegistration />
        <DonationDistribution />
        <DonationReports />
      </main>
    </div>
  );
}

const styles = {
  app: {
    textAlign: 'center', // Center align the text
    fontFamily: 'Arial, sans-serif', // Set a common font
  },
  header: {
    backgroundColor: '#4169E1', // Header background color
    minHeight: '10vh', // Minimum height for the header
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align the items
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)', // Responsive font size
    color: 'white', // Text color
  },
  title: {
    margin: '20px 0', // Margin around the title
  },
  main: {
    display: 'flex', // Use flexbox to align children
    justifyContent: 'center', // Center children horizontally
    alignItems: 'flex-start', // Align children to the start of the cross axis
    gap: '20px', // Gap between each component
    padding: '20px', // Padding around the main area
    flexWrap: 'wrap', // Allow wrapping to the next line on small screens
  }
};

export default App;
