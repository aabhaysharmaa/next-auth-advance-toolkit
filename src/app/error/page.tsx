import { CardWrapper } from '@/components/auth/card-wrapper'

const Error = () => {
	return (
		<div className='flex items-center justify-center h-full   bg-[radial-gradient(ellipse_at_top,#38bdf8,#075985)]'>
          <CardWrapper  backButtonHref='/sign-in' backButtonLabel='Back to SignIn' headerLabel=''>
            <p className='text-center font-semibold text-destructive'>Oops! Something went Wrong</p>
		  </CardWrapper>
		</div>
	)
}

export default Error
