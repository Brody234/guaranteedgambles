'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';

const PrivacyPolicy = () => {
    const router = useRouter()
  return (
    <div className='main-container'>
        <button className='primary-button' onClick={()=>router.back()}><p>Back</p></button>
        <main>
        <h1>Privacy Policy for Guaranteed Gambles</h1>
        <p>Effective Date: [Date]</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Guaranteed Gambles, operated by Gamer Coach LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <a href="https://guaranteedgambles.com">guaranteedgambles.com</a> (the &quot;Site&quot;). Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in various ways. The information we may collect on the Site includes:</p>

          <h3>2.1 Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, email address, and phone number, that you voluntarily give to us when you register with the Site, place an order, or when you choose to participate in various activities related to the Site.
          </p>

          <h3>2.2 Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
          </p>
        </section>

        <section>
          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Notify you of updates to the Site.</li>
            <li>Offer new products, services, and/or recommendations to you.</li>
            <li>Perform other business activities as needed.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          </ul>
        </section>

        <section>
          <h2>4. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>

          <h3>4.1 By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>

          <h3>4.2 Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </p>
        </section>

        <section>
          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        <section>
          <h2>6. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us at <a href="mailto:brodymassad@gmail.com">brodymassad@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <address>
            Gamer Coach LLC<br />
            Email: <a href="mailto:info@guaranteedgambles.com">info@guaranteedgambles.com</a><br />
          </address>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
