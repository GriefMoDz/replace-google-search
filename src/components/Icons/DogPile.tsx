const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 32 32' {...props}>
    <circle fill='#84d3f0' cx={12.78} cy={2.95} r={2.81} />
    <circle fill='#84d3f0' cx={19.78} cy={3.81} r={2.79} />
    <circle fill='#84d3f0' cx={6} cy={5.76} r={2.78} />
    <circle fill='#84d3f0' cx={25.94} cy={7.73} r={2.78} />
    <path
      fill='#84d3f0'
      d='M26.312 21.342a10.22 10.22 0 0 1-10.148 10.29l-1.96.014A10.22 10.22 0 0 1 3.913 21.498l-.025-3.58a10.22 10.22 0 0 1 10.148-10.29l1.96-.014a10.22 10.22 0 0 1 10.291 10.148l.025 3.58ZM14.79 27.496a7.88 5.73 91.9 0 0 5.988-7.686 7.88 5.73 91.9 0 0-5.466-8.066 7.88 5.73 91.9 0 0-5.988 7.686 7.88 5.73 91.9 0 0 5.466 8.066Z'
    />
  </svg>
);

export default SVGComponent;
