const SVGComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2a10 10 0 0 0-3.16 19.49c.503.093.681-.22.681-.484v-1.7c-2.793.607-3.382-1.345-3.382-1.345a2.676 2.676 0 0 0-1.112-1.467c-.902-.614.074-.614.074-.614a2.105 2.105 0 0 1 1.529 1.03 2.137 2.137 0 0 0 2.91.835c.038-.505.256-.98.613-1.338-2.222-.252-4.555-1.112-4.555-4.911a3.867 3.867 0 0 1 1.026-2.683 3.646 3.646 0 0 1 .098-2.646s.84-.27 2.75 1.025a9.46 9.46 0 0 1 5.01 0c1.908-1.295 2.743-1.025 2.743-1.025.368.83.412 1.767.123 2.628a3.87 3.87 0 0 1 1.025 2.682c0 3.843-2.339 4.684-4.567 4.911a2.363 2.363 0 0 1 .681 1.842v2.744c0 .325.178.577.688.479A10 10 0 0 0 12 2Z'
      fill='#fff'
    />
  </svg>
);

export default SVGComponent;
