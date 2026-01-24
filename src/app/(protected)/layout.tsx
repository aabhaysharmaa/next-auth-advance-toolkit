import React, { ReactNode } from 'react'
import Navbar from './_components/navbar'

const protectedLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='h-full w-full flex flex-col gap-y-10 justify-center items-center bg-[radial-gradient(ellipse_at_top,#38bdf8,#075985)]'>
			<Navbar />
			{children}
		</div>
	)
}

export default protectedLayout
