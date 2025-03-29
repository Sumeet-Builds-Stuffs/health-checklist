'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dayIndex, setDayIndex] = useState(0);

  const generateDays = () => {
    const baseQuotes = [
      "You’re not alone. I’m proud of you for every small win. 💖",
      "One day we’ll look back and smile at how far we’ve come. 🌅",
      "Take it one step at a time, love. You’re doing amazing. 🧡",
      "Even on hard days, your strength shines. ✨",
      "You’ve got me. Always. 💌"
    ];

    const baseGoals = [
      "Drink 2L of water 💧",
      "Eat something nourishing today 🍲",
      "Take a 10-minute walk and breathe 🌿",
      "Give yourself 5 mins of peace 🧘‍♀️",
      "Send a message if you're feeling low 📱"
    ];

    let days = [];
    for (let i = 0; i < 180; i++) {
      const title = `Day ${i + 1}`;
      const quote = baseQuotes[i % baseQuotes.length];
      const goals = [
        baseGoals[(i * 3) % baseGoals.length],
        baseGoals[(i * 3 + 1) % baseGoals.length],
        baseGoals[(i * 3 + 2) % baseGoals.length]
      ];
      days.push({ title, quote, goals });
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
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
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
          <ul style={{ paddingLeft: '20px' }}>
            {days[dayIndex].goals.map((goal, i) => (
              <li key={i} style={{ marginBottom: '12px', fontSize: '16px', color: '#333' }}>{goal}</li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: '30px', fontSize: '14px', textAlign: 'center', color: '#999' }}>
          One day at a time, and I’ll be here with you through it all. 💫
        </p>
      </div>
    </div>
  );
}
