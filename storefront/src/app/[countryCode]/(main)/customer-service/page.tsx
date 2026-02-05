import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Service",
  description: "Customer Service - Padel Deputy",
}

export default function CustomerServicePage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl-semi mb-4">Customer Service</h1>
        <p className="text-base-regular mb-8">
          Find answers to frequently asked questions and get support.
        </p>
        <div className="flex flex-col gap-y-8">
          <div>
            <h2 className="text-xl-semi mb-4">Frequently Asked Questions</h2>
            <p className="text-base-regular">
              We're here to help! Check back soon for FAQs or contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
