import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-bg-dark py-10 px-6">
      <div className="max-w-4xl mx-auto bg-bg shadow-md rounded-xl p-8 text-text cursor-default">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-sm text-text-muted mb-6">Last Updated: 09/29/2025</p>

        <p className="mb-4">
          Your privacy is important to us. It is{" "}
          <span className="font-semibold">Market Cardinal’s</span> policy to
          respect your privacy and comply with any applicable law and regulation
          regarding any personal information we may collect about you, including
          across our website,{" "}
          <Link to="/" className="text-primary hover:opacity-80 duration-200">
            https://www.marketcardinal.com/
          </Link>
          , and other sites we own and operate.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Information We Collect
        </h2>
        <p className="mb-4">
          Information we collect includes both information you knowingly and
          actively provide us when using or participating in any of our services
          and promotions, and any information automatically sent by your devices
          in the course of accessing our products and services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Log Data</h2>
        <p className="mb-4">
          When you visit our website, our servers may automatically log the
          standard data provided by your web browser. It may include your
          device’s Internet Protocol (IP) address, your browser type and
          version, the pages you visit, the time and date of your visit, the
          time spent on each page, other details about your visit, and technical
          details that occur in conjunction with any errors you may encounter.
        </p>
        <p className="mb-4">
          Please be aware that while this information may not be personally
          identifying by itself, it may be possible to combine it with other
          data to personally identify individual persons.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Personal Information
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Social media profiles</li>
          <li>Date of birth</li>
          <li>Phone/mobile number</li>
          <li>Home/mailing address</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Legitimate Reasons for Processing Your Personal Information
        </h2>
        <p className="mb-4">
          We only collect and use your personal information when we have a
          legitimate reason for doing so. In which instance, we only collect
          personal information that is reasonably necessary to provide our
          services to you.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Collection and Use of Information
        </h2>
        <p className="mb-4">
          We may collect personal information from you when you do any of the
          following on our website:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Sign up to receive updates from us via email or social media
            channels
          </li>
          <li>Use a mobile device or web browser to access our content</li>
          <li>Contact us via email, social media, or similar technologies</li>
          <li>When you mention us on social media</li>
        </ul>
        <p className="mb-4">
          We may collect, hold, use, and disclose information for the following
          purposes, and personal information will not be further processed in a
          manner that is incompatible with these purposes:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            to enable you to customize or personalize your experience of our
            website
          </li>
          <li>to contact and communicate with you</li>
          <li>
            for analytics, market research, and business development, including
            to operate and improve our website, associated applications, and
            social media platforms
          </li>
          <li>
            for advertising and marketing, including to send you promotional
            information about our products and services and about third parties
            we think may be of interest to you
          </li>
          <li>
            to enable you to access and use our website, applications, and
            platforms
          </li>
          <li>for internal record keeping and administrative purposes</li>
          <li>to comply with our legal obligations and resolve disputes</li>
          <li>
            for security and fraud prevention, ensuring our sites and apps are
            safe, secure, and used in line with our terms of use
          </li>
        </ul>
        <p className="mb-4">
          Please be aware that we may combine information we collect about you
          with general information or research data we receive from other
          trusted sources.
        </p>

        {/* --- Google OAuth Section --- */}
        <h2 className="text-xl font-semibold mt-8 mb-4">
          Use of Google Account Information
        </h2>
        <p className="mb-4">
          Our application uses Google OAuth to access certain information from
          your Google account. This may include your basic profile information
          (such as name, email address, and profile picture) and any other data
          specifically requested when you authorize access. We use this
          information solely to:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Create and manage your account within{" "}
            <span className="font-semibold">Market Cardinal</span>
          </li>
          <li>Personalize your experience and display relevant content</li>
          <li>Provide features that require Google account integration</li>
        </ul>
        <p className="mb-4">
          We do <span className="font-semibold">not</span> sell, share, or
          disclose your Google account information to third parties except as
          required to provide our services or as mandated by law. All Google
          account data is stored securely and handled in accordance with this
          privacy policy.
        </p>
        <p className="mb-4">
          You can revoke our access to your Google account at any time by
          visiting your{" "}
          <a
            href="https://myaccount.google.com/permissions"
            className="text-primary hover:opacity-80 duration-200"
          >
            Google Account permissions page
          </a>
          . Revoking access will prevent us from retrieving further information
          from your Google account, though it will not affect data already
          collected.
        </p>
        {/* --- End Google OAuth Section --- */}

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Security of Your Personal Information
        </h2>
        <p className="mb-4">
          When we collect and process personal information, and while we retain
          this information, we will protect it within commercially acceptable
          means to prevent loss and theft, as well as unauthorized access,
          disclosure, copying, use, or modification.
        </p>
        <p className="mb-4">
          Although we will do our best to protect the personal information you
          provide to us, no method of electronic transmission or storage is 100%
          secure, and we cannot guarantee absolute data security. We will comply
          with laws applicable to us in respect of any data breach.
        </p>
        <p className="mb-4">
          You are responsible for selecting any password and its overall
          security strength, ensuring the security of your own information
          within the bounds of our services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          How Long We Keep Your Personal Information
        </h2>
        <p className="mb-4">
          We keep your personal information only for as long as we need to. If
          your personal information is no longer required, we will delete it or
          make it anonymous. However, we may retain it for legal, accounting,
          reporting, or archival purposes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Disclosure of Personal Information to Third Parties
        </h2>
        <p className="mb-4">We may disclose personal information to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>a parent, subsidiary, or affiliate of our company</li>
          <li>
            third-party service providers (IT, data storage, hosting, analytics,
            advertisers, etc.)
          </li>
          <li>our employees, contractors, and/or related entities</li>
          <li>our existing or potential agents or business partners</li>
          <li>
            courts, regulators, and law enforcement as required by law or in
            connection with legal proceedings
          </li>
          <li>
            third parties, including agents or subcontractors, who assist us in
            providing services or direct marketing
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          International Transfers of Personal Information
        </h2>
        <p className="mb-4">
          The personal information we collect may be stored or processed in
          countries other than where you originally provided it. We will ensure
          that transfers comply with applicable law and that your information is
          protected according to this policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Your Rights and Controlling Your Personal Information
        </h2>
        <p className="mb-4">
          You may withhold personal information, understanding your experience
          of the site may be affected. You may request details of information we
          hold about you. You may unsubscribe from marketing at any time. If you
          believe information we hold is inaccurate, incomplete, or misleading,
          please contact us to update it.
        </p>
        <p className="mb-4">
          If you believe we have breached a data protection law, please contact
          us with details so we can investigate and respond. You may also
          contact a regulatory authority.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Use of Cookies</h2>
        <p className="mb-4">
          We use cookies to collect information about you and your activity
          across our site. Cookies help us understand how you use our site so we
          can serve content based on your preferences.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Limits of Our Policy
        </h2>
        <p className="mb-4">
          Our website may link to external sites that are not operated by us. We
          have no control over their content and policies and cannot accept
          responsibility or liability for their practices.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this policy to reflect changes in business practices,
          legal requirements, or other reasons. If required by law, we will
          obtain your consent for new uses of your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-2">For any questions or concerns, contact us at:</p>
        <p>
          <span className="font-semibold">Shayne Lachapelle</span> <br />
          <a
            href="mailto:slachapelle02@gmail.com"
            className="font-semibold hover:opacity-80 duration-200"
          >
            slachapelle02@gmail.com
          </a>
        </p>
      </div>
      <Link to="/">
        <XMarkIcon className="absolute right-6 top-6 text-text size-8 cursor-pointer" />
      </Link>
    </div>
  );
}
