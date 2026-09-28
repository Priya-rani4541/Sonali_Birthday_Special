// ✏️ EDIT EVERYTHING HERE: birthday date, quiz, letters, gifts, timeline, reasons, wishes.

// Sonali's birthday (month 1-12, day). CHANGE THIS to her real birthday.
export const BIRTHDAY = { month: 9, day: 28 }

// Quiz: `answer` is the index (starting at 0) of the correct option. A=0, B=1, C=2, D=3.
export const QUIZ = [
  { q: 'Tumko sabse zyada pyaar kaun karta hai?', options: ['Mummy', 'Papa Ji', 'Maa', 'Nana Ji'], answer: 1, note: 'Papa Ji ka pyaar sabse alag hai! ❤️' },
  { q: 'Tumko pyaar se "Jhadgaraniya" kaun bolta hai?', options: ['Maa', 'Papa Ji', 'Nana Ji', 'Mummy'], answer: 2, note: 'Nana Ji ka pyaara naam! ❤️' },
  { q: 'Kaun tumko apna leg touch karne ke liye bolta hai?', options: ['Priya', 'Kajal', 'Tejaswi', 'Anmol'], answer: 3, note: 'Anmol ki toh baat hi alag hai! 😄' },
  { q: 'Tumko sabse zyada kya pasand hai?', options: ['Enjoy', 'Study', 'Playing Game', 'Using Mobile Phone'], answer: 0, note: 'Enjoy, enjoy aur bas enjoy! 🥳' },
  { q: 'Achha-achha dish banakar khilane par sabse zyada logon se tareef kaun karta hai?', options: ['Priya', 'Anmol', 'Maa aur Mummy', 'Naina'], answer: 2, note: 'Maa aur Mummy ke haath ka jaadu! ❤️' },
  { q: 'Pyaar se "Bhuti" kaun bulata hai tumko?', options: ['Rahul Bhaiya', 'Rishu Bhaiya', 'Akash Bhaiya', 'Prakash Bhaiya'], answer: 1, note: 'Rishu Bhaiya ka special naam! ❤️' },
  { q: 'Bachpan mein TV dekhne ke liye remote ko lekar tumse kaun ladta tha?', options: ['Shubham', 'Bada Babu', 'Anmol', 'Ankit'], answer: 2, note: 'Anmol aur remote ki ladai! 😂' },
  { q: 'Bachpan mein Maa ki godi mein sone ke liye tumse kaun ladta tha?', options: ['Tejaswi', 'Kajal', 'Priya', 'Shiwani'], answer: 2, note: 'Priya bhi Maa ki godi chahti thi! 🥰' },
]
export const QUIZ_RESULTS = [
  { min: 0, msg: 'Oops! Koi baat nahi, tum phir bhi meri favourite ho. 😄' },
  { min: 5, msg: 'Badhiya! Tum toh sabko achhe se jaanti ho. 💕' },
  { min: 8, msg: 'Wow! Full marks! Tumhe sab kuch pata hai. 🥹' },
]

export const OPEN_WHEN = [
  { title: 'Open when you feel sad', icon: '🌧️', msg: 'It is okay to cry, my love. This feeling will pass, and I will be right here till it does. You are stronger than you think, and you are never alone. Call me, and I will come running. ❤️' },
  { title: 'Open when you miss me', icon: '💌', msg: 'Close your eyes and picture us laughing over nothing. Distance never changes a sister. I miss you too, and I am only one call away. 🤗' },
  { title: 'Open when you need a hug', icon: '🫂', msg: 'Here is the biggest, tightest hug from me. Hold it as long as you need. You are loved more than you know. 💖' },
  { title: 'Open when you need to smile', icon: '😊', msg: 'Remember our silliest moment together? Yes, that one. Now smile, because the world is prettier when you do! ✨' },
]

// type: 'photo' shows a photo (photo = which sonali number), others show text.
export const GIFTS = [
  { icon: '📸', title: 'A Special Photo', type: 'photo', photo: 2, text: 'One of my favourite memories of us.' },
  { icon: '😂', title: 'A Funny Memory', type: 'text', text: 'Remember when we tried to hide something from Mummy and failed badly? I still laugh about it!' },
  { icon: '💖', title: 'An Emotional Message', type: 'text', text: 'You never asked for much, yet you gave me everything: your time, your care, and your heart.' },
  { icon: '🤝', title: 'A Promise', type: 'text', text: 'I promise to always stand by you, listen to you, and be your biggest supporter.' },
  { icon: '💌', title: 'Final Birthday Letter', type: 'text', text: 'Sonali, thank you for being my sister and my safest place. Happy Birthday, my heart. I love you endlessly.' },
]

// photo = which sonali number to show (1, 2, 3...). Falls back to an emoji.
export const TIMELINE = [
  { title: 'Childhood Days', caption: 'Two little kids, one big world of games.', photo: 1, icon: '🧸' },
  { title: 'Funny Fights', caption: 'Fighting over the remote, and making up in minutes.', photo: 2, icon: '😜' },
  { title: 'Family Moments', caption: 'Festivals, food, and endless laughter together.', photo: 3, icon: '🏠' },
  { title: 'Always There', caption: 'Every tough day, you were my support.', photo: 4, icon: '🤗' },
  { title: 'Today', caption: 'Still my best friend, still my safe place.', photo: 5, icon: '🎂' },
]

export const REASONS = [
  'You are my safe place', 'You always support me', 'You care for our family', 'You are my forever crime partner',
  'You have the kindest heart', 'You always speak the truth', 'You are happy with so little',
  'You never judge me', 'You make me laugh', 'You are simply my Sonali',
]

export const WISHES = [
  'May every dream of yours come true 🌟', 'Wishing you endless happiness 💖', 'May your smile never fade 🌸',
  'May this year bring you everything you deserve ✨', 'Stay as pure-hearted as you are 🤍', 'Health, peace, and lots of love 🌷',
  'May you always feel safe and loved 🫂', 'Here is to more crazy adventures together 🤝', 'You deserve the whole sky 🦋',
  'May your heart stay this kind forever 💗', 'Sending you a million hugs 🤗', 'Never stop being you 🎀',
]

export const SCRATCH_MESSAGE = 'You are my favourite person in the whole world. Happy Birthday, Sonali! 💖'
export const CELEBRATION_TITLE = 'Our Birthday Celebration 🎉'
export const CAKE_WISH = 'Happy Birthday, Sonali! May every wish in your beautiful heart come true. 🌟'
export const FINAL_MESSAGE =
  'Happy Birthday, Sonali! You are my sister, my best friend, my safe place, and my forever partner in crime. No matter what happens, I will always be there for you. I love you endlessly. ❤️'
