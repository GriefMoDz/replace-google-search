const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 22 22' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M21.582 7.2a2.513 2.513 0 0 0-1.768-1.78C18.254 5 12 5 12 5s-6.254 0-7.814.42A2.513 2.513 0 0 0 2.418 7.2C2 8.77 2 12.046 2 12.046s0 3.275.418 4.845c.23.866.908 1.548 1.768 1.78 1.56.42 7.814.42 7.814.42s6.254 0 7.814-.42a2.513 2.513 0 0 0 1.768-1.78C22 15.32 22 12.046 22 12.046s0-3.276-.418-4.846Z'
      fill='#d9252a'
    />
    <path fillRule='evenodd' clipRule='evenodd' d='m9.954 15.02 5.228-2.974-5.228-2.974v5.947Z' fill='#fffffe' />
  </svg>
);

export default SVGComponent;
