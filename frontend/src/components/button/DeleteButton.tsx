interface DeleteButtonProps {
  onClick: () => void;
}
export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <div className="tooltip tooltip-top " data-tip="Delete story">
      <button onClick={onClick} className="btn btn-error">
        Delete
      </button>
    </div>
  );
};
