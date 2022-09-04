function SpinnerV2({ width, height, className }) {
  return (
    <div
      className={`spinner-border text-primary mx-2 ${className}`}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default SpinnerV2;
