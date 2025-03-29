'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dayIndex, setDayIndex] = useState(0);

  const generateDays = () => {
    const baseQuotes = [
      "Every day is a fresh start. 💫",
      "Small steps every day lead to big changes. 🧗‍♀️",
      "You’re stronger than you think. 💥",
      "Healing isn’t linear, and that’s okay. 🌈",
      "Celebrate progress, not perfection. 🎉"
    ];

    const baseGoals = [
      "No sugar today 🍬❌",
      "Eat 1 bowl of greens 🥬",
      "15 min sunshine ☀️",
      "Evening walk for 20 mins 🚶‍♀️",
      "Drink 2L of water 💧"
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
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', color: '#333' }}>
          Disha’s Daily Wellness Checklist 🌿
        </h1>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', marginBottom: '30px' }}>
          Hi Disha, how are you doing today? ✨
        </p>

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

        <p style={{ marginTop: '30px', fontSize: '14px', textAlign: 'center', color: '#999' }}>
          You got this. Just one day at a time. 🌱
        </p>
      </div>
    </div>
  );
}
