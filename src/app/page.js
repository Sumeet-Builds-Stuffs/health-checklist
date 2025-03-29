'use client';
import { useEffect, useState } from 'react';

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
    const timer = setTimeout(() => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const index = dayDiff >= 0 && dayDiff < 180 ? dayDiff : 0;
      setDayIndex(index);

      const storedChecks = localStorage.getItem(`checked-${index}`);
      if (storedChecks) {
        setCheckedGoals(JSON.parse(storedChecks));
      }

      const storedMood = localStorage.getItem(`mood-${index}`);
      if (storedMood) {
        setMood(storedMood);
      }

      const storedJournal = localStorage.getItem(`journal-${index}`);
      if (storedJournal) {
        setJournal(storedJournal);
      }
    }, 0);

    return () => clearTimeout(timer);
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

  const handleJournalChange = (e) => {
    const value = e.target.value;
    setJournal(value);
    localStorage.setItem(`journal-${dayIndex}`, value);
  };

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '5vw',
      fontFamily: '"Fredoka", sans-serif',
      background: 'linear-gradient(to bottom, #c2b6f3, #fcb8e1, #ffdbc9, #fff5b1)',
      minHeight: '100vh',
      transition: 'background-color 0.5s ease-in-out',
      animation: 'fadeIn 1s ease-in-out'
    }}>

      {/* ...floaties and rest of the content above... */}

      {/* Polaroid Style Photo */}
      <div style={{
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff',
        padding: '12px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <img
          src="/disha-polaroid.png"
          alt="Sumeet & Disha"
          style={{
            width: '220px',
            height: 'auto',
            borderRadius: '6px',
            objectFit: 'cover'
          }}
        />
        <p style={{
          marginTop: '8px',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          color: '#444'
        }}>
          This is our journey — one day at a time 💫
        </p>
      </div>

    </div>
  );
}