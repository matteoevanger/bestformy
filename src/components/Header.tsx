import Link from 'next/link';
import { categories } from '@/lib/data';

export default function Header() {
  return (
    <header className="bg-primary-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Best<span className="text-accent-400">ForMy</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best/${cat.slug}/for/landscaping`}
                className="hover:text-accent-400 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
