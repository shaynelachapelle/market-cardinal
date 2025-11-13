import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-bg-dark py-10 px-6">
      <div className="max-w-4xl mx-auto bg-bg shadow-md rounded-xl p-8 cursor-default">
        <h1 className="text-3xl font-bold mb-6 text-text">Terms of Service</h1>
        <p className="text-sm text-text-muted mb-6">Last Updated: 09/29/2025</p>

        <div className="space-y-8 text-text">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our website, services, or applications
              (collectively, the “Services”), you agree to be bound by these
              Terms of Service (“Terms”). If you do not agree, you may not use
              the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
            <p>
              You must be at least 13 years old (or the minimum legal age in
              your jurisdiction) to use the Services. By using the Services, you
              represent and warrant that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p>
              To access certain features, you may be required to create an
              account. You agree to provide accurate and complete information
              and to keep this information up to date. You are responsible for
              safeguarding your account credentials and all activities that
              occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Acceptable Use</h2>
            <p>
              You agree not to misuse the Services or assist others in doing so.
              Prohibited activities include, but are not limited to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Using the Services for unlawful purposes.</li>
              <li>Attempting to gain unauthorized access to our systems.</li>
              <li>
                Disrupting or interfering with the security or functionality of
                the Services.
              </li>
              <li>
                Uploading or transmitting harmful code, spam, or abusive
                content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and other intellectual property available
              through the Services are the property of{" "}
              <span className="font-semibold">Market Cardinal</span> or its
              licensors. You may not copy, modify, distribute, or create
              derivative works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the
              Services at our sole discretion, without notice, if you violate
              these Terms or engage in conduct harmful to the Services or other
              users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Disclaimer of Warranties
            </h2>
            <p>
              The Services are provided “as is” and “as available,” without any
              warranties of any kind, either express or implied. We do not
              guarantee that the Services will be uninterrupted, error-free, or
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law,{" "}
              <span className="font-semibold">Market Cardinal</span> shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits, data, use, or goodwill
              resulting from your use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of Quebec, Canada, without regard to conflict of law
              provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time to reflect changes in
              our practices or for other operational, legal, or regulatory
              reasons. The updated Terms will be posted on this page with a
              revised “Last Updated” date. Continued use of the Services
              indicates your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              11. Use of Google Account Information
            </h2>
            <p>
              By using Google OAuth to access{" "}
              <span className="font-semibold">Market Cardinal</span>, you allow
              us to retrieve certain information from your Google account, such
              as your name, email address, and profile picture. We use this
              information solely to provide and personalize our Services.
            </p>
            <p>
              We do <span className="font-semibold">not</span> sell or share
              your Google account information to third parties except as
              required to provide our Services or as mandated by law. All Google
              account data is stored securely and handled in accordance with
              this Terms of Service and our Privacy Policy.
            </p>
            <p>
              You may revoke our access at any time via your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                className="text-primary hover:opacity-80 duration-200"
              >
                Google Account permissions page
              </a>
              . Revoking access will prevent us from retrieving further
              information from your Google account, though it will not affect
              data already collected.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-2">
              <span className="font-semibold">Shayne Lachapelle</span> <br />
              <a
                href="mailto:slachapelle02@gmail.com"
                className="font-semibold hover:opacity-80 duration-200"
              >
                slachapelle02@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
      <Link to="/">
        <XMarkIcon className="absolute right-8 lg:right-6 top-12 lg:top-6 text-text size-8 cursor-pointer" />
      </Link>
    </div>
  );
}
