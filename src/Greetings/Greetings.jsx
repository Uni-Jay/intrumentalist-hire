import React from 'react';

function Greeting() {
  const getCurrentTime = () => {
    const currentHour = new Date().getHours();
    return currentHour;
  };

  const getGreeting = () => {
    const currentHour = getCurrentTime();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div>
      <h1>{getGreeting()}</h1>
      {/* Your other components or content can go here */}
    </div>
  );
}

export default Greeting;