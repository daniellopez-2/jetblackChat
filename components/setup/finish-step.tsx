import { FC } from "react"

interface FinishStepProps {
  displayName: string
}

export const FinishStep: FC<FinishStepProps> = ({ displayName }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2>Welcome to Apiskey</h2>
        <p>Apiskey is the open-source AI chat application that&apos;s built for everyone. Leveraging the power of platforms like GitHub, Vercel, and Supabase, we offer an intuitive API that allows for seamless interactions with Language Learning Models (LLM). Our platform is founded on the chatbot-ui by mckaywrigley, and we ensure a secure, user-friendly experience for all our users.</p>

        <h3>Data Storage and Security</h3>
        <p>At Apiskey, we prioritize your security:</p>
        <ul>
          <li>We store the files you upload, API interactions, and conversation logs securely on Supabase.</li>
          <li>Should you choose to discontinue using Apiskey, you can request account deletion by contacting <a href="mailto:support@apiskey.com">support@apiskey.com</a>.</li>
          <li>Accounts inactive for 14 days will maybe automatically deleted to conserve storage space.</li>
        </ul>

        <h3>Security Measures</h3>
        <p>We&apos;ve implemented robust security measures to protect your data:</p>
        <ul>
          <li>Logs and source code access requires authentication by Vercel team members.</li>
          <li>Git Fork Protection is enabled to ensure pull requests are authorized by team members.</li>
          <li>We adhere to GDPR compliance with our Data Processing Addendum (DPA).</li>
          <li>HIPAA compliance add-ons are available for eligible plans.</li>
        </ul>

        <h3>Disclaimer</h3>
        <p>The information provided by Apiskey on our website and through our services is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site or our services.</p>
        <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or our services or reliance on any information provided on the site. Your use of the site and our services and your reliance on any information on the site is solely at your own risk.</p>
        <p>This disclaimer includes any damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft, or destruction or unauthorized access to, alteration of, or use of record, whether for breach of contract, tortious behavior, negligence, or under any other cause of action.</p>
        <p>Users are encouraged to confirm the information contained herein with other sources and to review the information carefully with their professional advisor. Apiskey is not engaged in rendering legal, accounting, or other professional services. If professional assistance is required, the services of a competent professional should be sought.</p>
        <p>By using Apiskey, you agree to the terms of this disclaimer. If you do not agree with the terms of this disclaimer, please do not use our services.</p>
      </div>

      <div>
        <p>Click next to start chatting, {displayName.split(" ")[0]}!</p>
      </div>
    </div>
  )
}
