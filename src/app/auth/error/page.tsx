import { CardWrapper } from '@/components/auth/card-wrapper'

const Error = () => {
	return (
          <CardWrapper  backButtonHref='/sign-in' backButtonLabel='Back to SignIn' headerLabel=''>
            <p className='text-center font-semibold text-destructive'>Oops! Something went Wrong</p>
		  </CardWrapper>
	)
}

export default Error
