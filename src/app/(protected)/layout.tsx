import { Inter } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<div className={inter.className}>
				<Navbar />
				{children}
			</div>
		</html>
	);
}
