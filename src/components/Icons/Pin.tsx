const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
    <path fill='currentColor' d='M19 3H5v2h2v7H5v2h6v8h2v-8h6v-2h-2V5h2V3Z' />
  </svg>
);

export default SVGComponent;
