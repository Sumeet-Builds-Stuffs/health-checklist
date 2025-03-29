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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap');
        :root { color-scheme: light; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .floaty {
          position: absolute;
          bottom: -50px;
          animation: float 12s linear infinite;
          font-size: 24px;
          opacity: 0.8;
        }
        .floaty:nth-child(odd) { animation-duration: 10s; font-size: 20px; }
        .floaty:nth-child(even) { animation-duration: 14s; font-size: 26px; }
        @media (max-width: 600px) {
          .card { padding: 20px !important; border-radius: 10px !important; }
          h1 { font-size: 22px !important; }
          h2 { font-size: 18px !important; }
          ul { font-size: 14px !important; }
          .emoji-picker span { font-size: 20px !important; }
        }
      `}</style>

      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="floaty"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          {Math.random() > 0.5 ? '💖' : '✨'}
        </div>
      ))}

      <div className="card" style={{
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: '#ffffffee',
        padding: '35px',
        borderRadius: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        animation: 'fadeIn 0.8s ease-in-out',
        border: '3px dashed #b08ee0',
        position: 'relative',
        zIndex: 2
      }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#444' }}>
          🌿 Disha’s Daily Wellness Checklist 🌿
        </h1>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '20px' }}>
          Hi Disha, how are you doing today? This is your little space of calm — made with love, just for you. ❤️
        </p>

        <div style={{ borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#555', marginBottom: '10px' }}>
            {days[dayIndex].title}
          </h2>
          <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#777', marginBottom: '20px' }}>
            {days[dayIndex].quote}
          </p>

          <ul style={{ paddingLeft: '0px' }}>
            {days[dayIndex].goals.map((goal, i) => (
              <li key={i} style={{ marginBottom: '12px', fontSize: '16px', color: '#333', listStyle: 'none' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease' }}>
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
          <div className="emoji-picker" style={{ fontSize: '24px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
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

        <div style={{
          marginTop: '40px',
          background: '#ffe0f0',
          borderRadius: '15px',
          padding: '20px',
          fontSize: '16px',
          color: '#333',
          fontStyle: 'italic',
          textAlign: 'center',
          border: '2px dashed #ffb3d7',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          💌 {loveNotes[dayIndex % loveNotes.length]}
        </div>

        <div style={{
          marginTop: '30px',
          background: '#f9f9f9',
          padding: '15px',
          borderRadius: '10px',
          border: '1px solid #ccc'
        }}>
          <label htmlFor="journal" style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#444' }}>Today’s Journal:</label>
          <textarea
            id="journal"
            value={journal}
            onChange={handleJournalChange}
            placeholder="Write how you feel today..."
            rows={4}
            style={{
              width: '100%',
              borderRadius: '8px',
              padding: '10px',
              fontFamily: 'inherit',
              fontSize: '14px',
              border: '1px solid #ccc',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Polaroid-style photo section */}
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

        <p style={{ marginTop: '40px', fontSize: '14px', textAlign: 'center', color: '#666' }}>
          One day at a time, and I’ll be here with you through it all. 🌈
        </p>
      </div>
    </div>
  );
}
