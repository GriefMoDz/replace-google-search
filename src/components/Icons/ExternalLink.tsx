const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d='M10 5V3H5.375A2.377 2.377 0 0 0 3 5.375v13.25A2.377 2.377 0 0 0 5.375 21h13.25A2.376 2.376 0 0 0 21 18.625V14h-2v5H5V5h5Zm11-2.001h-7v2h3.586l-8.293 8.293 1.414 1.414L19 6.413v3.586h2v-7Z'
    />
  </svg>
);

export default SVGComponent;
