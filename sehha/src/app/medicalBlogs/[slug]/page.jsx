import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// Sample blog data - in a real app, this would come from a database or API
const blogPosts = {
  "essential-vaccinations": {
    id: 1,
    title: "Essential Vaccinations for Your Pet",
    date: "April 2, 2025",
    author: "Dr. Sarah Johnson",
    authorRole: "Veterinarian, DVM",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Pet Health",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <p>Vaccinations are a crucial part of preventative healthcare for your pets. They help protect against various infectious diseases, some of which can be fatal. Understanding which vaccines your pet needs and when they should receive them is an important aspect of responsible pet ownership.</p>
      
      <h2>Core Vaccines for Dogs</h2>
      <p>Core vaccines are recommended for all dogs, regardless of their lifestyle or location. These include:</p>
      <ul>
        <li><strong>Rabies:</strong> Required by law in most areas, this vaccine protects against the fatal rabies virus.</li>
        <li><strong>Distemper:</strong> Protects against a virus that affects the respiratory, gastrointestinal, and nervous systems.</li>
        <li><strong>Parvovirus:</strong> Guards against a highly contagious virus that causes severe vomiting and diarrhea.</li>
        <li><strong>Adenovirus (Hepatitis):</strong> Prevents infectious canine hepatitis, which affects the liver.</li>
      </ul>
      
      <h2>Core Vaccines for Cats</h2>
      <p>For feline companions, the core vaccines include:</p>
      <ul>
        <li><strong>Rabies:</strong> Also required by law for cats in many areas.</li>
        <li><strong>Feline Viral Rhinotracheitis:</strong> Protects against a herpesvirus that causes upper respiratory infections.</li>
        <li><strong>Calicivirus:</strong> Another cause of respiratory infections in cats.</li>
        <li><strong>Panleukopenia:</strong> Also known as feline distemper, this highly contagious virus can be deadly.</li>
      </ul>
      
      <h2>Non-Core Vaccines</h2>
      <p>Depending on your pet's lifestyle, location, and risk factors, your veterinarian might recommend additional vaccines such as:</p>
      <ul>
        <li><strong>For Dogs:</strong> Bordetella (kennel cough), Leptospirosis, Lyme disease, Canine influenza</li>
        <li><strong>For Cats:</strong> Feline leukemia virus (FeLV), Feline immunodeficiency virus (FIV), Bordetella</li>
      </ul>
      
      <h2>Vaccination Schedule</h2>
      <p>Puppies and kittens typically start their vaccination series between 6-8 weeks of age, with boosters given every 3-4 weeks until they're about 16 weeks old. Adult pets require regular boosters, with frequency varying by vaccine type and local regulations.</p>
      
      <h2>Potential Side Effects</h2>
      <p>While vaccines are generally safe, some pets may experience mild side effects such as:</p>
      <ul>
        <li>Soreness at the injection site</li>
        <li>Mild fever</li>
        <li>Reduced appetite or activity</li>
      </ul>
      <p>Serious reactions are rare but can occur. Contact your veterinarian immediately if your pet experiences severe vomiting, facial swelling, difficulty breathing, or collapse after vaccination.</p>
      
      <h2>Conclusion</h2>
      <p>Regular vaccinations are an essential component of your pet's preventative healthcare regimen. Consult with your veterinarian to develop a vaccination schedule tailored to your pet's specific needs based on their age, health status, lifestyle, and risk factors.</p>
      
      <p>Through VetNova's platform, you can easily schedule vaccination appointments or consult with veterinarians about which vaccines are right for your pet. Our professionals can help you make informed decisions to keep your furry family members protected and healthy.</p>
    `,
    relatedPosts: [2, 4, 5],
  },
  "senior-dog-nutrition": {
    id: 2,
    title: "Nutrition Tips for Senior Dogs",
    date: "March 28, 2025",
    author: "Dr. Michael Chen",
    authorRole: "Veterinary Nutritionist",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Nutrition",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <p>As dogs age, their nutritional needs change significantly. Senior dogs typically require fewer calories but need more of certain nutrients to support their aging bodies. This article explores how to adapt your senior dog's diet for optimal health and longevity.</p>
      
      <h2>When Is a Dog Considered "Senior"?</h2>
      <p>Generally, dogs are considered seniors when they reach the last 25% of their expected lifespan. This varies by breed:</p>
      <ul>
        <li>Small breeds (under 20 pounds): Around 10-12 years</li>
        <li>Medium breeds (20-50 pounds): Around 8-10 years</li>
        <li>Large breeds (50-90 pounds): Around 6-8 years</li>
        <li>Giant breeds (over 90 pounds): Around 5-6 years</li>
      </ul>
      
      <h2>Key Nutritional Considerations</h2>
      
      <h3>Calories</h3>
      <p>Senior dogs typically have lower energy requirements due to decreased activity levels and a slower metabolism. Overfeeding can lead to obesity, which exacerbates joint problems and other health issues common in older dogs. Unless your senior dog is underweight, they likely need 20-30% fewer calories than they did as adults.</p>
      
      <h3>Protein</h3>
      <p>Contrary to outdated beliefs, most senior dogs benefit from maintained or even increased protein levels. High-quality protein helps preserve muscle mass, which naturally decreases with age. Look for foods with at least 25% protein from animal sources, unless your dog has kidney disease (in which case, follow your vet's specific recommendations).</p>
      
      <h3>Fat</h3>
      <p>While overall fat content may need to be reduced to prevent weight gain, certain fatty acids are crucial for senior dogs:</p>
      <ul>
        <li><strong>Omega-3 fatty acids</strong> (especially EPA and DHA): Help reduce inflammation, support cognitive function, and promote joint health</li>
        <li><strong>Medium-chain triglycerides (MCTs)</strong>: May help support brain function in aging dogs</li>
      </ul>
      
      <h3>Fiber</h3>
      <p>Increased fiber can help with common senior dog issues like constipation and maintaining healthy weight. Look for foods with moderate to high fiber content (around 3-5%).</p>
      
      <h3>Vitamins and Minerals</h3>
      <p>Senior dogs often benefit from increased levels of:</p>
      <ul>
        <li><strong>Antioxidants</strong> (vitamins E and C, selenium): Help combat oxidative stress</li>
        <li><strong>B vitamins</strong>: Support energy metabolism and neurological function</li>
        <li><strong>Glucosamine and chondroitin</strong>: Support joint health</li>
      </ul>
      
      <h2>Hydration</h2>
      <p>Senior dogs are more prone to dehydration and kidney issues. Ensure fresh water is always available. Consider adding water to dry food or incorporating wet food into their diet to increase moisture intake.</p>
      
      <h2>Feeding Schedule</h2>
      <p>Many senior dogs do better with smaller, more frequent meals rather than one or two large meals per day. This can help with digestion and maintain energy levels.</p>
      
      <h2>Special Considerations</h2>
      
      <h3>Dental Health</h3>
      <p>Many senior dogs have dental issues that make chewing difficult. Softer foods or moistened kibble may be easier for them to eat.</p>
      
      <h3>Chronic Conditions</h3>
      <p>Senior dogs often develop conditions that require dietary management:</p>
      <ul>
        <li><strong>Arthritis</strong>: Anti-inflammatory nutrients like omega-3s, glucosamine, and chondroitin</li>
        <li><strong>Kidney disease</strong>: Reduced phosphorus and sodium, controlled protein</li>
        <li><strong>Heart disease</strong>: Reduced sodium, increased taurine and L-carnitine</li>
        <li><strong>Cognitive decline</strong>: Antioxidants, omega-3s, MCTs</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Adjusting your senior dog's diet to meet their changing needs can significantly improve their quality of life and potentially extend their lifespan. Consult with your veterinarian to develop a nutrition plan tailored to your senior dog's specific health status, breed, and lifestyle.</p>
      
      <p>Through VetNova's platform, you can schedule nutritional consultations with veterinary specialists who can provide personalized recommendations for your aging companion.</p>
    `,
    relatedPosts: [1, 3, 4],
  },
  "cat-pain-signs": {
  id: 3,
  title: "Signs Your Cat Might Be in Pain",
  date: "March 25, 2025",
  author: "Dr. Emily Carter",
  authorRole: "Feline Behavior Specialist",
  authorImage: "/placeholder.svg?height=100&width=100",
  category: "Cat Care",
  image: "/placeholder.svg?height=600&width=1200",
  content: `
    <p>Cats are known for their stoic nature, often hiding signs of pain or illness. This instinctive behavior can make it challenging for cat owners to recognize when something is wrong. However, there are several subtle signs that may indicate your feline friend is experiencing discomfort.</p>
    
    <h2>Changes in Behavior</h2>
    <p>Behavioral changes are often the first indicators of pain. These may include:</p>
    <ul>
      <li>Becoming withdrawn or hiding more often</li>
      <li>Increased aggression or irritability</li>
      <li>Decreased interest in playing or interacting</li>
      <li>Reluctance to be touched or handled</li>
    </ul>

    <h2>Altered Movement</h2>
    <p>Pain can cause cats to change how they move. Watch for signs such as:</p>
    <ul>
      <li>Limping or stiffness, especially after rest</li>
      <li>Reluctance to jump onto surfaces they previously accessed easily</li>
      <li>Moving more slowly or cautiously</li>
    </ul>

    <h2>Changes in Grooming</h2>
    <p>Grooming habits can also signal discomfort:</p>
    <ul>
      <li>Overgrooming a specific area (could indicate localized pain)</li>
      <li>Neglecting grooming altogether, leading to a messy or matted coat</li>
    </ul>

    <h2>Eating and Litter Box Habits</h2>
    <p>Pain may affect your cat’s appetite and bathroom routines:</p>
    <ul>
      <li>Eating less or avoiding food completely</li>
      <li>Changes in litter box behavior, including accidents outside the box</li>
    </ul>

    <h2>Vocalization and Facial Expressions</h2>
    <p>Some cats may vocalize more when in pain, while others become unusually quiet. Look for:</p>
    <ul>
      <li>Increased meowing, growling, or hissing</li>
      <li>Squinting, flattened ears, or a tense facial expression</li>
    </ul>

    <h2>What to Do If You Suspect Pain</h2>
    <p>If you notice any of these signs, consult your veterinarian. Never attempt to medicate your cat without professional guidance—many human medications are toxic to felines.</p>

    <h2>Conclusion</h2>
    <p>Understanding your cat’s behavior and staying alert to subtle changes can help you detect pain early. Early intervention leads to better outcomes and improved quality of life for your feline companion.</p>
    
    <p>VetNova offers expert consultations to help you identify and address potential health concerns in your cat. Schedule an appointment today to ensure your pet’s comfort and wellbeing.</p>
  `,
  relatedPosts: [1, 4, 6],
},
"regular-checkups": {
  id: 4,
  title: "The Benefits of Regular Vet Check-ups",
  date: "March 20, 2025",
  author: "Dr. Michael Reeves",
  authorRole: "Preventative Care Specialist",
  authorImage: "/placeholder.svg?height=100&width=100",
  category: "Preventative Care",
  image: "/placeholder.svg?height=600&width=1200",
  content: `
    <p>Regular veterinary check-ups play a crucial role in ensuring your pet lives a long, healthy life. These appointments allow vets to detect potential issues early, administer vaccinations, and provide valuable health advice tailored to your pet's unique needs.</p>

    <h2>Early Detection of Health Issues</h2>
    <p>Routine exams can catch health problems before they become serious. Conditions like dental disease, obesity, or heart issues are easier to manage when identified early.</p>

    <h2>Updating Vaccinations</h2>
    <p>Veterinarians will ensure your pet is up to date with all necessary vaccinations, protecting them from preventable diseases.</p>

    <h2>Parasite Prevention</h2>
    <p>Regular visits include screening for fleas, ticks, and worms—common parasites that can affect your pet’s comfort and health.</p>

    <h2>Weight and Nutrition Monitoring</h2>
    <p>Your vet can offer advice on diet and exercise, helping to maintain a healthy weight and prevent obesity-related issues.</p>

    <h2>Dental Health Checks</h2>
    <p>Oral health is often overlooked, but dental problems can lead to pain and systemic illness. Routine checks help keep those teeth in top shape.</p>

    <h2>Conclusion</h2>
    <p>Don’t wait for something to go wrong—regular vet visits are a proactive way to support your pet’s well-being. Book a check-up today through VetNova and take the next step toward a healthier future for your companion.</p>
  `,
  relatedPosts: [1, 3, 6]
},
"video-consultation-prep": {
  id: 5,
  title: "How to Prepare Your Pet for a Video Consultation",
  date: "March 15, 2025",
  author: "Dr. Karen Liu",
  authorRole: "Telemedicine Expert",
  authorImage: "/placeholder.svg?height=100&width=100",
  category: "Telemedicine",
  image: "/placeholder.svg?height=600&width=1200",
  content: `
    <p>Video consultations offer a convenient way to access veterinary care from the comfort of your home. With a little preparation, you can ensure the appointment goes smoothly and your pet gets the care they need.</p>

    <h2>Choose a Quiet Location</h2>
    <p>Select a well-lit, quiet area free from distractions to conduct the video call. This helps both the vet and your pet stay focused.</p>

    <h2>Ensure Good Lighting</h2>
    <p>Make sure your vet can clearly see your pet by using natural light or a bright lamp. Avoid backlighting from windows.</p>

    <h2>Have Medical Records Handy</h2>
    <p>Prepare any relevant documents such as vaccination records, previous diagnoses, or medications your pet is taking.</p>

    <h2>Use a Stable Camera</h2>
    <p>Position your device so the camera is stable. If possible, use a tripod or rest it on a flat surface.</p>

    <h2>Keep Your Pet Calm</h2>
    <p>Have treats or a favorite toy nearby to help keep your pet relaxed during the call. If possible, enlist help to hold your pet when needed.</p>

    <h2>Conclusion</h2>
    <p>With the right preparation, video consultations can be just as effective as in-person visits. VetNova makes it easy to connect with professionals who care about your pet’s well-being.</p>
  `,
  relatedPosts: [2, 4, 6]
},
"parasite-prevention": {
  id: 6,
  title: "Common Parasites and How to Prevent Them",
  date: "March 10, 2025",
  author: "Dr. Rachel Kim",
  authorRole: "Parasitology Specialist",
  authorImage: "/placeholder.svg?height=100&width=100",
  category: "Parasites",
  image: "/placeholder.svg?height=600&width=1200",
  content: `
    <p>Parasites can cause discomfort and serious health issues in pets. Learning how to identify and prevent infestations is essential to your pet’s long-term health.</p>

    <h2>Fleas</h2>
    <p>Fleas are external parasites that cause itching, hair loss, and skin infections. They can also carry tapeworms and other diseases. Regular flea prevention treatments are key.</p>

    <h2>Ticks</h2>
    <p>Ticks can transmit diseases like Lyme disease and Ehrlichiosis. Check your pet regularly, especially after outdoor activities, and use vet-approved tick preventatives.</p>

    <h2>Intestinal Worms</h2>
    <p>Worms like roundworms, hookworms, and tapeworms live in the digestive tract. Symptoms include weight loss, diarrhea, and visible worms in feces. Regular deworming is essential.</p>

    <h2>Heartworms</h2>
    <p>Spread by mosquitoes, heartworms can be deadly. Prevention is much easier and safer than treatment, so ensure your pet receives monthly heartworm prevention.</p>

    <h2>Preventative Measures</h2>
    <ul>
      <li>Use vet-recommended flea and tick preventatives</li>
      <li>Keep your home and yard clean</li>
      <li>Schedule routine deworming</li>
      <li>Monitor your pet’s behavior and health closely</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Parasites are a preventable threat. Partner with your veterinarian to develop a parasite control plan tailored to your pet's lifestyle. VetNova is here to support you every step of the way.</p>
  `,
  relatedPosts: [1, 3, 4]
},

}

// Function to get related posts
function getRelatedPosts(slug) {
  const post = blogPosts[slug]
  if (!post || !post.relatedPosts) return []

  return post.relatedPosts
    .map((id) => {
      // Find the post with matching id
      const relatedSlug = Object.keys(blogPosts).find((key) => blogPosts[key].id === id)
      if (!relatedSlug) return null
      const relatedPost = blogPosts[relatedSlug]
      return {
        id: relatedPost.id,
        title: relatedPost.title,
        slug: relatedSlug,
        image: relatedPost.image,
        category: relatedPost.category,
      }
    })
    .filter(Boolean)
}

export default function BlogPostPage({ params }) {
  const { slug } = params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#FC7729] text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-white mb-8 hover:text-[#FCAA29] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-[#FCAA29] text-[#1D1D1D] text-sm font-medium px-3 py-1 rounded-full mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-[#FFFFFF]/80">
                  {post.authorRole} • {post.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Share Section */}
          <div className="border-t border-b border-[#C8C8C8] py-6 my-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="font-medium text-[#303241]">Share this article</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-[#303241] text-white flex items-center justify-center hover:bg-[#FC7729] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#303241] text-white flex items-center justify-center hover:bg-[#FC7729] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#303241] text-white flex items-center justify-center hover:bg-[#FC7729] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#303241] text-white flex items-center justify-center hover:bg-[#FC7729] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
     {/* Related Posts */}
{relatedPosts.length > 0 && (
  <section className="bg-[#F9F9F9] py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-[#777]">{post.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#303241] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Have Questions About Your Pet's Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with professional veterinarians through secure appointments, live video calls, and real-time
            messaging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FC7729] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Book a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

