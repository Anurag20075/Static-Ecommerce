// mockData.js

export const categories = [
  { title: "Men's Collection", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop", link: "#" },
  { title: "Women's Collection", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop", link: "#" },
  { title: "Summer Collection", img: "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?w=600&h=800&fit=crop", link: "#" },
  { title: "New Arrivals", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop", link: "#" },
];

export const bestSellers = [
  { id: 1, name: "Linen Blend Shirt", price: 59, rating: 4.8, reviews: 128, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop" },
  { id: 2, name: "Relaxed Fit Trouser", price: 79, rating: 4.9, reviews: 96, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop" },
  { id: 3, name: "Oversized Cotton Tee", price: 39, rating: 4.7, reviews: 214, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
  { id: 4, name: "Tailored Blazer", price: 129, rating: 4.9, reviews: 112, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop" },
  { id: 5, name: "Pleated Mini Skirt", price: 49, rating: 4.6, reviews: 85, img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop" },
  { id: 6, name: "Ribbed Tank Top", price: 29, rating: 4.8, reviews: 163, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop" },
];

export const newArrivals = [
  { id: 7, name: "Silk Blouse", price: 89, img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=400&fit=crop" },
  { id: 8, name: "Cashmere Cardigan", price: 149, img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop" },
  { id: 9, name: "Wide Leg Pant", price: 99, img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&h=400&fit=crop" },
  { id: 10, name: "Knit Polo", price: 69, img: "https://images.unsplash.com/photo-1625910513413-5fc4e5e6727c?w=300&h=400&fit=crop" },
  { id: 11, name: "Linen Jumpsuit", price: 119, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop" },
  { id: 12, name: "Cotton Shorts", price: 49, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop" },
  { id: 13, name: "Structured Bag", price: 189, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=400&fit=crop" },
  { id: 14, name: "Leather Belt", price: 59, img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=300&h=400&fit=crop" },
];

export const testimonials = [
  { id: 1, name: "Sophie L.", text: "The quality is outstanding! Luxora has become my go-to brand for every season.", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 2, name: "James T.", text: "Minimal, stylish, and premium. The pieces feel expensive and look even better.", rating: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Emma R.", text: "Fast shipping and the fit is perfect. The best online shopping experience!", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
];

export const instagramPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop", likes: "1.2k" },
  { id: 2, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop", likes: "845" },
  { id: 3, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop", likes: "2.1k" },
  { id: 4, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop", likes: "956" },
  { id: 5, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop", likes: "1.5k" },
  { id: 6, image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=300&fit=crop", likes: "723" },
  { id: 7, image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop", likes: "1.8k" },
  { id: 8, image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop", likes: "1.1k" },
];

export const features = [
  { icon: "Award", title: "Premium Quality", text: "Crafted from the finest materials sourced globally." },
  { icon: "Truck", title: "Fast Shipping", text: "Free worldwide shipping on all orders over $150." },
  { icon: "Leaf", title: "Sustainable", text: "Ethically made in fair-trade certified facilities." }
];