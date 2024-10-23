import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean); // Break the URL into segments

  return (
    <nav className="text-sm mb-4">
      <Link href="/">Home</Link> &gt; 
      {segments.map((segment, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          <Link href={`/${segments.slice(0, index + 1).join('/')}`}>
            {segment}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
