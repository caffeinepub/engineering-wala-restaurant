import { Star } from "lucide-react";
import { motion } from "motion/react";

const REVIEWS = [
  {
    id: 1,
    name: "Arjun Sharma",
    avatar: "AS",
    rating: 5,
    date: "12 Mar 2026",
    title: "Best Biryani in Indore!",
    text: "Ordered the Chicken Biryani and it was absolutely divine. The spices were perfectly balanced and the portion size was generous. Delivery was super fast — barely 25 minutes!",
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "PP",
    rating: 5,
    date: "9 Mar 2026",
    title: "Paneer Butter Masala ❤️",
    text: "Being a vegetarian I was skeptical, but the Paneer Butter Masala here rivals any restaurant in the city. Rich, creamy, and full of flavour. Will order again!",
  },
  {
    id: 3,
    name: "Rohit Verma",
    avatar: "RV",
    rating: 5,
    date: "5 Mar 2026",
    title: "Engineering Special Combo Value!",
    text: "The combo deal is insane value for money. Burger, fries, and a cold drink for ₹199? No other place in Bhawarkua comes close. My hostel gang orders every Friday.",
  },
  {
    id: 4,
    name: "Neha Gupta",
    avatar: "NG",
    rating: 4,
    date: "1 Mar 2026",
    title: "Momos are addictive!",
    text: "Tried the steamed momos with chilli sauce and couldn't stop. The Buy 2 Get 1 Free deal made it even better. Packaging was neat and everything arrived hot.",
  },
  {
    id: 5,
    name: "Karan Mehta",
    avatar: "KM",
    rating: 5,
    date: "25 Feb 2026",
    title: "Reliable and Delicious",
    text: "I've ordered from Engineering Wala at least 15 times now. Never been disappointed. The Dal Tadka and Roti combo is my go-to on late study nights. Highly recommend!",
  },
  {
    id: 6,
    name: "Sunita Yadav",
    avatar: "SY",
    rating: 5,
    date: "20 Feb 2026",
    title: "Friendly Service + Great Food",
    text: "Placed an order via WhatsApp and got a customised meal exactly as requested. The team is very responsive and the food quality is consistently top-notch. 5 stars!",
  },
  {
    id: 7,
    name: "Vikram Singh",
    avatar: "VS",
    rating: 5,
    date: "18 Mar 2026",
    title: "Momos are simply the best!",
    text: "The steamed momos at Engineering Wala are absolutely on another level. Soft, juicy, perfectly spiced filling. My friends and I order every week without fail!",
  },
  {
    id: 8,
    name: "Pooja Jain",
    avatar: "PJ",
    rating: 5,
    date: "17 Mar 2026",
    title: "Great combo deals!",
    text: "The engineering special combo at ₹199 is unbelievable value. Burger, fries, and cold coffee for that price? Nowhere else in Indore. Highly recommended!",
  },
  {
    id: 9,
    name: "Deepak Tiwari",
    avatar: "DT",
    rating: 4,
    date: "15 Mar 2026",
    title: "Mutton Biryani was divine!",
    text: "Ordered the Mutton Biryani for the first time and it exceeded all expectations. Every grain of rice was infused with flavor. Will definitely order again!",
  },
  {
    id: 10,
    name: "Ananya Mishra",
    avatar: "AM",
    rating: 5,
    date: "14 Mar 2026",
    title: "Palak Paneer perfection!",
    text: "As someone who eats palak paneer everywhere, I can say Engineering Wala's version is truly special. Rich, creamy, and so well-spiced. The roti was perfect too!",
  },
  {
    id: 11,
    name: "Rahul Kumar",
    avatar: "RK",
    rating: 5,
    date: "12 Mar 2026",
    title: "Fastest delivery in Bhawarkua!",
    text: "Ordered at 8 PM and got the food in under 20 minutes. The chole bhature was fresh and hot. Amazing speed without compromising on quality!",
  },
  {
    id: 12,
    name: "Shreya Agarwal",
    avatar: "SA",
    rating: 5,
    date: "10 Mar 2026",
    title: "Owner is super responsive!",
    text: "Messaged on WhatsApp to customize my order — got a reply within 2 minutes. The customized meal was perfect. This personal service is rare these days!",
  },
  {
    id: 13,
    name: "Mohit Sharma",
    avatar: "MS",
    rating: 4,
    date: "8 Mar 2026",
    title: "Best Masala Chai ever!",
    text: "The masala chai is perfectly spiced — ginger, cardamom, everything in the right proportion. I order it every morning now. ₹25 for this quality is a steal!",
  },
  {
    id: 14,
    name: "Kavya Pandey",
    avatar: "KP",
    rating: 5,
    date: "6 Mar 2026",
    title: "Chowmein like street food!",
    text: "The veg chowmein tastes exactly like the best street food stall, but cleaner and more hygienic. The noodles are perfectly cooked, not mushy at all!",
  },
  {
    id: 15,
    name: "Aditya Soni",
    avatar: "AS2",
    rating: 5,
    date: "4 Mar 2026",
    title: "Chocolate Brownie is heavenly!",
    text: "Ended my meal with the chocolate brownie and ice cream combo. The brownie was warm, fudgy, and rich. Best dessert I've had in Indore. Period!",
  },
  {
    id: 16,
    name: "Ritu Dubey",
    avatar: "RD",
    rating: 4,
    date: "2 Mar 2026",
    title: "Great value for money!",
    text: "Ordered for my family of 4 and spent under ₹800. Everyone loved their food. The quantity is generous and the quality is consistent. Our family's go-to spot!",
  },
  {
    id: 17,
    name: "Saurav Pal",
    avatar: "SP",
    rating: 5,
    date: "28 Feb 2026",
    title: "Night owl's paradise!",
    text: "I study late nights and this place is a lifesaver. They deliver until late and the food always arrives fresh. The late night discount code is a bonus!",
  },
  {
    id: 18,
    name: "Ishita Kaur",
    avatar: "IK",
    rating: 5,
    date: "27 Feb 2026",
    title: "Veg Manchurian fan now!",
    text: "Never was a Manchurian person until I tried it here. The sauce is perfectly balanced — not too sour, not too spicy. Now I order it every week!",
  },
  {
    id: 19,
    name: "Hemant Yadav",
    avatar: "HY",
    rating: 5,
    date: "25 Feb 2026",
    title: "Idli Sambhar - South Indian in Indore!",
    text: "Being from Tamil Nadu, I'm always skeptical of South Indian food in central India. But Engineering Wala's idli and sambhar is authentic! Soft idlis, flavorful sambhar!",
  },
  {
    id: 20,
    name: "Swati Chouhan",
    avatar: "SC",
    rating: 4,
    date: "22 Feb 2026",
    title: "Veg Biryani was amazing!",
    text: "The veg biryani is so fragrant and flavorful. Every bite has whole spices, vegetables, and perfectly cooked basmati. Much better than other places in Bhawarkua!",
  },
  {
    id: 21,
    name: "Nikhil Bajpai",
    avatar: "NB",
    rating: 5,
    date: "20 Feb 2026",
    title: "Mutton curry to die for!",
    text: "The mutton curry is slow-cooked to perfection. The meat falls off the bone and the masala is deeply spiced. Had it with garlic naan — absolute bliss!",
  },
  {
    id: 22,
    name: "Tanya Singh",
    avatar: "TS",
    rating: 5,
    date: "18 Feb 2026",
    title: "Best restaurant in the area!",
    text: "Tried almost everything on the menu over the past month. Every single dish is top quality. Aadarsh bhai has built something truly special here!",
  },
  {
    id: 23,
    name: "Pankaj Dubey",
    avatar: "PD",
    rating: 4,
    date: "16 Feb 2026",
    title: "Referral codes work great!",
    text: "Used the ENGINEER20 code and saved ₹60 on my order. Everything was delicious — especially the paneer tikka and mango lassi combo. Great system!",
  },
  {
    id: 24,
    name: "Mansi Verma",
    avatar: "MV",
    rating: 5,
    date: "14 Feb 2026",
    title: "Valentine's dinner delivered!",
    text: "Ordered special food for Valentine's Day. The butter chicken and garlic naan were absolutely romantic. Packaging was neat with a little note. Super sweet gesture!",
  },
  {
    id: 25,
    name: "Gaurav Tiwari",
    avatar: "GT",
    rating: 5,
    date: "10 Feb 2026",
    title: "Student life saver!",
    text: "As a hostel student on a budget, Engineering Wala is my best friend. Great quality at very affordable prices. The student discount is a huge help. Love it!",
  },
  {
    id: 26,
    name: "Priyanka Lodhi",
    avatar: "PL",
    rating: 5,
    date: "7 Feb 2026",
    title: "Consistency is key!",
    text: "I've been ordering from Engineering Wala for 3 months and the quality has never dipped. Same great taste every time. That consistency is what keeps me coming back!",
  },
  {
    id: 27,
    name: "Akash Rawat",
    avatar: "AR",
    rating: 5,
    date: "22 Mar 2026",
    title: "Dal Tadka is heavenly!",
    text: "The dal tadka with ghee tadka on top is absolutely soul-warming. Perfect with garlic naan. Engineering Wala has nailed the simplest dishes too!",
  },
  {
    id: 28,
    name: "Simran Kaur",
    avatar: "SK",
    rating: 5,
    date: "21 Mar 2026",
    title: "Veg Thali is super value!",
    text: "The veg thali at ₹120 is unbelievably filling and tasty. 2 sabzis, dal, rice, rotis — everything fresh and hot. Perfect lunch option!",
  },
  {
    id: 29,
    name: "Suresh Patel",
    avatar: "SP2",
    rating: 4,
    date: "20 Mar 2026",
    title: "Chicken Thali was complete!",
    text: "The chicken thali had everything — chicken curry, dal, rice, rotis. Rich flavors and generous portions. Much better value than restaurants charging ₹300!",
  },
  {
    id: 30,
    name: "Anjali Bhatt",
    avatar: "AB",
    rating: 5,
    date: "19 Mar 2026",
    title: "Paneer Tikka Roll is a MUST try!",
    text: "The paneer tikka roll is hands down the best I've had in Bhawarkua. Smoky paneer, crunchy veggies, mint chutney in a crispy paratha. 10/10!",
  },
  {
    id: 31,
    name: "Chirag Patel",
    avatar: "CP",
    rating: 5,
    date: "18 Mar 2026",
    title: "Oreo Milkshake obsession!",
    text: "That Oreo milkshake is DANGEROUS. It's so thick and creamy, I now order it with every meal. Best milkshake I've had anywhere in Indore!",
  },
  {
    id: 32,
    name: "Ritika Singh",
    avatar: "RS",
    rating: 5,
    date: "17 Mar 2026",
    title: "Shahi Paneer is restaurant quality!",
    text: "The shahi paneer is as good as any 5-star restaurant. The saffron cream gravy is luxurious and the paneer is soft. Worth every rupee!",
  },
  {
    id: 33,
    name: "Vishal Yadav",
    avatar: "VY",
    rating: 4,
    date: "16 Mar 2026",
    title: "Bhel Puri took me back!",
    text: "Reminds me of street food from my childhood, but cleaner and more consistent. The tangy tamarind balance is perfect. Will keep ordering!",
  },
  {
    id: 34,
    name: "Komal Joshi",
    avatar: "KJ",
    rating: 5,
    date: "15 Mar 2026",
    title: "Tandoori Chicken is MASSIVE!",
    text: "The tandoori chicken half is huge — at least 5-6 juicy pieces. The smokiness is authentic and the marinade is deeply flavored. Best in Bhawarkua!",
  },
  {
    id: 35,
    name: "Harshit Nema",
    avatar: "HN",
    rating: 5,
    date: "14 Mar 2026",
    title: "Dal Tadka + Aloo Paratha combo!",
    text: "I always order dal tadka with aloo paratha. The paratha comes with fresh dahi and the dal has that beautiful smoky ghee flavor. Perfect combo!",
  },
  {
    id: 36,
    name: "Divya Malviya",
    avatar: "DM",
    rating: 5,
    date: "13 Mar 2026",
    title: "Paneer Chilli is addictive!",
    text: "The paneer chilli dry is absolutely addictive. Crispy paneer, colorful bell peppers, spicy sauce — Indo-Chinese perfection. Ordered twice this week!",
  },
  {
    id: 37,
    name: "Arun Sharma",
    avatar: "AS3",
    rating: 4,
    date: "12 Mar 2026",
    title: "Kadhi Pakora like home!",
    text: "The kadhi pakora tastes exactly like my mom used to make. The yogurt curry is smooth and the pakoras are light and crispy. Very impressed!",
  },
  {
    id: 38,
    name: "Priyam Gupta",
    avatar: "PG",
    rating: 5,
    date: "11 Mar 2026",
    title: "Chicken Kathi Roll - the best!",
    text: "The chicken kathi roll has perfectly marinated chicken, loads of onions, green chutney — all wrapped tight in a crispy paratha. Pure perfection!",
  },
  {
    id: 39,
    name: "Nisha Verma",
    avatar: "NV",
    rating: 5,
    date: "10 Mar 2026",
    title: "Strawberry Shake refreshed me!",
    text: "On a hot day, that strawberry shake was heaven. Fresh strawberry flavor, thick, cold, topped with whipped cream. Much better than any fast food chain!",
  },
  {
    id: 40,
    name: "Siddharth Jain",
    avatar: "SJ",
    rating: 4,
    date: "9 Mar 2026",
    title: "Chana Masala and roti combo!",
    text: "The chana masala is perfectly spiced with a tangy bite. Had it with tandoori roti. Very satisfying meal for under ₹150. Amazing value!",
  },
  {
    id: 41,
    name: "Meera Tiwari",
    avatar: "MT",
    rating: 5,
    date: "8 Mar 2026",
    title: "Best online ordering experience!",
    text: "The website ordering system is so smooth. Added items to cart, entered address, paid — all in under 2 minutes. Food arrived fresh. Engineering Wala rocks!",
  },
  {
    id: 42,
    name: "Rohit Chouhan",
    avatar: "RC",
    rating: 5,
    date: "7 Mar 2026",
    title: "Sev Puri is street food perfection!",
    text: "The sev puri has that perfect sweet-spicy-tangy balance. Crispy puris, soft potato, crunchy sev, tangy chutney. Takes me back to street corners!",
  },
  {
    id: 43,
    name: "Sakshi Rajput",
    avatar: "SR",
    rating: 4,
    date: "6 Mar 2026",
    title: "Order tracking is so satisfying!",
    text: "Loved watching my order go from Confirmed to Preparing to Delivered in real-time. That tracking feature is super satisfying. Shows how professional this place is!",
  },
  {
    id: 44,
    name: "Tarun Mishra",
    avatar: "TM",
    rating: 5,
    date: "5 Mar 2026",
    title: "Chicken Fried Rice was perfect!",
    text: "The chicken fried rice had just the right amount of soy sauce, plenty of vegetables, and tender chicken pieces. Not greasy at all. Will definitely order again!",
  },
  {
    id: 45,
    name: "Aliya Khan",
    avatar: "AK",
    rating: 5,
    date: "4 Mar 2026",
    title: "Egg Bhurji breakfast was amazing!",
    text: "Ordered the egg bhurji in the morning and it was just like home-cooked. Perfectly spiced with lots of onions and tomatoes. Hot delivery too!",
  },
  {
    id: 46,
    name: "Dhruv Saxena",
    avatar: "DS",
    rating: 5,
    date: "3 Mar 2026",
    title: "Engineering Wala = top tier!",
    text: "Been ordering from here for 4 months now. The consistency is unreal. Same great taste every single order. Aadarsh bhai has truly built something special in Bhawarkua!",
  },
];

const STAR_POSITIONS = [1, 2, 3, 4, 5];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_POSITIONS.map((pos) => (
        <motion.span
          key={pos}
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: pos * 0.06,
            type: "spring",
            stiffness: 300,
            damping: 14,
          }}
        >
          <Star
            size={14}
            className={
              pos <= rating
                ? "text-orange-400 fill-orange-400"
                : "text-gray-600"
            }
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function CustomerReviewsSection() {
  return (
    <section className="py-16 px-4" style={{ background: "#0B0F14" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-orange-500 mb-3">
            What Our Customers Say
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-3"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Customer{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF6B00, #FF9F45)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Reviews
            </span>
          </h2>
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={22}
                  className="text-orange-400 fill-orange-400"
                />
              ))}
            </div>
            <span className="text-white font-extrabold text-2xl">4.8</span>
            <span className="text-gray-400 text-sm">
              / 5 based on 46+ reviews
            </span>
          </motion.div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{
                y: -6,
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.5), 0 0 20px rgba(242,154,46,0.1)",
                borderColor: "rgba(242,154,46,0.35)",
              }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "#161B22",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.25s",
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <motion.div
                  className="w-10 h-10 rounded-full btn-orange flex items-center justify-center font-bold text-sm flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 350 }}
                >
                  {review.avatar}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm">
                    {review.name}
                  </div>
                  <div className="text-gray-500 text-xs">{review.date}</div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <p className="font-semibold text-white text-sm mb-2">
                {review.title}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
