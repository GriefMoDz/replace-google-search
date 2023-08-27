const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 32 32' {...props}>
    <path fill='#4285f4' d='M16 25.695 0 12.668 16 0Zm0 0' />
    <path fill='#356ac3' d='m16 25.695 16-13.027L16 0Zm0 0' />
    <path
      fill='#a0c3ff'
      d='M25.332 22.668A9.332 9.332 0 0 1 16 32a9.332 9.332 0 0 1-9.332-9.332c0-5.156 4.176-9.336 9.332-9.336 5.156 0 9.332 4.18 9.332 9.336Zm0 0'
    />
    <path fill='#76a7fa' d='M7.566 18.668A9.328 9.328 0 0 1 16 13.332a9.328 9.328 0 0 1 8.434 5.336Zm0 0' />
  </svg>
);

export default SVGComponent;
