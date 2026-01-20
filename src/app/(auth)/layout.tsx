import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex items-center justify-center w-full shadow-md h-full  bg-[radial-gradient(ellipse_at_top,#38bdf8,#075985)]'>
			{children}
		</div>
	)
}

export default AuthLayout
