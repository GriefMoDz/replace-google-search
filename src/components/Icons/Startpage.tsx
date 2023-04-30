const SVGComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 32 32' {...props}>
    <g strokeWidth={0.593} fill='none'>
      <path stroke='#b2b9ff' vectorEffect='non-scaling-stroke' d='M23.828 12.296 19.431 12M8 12.32l-4.421.569' />
      <path stroke='#9092a4' vectorEffect='non-scaling-stroke' d='m8.468 14.815-4.593.444m19.953-1.333-4.569-.024' />
    </g>
    <path
      fill='#6573ff'
      d='M23.828 12.296 19.431 12q-1.019-4.113-4.533-4.788-2.465-.474-4.397.865Q8.457 9.487 8 12.32l-4.421.569q.024-3.307 1.707-5.837Q6.904 4.616 9.748 3.36q4.273-1.884 8.735.379 4.942 2.513 5.345 8.557Z'
    />
    <path fill='#fefeff' d='m19.431 12 4.397.296v1.63l-4.569-.024.172-1.902ZM8 12.32l.468 2.495-4.593.444-.296-2.37L8 12.32Z' />
    <path
      fill='#212649'
      d='m19.259 13.902 4.569.024q-.397 2.299-1.902 4.782a.687.687 40.7 0 0 .059.788q2.649 3.206 5.179 6.228 1.173 1.399 1.173 2.566-.006 2.234-2.969 1.796a.853.729-12.3 0 1-.498-.267l-6.298-7.532a.83.776 58.2 0 0-.919-.249Q12.687 24.119 8 21.037q-3.01-1.973-4.124-5.778l4.593-.444q2.797 5.185 8.237 2.631 1.772-.836 2.554-3.544Z'
    />
  </svg>
);

export default SVGComponent;
