import React from "react";
import DonationRegistration from "./components/DonationRegistration";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shelter Donation Management System</h1>
      </header>
      <main>
        <DonationRegistration />
      </main>
    </div>
  );
}

export default App;