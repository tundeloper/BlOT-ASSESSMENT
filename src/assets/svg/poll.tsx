const PollIcon: React.FC<{ fill: string }> = ({ fill }) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.8335 6.66732H8.66683V8.33398H2.8335V6.66732ZM2.8335 3.33398H11.9752V5.00065H2.8335V3.33398ZM2.8335 10.0007H13.6668V11.6673H2.8335V10.0007ZM0.333496 0.833984H2.00016V14.1673H0.333496V0.833984Z"
        fill={fill}
      />
    </svg>
  );
};

export default PollIcon;
