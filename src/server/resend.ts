// Stub resend for static site: avoid importing `resend` or `env` so builds don't require
// secrets. The object provides a minimal `emails.send` method that resolves without
// performing network calls.
export const resend = {
	emails: {
		send: async (_payload: unknown) => {
			// no-op
			return { id: "stub" };
		},
	},
};
