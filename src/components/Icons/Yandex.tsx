const SVGComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 32 32' {...props}>
    <path
      fill='#e52620'
      d='M24.535 0c.262.203.13.441.047.668l-3.32 9.047-4.024 11.058c-.086.23-.129.473-.133.715v9.907c0 .597-.011.597-.605.597-.621 0-1.238-.023-1.86.012-.39.012-.53-.117-.523-.512l.012-3.664v-6.363c0-.25-.035-.524-.129-.762L7.488 3.668c-.047-.133-.12-.238-.18-.36v-.25c.192-.058.383-.148.575-.148l2.058-.012s.68 0 .907.641l4.847 13.656.203.489.168-.547.95-3.489L21.266.492c.062-.164.203-.308.312-.465Zm0 0'
    />
  </svg>
);

export default SVGComponent;
