interface DeleteButtonProps {
  onClick: () => void;
}
import { useState } from "react";

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  const [confirming, setConfirming] = useState(false);

  const handleDeleteClick = () => {
    if (confirming) {
      onClick();
      setConfirming(false);
    } else {
      setConfirming(true);
    }
  };

  const handleCancel = () => {
    setConfirming(false);
  };

  return (
    <div className="tooltip tooltip-top" data-tip="Delete story">
      {confirming ? (
        <div className="flex gap-2">
          <button
            onClick={handleDeleteClick}
            className="btn btn-error uppercase"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="btn btn-secondary uppercase"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleDeleteClick}
          className="btn hover:btn-error uppercase"
        >
          X
        </button>
      )}
    </div>
  );
};
