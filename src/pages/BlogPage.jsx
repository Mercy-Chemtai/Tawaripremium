import React, { useState, useEffect } from "react";
import { Calendar, Tag, User, Search, X, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { newsletterAPI } from "../services/api";
import { blogAPI } from "../services/api";

// Full blog articles (keeping your existing hardcoded articles exactly as-is,
// used only as a fallback / for legacy posts that predate the admin page)
const FULL_ARTICLES = {
  "iphone-18-pro-and-18-pro-max": {
    title: "iPhone 18 Pro & iPhone 18 Pro Max: Everything You Need to Know",
    slug: "iphone-18-pro-and-18-pro-max",
    content: `
    <h2>Meet Apple's Newest iPhone</h2>
    <p>Apple has officially introduced its newest Pro iPhone lineup: the iPhone 18 Pro and iPhone 18 Pro Max. With major improvements to the camera system, performance, battery life, artificial intelligence, and overall user experience, Apple's latest iPhone is designed for users who want more from their smartphone.</p>
    <p>The iPhone 18 Pro lineup introduces Apple's new A20 Pro chip, a 48MP Fusion Main camera with variable aperture, an improved thermal management system, longer battery life, and the next generation of Apple Intelligence through iOS 27. The new models are available in black, silver, glacier, and the new burgundy finish.</p>

    <h3>1. A Revolutionary New Camera System</h3>
    <p>One of the biggest upgrades in the iPhone 18 Pro is its camera system. Apple has introduced a new 48MP Fusion Main camera with variable aperture, giving iPhone users more control over photography than previous generations.</p>

    <p>The variable aperture allows the camera to automatically adjust how much light enters the lens depending on the environment. Users can also manually control aperture settings when they want greater creative control over their photographs.</p>

    <p>This means better flexibility when shooting portraits, landscapes, group photos, low-light scenes, and everyday moments. The new camera system is especially useful for photographers, social media creators, influencers, and businesses that rely on high-quality smartphone photography.</p>

    <p>The iPhone 18 Pro also introduces enhanced Pro controls, allowing users to adjust settings such as aperture, shutter speed, white balance, and exposure directly within the Camera app.</p>

    <h3>2. Powered by the New A20 Pro Chip</h3>
    <p>At the heart of the iPhone 18 Pro and iPhone 18 Pro Max is Apple's new A20 Pro chip.</p>

    <p>The A20 Pro is designed to deliver powerful performance for demanding tasks including gaming, photography, video editing, artificial intelligence, multitasking, and professional applications.</p>

    <p>The chip includes a new Dual 16-core Neural Engine designed to accelerate on-device AI and computational photography. This gives the iPhone 18 Pro greater processing capability for advanced Apple Intelligence features while maintaining the fast and responsive experience iPhone users expect.</p>

    <p>Whether you're editing a 4K video, playing graphics-intensive games, managing multiple applications, or using AI-powered features, the A20 Pro is built to handle demanding workloads efficiently.</p>

    <h3>3. Improved Thermal Management</h3>
    <p>Powerful smartphones can generate significant heat during demanding tasks. Apple has addressed this with a new vapor chamber thermal management system in the iPhone 18 Pro lineup.</p>

    <p>The redesigned vapor chamber has a larger surface area than the previous generation, helping the device dissipate heat more effectively during sustained workloads.</p>

    <p>This can be particularly useful for people who regularly play demanding games, record long videos, edit content, or perform other intensive tasks on their iPhone.</p>

    <h3>4. Longer Battery Life</h3>
    <p>Battery life is one of the most important features of any smartphone, and Apple has made significant improvements with the iPhone 18 Pro generation.</p>

    <p>The iPhone 18 Pro offers up to 36 hours of video playback on eSIM-only models, while the iPhone 18 Pro Max can deliver up to 45 hours of video playback under Apple's stated testing conditions.</p>

    <p>The iPhone 18 Pro can also charge up to 50 percent in around 15 minutes using wired charging, while wireless charging can reach 50 percent in around 30 minutes.</p>

    <p>For people who use their phones throughout the day for work, communication, photography, entertainment, and social media, these battery improvements can make a noticeable difference.</p>

    <h3>5. A Smaller and More Useful Dynamic Island</h3>
    <p>The iPhone 18 Pro lineup continues Apple's Dynamic Island experience while introducing a smaller and more useful design.</p>

    <p>Dynamic Island allows users to interact with notifications, calls, music, timers, navigation, and other live activities without completely leaving the application they are using.</p>

    <p>This makes everyday interactions feel more integrated and keeps important information accessible while you continue using your phone.</p>

    <h3>6. Apple Intelligence and the New Siri AI</h3>
    <p>The iPhone 18 Pro is designed around more than traditional smartphone features. With iOS 27 and Apple Intelligence, Apple is expanding the role of artificial intelligence across the iPhone experience.</p>

    <p>The new Siri AI is designed to provide a more personal and conversational experience. It can use personal context to help users find information across messages, emails, photos, and other parts of their device.</p>

    <p>Siri AI also introduces onscreen awareness, allowing the assistant to understand what is currently displayed on your screen and help you take actions based on that information.</p>

    <p>Apple is also bringing intelligence into photography and other everyday tasks, making the iPhone 18 Pro more useful as a personal productivity and creative device.</p>

    <h3>7. New iPhone 18 Pro Colors</h3>
    <p>The iPhone 18 Pro and iPhone 18 Pro Max are available in four finishes: black, silver, glacier, and an all-new burgundy.</p>

    <p>The new burgundy finish gives the latest Pro lineup a distinctive look while maintaining Apple's premium design approach.</p>

    <p>For customers who care about both performance and appearance, the new finishes provide more choice when selecting their next iPhone.</p>

    <h3>8. Storage Options for Power Users</h3>
    <p>The iPhone 18 Pro and iPhone 18 Pro Max are available with storage capacities ranging from 256GB to 2TB.</p>

    <p>This gives customers more flexibility depending on how they use their phone. Someone who mainly uses their iPhone for communication and social media may be comfortable with a lower storage capacity, while photographers, videographers, gamers, and content creators may benefit from larger storage options.</p>

    <p>With modern smartphone cameras producing increasingly large photo and video files, choosing the right storage capacity is an important consideration before purchasing a new iPhone.</p>

    <h2>iPhone 18 Pro vs iPhone 18 Pro Max</h2>

    <p>The iPhone 18 Pro and iPhone 18 Pro Max share many of the same major technologies, including the A20 Pro chip, advanced camera system, Apple Intelligence features, and improved thermal management.</p>

    <p>The Pro Max is designed for customers who want the largest display and longest battery experience in the Pro lineup, while the standard Pro provides a more compact option for users who prefer a smaller device.</p>

    <p>Your choice will ultimately depend on your preferred screen size, battery requirements, storage needs, and how you use your smartphone every day.</p>

    <h2>Why the iPhone 18 Pro Matters for Content Creators</h2>

    <p>The latest iPhone is particularly interesting for content creators.</p>

    <p>With its advanced camera system, manual camera controls, powerful processor, improved battery life, and AI capabilities, the iPhone 18 Pro can be used for photography, video production, social media content, product photography, business marketing, and everyday content creation.</p>

    <p>For creators who produce content for TikTok, Instagram, YouTube, Facebook, or other platforms, having a powerful camera and editing device in one pocket can simplify the entire content creation process.</p>

    <h2>Should You Upgrade to the iPhone 18 Pro?</h2>

    <p>Whether you should upgrade depends on the iPhone you currently own and how you use it.</p>

    <p>If your current iPhone still provides the performance, battery life, camera quality, and storage you need, upgrading may not be necessary immediately.</p>

    <p>However, users interested in improved photography, professional camera controls, longer battery life, advanced AI features, faster performance, and the latest Apple technology may find the iPhone 18 Pro generation particularly relevant.</p>

    <p>Before upgrading, it is also worth checking the condition of your current iPhone. A battery replacement, screen repair, charging-port service, or camera repair may sometimes extend the useful life of an existing device.</p>

    <h2>What to Know Before Buying the Latest iPhone</h2>

    <p>If you're planning to purchase an iPhone 18 Pro or iPhone 18 Pro Max, don't look at the price alone. Consider the storage capacity, model, warranty, device condition, accessories, and after-sales support.</p>

    <ul>
      <li>Choose the storage capacity that matches your usage.</li>
      <li>Confirm the exact iPhone model before purchasing.</li>
      <li>Check the device condition if buying a pre-owned iPhone.</li>
      <li>Confirm that the device is genuine.</li>
      <li>Check the warranty and available service support.</li>
      <li>Consider professional setup and technical support when necessary.</li>
      <li>Choose a reputable Apple-focused seller or service provider.</li>
    </ul>

    <h2>Protecting Your New iPhone</h2>

    <p>Buying a new iPhone is a significant investment, so protecting the device from accidental damage is important.</p>

    <p>A quality protective case and screen protector can help reduce the risk of damage from everyday drops and scratches. It is also important to avoid exposing the device to extreme temperatures and to use appropriate charging accessories.</p>

    <p>Even with proper care, however, accidents can happen. A damaged screen, battery issue, charging problem, or camera fault should be assessed by a professional rather than attempting an uncertain repair at home.</p>

    <h2>Professional iPhone Repair and Support</h2>

    <p>Modern iPhones contain sophisticated hardware and software, making professional repair important when something goes wrong.</p>

    <p>Problems such as battery degradation, cracked displays, charging issues, camera faults, overheating, and other hardware problems can affect the performance of your device.</p>

    <p>A professional diagnostic assessment can help identify the actual cause of a problem before unnecessary components are replaced.</p>

    <p>Whether you own the newest iPhone 18 Pro or an older iPhone model, proper maintenance and professional servicing can help keep your device working reliably for longer.</p>

    <h2>Experience the Newest iPhone</h2>

    <p>The iPhone 18 Pro and iPhone 18 Pro Max represent Apple's latest approach to smartphone photography, performance, battery life, artificial intelligence, and professional creativity.</p>

    <p>From the new 48MP Fusion Main camera with variable aperture to the A20 Pro chip, improved thermal management, longer battery life, and the next generation of Apple Intelligence, the newest iPhone is designed for people who expect more from their smartphone.</p>

    <p>If you're researching the <strong>latest iPhone in 2026</strong>, considering an upgrade, or looking for professional Apple support, the iPhone 18 Pro lineup is worth exploring.</p>

    <h2>Need iPhone Sales, Repair or Support?</h2>

    <p>Whether you are looking to upgrade to the latest iPhone, need help with an existing Apple device, or require professional iPhone repair, getting the right technical support can make all the difference.</p>

    <p>At <strong>Tawari Digital</strong>, we provide Apple-focused products and professional technical services to help customers get more from their devices.</p>

    <p>Contact us today to learn more about our iPhone products, repair services, and Apple support.</p>
  `,
  },
  "signs-your-iphone-needs-repair": {
    title: "5 Signs Your iPhone Needs Professional Repair",
    slug: "signs-your-iphone-needs-repair",
    content: `
      <h2>Common Warning Signs</h2>
      <p>Your iPhone is an essential part of your daily life, and recognizing when it needs professional attention can save you from bigger problems down the line. Here are the most common signs that indicate your device needs repair.</p>

      <h3>1. Battery Draining Too Quickly</h3>
      <p>If your iPhone's battery life has decreased significantly and you find yourself charging it multiple times a day, this is often the first sign of battery degradation. Modern iPhone batteries are designed to retain up to 80% of their original capacity after 500 complete charge cycles. However, factors like extreme temperatures, overcharging, and age can accelerate battery wear.</p>
      <p>Our technicians can run a comprehensive battery health diagnostic to determine if a replacement is necessary. A new battery can restore your iPhone to like-new performance, often improving speed and responsiveness as well.</p>

      <h3>2. Cracked or Damaged Screen</h3>
      <p>Even small cracks in your iPhone screen can lead to bigger problems. Water and dust can enter through these cracks, potentially damaging internal components. Additionally, cracks can spread over time, and touch sensitivity may become unreliable.</p>
      <p>We use only high-quality replacement screens that match Apple's specifications, ensuring your display looks and functions exactly as it should. Our screen repairs typically take less than an hour, and we back them with a warranty for your peace of mind.</p>

      <h3>3. Overheating Issues</h3>
      <p>While it's normal for your iPhone to warm up slightly during intensive tasks, excessive heat is a red flag. Overheating can indicate problems with the battery, charging port, or internal components. If your device becomes too hot to hold or shuts down due to temperature warnings, bring it in immediately.</p>
      <p>Our diagnostic process can identify the root cause of overheating, whether it's a software issue, battery problem, or component failure.</p>

      <h3>4. Charging Port Problems</h3>
      <p>If your iPhone only charges at certain angles or doesn't charge at all, you likely have a damaged charging port. This is one of the most common repairs we perform. Lint, debris, and daily wear can damage the delicate pins inside the Lightning or USB-C port.</p>
      <p>Sometimes a simple cleaning is all that's needed, but if the port is damaged, we can replace it quickly and affordably.</p>

      <h3>5. Camera Issues</h3>
      <p>Blurry photos, black screens when opening the camera app, or a camera that won't focus properly all indicate hardware problems. The iPhone's camera system is sophisticated, and even small drops can misalign the lens or damage internal components.</p>
      <p>We can repair or replace camera modules, restoring your iPhone's photography capabilities to factory standards.</p>

      <h2>Why Choose Professional Repair?</h2>
      <p>While DIY repairs might seem tempting, iPhone repairs require specialized tools and expertise. Incorrect repairs can void warranties, cause additional damage, or even pose safety risks, especially with battery replacements.</p>
      <p>Our certified technicians have years of experience with all iPhone models and use genuine or high-quality replacement parts. We also provide warranties on our repairs, giving you confidence in our work.</p>

      <h2>Prevention Tips</h2>
      <p>To keep your iPhone in optimal condition:</p>
      <ul>
        <li>Use a quality protective case and screen protector</li>
        <li>Avoid exposing your device to extreme temperatures</li>
        <li>Keep software updated for optimal performance</li>
        <li>Clean charging ports regularly with compressed air</li>
        <li>Don't let your battery completely drain regularly</li>
      </ul>

      <h2>Schedule Your Repair Today</h2>
      <p>If you've noticed any of these warning signs, don't wait until the problem gets worse. Contact us today to schedule a free diagnostic assessment. We'll provide an honest evaluation and transparent pricing before any work begins. Most repairs are completed the same day, getting you back to your digital life quickly.</p>
    `,
  },
  "buying-refurbished-vs-new": {
    title: "Buying Refurbished vs New: How to Save Without Sacrificing Quality",
    slug: "buying-refurbished-vs-new",
    content: `
      <h2>Understanding Your Options</h2>
      <p>When it's time to upgrade your Apple device, you face an important decision: should you buy new or consider a certified refurbished model? Both options have distinct advantages, and the right choice depends on your priorities, budget, and needs.</p>

      <h3>What Does "Certified Refurbished" Mean?</h3>
      <p>A certified refurbished Apple product is not simply a used device resold as-is. These devices undergo rigorous inspection, testing, and restoration processes. Our certified refurbishment program includes:</p>
      <ul>
        <li>Complete functional testing of all components</li>
        <li>Replacement of any defective parts with genuine Apple components</li>
        <li>New battery installation (for iPhones and MacBooks)</li>
        <li>Thorough cleaning and cosmetic restoration</li>
        <li>Fresh installation of the latest compatible iOS or macOS</li>
        <li>New packaging with all necessary accessories</li>
      </ul>

      <h2>Cost Savings Without Compromise</h2>
      <p>The most obvious advantage of refurbished devices is the price. Customers typically save 20-40% compared to new models, sometimes even more on older generations. For example, a refurbished iPhone 13 Pro might cost $600-700 compared to $999 new, offering the same functionality at a fraction of the price.</p>

      <h2>Environmental Impact</h2>
      <p>Choosing refurbished devices is an environmentally responsible decision. The electronics industry generates significant waste and uses precious resources. By purchasing refurbished:</p>
      <ul>
        <li>You prevent functional devices from ending up in landfills</li>
        <li>You reduce demand for new device production and its environmental impact</li>
        <li>You support the circular economy and sustainable consumption</li>
      </ul>

      <h2>Quality and Warranty Assurance</h2>
      <p>When purchased from certified refurbishers like us, refurbished devices come with warranties and return windows so you can buy with confidence.</p>

      <h2>Making Your Decision</h2>
      <p>Consider your specific needs and circumstances. If you need the absolute latest features, buy new. If you want great value and responsible consumption, refurbished is a smart choice.</p>

      <h2>Visit Our Store</h2>
      <p>We invite you to visit our store to see our selection of certified refurbished Apple products. Our knowledgeable staff can help you compare options and find the perfect device for your needs and budget.</p>
    `,
  },
  "extend-macbook-lifespan": {
    title: "How to Extend Your MacBook's Lifespan — Pro Tips",
    slug: "extend-macbook-lifespan",
    content: `
      <h2>Your MacBook Investment</h2>
      <p>MacBooks are significant investments, and with proper care, they can serve you reliably for 5-7 years or even longer. Many users continue using well-maintained MacBooks for a decade. This guide provides professional advice on maximizing your MacBook's lifespan through preventive maintenance and smart usage habits.</p>

      <h3>1. Keep Your Software Updated</h3>
      <p>Apple regularly releases macOS updates that include performance improvements, security patches, and bug fixes. These updates are crucial for keeping your MacBook running smoothly.</p>

      <h3>2. Manage Storage Intelligently</h3>
      <p>A full hard drive significantly impacts performance. Keep at least 10-15% of your storage free. Use these strategies:</p>
      <ul>
        <li>Regularly review and delete unused applications</li>
        <li>Move large media files to external storage or cloud services</li>
        <li>Empty the Downloads folder periodically</li>
      </ul>

      <h3>3. Battery Care Best Practices</h3>
      <p>Your MacBook's battery is a wear item that degrades over time, but proper care can significantly extend its life.</p>

      <h3>4. Physical Cleaning and Maintenance</h3>
      <p>Dust and debris are silent MacBook killers. We recommend professional internal cleaning every 12-18 months.</p>

      <h2>When to Seek Professional Help</h2>
      <p>Don't ignore signs like frequent crashes, unusual noises, or excessive heat. Our maintenance services include diagnostics, thermal paste replacement, and SSD upgrades.</p>
    `,
  },
  "data-recovery-importance": {
    title: "Why Data Recovery Matters — Protecting Memories & Business",
    slug: "data-recovery-importance",
    content: `
      <h2>The Reality of Data Loss</h2>
      <p>Every day, countless iPhone and Mac users experience the panic of data loss. Whether from accidental deletion, device failure, or physical damage, losing precious photos, important documents, or irreplaceable memories is devastating. Understanding data recovery and prevention is crucial for every Apple device owner.</p>

      <h3>Common Causes of Data Loss</h3>
      <p>From accidental deletion to hardware failure and water damage, we cover what can go wrong — and how we can help recover it.</p>

      <h2>Our Data Recovery Services</h2>
      <p>We specialize in recovering data from iPhones, iPads, and Macs — even when devices appear dead. Our process includes assessment, recovery attempts, verification, and secure transfer.</p>

      <h2>Prevention Tips</h2>
      <p>Regular backups (iCloud, Time Machine) and the 3-2-1 backup rule are the best defenses against data loss.</p>
    `,
  },
  "apple-watch-charging-issues-after-unauthorized-repair": {
    title: "Why Your Apple Watch May Misbehave After an Unauthorized Repair",
    slug: "apple-watch-charging-issues-after-unauthorized-repair",
    content: `
      <h2>Understanding the Problem</h2>
      <p>Apple Watches are engineered with extreme precision, and even minor tampering can lead to unexpected behaviour. If your watch has been opened by an unqualified technician or glue was applied near key components, you may notice charging problems, overheating, power-offs, or inconsistent performance — even if the battery health appears normal.</p>

      <h3>Battery Health Doesn't Tell the Whole Story</h3>
      <p>A battery health reading of 87% is generally very good and unlikely to cause severe issues on its own. However, internal obstructions or damage caused during a previous repair can interfere with how the watch charges and operates, making the battery appear to be the problem even when it isn't.</p>

      <h3>How Glue Affects Internal Components</h3>
      <p>Applying glue inside an Apple Watch — especially around the charging coil or connectors — can cause serious complications. The adhesive may block contacts, restrict proper alignment of components, or interfere with the charging system. Because the internal layout is extremely tight, even a small amount of misplaced glue can disrupt normal operation.</p>
      <p>These issues may lead to:</p>
      <ul>
        <li>Inconsistent charging</li>
        <li>Unexpected shutdowns</li>
        <li>Overheating during use or charging</li>
        <li>Failure to power on</li>
        <li>Erratic behaviour despite good battery health</li>
      </ul>

      <h3>Why Professional Diagnostics Are Necessary</h3>
      <p>To identify the root cause, the watch needs to be carefully opened by a qualified technician. The process includes:</p>
      <ul>
        <li>Removing excess glue from the charging and connector areas</li>
        <li>Inspecting flex cables and charging components for damage</li>
        <li>Testing the charging system after cleaning</li>
        <li>Checking for hidden damage caused by previous repairs</li>
      </ul>
      <p>Because Apple Watches are delicate and high-risk to open, a diagnostic fee of KSh 3,500 applies. This covers the time, precision, and expertise required to safely inspect the device.</p>

      <h2>What Happens After the Diagnostic?</h2>
      <p>Once the watch is opened and thoroughly examined, we will update you with the exact issue and the recommended repair. No work proceeds without your approval, and we ensure transparency in both the diagnosis and pricing.</p>

      <h2>Protecting Your Apple Watch in the Future</h2>
      <p>Apple Watches require specialized tools and skills. To avoid long-term damage:</p>
      <ul>
        <li>Always choose certified or highly experienced technicians</li>
        <li>Avoid quick-fix shops that use glue or makeshift solutions</li>
        <li>Never attempt to open the watch yourself</li>
        <li>Seek professional help as soon as you notice unusual behaviour</li>
      </ul>

      <h2>Schedule a Diagnostic Today</h2>
      <p>If your Apple Watch is overheating, charging inconsistently, or shutting down unexpectedly after a previous repair, don't wait. Book a diagnostic appointment today, and we'll help restore your watch to proper working condition with safe, professional care.</p>
    `,
  },
  "airpods-apple-watch-perfect-harmony": {
    title: "AirPods and Apple Watch: Perfect Harmony for a Healthier You",
    slug: "airpods-apple-watch-perfect-harmony",
    content: `
      <h2>Better Together</h2>
      <p>When innovation meets intention, powerful things happen. <strong>AirPods</strong> and <strong>Apple Watch</strong> are designed to work seamlessly together, creating an experience where every step you take and every beat you hear fuels a healthier, more active lifestyle.</p>
      <p>From morning workouts to evening wind-downs, this dynamic duo keeps you connected, motivated, and in tune with your goals.</p>

      <h3>1. Motivation in Every Beat</h3>
      <p>Music has the power to transform your workout. With <strong>AirPods</strong> paired effortlessly to your <strong>Apple Watch</strong>, you can stream your favorite playlists, podcasts, or guided workouts without carrying your phone.</p>
      <p>Whether you're running outdoors or pushing through a gym session, crisp, immersive sound keeps your energy high and your focus sharp. Every beat becomes a driving force, helping you go further and stay consistent.</p>

      <h3>2. Freedom to Move</h3>
      <p>Leave your phone behind and experience true freedom. Your <strong>Apple Watch</strong> tracks your workout metrics in real time — heart rate, calories burned, distance, pace — while your <strong>AirPods</strong> deliver the soundtrack.</p>
      <p>This seamless connection means fewer distractions and more movement. No tangled wires, no bulky devices — just pure, uninterrupted performance.</p>

      <h3>3. Smarter Fitness Tracking</h3>
      <p>Your <strong>Apple Watch</strong> does more than count steps. It monitors heart health, tracks different workout types, and provides detailed insights into your daily activity trends.</p>
      <p>With audio cues delivered directly through your <strong>AirPods</strong>, you receive real-time updates on your progress. Close your rings, beat your personal best, and stay informed without ever glancing at your wrist.</p>

      <h3>4. Seamless Connectivity</h3>
      <p>Switching between calls, music, and voice commands feels effortless. Take a call mid-walk, reply to a message using voice dictation, or ask Siri to adjust your playlist — all without breaking stride.</p>
      <p>The integration between <strong>AirPods</strong> and <strong>Apple Watch</strong> ensures your digital life flows smoothly alongside your active one.</p>

      <h3>5. Wellness Beyond Workouts</h3>
      <p>The harmony doesn't stop when your workout ends. Use your <strong>AirPods</strong> for guided meditation, breathing sessions, or calming music while your <strong>Apple Watch</strong> tracks mindfulness minutes and monitors your heart rate.</p>
      <p>Better sleep tracking, stress awareness, and daily activity reminders all work together to support a balanced, healthier lifestyle.</p>

      <h2>Why They're Better Together</h2>
      <p>Individually, <strong>AirPods</strong> and <strong>Apple Watch</strong> are powerful tools. Together, they create an ecosystem designed around movement, motivation, and mindfulness.</p>
      <p>Their seamless pairing, intuitive controls, and intelligent tracking capabilities transform everyday routines into meaningful progress. Every notification, every song, and every metric works in harmony to keep you inspired.</p>

      <h2>Tips to Maximize the Experience</h2>
      <ul>
        <li>Create dedicated workout playlists to stay energized</li>
        <li>Use fitness tracking features to set measurable goals</li>
        <li>Enable voice feedback for real-time performance updates</li>
        <li>Take advantage of guided breathing and meditation sessions</li>
        <li>Keep devices updated for optimal performance and new features</li>
      </ul>

      <h2>Step Into a Healthier You</h2>
      <p>Every step you take matters. Every beat pushes you forward. With <strong>AirPods</strong> and <strong>Apple Watch</strong> working in perfect harmony, staying active and mindful becomes effortless.</p>
      <p>Elevate your routine, embrace the rhythm, and let technology inspire your healthiest self — one step and one beat at a time.</p>
    `,
  },
  "free-up-iphone-storage": {
    slug: "free-up-iphone-storage",
    title: "How to Free Up Storage on Your iPhone and Make It Run Faster",
    content: `
      <h2>Running Out of iPhone Storage?</h2>
      <p>If your iPhone keeps showing the dreaded <strong>"Storage Almost Full"</strong> message, you're not alone. Photos, videos, apps, and cached files can quickly consume your available space, slowing down your device and preventing you from installing updates or taking new photos.</p>

      <p>The good news is that you don't always need a new phone. By clearing unnecessary data and optimizing your storage, you can free up significant space and keep your iPhone running smoothly.</p>

      <h2>1. Check What's Taking Up Space</h2>
      <p>The first step is identifying which apps or files are using the most storage.</p>
      <p>Go to <strong>Settings &gt; General &gt; iPhone Storage</strong>. Your iPhone will display a detailed breakdown of how much space each app and file type is using.</p>

      <p>This helps you quickly locate the biggest storage consumers and decide what should be removed or optimized.</p>

      <h3>Tip</h3>
      <p>Large apps, photo libraries, and messaging apps are often the biggest contributors to storage problems.</p>

      <h2>2. Manage Photos and Videos</h2>
      <p>Photos and videos are usually the largest files stored on an iPhone. High-resolution videos and bursts of photos can consume gigabytes of space without you realizing it.</p>

      <ul>
        <li>Delete unnecessary or duplicate videos</li>
        <li>Remove screenshots or blurred photos</li>
        <li>Clear the <strong>Recently Deleted</strong> album to permanently free space</li>
        <li>Back up your media to <strong>iCloud</strong> or <strong>Google Photos</strong> before deleting them from your phone</li>
      </ul>

      <p>Regularly cleaning your photo library can quickly recover a large amount of storage.</p>

      <h2>3. Clean Up WhatsApp Storage</h2>
      <p>Messaging apps like WhatsApp store photos, videos, voice notes, and documents that can accumulate over time.</p>

      <p>To review and remove large files:</p>

      <p><strong>WhatsApp &gt; Settings &gt; Storage and Data &gt; Manage Storage</strong></p>

      <p>This section allows you to see large files and frequently forwarded media so you can delete them quickly.</p>

      <h2>4. Clear Safari and App Cache</h2>
      <p>Web browsing and app usage create temporary files called cache. Over time, these files can consume significant storage.</p>

      <p>To clear Safari data:</p>
      <p><strong>Settings &gt; Safari &gt; Clear History and Website Data</strong></p>

      <p>For apps like Instagram, TikTok, or Facebook, reinstalling the app can sometimes remove accumulated cache and free up space.</p>

      <h2>5. Offload Unused Apps</h2>
      <p>If you have apps you rarely use, you can free up space without losing your data.</p>

      <p>Enable <strong>Offload Unused Apps</strong> by going to:</p>

      <p><strong>Settings &gt; General &gt; iPhone Storage</strong></p>

      <p>This feature removes the app but keeps its documents and data. When you reinstall the app later, everything will still be there.</p>

      <h2>Keep Your iPhone Running Smoothly</h2>
      <p>Regularly managing storage helps your iPhone perform better, run faster, and avoid frustrating storage warnings.</p>

      <p>If your device is still full even after clearing large files, it may require a deeper clean or system reset to remove hidden system data.</p>

      <p>Our technicians can assist with safely optimizing your iPhone, recovering space, and ensuring your device performs at its best.</p>
    `,
  },
  "iphone-liquid-detected-charging-port-fix": {
    slug: "iphone-liquid-detected-charging-port-fix",
    title:
      "iPhone Showing 'Liquid Detected in Charging Port'? Here's How to Fix It",
    content: `
      <h2>iPhone Showing "Liquid Detected in Charging Port"?</h2>
      <p>If your iPhone displays the <strong>"Liquid Detected in Lightning Connector"</strong> warning and refuses to charge, it means the device has detected moisture or debris inside the charging port.</p>

      <p>This is a built-in safety feature designed to prevent electrical damage to your device. Charging while moisture is present can permanently damage the internal components of your iPhone.</p>

      <h2>Why This Warning Appears</h2>
      <p>The warning usually appears when the charging port detects:</p>
      <ul>
        <li>Moisture from water exposure</li>
        <li>Humidity or condensation</li>
        <li>Dust or debris inside the Lightning port</li>
        <li>Corrosion affecting the connector pins</li>
      </ul>

      <p>Even small amounts of moisture can trigger the warning and stop your iPhone from charging.</p>

      <h2>Professional iPhone Charging Port Repair</h2>
      <p>At <strong>Tawari Digital – Westlands, Nairobi</strong>, we provide professional iPhone charging port diagnosis, cleaning, and repair to restore proper charging.</p>

      <p>Our technicians will:</p>
      <ul>
        <li>Inspect the Lightning connector for moisture or corrosion</li>
        <li>Safely clean the charging port using professional tools</li>
        <li>Repair or replace the iPhone charging port flex if damaged</li>
        <li>Test charging, microphone, and data functions after repair</li>
      </ul>

      <h2>Signs Your Charging Port Needs Repair</h2>
      <ul>
        <li>Your iPhone refuses to charge</li>
        <li>Charging works only when the cable is positioned a certain way</li>
        <li>The "Liquid Detected" warning keeps appearing</li>
        <li>The phone charges very slowly or disconnects frequently</li>
      </ul>

      <h2>Get Your iPhone Fixed Quickly</h2>
      <p>If your iPhone is not charging or keeps showing the liquid detected warning, bring it to <strong>Tawari Digital</strong> for fast and reliable repair.</p>

      <p><strong>Location:</strong> Tawari Digital – Westlands Commercial Centre, Nairobi</p>
      <p><strong>Phone:</strong> +254 710 130 021</p>

      <p>Our technicians will diagnose the issue and restore your iPhone to full charging functionality.</p>
    `,
  },
};

const DUMMY_POSTS = [
  {
    id: "hardcoded-1",
    slug: "iphone-18-pro-and-18-pro-max",
    title: "iPhone 18 Pro & iPhone 18 Pro Max: Everything You Need to Know",
    excerpt:
      "Discover Apple's newest iPhone 18 Pro and iPhone 18 Pro Max, including the A20 Pro chip, advanced 48MP camera, longer battery life, Apple Intelligence and the latest features.",
    featured_image: "/Images/iphone-18-pro.jpg",
    published_at: "2026-09-22T10:00:00Z",
    category_name: "Apple News",
    category_slug: "apple-news",
    author_name: "Tech Team",
    read_time: "8 min read",
  },
  {
    id: "hardcoded-2",
    slug: "signs-your-iphone-needs-repair",
    title: "5 Signs Your iPhone Needs Professional Repair",
    excerpt:
      "Learn the early warning signs — battery, screen, overheating, charging ports and camera issues — and how timely repairs save you money.",
    featured_image: "/Images/iphone-repair.png",
    published_at: "2025-01-15T10:00:00Z",
    category_name: "Repairs",
    category_slug: "repairs",
    author_name: "Tech Team",
    read_time: "6 min read",
  },
  {
    id: "hardcoded-3",
    slug: "buying-refurbished-vs-new",
    title: "Buying Refurbished vs New: How to Save Without Sacrificing Quality",
    excerpt:
      "Certified refurbished Apple devices explained: warranties, inspection, and how to decide what's right for you.",
    featured_image: "/Images/refurbished-vs-new.png",
    published_at: "2025-02-02T09:30:00Z",
    category_name: "Sales",
    category_slug: "sales",
    author_name: "Sales Team",
    read_time: "7 min read",
  },
  {
    id: "hardcoded-4",
    slug: "extend-macbook-lifespan",
    title: "How to Extend Your MacBook's Lifespan — Pro Tips",
    excerpt:
      "Practical maintenance tips to keep your MacBook running smoothly for years — cleaning, battery care, and smart upgrades.",
    featured_image: "/Images/whychooselaptop.png",
    published_at: "2025-03-05T13:15:00Z",
    category_name: "Maintenance",
    category_slug: "maintenance",
    author_name: "Service Team",
    read_time: "8 min read",
  },
  {
    id: "hardcoded-5",
    slug: "data-recovery-importance",
    title: "Why Data Recovery Matters — Protecting Memories & Business",
    excerpt:
      "How we recover lost photos, messages and business files — and steps you can take to avoid data loss in the future.",
    featured_image: "/Images/data-recovery.png",
    published_at: "2025-04-10T11:00:00Z",
    category_name: "Data",
    category_slug: "data",
    author_name: "Recovery Lab",
    read_time: "9 min read",
  },
  {
    id: "hardcoded-6",
    slug: "apple-watch-charging-issues-after-unauthorized-repair",
    title: "Why Your Apple Watch May Misbehave After an Unauthorized Repair",
    excerpt:
      "Learn why glue or improper handling during previous repairs can cause charging issues, overheating, and shutdowns — and why a proper diagnostic is essential.",
    featured_image: "/Images/apple-watch-repair.png",
    published_at: "2025-11-18T15:30:00Z",
    category_name: "Apple Watch",
    category_slug: "apple-watch",
    author_name: "Tech Repair Lab",
    read_time: "7 min read",
  },
  {
    id: "hardcoded-7",
    slug: "airpods-apple-watch-perfect-harmony",
    title: "AirPods and Apple Watch: Perfect Harmony for a Healthier You",
    excerpt:
      "Discover how AirPods and Apple Watch work seamlessly together to power your workouts, boost motivation, and support a healthier, more connected lifestyle.",
    featured_image: "/Images/airpods-apple-watch.png",
    published_at: "2025-11-25T10:00:00Z",
    category_name: "Wearables",
    category_slug: "wearables",
    author_name: "Tech Repair Lab",
    read_time: "6 min read",
  },
  {
    id: "hardcoded-8",
    slug: "free-up-iphone-storage",
    title: "How to Free Up Storage on Your iPhone and Make It Run Faster",
    excerpt:
      "Learn simple ways to clear heavy data, remove unnecessary files, and free up valuable storage space on your iPhone to keep it running smoothly.",
    featured_image: "/Images/iphone-storage-cleanup.png",
    published_at: "2025-11-28T10:00:00Z",
    category_name: "iPhone Tips",
    category_slug: "iphone-tips",
    author_name: "Tech Repair Lab",
    read_time: "5 min read",
  },
  {
    id: "hardcoded-9",
    slug: "iphone-liquid-detected-charging-port-fix",
    title:
      "iPhone Showing 'Liquid Detected in Charging Port'? Here's How to Fix It",
    excerpt:
      "If your iPhone shows the 'Liquid Detected in Lightning Connector' warning and refuses to charge, it may have moisture or debris in the port. Learn what causes it and how professionals safely fix the issue.",
    featured_image: "/Images/iphone-liquid-detected.png",
    published_at: "2025-12-01T10:00:00Z",
    category_name: "iPhone Repair",
    category_slug: "iphone-repair",
    author_name: "Tech Repair Lab",
    read_time: "4 min read",
  },
];

const BASE_CATEGORIES = [
  "repairs",
  "sales",
  "maintenance",
  "data",
  "apple-watch",
  "wearables",
  "iphone-tips",
  "iphone-repair",
  "apple-news",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openSlug, setOpenSlug] = useState(null);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Posts fetched from the real backend (added via the admin page)
  const [apiPosts, setApiPosts] = useState([]);

  useEffect(() => {
    blogAPI
      .getPosts()
      .then((data) => setApiPosts(data.results || []))
      .catch(() => {
        // Fine to fail silently here — hardcoded posts still render either way
      });
  }, []);

  // Hardcoded posts stay first (unchanged look/order), admin-added posts append after
  const existingSlugs = new Set(DUMMY_POSTS.map((p) => p.slug));
  const allPosts = [
    ...DUMMY_POSTS,
    ...apiPosts.filter((p) => !existingSlugs.has(p.slug)),
  ];

  const CATEGORIES = [
    { name: "All Posts", slug: "all", count: allPosts.length },
    ...Array.from(
      new Set([...BASE_CATEGORIES, ...allPosts.map((p) => p.category_slug)]),
    )
      .filter(Boolean)
      .map((slug) => {
        const match = allPosts.find((p) => p.category_slug === slug);
        return {
          name: match?.category_name || slug,
          slug,
          count: allPosts.filter((p) => p.category_slug === slug).length,
        };
      }),
  ];

  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      await newsletterAPI.subscribe(email);
      toast({
        title: "Subscribed!",
        description: "You will now receive our blog updates and offers.",
      });
      setEmail("");
    } catch (err) {
      toast({
        title: "Subscription failed",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category_slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Hardcoded posts open in the existing modal (unchanged behavior).
  // Admin-added posts don't have modal content, so they navigate to the
  // real BlogPostPage route, which already fetches from the API.
  const openArticle = (slug) => {
    if (FULL_ARTICLES[slug]) {
      setOpenSlug(slug);
    }
  };
  const closeArticle = () => setOpenSlug(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-black to-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl items-center mx-auto text-center">
            <div className="flex items-center gap-2 justify-center mb-4">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm tracking-wide uppercase">
                Repairs & Refurb Insights
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Apple Care Tips & Product Guides
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Expert advice on repairs, refurbishment, and buying Apple devices
              — for consumers who want value and reliability.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, repairs, or devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}{" "}
                <span className="ml-2 text-sm opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div>
          <div className="col-span-3 lg:col-span-3">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try another search or clear filters to see all posts.
                </p>
              </div>
            ) : (
              <>
                {/* Featured */}
                {!searchQuery && selectedCategory === "all" && (
                  <section className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-1 w-12 bg-blue-500 rounded" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        Featured Article
                      </h2>
                    </div>
                    <FeaturedOrCard
                      post={filteredPosts[0]}
                      featured
                      onOpen={openArticle}
                      formatDate={formatDate}
                    />
                  </section>
                )}

                {/* Grid */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-12 bg-slate-900 rounded" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchQuery
                        ? "Search Results"
                        : selectedCategory === "all"
                          ? "Latest Articles"
                          : `${CATEGORIES.find((c) => c.slug === selectedCategory)?.name} Articles`}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <FeaturedOrCard
                        key={post.id}
                        post={post}
                        onOpen={openArticle}
                        formatDate={formatDate}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-gray-300 mb-8">
              Get repair tips, refurbishment deals, and product arrivals
              delivered to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-black"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal / Reader — hardcoded posts only */}
      {openSlug && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-auto bg-black/60">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold">
                  {FULL_ARTICLES[openSlug]?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  By {DUMMY_POSTS.find((p) => p.slug === openSlug)?.author_name}{" "}
                  • {DUMMY_POSTS.find((p) => p.slug === openSlug)?.read_time}
                </p>
              </div>
              <button
                onClick={closeArticle}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8 prose max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    FULL_ARTICLES[openSlug]?.content ||
                    "<p>Article not available.</p>",
                }}
              />
            </div>
            <div className="p-6 border-t text-right">
              <button
                onClick={closeArticle}
                className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Shared card, used for both the featured slot and the grid — identical
// markup to your original, just factored out so featured/grid stay in sync
// and so it can decide modal-vs-navigate per post.
function FeaturedOrCard({ post, featured, onOpen, formatDate }) {
  const isHardcoded = Boolean(FULL_ARTICLES[post.slug]);
  const authorInitial = (post.author_name || "T").charAt(0);

  const inner = featured ? (
    <div className="grid md:grid-cols-2 gap-0">
      <div className="relative h-64 md:h-full overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
          <Tag className="h-3 w-3" />
          {post.category_name}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-6 text-lg">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black to-black flex items-center justify-center text-white font-semibold">
              {authorInitial}
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author_name}</p>
              <p className="text-sm text-gray-500">
                {formatDate(post.published_at)}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-500">{post.read_time}</span>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
            {post.category_name}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-black to-black flex items-center justify-center text-white text-sm font-semibold">
              {authorInitial}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author_name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(post.published_at)}
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {post.read_time}
          </span>
        </div>
      </div>
    </>
  );

  const wrapperClass = featured
    ? "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    : "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer";

  // Admin-added posts (no modal content available) go to the real post page
  if (!isHardcoded) {
    return (
      <Link to={`/blog/${post.slug}`} className={wrapperClass + " block"}>
        {inner}
      </Link>
    );
  }

  return (
    <article className={wrapperClass} onClick={() => onOpen(post.slug)}>
      {inner}
    </article>
  );
}
