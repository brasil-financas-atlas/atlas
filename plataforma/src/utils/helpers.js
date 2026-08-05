function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatTime(seconds) {
  if (seconds === undefined || seconds === null || isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, '0');
  if (hrs > 0) return `${hrs}:${pad(mins)}:${pad(secs)}`;
  return `${pad(mins)}:${pad(secs)}`;
}

function generateSchedule(deadlineDate, selectedSubjects = []) {
  const targetDate = new Date(deadlineDate);
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const timeDiff = targetDate.getTime() - startDate.getTime();
  const totalDays = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

  const subjects = selectedSubjects.map((s, idx) => 
    typeof s === 'string' ? { id: idx + 1, name: s } : s
  );

  if (subjects.length === 0) {
    return {
      startDate: startDate.toISOString().split('T')[0],
      deadlineDate: targetDate.toISOString().split('T')[0],
      totalDays,
      totalSubjects: 0,
      schedule: []
    };
  }

  const scheduleDays = [];
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const subjectIndex = i % subjects.length;
    const currentSubject = subjects[subjectIndex];

    scheduleDays.push({
      dayIndex: i + 1,
      date: currentDate.toISOString().split('T')[0],
      dayOfWeek: currentDate.toLocaleDateString('pt-BR', { weekday: 'long' }),
      subject: currentSubject.name || currentSubject.title || `Matéria ${subjectIndex + 1}`,
      details: currentSubject
    });
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    deadlineDate: targetDate.toISOString().split('T')[0],
    totalDays,
    totalSubjects: subjects.length,
    schedule: scheduleDays
  };
}

window.slugify = slugify;
window.formatTime = formatTime;
window.generateSchedule = generateSchedule;

window.slugify = slugify;
window.formatTime = formatTime;
window.generateSchedule = generateSchedule;
