'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dayIndex, setDayIndex] = useState(0);
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [mood, setMood] = useState(null);

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

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#333' }}>
          Disha’s Daily Wellness Checklist 🌿
        </h1>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          Hi Disha, how are you doing today? This is your little space of calm — made with love, just for you. ❤️
        </p>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#444', marginBottom: '10px' }}>
            {days[dayIndex].title}
          </h2>
          <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#777', marginBottom: '20px' }}>
            {days[dayIndex].quote}
          </p>

          <ul style={{ paddingLeft: '0px' }}>
            {days[dayIndex].goals.map((goal, i) => (
              <li key={i} style={{ marginBottom: '12px', fontSize: '16px', color: '#333', listStyle: 'none' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={checkedGoals.includes(i)}
                    onChange={() => toggleCheckbox(i)}
                  />
                  <span style={{ textDecoration: checkedGoals.includes(i) ? 'line-through' : 'none' }}>{goal}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>How are you feeling today?</h3>
          <div style={{ fontSize: '24px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {['😄', '😐', '😢', '🥹'].map((emoji) => (
              <span
                key={emoji}
                onClick={() => setMoodValue(emoji)}
                style={{
                  cursor: 'pointer',
                  transform: mood === emoji ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s'
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
          {mood && <p style={{ marginTop: '10px', color: '#666' }}>Mood saved: {mood}</p>}
        </div>

        <p style={{ marginTop: '40px', fontSize: '14px', textAlign: 'center', color: '#999' }}>
          One day at a time, and I’ll be here with you through it all. 💫
        </p>
      </div>
    </div>
  );
}
