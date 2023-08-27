const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
    <path fill='#f04747' d='m21.47 3.39-1.33-1.34L2.53 19.66 3.86 21l4.41-4.4 1.3-1.31 1.75-1.74 3.83-3.83Z' />
    <path fill='currentColor' d='m17 11.14-.45.45L14.14 14H19v-2h-2v-.86zM16.91 3H5v2h2v7H5v2h.91l11-11zm-4.19 12.42L11 17.14V22h2v-6.86l-.28.28z' />
  </svg>
);

export default SVGComponent;
