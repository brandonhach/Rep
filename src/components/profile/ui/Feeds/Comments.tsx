import Image from 'next/image';
import React from 'react';
import { MdOutlineAddReaction } from 'react-icons/md';
import useSWR from 'swr';
import { TComment } from '@/types/types';
import { useSession } from 'next-auth/react';
import { addComment } from '@/actions/comments/add-comment';

/**
 * TODO:
 * 1. Suspend button click after comment action
 * 2. Pagination (10 rows)
 * 3. Type case the forms.
 * 4. Documentation
 */

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Comments = ({ params }: any) => {
	const session = useSession();
	const url = params.id ? `/api/profile/${params.id}/comment` : null;
	const { data, error, isLoading } = useSWR(url, fetcher, { refreshInterval: 1000 });
	if (error) return <div>Failed to load</div>;
	if (isLoading)
		return (
			<div className='size-full flex flex-col items-center justify-center'>
				<span className='loading loading-dots loading-lg'></span>
			</div>
		);
	return (
		<div className='w-full h-full overflow-auto'>
			<div className='w-full h-full grid grid-cols-1 auto-rows-max overflow-auto scrollbar-hide'>
				{data.length === 0 ? (
					<div className='w-full h-32 px-4 flex flex-row items-center justify-start gap-4'>
						<h1 className='text-6xl font-bold'>No comments.</h1>
						<div className='size-24 relative'>
							<Image src={'/gif/why.gif'} className='object-cover rounded-t-xl' alt='' fill></Image>
						</div>
					</div>
				) : (
					data.map((comment: TComment, index: number) => (
						<div
							key={index}
							className='col-span-1 m-2 rounded-xl relative overflow-hidden py-4 pb-6 hover:bg-base-200 duration-200 '>
							<div className='flex flex-row justify-start items-center w-full p-2'>
								<div className='avatar'>
									<div className='rounded-full w-14 ring ring-black ring-offset-black ring-offset-1'>
										<Image
											src={comment.image}
											height={48}
											width={48}
											alt='avatar'
											className='rounded-full'
										/>
									</div>
								</div>
								<div className='flex flex-col pl-4'>
									<h1 className='text-lg font-semibold'>{comment.name}</h1>
									<p className='text-sm text-gray-500'>{comment.createdAt}</p>
								</div>
							</div>
							<div className='w-full h-auto px-4 flex flex-row items-start justify-between'>
								<div className='w-2/3 h-auto'>
									<p className='whitespace-pre-line w-full'>{comment.content}</p>
								</div>
								<div className='flex flex-row gap-2 items-end justify-start h-full'>
									<div className='flex flex-row gap-1 size-full'>
										{comment.emotes.map((emote, emoteIndex) => (
											<span key={emoteIndex} className='text-xl'>
												{emote}
											</span>
										))}
										<MdOutlineAddReaction className='text-2xl cursor-pointer' />
									</div>
								</div>
							</div>
						</div>
					))
				)}
				<form action={addComment} className='px-2 flex flex-col gap-4 items-start size-full'>
					<label className='form-control size-full'>
						<input type='hidden' name='profileId' value={params.id} />
						<input type='hidden' name='userId' value={session.data?.user.id!} />
						<textarea
							className='textarea textarea-bordered w-full h-24 resize-none rounded-xl whitespace-pre-line'
							name='content'
							placeholder='Leave a comment'></textarea>
					</label>
					<button className='btn btn-outline rounded-xl h-4' type='submit'>
						Comment
					</button>
				</form>
			</div>
		</div>
	);
};

export default Comments;
