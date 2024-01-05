import React from "react";
import DonationDistribution from "./components/DonationDistribution";
import DonationRegistration from "./components/DonationRegistration";
import DonationReports from "./components/DonationReports";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shelter Donation Management System</h1>
      </header>
      <main>
        <DonationRegistration />
        <DonationDistribution />
        <DonationReports />
      </main>
    </div>
  );
}

export default App;