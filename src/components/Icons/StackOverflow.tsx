const SVGComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 27.75' {...props}>
    <path d='M19.5 24.75V18h3v9.75H0V18h3v6.75h16.5Z' fill='#bcbbbb' />
    <path
      d='M16.125 0 14.1 1.5l7.425 9.975 2.025-1.5L16.125 0ZM19.5 13.8 9.975 5.85l1.575-1.875 9.525 7.95L19.5 13.8ZM6.825 11.4l11.25 5.25 1.05-2.25-11.25-5.25-1.05 2.25Zm10.5 8.092.51-2.213L5.76 14.766l-.51 2.484 12.075 2.243ZM17.25 22.5h-12v-2.25h12v2.25Z'
      fill='#f48024'
    />
  </svg>
);

export default SVGComponent;
