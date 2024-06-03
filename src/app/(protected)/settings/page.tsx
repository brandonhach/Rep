import { getUserById } from '@/model/user';
import { redirect } from 'next/navigation';
import Settings from '@/components/settings/Settings';
import InnerNav from '@/components/settings/InnerNav';
const SettingsPage = () => {
	return (
		<div className='flex flex-row w-full h-full items-start justify-center'>
			<div>
				<InnerNav />
			</div>
		</div>
	);
};

export default SettingsPage;
