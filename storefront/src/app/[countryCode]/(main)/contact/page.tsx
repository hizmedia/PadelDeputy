import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Padel Deputy",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl-semi mb-4">Contact Us</h1>
        <p className="text-base-regular mb-8">
          Get in touch with us for any questions or concerns.
        </p>
        <div className="flex flex-col gap-y-4">
          <div>
            <h3 className="text-large-semi mb-2">Email</h3>
            <p className="text-base-regular">support@padeldeputy.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
