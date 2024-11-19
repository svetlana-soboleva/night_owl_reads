
export const ErrorBadge = () => {
  return (
    <div className="backdrop-blur-sm bg-transparent h-60 flex items-center rounded-2xl p-4">
      <div className="badge badge-error gap-2 p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-4 w-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      Something went wront. Try again later 
    </div>
    </div>
    
  );
};
