import { useState } from "react";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNavbar from "@/components/layout/SiteNavbar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { RefreshCw, Copy, Printer, Clock } from "lucide-react";

interface Activity {
  id: string;
  icon: string;
  label: string;
  duration: number;
  category: string;
  checked: boolean;
}

interface TimelineItem {
  name: string;
  icon: string;
  category: string;
  color: string;
  duration: number;
  start: number;
  end: number;
}

const ScheduleIntegration = () => {
  useScrollReveal();
  const [role, setRole] = useState<"student" | "professional">("student");
  const [wakeTime, setWakeTime] = useState("06:00");
  const [prep, setPrep] = useState("30");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [morningTravel, setMorningTravel] = useState("30");
  const [eveningTravel, setEveningTravel] = useState("30");
  const [sleepTime, setSleepTime] = useState("23:00");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsSummary, setStatsSummary] = useState({ scheduled: 0, sleep: 0, free: 0, conflicts: 0 });

  const [activities, setActivities] = useState<Activity[]>([
    { id: "walk", icon: "🌅", label: "Morning Walk / Stretching", duration: 20, category: "Morning Routine", checked: false },
    { id: "breakfast", icon: "🍳", label: "Breakfast", duration: 25, category: "Meals & Breaks", checked: false },
    { id: "journal", icon: "📝", label: "Daily Planning / Journaling", duration: 10, category: "Morning Routine", checked: false },
    { id: "lunch", icon: "🍽️", label: "Lunch Break", duration: 40, category: "Meals & Breaks", checked: false },
    { id: "classBreak", icon: "☕", label: "Between-Class Breaks", duration: 15, category: "Meals & Breaks", checked: false },
    { id: "selfStudy", icon: "📚", label: "Self Study / Revision", duration: 90, category: "Study & Learning", checked: false },
    { id: "assignment", icon: "💻", label: "Assignment / Project Work", duration: 60, category: "Study & Learning", checked: false },
    { id: "skill", icon: "🧠", label: "Skill Learning (Coding/Design)", duration: 45, category: "Study & Learning", checked: false },
    { id: "reading", icon: "📖", label: "Reading (Books / Articles)", duration: 30, category: "Study & Learning", checked: false },
    { id: "gym", icon: "🏋️", label: "Gym / Fitness", duration: 60, category: "Health & Fitness", checked: false },
    { id: "music", icon: "🎵", label: "Music Classes", duration: 90, category: "Health & Fitness", checked: false },
    { id: "snack", icon: "🫖", label: "Evening Snack / Tea Break", duration: 15, category: "Meals & Breaks", checked: false },
    { id: "dinner", icon: "🍛", label: "Dinner", duration: 40, category: "Meals & Breaks", checked: false },
    { id: "meditation", icon: "🧘", label: "Meditation / Breathing", duration: 15, category: "Mental Wellness", checked: false },
    { id: "winddown", icon: "📵", label: "Screen-Free Wind-Down", duration: 20, category: "Mental Wellness", checked: false },
    { id: "gratitude", icon: "🌙", label: "Gratitude / Reflection Journal", duration: 10, category: "Mental Wellness", checked: false },
    { id: "social", icon: "🤝", label: "Social Activities", duration: 120, category: "Free Time", checked: false },
    { id: "extraCommute", icon: "🚗", label: "Additional Commute", duration: 60, category: "Commute", checked: false },
    { id: "nightRoutine", icon: "🪥", label: "Night Routine (Hygiene etc.)", duration: 20, category: "Mental Wellness", checked: false },
  ]);

  const toggleActivity = (id: string) => {
    setActivities(activities.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  };

  const syncWithCalendar = async () => {
    try {
      // Create calendar event data
      const scheduleText = timeline.map(item => `${toTimeString(item.start)} - ${toTimeString(item.end)}: ${item.name}`).join('\n');
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 12 * 60 * 60 * 1000);

      // Google Calendar integration
      const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent('Generated Schedule')}&dates=${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}&details=${encodeURIComponent(scheduleText)}`;
      window.open(calendarUrl, '_blank');
    } catch (error) {
      console.error('Calendar sync error:', error);
    }
  };

  const minutesFromTime = (value: string) => {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  };

  const toTimeString = (totalMin: number) => {
    const m = ((totalMin % 1440) + 1440) % 1440;
    const h = String(Math.floor(m / 60)).padStart(2, '0');
    const min = String(m % 60).padStart(2, '0');
    return h + ':' + min;
  };

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h + 'h ' + m + 'm';
  };

  const generateSchedule = () => {
    setLoading(true);

    setTimeout(() => {
      const wake = minutesFromTime(wakeTime);
      const start = minutesFromTime(startTime);
      const end = minutesFromTime(endTime);
      const sleepStart = minutesFromTime(sleepTime);

      const newTimeline: TimelineItem[] = [];
      newTimeline.push({
        name: "Fresh-up / Morning Prep",
        icon: "🧼",
        category: "Morning Routine",
        color: "#c9873a",
        duration: parseInt(prep),
        start: wake,
        end: wake + parseInt(prep)
      });

      const workDuration = end - start;
      newTimeline.push({
        name: role === "professional" ? "Work Focus" : "Class / Lecture",
        icon: "🎓",
        category: "College / Work",
        color: "#4a7ebb",
        duration: workDuration,
        start: start,
        end: end
      });

      newTimeline.push({
        name: "Evening Commute",
        icon: "🚗",
        category: "Commute",
        color: "#475569",
        duration: parseInt(eveningTravel),
        start: end,
        end: end + parseInt(eveningTravel)
      });

      // Add selected activities
      let current = end + parseInt(eveningTravel);
      activities.filter(a => a.checked).forEach(activity => {
        if (current < sleepStart) {
          newTimeline.push({
            name: activity.label,
            icon: activity.icon,
            category: activity.category,
            color: getCategoryColor(activity.category),
            duration: activity.duration,
            start: current,
            end: current + activity.duration
          });
          current += activity.duration;
        }
      });

      // Add sleep
      if (current < sleepStart) {
        newTimeline.push({
          name: "Free Time",
          icon: "🕐",
          category: "Free Time",
          color: "#2d3f52",
          duration: sleepStart - current,
          start: current,
          end: sleepStart
        });
      }

      const sleepDuration = 1440 - sleepStart + wake;
      newTimeline.push({
        name: "Sleep",
        icon: "🌙",
        category: "Sleep",
        color: "#1a2535",
        duration: sleepDuration,
        start: sleepStart,
        end: wake + 1440
      });

      setTimeline(newTimeline);

      let scheduled = 0, sleep = 0, free = 0;
      newTimeline.forEach(item => {
        if (item.category === "Sleep") sleep += item.duration;
        else if (item.category === "Free Time") free += item.duration;
        else scheduled += item.duration;
      });

      setStatsSummary({ scheduled, sleep, free, conflicts: 0 });
      setLoading(false);
    }, 900);
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Morning Routine": "#c9873a",
      "Commute": "#475569",
      "College / Work": "#4a7ebb",
      "Meals & Breaks": "#3a9e7a",
      "Study & Learning": "#7a6ebb",
      "Health & Fitness": "#bb4a6e",
      "Mental Wellness": "#8b6eaa",
      "Free Time": "#2d3f52",
      "Sleep": "#1a2535"
    };
    return colors[category] || "#2d3f52";
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <SiteNavbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/20 bg-blue-400/10 mb-4">
            <span className="text-blue-400 text-sm">✦ AI-Powered Schedule Intelligence</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">AI-Powered Schedule Optimization</h1>
          <p className="text-gray-400 text-lg">Tell us your routine - we'll build your perfect timetable</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Setup */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-white mb-4">Schedule Setup</h2>

            {/* Role Toggle */}
            <div className="flex gap-2 mb-6 bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 py-2 rounded font-semibold transition ${role === "student" ? "bg-blue-400 text-gray-900" : "text-gray-400"}`}
              >
                Student
              </button>
              <button
                onClick={() => setRole("professional")}
                className={`flex-1 py-2 rounded font-semibold transition ${role === "professional" ? "bg-blue-400 text-gray-900" : "text-gray-400"}`}
              >
                Professional
              </button>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Wake-up Time</label>
                <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Fresh-up / Morning Prep</label>
                <input type="number" value={prep} onChange={(e) => setPrep(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" /> <span className="text-xs text-gray-500">min</span>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">{role === "student" ? "College" : "Work"} Start Time</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">{role === "student" ? "College" : "Work"} End Time</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Morning Travel</label>
                <input type="number" value={morningTravel} onChange={(e) => setMorningTravel(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" /> <span className="text-xs text-gray-500">min</span>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider">Evening Travel</label>
                <input type="number" value={eveningTravel} onChange={(e) => setEveningTravel(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" /> <span className="text-xs text-gray-500">min</span>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Fixed Sleep Time</label>
                <input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono" />
              </div>
            </div>

            {/* Activities */}
            <div className="border-t border-gray-700 pt-4 mb-6">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Extra Activities</h3>
              <div className="max-h-72 overflow-y-auto space-y-2">
                {activities.map(activity => (
                  <label key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activity.checked}
                      onChange={() => toggleActivity(activity.id)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-lg">{activity.icon}</span>
                    <span className="text-sm text-white flex-1">{activity.label}</span>
                    <span className="text-xs text-gray-500">{activity.duration}m</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateSchedule}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-75"
            >
              {loading ? "Generating..." : "Generate AI Schedule →"}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Your Schedule</h2>
              <div className="flex gap-2">
                <button
                  onClick={generateSchedule}
                  className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition"
                  title="Regenerate"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => {
                    const text = timeline.map(t => `${toTimeString(t.start)}-${toTimeString(t.end)}: ${t.name}`).join('\n');
                    navigator.clipboard.writeText(text);
                  }}
                  className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition"
                  title="Export PDF"
                >
                  <Printer size={16} />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto mb-6">
              {timeline.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                  <Clock size={40} className="text-gray-700 mb-2" />
                  <p>Click 'Generate AI Schedule' to create your personalized timetable</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-16 text-right text-xs text-gray-500 font-mono pt-1">
                        <div>{toTimeString(item.start)}</div>
                        <div className="text-gray-700">{toTimeString(item.end)}</div>
                      </div>
                      <div className="flex-1">
                        <div
                          className="bg-gray-800 border-l-4 rounded p-3 text-sm"
                          style={{ borderLeftColor: item.color }}
                        >
                          <div className="flex justify-between items-center">
                            <span><span className="mr-2">{item.icon}</span>{item.name}</span>
                            <span className="text-xs text-gray-500 border border-gray-700 rounded px-2 py-1">{item.duration}m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="border-t border-gray-700 pt-4 grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="text-lg font-semibold text-white">{formatDuration(statsSummary.scheduled)}</div>
                <div className="text-xs text-gray-500">✅ Scheduled</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{formatDuration(statsSummary.sleep)}</div>
                <div className="text-xs text-gray-500">💤 Sleep</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{formatDuration(statsSummary.free)}</div>
                <div className="text-xs text-gray-500">🕐 Free Time</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{statsSummary.conflicts}</div>
                <div className="text-xs text-gray-500">⚠️ Conflicts</div>
              </div>
            </div>

            {/* Calendar Sync Button */}
            <button
              onClick={syncWithCalendar}
              disabled={timeline.length === 0}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📅 Sync with Calendar
            </button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default ScheduleIntegration;