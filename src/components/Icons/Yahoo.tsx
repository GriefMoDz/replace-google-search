const SVGComponent = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 32 32' {...props}>
    <path
      fill='#8f25a9'
      d='M31.063 6.676 27.422 7.89c-.555.218-2.043 1.93-4.582 5.242-2.703 3.418-4.137 5.625-4.356 6.73l-.168 3.035-.054 1.93.332 4.633 4.8.113L22.73 32H8.387l.273-2.152 2.266-.11c1.156-.11 1.875-.386 2.094-.718.168-.22.222-1.711.222-4.301v-1.602l-.055-3.199c-.167-.719-1.378-3.422-3.808-8.055-2.48-4.8-4.082-7.613-4.856-8.61L0 2.317V0h15.227l-.165 1.93-4.746.718c1.493 3.422 3.754 8.22 6.786 14.235 3.972-4.746 6.07-7.836 6.125-9.16l-4.028-.993-.219-2.316H32Zm0 0'
    />
  </svg>
);

export default SVGComponent;
