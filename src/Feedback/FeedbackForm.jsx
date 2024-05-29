import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const submitFeedback = async () => {
    const timestamp = new Date().toISOString(); // Get the current time in ISO format

    try {
      const response = await axios.post('/api/feedback', { rating, feedback, timestamp });

      // Optional: You can handle the success response here if needed.
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  return (
    <div>
      <h2>Write Your Feedback</h2>
      <div>
        <label>
          Rating:
          <input type="number" min="1" max="5" value={rating} />
        </label>
      </div>
      <div>
        <label>
          Feedback:
          <textarea value={feedback} onChange={handleFeedbackChange} />
        </label>
      </div>
      <div>
        <button type="button" onClick={submitFeedback}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
