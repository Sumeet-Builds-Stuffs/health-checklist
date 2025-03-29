'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [view, setView] = useState('home');
  const [dayIndex, setDayIndex] = useState(0);
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [mood, setMood] = useState(null);
  const [journal, setJournal] = useState('');
  const [calmMode, setCalmMode] = useState(false);

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

  const startCalmTimer = () => {
    setCalmMode(true);
    setTimeout(() => setCalmMode(false), 60000);
  };

  const renderJournal = () => (
    <div className="max-w-xl mx-auto mt-4">
      <button onClick={() => setView('home')} className="mb-4 text-sm text-blue-600">← Back</button>
      <h2 className="text-lg font-semibold mb-4">📓 Your Journal - Day {dayIndex + 1}</h2>

      <textarea
        value={journal}
        onChange={handleJournalChange}
        placeholder="Write anything on your mind..."
        className="w-full mt-1 border border-gray-300 rounded-md p-3 text-sm min-h-[200px]"
      />

      <p className="text-xs text-gray-500 mt-4 italic">Your thoughts are safe here 💖</p>
    </div>
  );

  const renderChecklist = () => (
    <div className="max-w-xl mx-auto mt-4">
      <button onClick={() => setView('home')} className="mb-4 text-sm text-blue-600">← Back</button>
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
  );

  const renderView = () => {
    if (view === 'checklist') return renderChecklist();
    if (view === 'journal') return renderJournal();

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 text-gray-800 font-fredoka p-6">
        {calmMode && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center flex-col text-white text-center">
            <p className="text-3xl mb-4 animate-pulse">Breathe in... breathe out 🧘‍♀️</p>
            <p className="text-sm italic">You’re okay. You’re loved. Just this moment matters. 💖</p>
          </div>
        )}

        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Hi Disha! 🌸</h1>
          <p className="text-sm mb-6">Welcome to your wellness space. Pick what you’d like to do today 🧃</p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setView('checklist')}
              className="bg-white rounded-2xl shadow-md py-6 px-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <span className="text-3xl mb-1">✅</span>
              <span className="text-sm font-medium">Checklist</span>
            </button>

            <button
              onClick={() => setView('journal')}
              className="bg-white rounded-2xl shadow-md py-6 px-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <span className="text-3xl mb-1">📓</span>
              <span className="text-sm font-medium">Journal</span>
            </button>

            <button
              className="bg-white rounded-2xl shadow-md py-6 px-4 flex flex-col items-center opacity-50 cursor-not-allowed"
            >
              <span className="text-3xl mb-1">🐾</span>
              <span className="text-sm font-medium">Mood Tracker</span>
            </button>

            <button
              className="bg-white rounded-2xl shadow-md py-6 px-4 flex flex-col items-center opacity-50 cursor-not-allowed"
            >
              <span className="text-3xl mb-1">💕</span>
              <span className="text-sm font-medium">Love Notes</span>
            </button>
          </div>

          <div className="mt-10 text-xs text-gray-400">
            More features coming soon 💖
          </div>
        </div>
      </div>
    );
  };

  return renderView();
}