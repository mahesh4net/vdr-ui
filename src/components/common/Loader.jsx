export default function Loader({ color, size, thickness }) {
  return (
    <div
      style={{ border: `${thickness}px solid ${color}`, width: `${size}px` }}
      className="loader"
    ></div>
  );
}
