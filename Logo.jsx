export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#e8ff00" />
      <path d="M23 5 9 22h9l-2 13 15-19h-9z" fill="#111" />
    </svg>
  );
}
