import { Resend } from "resend";

const resend = new Resend(process.env.RESENT_API_KEY);


export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboard@resend.dev",
		to: email,
		subject: "Verify Your email",
		html: `<p>Click <a href=${confirmLink}>Here</a> To confirm your email</p>`
	})
}


export const sendVerificationEmailForResetPassword = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-password/?token=${token}`;

	await resend.emails.send({
		from: "onboard@resend.dev",
		to: email,
		subject: "Reset Your Password",
		html: `<p>Click <a href=${confirmLink}>Here</a> for Reset Your Password</p>`
	})
}