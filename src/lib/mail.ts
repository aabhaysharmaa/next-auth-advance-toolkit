import { Resend } from "resend";

const resend = new Resend(process.env.RESENT_API_KEY);

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL;

export const send2FaCodeEmail = async (email: string, code: string) => {
	await resend.emails.send({
		from: "onboard@resend.dev",
		to: email,
		subject: "2FA Code",
		html: `Here is your 2FA Code : ${code}`
	})
}

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboard@resend.dev",
		to: email,
		subject: "Verify Your email",
		html: `<p>Click <a href=${confirmLink}>Here</a> To confirm your email</p>`
	})
}


export const sendVerificationEmailForResetPassword = async (email: string, token: string) => {
	const confirmLink = `${NEXT_PUBLIC_URL}/auth/new-password/?token=${token}`;

	await resend.emails.send({
		from: "onboard@resend.dev",
		to: email,
		subject: "Reset Your Password",
		html: `<p>Click <a href=${confirmLink}>Here</a> for Reset Your Password</p>`
	})
}