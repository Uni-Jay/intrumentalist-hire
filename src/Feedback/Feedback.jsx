import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackReview from './FeedbackList';

const Feedback = () => {
  const [reviewData, setReviewData] = useState(null);

  const handleSubmitForm = (formData) => {
    setReviewData(formData);
  };

  return (
    <div>
      {/* {!reviewData ? (
        <FeedbackForm onSubmit={handleSubmitForm} />
      ) : (
        <FeedbackReview reviewData={reviewData} />
      )} */}
    </div>
  );
};

export default Feedback;
