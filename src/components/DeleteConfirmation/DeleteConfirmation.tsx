import { useEffect } from "react";

import { ProgressBar } from "../ProgressBar/ProgressBar.js";

const TIMER = 3000;

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmation: React.FC<Props> = ({
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
};
