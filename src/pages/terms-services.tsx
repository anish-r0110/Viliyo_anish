import { AppPage } from "@/layouts/types";
import { useState } from "react";
import BackNavigation from "../components/shared/BackNavigation";

interface TermsServiceProps {
  title?: string;
}

const TermsServicePage: AppPage = ({ title }: TermsServiceProps) => {
  const [checkbox, setCheckbox] = useState(true);

  const HandleClickCheckBox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <>
      <div className="h-screen space-y-4">
        <div className="my-4  overflow-auto flex items-center">
          <BackNavigation title={title || "Terms of Service"}></BackNavigation>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-[440px] mobile:h-[300px] bg-white py-4 px-8 rounded-xl">
          {/* Left column */}
          <div className="h-screen col-span-1 justify-items-center mt-4">
            <p className="text-justify text-[12px]">
              <span className="font-extrabold">1. Introduction</span>
              <br></br>Welcome to www.viliyo.com (“Website”) and Viliyo
              Application (“Application”), a Live Virtual Training (and
              Tutoring/Coaching) Delivery Platform that brings together learner
              engagement, content delivery and trainer/tutor administration
              tools in one place and is focused on enabling trainers to conduct
              online virtual programs through video streaming along with usage
              of other digital learning solutions and related services. Services
              are accessible through our app and website through which the
              company makes the Services available (collectively, the "Site")
              and as applications for mobile, tablet and other smart devices and
              application program interfaces (collectively, the "Applications").
              The Digital Training/Tutoring Platform solutions (Website and
              Application are hereinafter collectively referred to as
              “Platform”) is owned and managed by VTT Technologies PTE. Limited
              and its affiliates (“Company”). Your visit and use of the Platform
              for learner engagement, content delivery, administration tools,
              digital learning solutions through video streaming, collaboration,
              or otherwise, and related services, support, and professional
              services offered on the Platform (collectively or individually
              referred to as "Service") operated by the Company are governed by
              these Terms of Service ("Terms"/"Terms of Service"), the Privacy
              Policy, and other terms and conditions of the Platform. We,"
              "our," and "us" refer to the Company under these Terms of Service,
              while "you," "your," and/or "Users" refer to Platform users. Our
              platform is for users (individuals or businesses) who intend to
              avail the Services. To browse or use the Website and/or
              Application in any way, you must be at least 18 years old. If you
              are under the age of 18, you should review these Terms of Service
              with your parent or legal guardian to ensure that you and your
              parent or legal guardian understand and agree to them, in
              addition, if necessary, you shall perform or undertake such
              activities that will entitle you to enter into a legally binding
              agreement with the Company. You represent and warrant to the
              Company that you are 18 years of age or older, that you have the
              right, authority, and capacity to use the Website and/or
              Application, and that you have agreed to and will abide by this
              Terms of Services by visiting this Website and/or Application or
              accepting this Terms of Services. By accessing or using the Site,
              Application, or Services, or by downloading or posting any content
              from or on the Site, via the Applications, you would be indicating
              that you have read, that you understand, and agree to be bound by
              these terms and receive our Services ("Terms of Services" or
              "Terms"). There is no need for a written, digital, or electronic
              signature on these terms of service. Please read these Terms of
              Services carefully. Whether or not you have registered with the
              Site and Application, you acknowledge and agree that by accessing
              or using the Site, Application, or Services, or by downloading or
              posting any content from or on the Site or via the Application,
              you are indicating that you have read, that you understand, and
              that you agree to be bound by these Terms and receive our
              Services. If you do not agree to these terms then you do not have
              the right to use or access the Site, Application, Services, or
              Collective Content. You represent and warrant that you are
              qualified to bind any company or other legal entity to these Terms
              if you accept or agree to these Terms on their behalf, in such
              event, "you" and "your" will refer and apply to that company or
              other legal entity. You may not use the Service if you disagree
              with (or are unable to comply with) the Agreements, but if you do
              so, please email us at reach@viliyo.com so we can work to find a
              solution. All users who intend to access or use the Service must
              comply with these Terms.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">2. Accounts</span>
              <br></br>The use of Services on the Platform is available only to
              users who can form legally binding contract. By opening an account
              with us, you certify that you are at least 18 years old and that
              the data you give us is true, full, and up-to-date at all times.
              Your account on the Platform could be immediately terminated for
              providing inaccurate, inadequate, or out-of-date information. If a
              person under the age of 18 needs to use the Service, their parents
              or legal guardians who have accepted these Terms of Services must
              create their account. When someone under the age of 18 uses the
              Service, it is presumed that their parents or legal guardians have
              given their permission and have made the use possible. The Company
              will not be responsible for any consequences resulting from the
              misuse of any type that may occur by virtue of any person
              registering for the Service. You are in charge of protecting the
              privacy of your account and/or password, which may include, but is
              not limited to, limiting who has access to your computer and/or
              account. Whether your password is for our Service or a third-party
              service, you consent to take responsibility for any and all
              activities or actions carried out under your account and/or
              password. If you become aware of any security breach or
              unauthorised use of your account, you must contact us right away.
              A name or trademark that is protected by any rights of a person or
              entity other than you, or that is not lawfully accessible for use,
              may not be used as a username without appropriate authorization.
              Any name that is vulgar, obscene, or derogatory is not permitted
              to be used as a username. We have the right, at our sole
              discretion, to deny service, delete or edit content, or cancel
              orders. The Platform can be used to facilitate the Learners to
              enrol for Courses. Such Courses may be included in Listings on the
              Platform by the Company or its Customers (for their customers).
              The Company makes available an internet-driven platform which
              provides a framework and some digital assets for the Learners
              curated and customized as specified by specific customers. Unless
              explicitly specified otherwise in the Platform, The Company’s
              responsibilities are limited to facilitating the availability of
              the Courses/assets through the Platform.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">3. Services</span>
              <br></br>The Company will provide the Services, and standard
              updates to the Services that are made generally available by the
              Company during the term. The Company may, in its sole discretion,
              discontinue the Services or modify the features of the Services
              from time to time without prior notice. Subject to all the terms
              and conditions of the Agreement, the Company grants non-exclusive,
              non-transferable, non-sublicensable right and license to access
              and use the Platform and the Service(s) solely for your business
              purposes but only in accordance with the Agreement and these Terms
              of Services (including without limitation any applicable
              service-specific terms), the documentation, and all applicable
              scope of Use descriptions.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">4. System Requirements</span>
              <br></br>One or more suitable devices, Internet access (which may
              incur fees), specific software (which may incur fees), and
              occasionally the acquisition of updates or upgrades are all
              necessary for using the Services. Because using the Services
              requires hardware, software, and Internet access, the
              functionality of these elements may have an impact on your ability
              to access and use the Services. It is advised to use a fast
              internet connection. You acknowledge and accept that such system
              requirements, which may occasionally change, are your
              responsibility.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">5. Fees and Charges</span>
              <br></br>Membership on the Platform: The Company has the right to
              impose fees and make periodic policy changes. The Company is free
              to provide new services and change some or all of the ones already
              available on the Platform at any time. In such a situation, the
              Company reserves the unrestricted and discretionary right to
              change, rearrange, add or delete service offerings, the choices
              within those offerings, prices, and any other service that may be
              offered, at any time. In addition, the Company reserves the right
              to introduce fees for the new services and/or for some or all of
              the existing services on the Platform, as may be necessary. The
              changes to the charge and related policies will automatically take
              effect right away when implemented on the Platform. When making
              payments to the Company, you will be solely responsible for
              ensuring that all applicable laws, including those in India or the
              local laws are followed. The Company will endeavour to notify you
              of any such change and its effective date. Pricing/typographical
              error: If the company discovers any typographical errors in the
              pricing or service information, it has the right to make the
              necessary corrections, revoke the order(s), and refund any
              payments received from the customer within 90 (ninety) business
              days of the corrective action being taken.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">6. Communications</span>
              <br></br>By using our Service, you consent to receive newsletters,
              marketing or promotional materials, and other information we may
              send via any and all electronic, digital, and other
              telecommunication modes. You also agree and understand that when
              you use the Services or send emails or other data, information, or
              communication to the Platform, you are communicating with the
              Company through electronic and other telecommunication modes. You
              can choose not to receive any or all of these emails from us,
              however, by clicking the unsubscribe link or sending an email to
              reach@viliyo.com. The Company may contact the User via WhatsApp,
              SMS, email, and call based on any form of access to the
              Application (including free downloads/trials), Services, or
              Website, or registrations through any source whatsoever, to
              provide information about its products, notifications of various
              important updates, and/or to request permission for product
              demonstrations. In case the User's mobile number is listed in the
              Do Not Call (DNC) database, the User fully authorises the Company
              to contact him/her through phone, WhatsApp, SMS, and email and
              holds the Company harmless from any responsibilities, including
              financial penalties, damages, and expenses. By registering, you
              consent to letting our staff, affiliates, and partners use your
              contact information to get in touch with you about educational
              opportunities and promotions through telephone, WhatsApp, SMS,
              email, etc.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                7. Contests, Marketing and Promotions
              </span>
              <br></br>These Terms of Service may not apply to any competitions,
              sweepstakes, or other promotions (collectively, "Promotions") made
              available through the Service. Please read our Privacy Policy and
              any applicable restrictions before taking part in any Promotions.
              The terms of a Promotion will take precedence over these Terms of
              Service if there is a dispute. The Company may conduct promotional
              competitions from time to time and you agree to allow the company
              to use the submissions by you including but not limited to videos,
              written content, craft work etc. for promotional purposes. The
              company will reserve all rights regarding your use of such
              contributions. You also agree that after your submissions are made
              to the company, you will no longer have any ownership rights in
              them and that the company may use all of the information you
              contribute, including images, videos, and other types of
              information, for promotional campaigns as it sees fit.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">8. Content</span>
              <br></br>With our service, you can make certain data, text, and
              graphics, audio, video, or other materials (collectively referred
              to as “Content”) available by posting, linking, storing, sharing,
              or in other ways. You are accountable for all Content that you
              upload to or share using the Service, including its legality,
              reliability, and appropriateness. You represent and warrant that,
              by posting Content on or through the Platform that : (i) the
              Content is yours (you own it), (ii) you have the right to use it,
              and (iii) you have the right to grant us the rights and licence
              set forth in these Terms. You also represent and warrant that the
              posting of your Content on or through the Platform does not
              violate any third party's right to publicity, privacy, or other
              legal privileges, as well as any right of intellectual property,
              copyright, or other You shall not post, host, display, upload,
              modify, publish, transmit, store, update or share any Content or
              information on the Platform that: (a) belongs to someone else and
              you have no legal authority to possess it; or (b) that is
              extremely harmful, harassing, blasphemous, defamatory, libellous,
              obscene, pornographic, paedophilic, libellous, invasive of
              another's privacy, including bodily privacy, hateful, insulting,
              or harassing based on one's gender, religion, race, or ethnicity,
              disparaging, relating to or encouraging money laundering or
              gambling, or otherwise unlawful in any way, unlawfully
              threatening, unlawfully (c) is patently offensive to the online
              community, such as sexually explicit content, religiously
              objectionable content, or anything that encourages obscenity,
              paedophilia, racism, bigotry, hatred, or physical damage of any
              type against any group or person; or (d) involves the
              dissemination of "junk mail," "chain letters," unsolicited bulk
              mailings, or "spamming," or encourages the harassment of another
              person; or (e) violates the rights of any third party, including
              without limitation by disclosing personal information about
              another person without authorization, such as their name, email
              address, home or phone number, or their right to privacy; (f)
              violates any patent, trademark, copyright, other intellectual
              rights, or the trade secrets, publicity, or privacy rights of a
              third party, or is fraudulent; (g) encourages the illegal or
              unauthorised use of, or the infringement of, another person's
              copyrighted work; or (h) makes available content that
              inappropriately exploits people in sexual, violent, or other ways,
              or requests personal information from anybody; or (i) includes
              footage, photos, or videos of another person without that person's
              express written agreement, approval, or, in the case of a minor,
              the consent of that minor's guardian; (j) designates any website
              or URL that, in the sole judgement of the Company, includes
              content that is inappropriate for the Platform or that is against
              the letter or spirit of these Terms of Service; or (k) tries to
              gain unauthorised access to the Platform, or to profiles, blogs,
              communities, account information, bulletins, or other areas of the
              Platform, or exceeds the scope of authorised access, or asks other
              Users for their passwords or personally identifying information
              for commercial or illegal purposes; (l) intended to deceive,
              swindle, or scam anyone, or to engage in commercial activity
              and/or sales without the Company's prior written approval. In
              these Terms of Service, "the Company's prior written consent"
              refers to a response from the Company's legal team that clearly
              addresses Your request and the action or conduct you're looking to
              have authorised; or (m) obstructs another User from using or
              accessing the Platform; or (n) endangers children or negatively
              affects minors in any way; or (o) breaks any currently in effect
              law; or (p) knowingly and intentionally communicates any
              information that is patently false or misleading in nature but may
              reasonably be perceived as a fact, or grossly offensive or
              menacing in nature; or impersonate another person; or deceive the
              reader, addressee, or Users about the origin of such messages. (q)
              contains viruses, or other computer programming routines that
              could harm, negatively affect, or otherwise affect the value of
              any computer resource or contains any other computer code, files,
              or programmes designed to interrupt, destroy, or limit the
              functionality of any computer resource or diminish value of,
              surreptitiously intercept or expropriate any system, data or
              personal identifiable information; or (r) poses a threat to any
              nation's unity, integrity, defence, security, or sovereignty, to
              friendly relations with other nations, to public order, or
              encourages the commission of any crime that is punishable by law,
              obstructs the investigation of any crime, or denigrates any other
              country; (s) is blatantly false and untrue, and is written or
              disseminated in any format with the intention to deceive or harass
              someone for financial gain or to harm someone; or (t) must not
              subject us to liability or result in the loss of our ISPs' or
              other suppliers' services (completely or partially). The Company
              is under no obligation to review or confirm any Content that you
              publish on the Platform, and the Company neither assumes nor shall
              assume responsibility or liability for any such Content on the
              Platform nor for the breach of any of your obligations under these
              Terms of Service. Despite the aforementioned, the Company may
              refuse to accept and/or remove any Content that contains
              information that is inconsistent with these Terms of Service.
              However, the Company is not obligated to monitor, modify, or
              delete the Content submitted by users. Any Content that you post
              or stream is subject to these Terms of Service, applicable laws,
              and may be disabled or the subject of an investigation under
              appropriate laws. Additionally, if we discover that you are not
              abiding by applicable laws and regulations, these Terms, or the
              Platform's privacy policy, we retain the right to terminate your
              account, deny you access to the Platform, and/or remove any
              non-compliant content that you have submitted. Anyone whose
              account is discovered to be violating any intellectual property
              rights of another person, any relevant laws, or these Terms of
              Service may have their account terminated by us. You expressly
              agree that the Company will not be held liable for any
              unauthorised access to or alteration of your transmissions or
              data, or for any other material or data supplied through the
              Platform or not sent at all. Furthermore, the Company shall not be
              held responsible or liable for any illegal acts committed by the
              User or the User's associates, relatives, employees, or agents,
              including but not limited to fraud, unfair business practises,
              cybersquatting, hacking, and other cybercrimes. Any content you
              upload, post, or display on or through the Platform remains
              entirely your property, and you are in charge of preserving those
              rights. Regarding any Content that you or any third party upload
              on or through the Platform, we disclaim all responsibility and
              obligation. A non-exclusive, worldwide, perpetual, irrevocable,
              royalty-free, sublicensable (through multiple tiers) right and
              licence to use, alter, publicly perform, publicly display,
              reproduce, and distribute such Content is nonetheless granted to
              us by the posting of Content using the Service. You acknowledge
              that as part of this licence, we have the right to make your
              Content accessible to other users of the Platform and the Service,
              who are permitted to use it in accordance with these Terms. In
              addition, the Company owns or has the right to use any data,
              information, materials, or other content found on or through the
              Platform. Without our express prior written consent, you are not
              allowed to share, edit, transmit, reuse, download, repost, copy,
              or use said data, information, material, or other content, in
              whole or in part, for profit. You acknowledge that the Company is
              always entitled to share any information (including the identity
              of a User who posts content or information on the Platform) as
              required to meet any legal obligations, valid governmental
              requests, or in compliance with court orders or subpoenas.
              Additionally, the Company may disclose any information about you
              to law enforcement or other government officials as we, in our
              sole discretion, believe necessary or appropriate in connection
              with the investigation and/or resolution of potential crimes,
              particularly those that may involve personal injury. By signing
              this agreement, you expressly authorise us to do so.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                9. Use of the Platform and the Services
              </span>
              <br></br>You may use the Platform and the Services only for lawful
              purposes and in accordance with these Terms of Services. You
              hereby agree not to use the Platform and the Services: (a) In any
              way that violates any applicable national or international law or
              regulation. (b) For the purpose of exploiting, harming, or
              attempting to exploit any person or harm minors in any way by
              exposing them to inappropriate content or otherwise. (c) To send
              or arrange for the sending of any form of solicitation, such as
              "junk mail," "chain letters," or "spam," or any other similar form
              of communication. (d) To pretend to be the Company, one of its
              employees, another user, or any other individual or organisation.
              (e) In any way that violates the rights of others, or in any way
              that is wrongful, illegal, dishonest, or hurtful, or in
              conjunction with any wrongful, illegal, dishonest, or harmful
              intention or behaviour. (f) To participate in any other behaviour
              that prevents someone from using or enjoying the Service, or that,
              in our judgement, may hurt or offend the Company or Service users
              or subject them to legal liability. Additionally, you agree not
              to: (a) Use the service in a way that would damage, overload,
              disable, or otherwise negatively affect it, or that might obstruct
              someone else from using it or from using it to carry out real-time
              activities. (b) Use any “deep-link”, “page-scrape”, “robot”,
              “spider”, or other automatic device, process, program or means to
              access the Platform and/or the Service for any purpose, including
              monitoring or copying any of the material on the Platform. (c)
              Without our prior written authorization, use any manual procedure
              to monitor, copy, or otherwise take action with respect to any of
              the content on the Service. (d) Use for any purpose that is
              unlawful or otherwise prohibited by these Terms of Services, or
              for other activity which infringes the rights of the Company or
              others; (e) Use any device, software, or routine that interferes
              with the proper working of the Platform. (f) Introduce any
              viruses, trojan horses, worms, logic bombs, or other material
              which is malicious or technologically harmful. (g) Attempt to gain
              unauthorized access to, interfere with, damage, or disrupt any
              parts of Service, the server on which the Platform is stored, or
              any server, computer, or database connected to Service. (h) Attack
              the Platform via a denial-of-service attack or a distributed
              denial-of-service attack. (i) Take any action that may damage or
              falsify Company rating. (j) In any way decompile, reverse
              engineer, or disassemble any material or content on the
              Website/Application. (k) Otherwise attempt to interfere with the
              proper working of the Platform and the Service.
            </p>
          </div>
          {/* Right column */}
          <div className="h-screen col-span-1 justify-items-center mt-4">
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">10. Payment</span>
              <br></br>The User should be careful not to intentionally or
              inadvertently divulge his personal UPI pin or OTP with any third
              party since the Company authorizes payments via payment service
              providers ("PSP") partners. The company never calls or otherwise
              asks for information like a UPI pin or OTP. Because the User
              shared these details, the Company is not responsible for any fraud
              that results from it. The providers of Third Party Services and
              PSP partners are not responsible for any fraud that results from
              the User disclosing such details. The Company will not bear any
              responsibility or take any liability for any loss or damage
              originating directly or indirectly from the use of any of the
              payment options offered on the Platform due to • Failure to obtain
              authorization for any transaction; • Exceeding the pre-set limit
              that you and the third-party bank have mutually agreed upon; or •
              Any problems with payments resulting from the transaction; or •
              Rejecting a deal for any other reason. According to the local tax
              regulations that are in effect, the user is responsible for paying
              any and all tax obligations that result from using this platform
              to provide the services. This confirms that we won't be liable for
              any tax obligations you might have due to services you provided
              over the platform or elsewhere. Additionally, you agree to
              immediately reimburse us for any consequences, including but not
              limited to taxes, interest, and penalties, incurred by us as a
              result of your non-compliance, failure to communicate, or any
              other action or omission related to the aforementioned tax issues.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">11. Refund/Cancellation</span>
              <br></br>• Before making any payments, please read all of the
              terms and conditions thoroughly since once a payment is started,
              it is considered final and cannot be changed. • For the payment
              transactions enabled on the Platform, the company does not support
              refunds in any way. The Company is not liable in the transaction
              if the User submitted an incorrect number or ID.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">12. Analytics</span>
              <br></br>We may use third-party service providers to monitor and
              analyse the use of our Service.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">13. Intellectual Property</span>
              <br></br>The Platform, along with all of its unique original
              content (aside from User-Provided Content), features and
              functionality, structure, expression, "look and feel," all
              graphics, user interfaces, visual interfaces, photographs,
              trademarks, logos, sounds, music, artwork, and computer code
              (collectively, "Company Data"), is and will always be the sole
              property of the Company and its licensors. The Platform is
              shielded by copyright, trademark, and other applicable laws in the
              country where the Company conducts business. Without the previous
              written consent of the Company, you are not permitted to use our
              trademarks in connection with any goods or services. No portion of
              the Platform and no Company Data may be copied, reproduced,
              republished, uploaded, posted, publicly displayed, encoded,
              translated, transmitted, or distributed in any way (including
              "mirroring") to any other computer, server, website, or other
              medium for publication or distribution or for any commercial use,
              except as expressly permitted in these Terms of Services, without
              the Company's prior written consent. Company Data on the Platform
              is only available for your individual, non-commercial use. The
              copyrights, trademarks, and other proprietary rights are violated
              and violated use of the Company Data on any other website or
              networked computer environment, as well as use of the Company Data
              for any other purpose than personal, non-commercial use.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">14. Copyright Policy</span>
              <br></br>We respect the intellectual property rights of others and
              expect our users to do the same. The Company may terminate in
              appropriate circumstances the accounts of users who infringe or
              are believed to be infringing the rights of copyright holders.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                15. Error Reporting and Feedback
              </span>
              <br></br>You may provide us either directly at feedback@viliyo.com
              or via third party sites and tools with information and feedback
              concerning errors, suggestions for improvements, ideas, problems,
              complaints, and other matters related to our Service (“Feedback”).
              You may provide us either directly at feedback@viliyo.com or via
              third party sites and tools with information and feedback
              concerning errors, suggestions for improvements, ideas, problems,
              complaints, and other matters related to our Service (“Feedback”).
              You acknowledge and agree that: (i) you shall not retain, acquire
              or assert any intellectual property right or other right, title or
              interest in or to the Feedback; (ii) the Company may have
              development ideas similar to the Feedback; (iii) the Feedback
              shall not contain any confidential information or proprietary
              information from you or any third party; and (iv) the Company is
              not under any obligation of confidentiality with respect to the
              Feedback. You hereby grant Company and its affiliates an
              exclusive, transferable, irrevocable, free of charge, unlimited
              right to use (including copy, modify, create derivative works,
              publish, distribute, and commercialise) the Feedback in any way
              and for any purpose, in the event that the transfer of the
              ownership to the Feedback is not permitted due to applicable
              mandatory laws.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                16. Links To Other Web Sites
              </span>
              <br></br>Our Platform may contain links to third-party websites or
              services that are not under the Company's control or ownership,
              and it may use third-party application programming interfaces. The
              Company has no control over, and accepts no liability for, any
              third-party web sites or services' content, privacy policies, or
              practises. We do not guarantee or warrant the products or services
              offered by any of these organisations, people, or websites. YOU
              ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR
              LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR
              ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE
              ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY
              SUCH THIRD PARTY WEB SITES OR SERVICES. WE STRONGLY ADVISE YOU TO
              READ THESE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD
              PARTY WEB SITES OR SERVICES THAT YOU VISIT.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">17. Disclaimer Of Warranty</span>
              <br></br>THE PLATFORM AND SERVICES AND THE COMPANY DATA ARE
              PROVIDED BY THE COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS.
              COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR PLATFORM AND THE
              SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED
              THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THE PLATFORM, ITS
              CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR
              SOLE RISK. NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH THE
              COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
              COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR
              AVAILABILITY OF THE SERVICES OR THEIR CONTENT. WITHOUT LIMITING
              THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH THE
              COMPANY REPRESENTS OR WARRANTS THAT THE PLATFORM, THEIR CONTENT,
              OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE
              ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS
              WILL BE CORRECTED, THAT THE SERVICES OR THE PLATFORM THAT MAKES IT
              AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT
              THE PLATFORM OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
              PLATFORM WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS. COMPANY
              HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
              IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
              WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR
              PARTICULAR PURPOSE. THE COMPANY WILL NOT BE LIABLE FOR ANY LOSSES,
              DAMAGES OR CLAIMS BY YOU OR ANY THIRD PARTY IN THIS REGARD. THE
              FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED
              OR LIMITED UNDER APPLICABLE LAW.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                18. Indemnity and Limitation of Liability
              </span>
              <br></br>EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR
              LICENSOR, OFFICERS, DIRECTORS, EMPLOYEES, OTHER LICENSEES AND
              AGENTS HARMLESS FOR ANY LOSS, DAMAGE, OR CLAIM, HOWEVER, IT ARISES
              (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF
              LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY,
              WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER
              IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR
              ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING
              WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY
              DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF
              ANY CENTRAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS
              OR TERMS OF SERVICE, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED
              OF THE POSSIBILITY OF SUCH LOSSES OR DAMAGE OR CLAIMS. EXCEPT AS
              PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF THE
              COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID BY YOU FOR THE
              PRODUCTS AND/OR SERVICES ON THE PLATFORM. UNDER NO CIRCUMSTANCE,
              INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL THE COMPANY BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, DAMAGES
              FOR LOST PROFITS, BUSINESS INTERRUPTION AND LOSS OF PROGRAMS OR
              INFORMATION ARISING OUT OF THE USE OF OR INABILITY TO USE THE
              PLATFORM OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR
              THE INABILITY TO USE, INCLUDING BUT NOT LIMITED TO THE
              INFORMATION, CONTENT, MATERIALS ON THE PLATFORM, OR ANY PART
              THEREOF. WHILE THE COMPANY SHALL TAKE REASONABLE PRECAUTIONS
              AGAINST SECURITY BREACHES, THE PLATFORM OR INTERNET TRANSMISSION
              IS NOT COMPLETELY SECURE, AND AS SUCH, THE COMPANY SHALL NOT BE
              LIABLE FOR ANY INDIRECT, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
              DAMAGES THAT MAY RESULT FROM UNAUTHORIZED ACCESS, HACKING, DATA
              LOSS, OR OTHER BREACHES THAT MAY OCCUR.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                18. Indemnity and Limitation of Liability
              </span>
              <br></br>EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR
              LICENSOR, OFFICERS, DIRECTORS, EMPLOYEES, OTHER LICENSEES AND
              AGENTS HARMLESS FOR ANY LOSS, DAMAGE, OR CLAIM, HOWEVER, IT ARISES
              (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF
              LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY,
              WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER
              IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR
              ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING
              WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY
              DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF
              ANY CENTRAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS
              OR TERMS OF SERVICE, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED
              OF THE POSSIBILITY OF SUCH LOSSES OR DAMAGE OR CLAIMS. EXCEPT AS
              PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF THE
              COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID BY YOU FOR THE
              PRODUCTS AND/OR SERVICES ON THE PLATFORM. UNDER NO CIRCUMSTANCE,
              INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL THE COMPANY BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, DAMAGES
              FOR LOST PROFITS, BUSINESS INTERRUPTION AND LOSS OF PROGRAMS OR
              INFORMATION ARISING OUT OF THE USE OF OR INABILITY TO USE THE
              PLATFORM OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR
              THE INABILITY TO USE, INCLUDING BUT NOT LIMITED TO THE
              INFORMATION, CONTENT, MATERIALS ON THE PLATFORM, OR ANY PART
              THEREOF. WHILE THE COMPANY SHALL TAKE REASONABLE PRECAUTIONS
              AGAINST SECURITY BREACHES, THE PLATFORM OR INTERNET TRANSMISSION
              IS NOT COMPLETELY SECURE, AND AS SUCH, THE COMPANY SHALL NOT BE
              LIABLE FOR ANY INDIRECT, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
              DAMAGES THAT MAY RESULT FROM UNAUTHORIZED ACCESS, HACKING, DATA
              LOSS, OR OTHER BREACHES THAT MAY OCCUR.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">19. Termination</span>
              <br></br>We may terminate or suspend your account and bar access
              to the Platform or any of the Services immediately, without prior
              notice or liability, under our sole discretion, for any reason
              whatsoever and without limitation, including but not limited to a
              breach of these Terms of Services or any other Agreement. If you
              wish to terminate your account, you may simply stop using the
              Service. All clauses in these terms of service that, by their
              nature, ought to endure termination shall do so, including but not
              limited to ownership clauses, warranty disclaimers,
              indemnification clauses, and liability restrictions. Despite the
              aforementioned, the Company reserves the right to recover any
              amounts due and owing by you or to take strict legal action,
              including but not limited to a referral to the appropriate police
              or other authorities for the initiation of criminal or other
              proceedings against you, if you violate these Terms of Services,
              the Privacy Policy, or other rules and policies.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">20. Governing Law</span>
              <br></br>All claims relating to the Company's provision of the
              Services are governed by the laws of India, but this does not
              deprive you of the consumer protection rights in the nation you
              have your habitual residence. For all legal matters arising out of
              or connected to this User Agreement, you and the Company agree to
              select the courts of the nation to which we direct your Services
              where you have your usual residency. Alternatively, you may select
              the appropriate court in India.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">21. Force Majeure</span>
              <br></br>The Company is not responsible for any failure or delay
              in performing any of its obligations under this agreement, nor
              shall it be responsible for any loss or damages resulting from
              such failure or delay, if such failure or delay is caused by any
              event beyond our reasonable control, such as an act of God, war,
              civil unrest, governmental or parliamentary restrictions,
              prohibitions, or enactments of any kind, an accident, a lack of
              availability or delay in transportation, any endemic, or outbreak
              of any disease.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">22. Changes To Service</span>
              <br></br>We reserve the right, in our sole discretion, to revoke
              or modify our Services and any other service or content we make
              available through the Platform without prior notice. If for any
              reason all or a portion of the Service is unavailable at any time
              or for any length of time, we shall not be held responsible. On
              occasion, we might only allow users, including registered users,
              access to certain portions of the Platform, the Services, or the
              entire Platform.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">23. Amendments To Terms</span>
              <br></br>We may amend this Terms of Services at any time by
              posting the amended terms on the Platform. It is your
              responsibility to review these Terms of Services periodically.
              Your continued use of the Platform following the posting of
              revised Terms means that you accept and agree to the changes. You
              are expected to check this page frequently so you are aware of any
              changes, as they are binding on you. By continuing to access or
              use our Platform and the Services after any revisions become
              effective, you agree to be bound by the revised terms. If you do
              not agree to the new terms, you are no longer authorized to use
              the Platform and the Service.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">
                24. Waiver and Severability
              </span>
              <br></br>No waiver by Company of any term or condition set forth
              in Terms shall be deemed a further or continuing waiver of such
              term or condition or a waiver of any other term or condition, and
              any failure of Company to assert any right or provision under
              Terms of Services shall not constitute a waiver of such right or
              provision. Any term that is determined to be unlawful or illegal
              for any reason by a court or other tribunal of competent
              jurisdiction must be removed or limited to the absolute minimum
              amount necessary so that the remaining terms of these Terms of
              Services shall remain in full force and effect.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">25. Assignment</span>
              <br></br>The Company may transfer, sub-contract or otherwise deal
              with its rights and/or obligations under these Terms of Services
              without notifying you or obtaining your consent. You may not
              transfer, sub-contract or otherwise deal with your rights and/or
              obligations under these Terms of Services.
            </p>
            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">26. Acknowledgement</span>
              <br></br>BY USING THE PLATFORM OR OTHER SERVICES PROVIDED BY US,
              YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND
              AGREE TO BE BOUND BY THEM.
            </p>

            <p className="text-justify text-[12px] mt-2">
              <span className="font-extrabold">27. Contact Us</span>
              <br></br>Please send your feedback, comments, requests for
              technical support by email: feedback@Viliyo.com The name and
              contact details of the Grievance Officer are given below: Name :
              Ajay Kumar (Grievance Officer), VTT Technologies Pte Ltd. Address:
              712, Rupa Solitaire, MBP, Mahape, Navi Mumbai Email :
              grievances@viliyo.com
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl h-16 p-5 flex space-x-4">
          <div>
            <input
              type="checkbox"
              defaultChecked={true}
              disabled={true}
              className="bg-app-blue h-4 w-4 rounded-3xl my-1 hover:bg-app-blue focus:bg-app-blue "
              // onClick={HandleClickCheckBox}
            ></input>
          </div>
          <div className=" font-bold text-app-blue">
            I agreed to the Terms of Service
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsServicePage;
TermsServicePage.Layout = "Admin";
