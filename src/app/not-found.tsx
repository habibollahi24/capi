import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mt-16">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button variant={'link'}>Return Home</Button>
      </Link>
    </div>
  );
}
