const SVGComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 32 32' {...props}>
    <path
      fill='#4285f4'
      d='M15.809 12.684v6h8.507c-.375 1.93-1.496 3.566-3.175 4.664l5.129 3.906c2.988-2.707 4.714-6.68 4.714-11.402a17.32 17.32 0 0 0-.289-3.168Zm0 0'
    />
    <path
      fill='#34a853'
      d='m6.95 18.45-1.157.87-4.098 3.125C4.297 27.504 9.63 31 15.81 31c4.265 0 7.843-1.379 10.46-3.746l-5.132-3.906c-1.407.93-3.203 1.496-5.328 1.496-4.114 0-7.602-2.723-8.856-6.383Zm0 0'
    />
    <path
      fill='#fbbc05'
      d='M1.695 8.555A15.048 15.048 0 0 0 0 15.5c0 2.508.617 4.863 1.695 6.945 0 .016 5.262-4 5.262-4a9.125 9.125 0 0 1-.504-2.945c0-1.027.188-2.016.504-2.945Zm0 0'
    />
    <path
      fill='#ea4335'
      d='M15.809 6.172c2.328 0 4.394.789 6.046 2.312l4.528-4.441C23.64 1.535 20.074 0 15.809 0 9.629 0 4.297 3.48 1.695 8.555l5.262 4c1.25-3.664 4.742-6.383 8.852-6.383Zm0 0'
    />
  </svg>
);

export default SVGComponent;