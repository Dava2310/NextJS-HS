import Image from 'next/image';
import { RegisterForm } from './_components';
import bgImage from '@/public/Background.png';

export default function RegisterPage() {
  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={bgImage} alt="Background" fill className="object-cover" priority />
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <RegisterForm />
      </div>
    </div>
  );
}
