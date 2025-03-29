'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [dayIndex, setDayIndex] = useState(0);
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [mood, setMood] = useState(null);
  const [journal, setJournal] = useState('');

  const loveNotes = [
    "You don’t have to be perfect to be loved. You already are 💕",
    "You’re doing amazing, even if it doesn’t feel like it 💫",
    "One step at a time. You’ve got this — and you’ve got me 🫶",
    "Some days will feel heavier. That’s okay. You’re allowed 🌧️",
    "You make my world brighter — even on your dim days 🌈",
    "Breathe. You’re safe. You’re strong. You’re supported 💖",
    "You’re allowed to rest. Rest is part of healing 💤",
    "Even when you doubt yourself, I believe in you ✨",
    "Progress, not perfection. Always. 🌱",
    "You’re my favorite kind of magic 💫"
  ];

  const affirmations = [
    "It’s okay if today feels heavy. You’re allowed to slow down. 🌧️",
    "You are not your productivity. Just existing is enough. 🌿",
    "Even small steps are steps. Be proud of the little things. 👣",
    "Your feelings are valid. You don’t have to fix everything. 💛",
    "You are loved — even when you don’t feel like it. 💌",
    "Healing isn’t linear. Some days are just about surviving. 🌙",
    "You’ve gotten through 100% of your hard days so far. 💪",
    "Being gentle with yourself is powerful. 🕊️",
    "You can say no. You can rest. You are allowed. 🛏️",
    "The world is softer with you in it. Don’t forget that. ☁️",
    "No sugar, no pressure — just kindness today. 🍬❌",
    "Your health is your priority, and I’m proud of you for making it that. 💖",
    "Remember: I'm not going anywhere. I’m here, always. 🫂",
    "Even when it’s hard, you’re still trying. That matters. 🌱",
    "The way you show up for yourself is beautiful. 💕"
  ];

  const generateDays = () => {
    const baseQuotes = [
      "You’re not alone. I’m proud of you for every small win. 💖",
      "One day we’ll look back and smile at how far we’ve come. 🌅",
      "Take it one step at a time, love. You’re doing amazing. 🧡",
      "Even on hard days, your strength shines. ✨",
      "You’ve got me. Always. 💌"
    ];

    const goals = [
      "Take your Vitamin D3 tablet (weekly) 💊",
      "Do 45 minutes of cardio 🏃‍♀️",
      "Walk 10,000 steps 🚶‍♀️",
      "Meditate for 15–20 minutes 🧘‍♀️",
      "Avoid all sugar today 🍬❌",
      "Eat clean and controlled meals 🥗",
      "Stay stress-free and calm today 😌",
      "Write one thing you’re grateful for ✍️",
      "Get 7-8 hours of sleep 😴"
    ];

    let days = [];
    for (let i = 0; i < 180; i++) {
      const title = `Day ${i + 1}`;
      const quote = baseQuotes[i % baseQuotes.length];
      const dayGoals = [
        goals[(i * 4) % goals.length],
        goals[(i * 4 + 1) % goals.length],
        goals[(i * 4 + 2) % goals.length],
        goals[(i * 4 + 3) % goals.length]
      ];
      days.push({ title, quote, goals: dayGoals });
    }
    return days;
  };

  const days = generateDays();

  useEffect(() => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const index = dayDiff >= 0 && dayDiff < 180 ? dayDiff : 0;
    setDayIndex(index);

    const storedChecks = localStorage.getItem(`checked-${index}`);
    if (storedChecks) setCheckedGoals(JSON.parse(storedChecks));

    const storedMood = localStorage.getItem(`mood-${index}`);
    if (storedMood) setMood(storedMood);

    const fetchJournal = async () => {
      const { data } = await supabase
        .from('journals')
        .select('entry')
        .eq('day', index + 1)
        .eq('author', 'Disha');

      if (data && data.length > 0) {
        setJournal(data[0].entry);
      }
    };

    fetchJournal();
  }, []);

  const toggleCheckbox = (i) => {
    const updated = [...checkedGoals];
    if (updated.includes(i)) {
      updated.splice(updated.indexOf(i), 1);
    } else {
      updated.push(i);
    }
    setCheckedGoals(updated);
    localStorage.setItem(`checked-${dayIndex}`, JSON.stringify(updated));
  };

  const setMoodValue = (value) => {
    setMood(value);
    localStorage.setItem(`mood-${dayIndex}`, value);
  };

  const handleJournalChange = async (e) => {
    const value = e.target.value;
    setJournal(value);

    await supabase
      .from('journals')
      .upsert([
        {
          day: dayIndex + 1,
          entry: value,
          author: 'Disha'
        }
      ]);
  };

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-2">🌿 Disha’s Daily Wellness Checklist 🌿</h1>
      <p className="text-center text-sm text-gray-700 mb-6">Hi Disha, how are you doing today? This is your safe space 🌸</p>

      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center text-sm font-medium text-gray-700 mb-6">
        🌼 {affirmations[dayIndex % affirmations.length]}
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="text-lg font-semibold mb-1">{days[dayIndex].title}</h2>
        <p className="text-xs italic text-gray-500 mb-4">{days[dayIndex].quote}</p>

        <ul className="mb-6">
          {days[dayIndex].goals.map((goal, i) => (
            <li key={i} className="flex items-start space-x-2 mb-3">
              <input type="checkbox" checked={checkedGoals.includes(i)} onChange={() => toggleCheckbox(i)} />
              <span className={checkedGoals.includes(i) ? 'line-through text-gray-400' : ''}>{goal}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-1">How are you feeling today?</h3>
          <div className="flex gap-4 text-2xl">
            {['😄', '😐', '😢', '🥹'].map((emoji) => (
              <span key={emoji} onClick={() => setMoodValue(emoji)} className="cursor-pointer">
                {emoji}
              </span>
            ))}
          </div>
          {mood && <p className="text-xs text-gray-500 mt-2">Mood saved: {mood}</p>}
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold" htmlFor="journal">Today’s Journal:</label>
          <textarea
            id="journal"
            value={journal}
            onChange={handleJournalChange}
            placeholder="Write how you feel today..."
            className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
            rows={4}
          />
        </div>

        <div className="bg-pink-100 text-pink-700 italic rounded-md text-center p-4 border border-pink-300">
          💌 {loveNotes[dayIndex % loveNotes.length]}
        </div>

        <div className="mt-8 text-center">
          <img src="/disha-polaroid.png" alt="Sumeet & Disha" className="mx-auto rounded-md shadow-md w-48 h-auto" />
          <p className="text-xs text-gray-500 mt-2">This is our journey — one day at a time 💫</p>
        </div>
      </div>
    </div>
  );
}