const BackIcons: React.FC<{ fill: string }> = ({ fill }) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.41658 3.83301L2.5 6.33301L5.41658 9.24967"
        stroke="#1E1E1E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 6.33301H12.0807C14.9487 6.33301 17.3842 8.67484 17.496 11.5413C17.6141 14.5703 15.1113 17.1663 12.0807 17.1663H4.99933"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BackIcons;
