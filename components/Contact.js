import React, { useRef, useState } from "react";
import userData from "@constants/data";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import Section from "@components/grid/Section";

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID;

const details = [
	{ label: "Email", value: userData.email, href: `mailto:${userData.email}` },
	{ label: "Phone", value: userData.phone, href: `tel:${userData.phone.replace(/\s+/g, "")}` },
	{ label: "Location", value: userData.address },
	{ label: "LinkedIn", value: "Lasse Buus Nielsen", href: userData.socialLinks.linkedin, external: true },
	{ label: "GitHub", value: `@${userData.githubUsername}`, href: `https://github.com/${userData.githubUsername}`, external: true },
];

const fieldClass =
	"w-full px-3 mt-2 text-[15px] rounded-md border border-line bg-page text-ink placeholder-gray-400 transition focus:outline-none focus:border-ink";

export default function Contact({ index, total }) {
	const form = useRef();
	const [sending, setSending] = useState(false);

	const sendEmail = (e) => {
		e.preventDefault();
		setSending(true);
		const target = e.target;

		emailjs
			.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
			.then(
				() => {
					Swal.fire({
						icon: "success",
						title: "Message sent successfully",
						text: "I will get in touch with you soon!",
					});
					target.reset();
				},
				(error) => {
					Swal.fire({
						icon: "error",
						title: "Ooops, something went wrong",
						text: error.text,
					});
				}
			)
			.finally(() => setSending(false));
	};

	return (
		<Section index={index} total={total} label="Get in touch">
			<div className="grid cell-grid md:grid-cols-12">
				{/* Details */}
				<div className="md:col-span-5">
					<dl>
						{details.map((d) => (
							<div key={d.label} className="px-4 py-5 border-b sm:px-6 border-line">
								<dt className="label">{d.label}</dt>
								<dd className="mt-1 text-[15px] font-medium text-ink">
									{d.href ? (
										<a
											href={d.href}
											target={d.external ? "_blank" : undefined}
											rel={d.external ? "noopener noreferrer" : undefined}
											className="hover:text-brand-ink"
										>
											{d.value}
											{d.external ? <span className="ml-1 text-faint">↗</span> : null}
										</a>
									) : (
										d.value
									)}
								</dd>
							</div>
						))}
					</dl>
				</div>

				{/* Form */}
				<div className="px-4 py-8 sm:px-6 md:col-span-7 md:px-10 md:py-10">
					<h2 className="text-2xl font-bold tracking-tight text-ink">Send a message</h2>
					<p className="mt-2 text-sm text-muted">Fill in the details and I&apos;ll get back to you as soon as I can.</p>

					<form ref={form} onSubmit={sendEmail} className="grid gap-6 mt-8 sm:grid-cols-2">
						<label className="block">
							<span className="label text-ink">Your name</span>
							<input className={`${fieldClass} h-11`} type="text" name="user_name" autoComplete="name" />
						</label>
						<label className="block">
							<span className="label text-ink">
								Email <span className="text-brand-ink">*</span>
							</span>
							<input
								className={`${fieldClass} h-11`}
								type="email"
								name="user_email"
								autoComplete="email"
								required
							/>
						</label>
						<label className="block sm:col-span-2">
							<span className="label text-ink">
								Message <span className="text-brand-ink">*</span>
							</span>
							<textarea className={`${fieldClass} h-40 py-2.5 resize-y`} name="message" required />
						</label>
						<div className="flex items-center justify-between gap-4 sm:col-span-2">
							<span className="label">* Required</span>
							<button type="submit" className="btn btn-solid" disabled={sending}>
								{sending ? "Sending…" : "Send message"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</Section>
	);
}
