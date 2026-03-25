import { Nunito_Sans } from 'next/font/google';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <div className={nunitoSans.className}>{children}</div>;
}
