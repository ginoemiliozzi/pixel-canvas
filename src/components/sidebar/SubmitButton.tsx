import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { SUBMISSION_TIMEOUT_IN_SECONDS } from '../../constants';

const SubmitButton = ({
  onClick,
  remainingPixels,
  canvasFinished,
}: {
  onClick: () => void;
  remainingPixels: number;
  canvasFinished: boolean;
}) => {
  const [submissionTimeout, setSubmissionTimeout] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (submissionTimeout > 0) {
        setSubmissionTimeout(submissionTimeout - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const submitImage = () => {
    onClick();
    setSubmissionTimeout(SUBMISSION_TIMEOUT_IN_SECONDS);
  };

  const isDisabled = submissionTimeout > 0;

  return !canvasFinished ? (
    <Button onClick={submitImage} variant="outlined" disabled={isDisabled}>
      {isDisabled ? (
        `Submit more in ${submissionTimeout}s`
      ) : (
        <>
          submit
          <br />({remainingPixels} pixels remaining)
        </>
      )}
    </Button>
  ) : null;
};

export default SubmitButton;
