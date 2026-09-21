import { Mail, MessageSquare } from "lucide-react";

function ContactSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 sm:px-10 lg:px-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

        {/* Contact information */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Contact
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            We’re here to help.
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-text/65">
            Whether you have a question about PlotSci, want to report
            an issue, or have an idea for a new feature, feel free to
            reach out.
          </p>

          {/* Contact details */}
          <div className="mt-8 space-y-5">

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Mail size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-text">
                  Email
                </p>

                <p className="mt-1 text-sm text-text/60">
                  hello@plotsci.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <MessageSquare size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-text">
                  Support
                </p>

                <p className="mt-1 text-sm text-text/60">
                  Questions about using PlotSci?
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact form */}
        <form className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-text"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:border-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:border-secondary"
              />
            </div>

          </div>

          <div className="mt-6">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-text"
            >
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="How can we help?"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:border-secondary"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-text"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={5}
              placeholder="Tell us a little more..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/40 focus:border-secondary"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}

export default ContactSection;