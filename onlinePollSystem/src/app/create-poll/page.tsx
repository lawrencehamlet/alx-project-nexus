"use client";
import React, { useState, useEffect } from "react";
import { NavBar } from "@/components/shared/NavBar";
import { Footer } from "@/components/shared/Footer";
import { useRouter } from "next/navigation";

export default function CreatePollPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [created, setCreated] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    options?: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
  }>({});

  const addPollOption = () => {
    if (pollOptions.length >= 3) return; // allow only one extra option (max 3)
    setPollOptions([...pollOptions, '']);
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  useEffect(() => {
    document.title = "Create Poll - PollPulse";
  }, []);

  // Auto-calc end date/time to 10 hours after start whenever start changes
  useEffect(() => {
    if (startDate && startTime) {
      try {
        const start = new Date(`${startDate}T${startTime}:00`);
        const end = new Date(start.getTime() + 10 * 60 * 60 * 1000);
        const endDateStr = end.toISOString().split('T')[0];
        const endTimeStr = end.toTimeString().slice(0, 5);
        setEndDate(endDateStr);
        setEndTime(endTimeStr);
        // Clear any previous end-related errors when auto-setting
        setErrors(prev => ({ ...prev, endDate: undefined, endTime: undefined }));
      } catch {}
    }
  }, [startDate, startTime]);

  const combineDateTime = (d: string, t: string) => {
    try {
      return new Date(`${d}T${t}:00`);
    } catch {
      return null as unknown as Date;
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    const validOptions = pollOptions.filter(o => o.trim() !== "");
    if (validOptions.length < 2) newErrors.options = "Please provide at least 2 options";
    if (validOptions.length > 3) newErrors.options = "Maximum 3 options allowed";

    // Date/time validation
    const now = new Date();
    const startDT = (startDate && startTime) ? combineDateTime(startDate, startTime) : null;
    const endDT = (endDate && endTime) ? combineDateTime(endDate, endTime) : null;
    const MIN_DURATION_MS = 10 * 60 * 60 * 1000; // 10 hours

    if (!startDate) newErrors.startDate = "Start date is required";
    if (!startTime) newErrors.startTime = "Start time is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (!endTime) newErrors.endTime = "End time is required";

    if (startDT && !(startDT >= now)) {
      newErrors.startDate = newErrors.startDate || "Start must be now or in the future";
      newErrors.startTime = newErrors.startTime || "Start must be now or in the future";
    }
    if (startDT && endDT) {
      if (!(endDT > startDT)) {
        newErrors.endDate = "End must be after start";
        newErrors.endTime = "End must be after start";
      } else if (endDT.getTime() - startDT.getTime() < MIN_DURATION_MS) {
        newErrors.endDate = "Duration must be at least 10 hours";
        newErrors.endTime = "Duration must be at least 10 hours";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      const payload = {
        title,
        description,
        options: pollOptions.filter(opt => opt.trim() !== '').map((label, idx) => ({ id: `opt-${idx+1}`, label })),
        startDate,
        endDate,
        startTime,
        endTime,
      };
      const res = await fetch('/api/polls/new', { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json().catch(() => ({}));
      // Mark created state for UI feedback and allow user to share or navigate
      setErrors({});
      setCreated(true);
      alert("Poll created successfully!");
      // Optional: stay on page to show 'Created' state; or navigate
      // router.push('/dashboard');
    } catch (err) {
      alert("Failed to create poll");
      console.error(err);
    }
  };

  const handleShare = () => {
    alert("Poll must be created before sharing");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[72px]">
      <NavBar activeRoute="create-poll" />

      <main className="container mx-auto px-4 py-8 lg:py-12" role="main">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Create a New Poll
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Define your question, options, and schedule. Launch instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-300 rounded-3xl p-6 sm:p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8" aria-label="Create poll form" noValidate>
            <div className="space-y-3">
              <label htmlFor="poll-title" className="block text-xl font-semibold text-gray-700">
                Poll Title
              </label>
              <input
                id="poll-title"
                type="text"
                placeholder="What's the main topic of this poll?"
                value={title}
                onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors(prev => ({...prev, title: undefined})); }}
                className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none text-lg placeholder-gray-500 ${errors.title ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                aria-required="true"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'poll-title-error' : undefined}
              />
              {errors.title && (<p id="poll-title-error" className="text-red-600 text-sm mt-1" role="alert">{errors.title}</p>)}
            </div>

            <div className="space-y-3">
              <label htmlFor="poll-description" className="block text-xl font-semibold text-gray-700">
                Poll Description
              </label>
              <textarea
                id="poll-description"
                placeholder="Give participants context for better engagement."
                rows={4}
                value={description}
                onChange={(e) => { setDescription(e.target.value); if (errors.description) setErrors(prev => ({...prev, description: undefined})); }}
                className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none text-lg placeholder-gray-500 resize-none ${errors.description ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                aria-required="true"
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? 'poll-description-error' : undefined}
              />
              {errors.description && (<p id="poll-description-error" className="text-red-600 text-sm mt-1" role="alert">{errors.description}</p>)}
            </div>

            <div className="space-y-3">
              <label className="block text-xl font-semibold text-gray-700" id="poll-options-label">
                Poll Options
              </label>
              <div className="space-y-4" role="group" aria-labelledby="poll-options-label" aria-describedby={errors.options ? 'poll-options-error' : 'poll-options-hint'}>
                <p id="poll-options-hint" className="text-sm text-gray-600 sr-only">Add 2 to 3 options for voters to choose from</p>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Add choices for voters (minimum: 2)."
                      value={option}
                      onChange={(e) => { updatePollOption(index, e.target.value); if (errors.options) setErrors(prev => ({...prev, options: undefined})); }}
                      className={`flex-1 px-6 py-4 rounded-xl border-2 focus:outline-none text-lg placeholder-gray-500 ${errors.options ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                      aria-label={`Poll option ${index + 1}`}
                      aria-required="true"
                      aria-invalid={!!errors.options}
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePollOption(index)}
                        className="px-4 py-2 text-red-600 hover:text-red-800 font-medium"
                        aria-label={`Remove option ${index + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {errors.options && (<p id="poll-options-error" className="text-red-600 text-sm mt-1" role="alert">{errors.options}</p>)}
                {pollOptions.length < 3 && (
                  <button
                    type="button"
                    onClick={addPollOption}
                    className="text-purple-600 hover:text-purple-800 font-medium text-lg"
                    aria-label="Add another poll option"
                  >
                    + Add another option
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="start-date" className="block text-xl font-semibold text-gray-700">
                    Start Date
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); if (errors.startDate) setErrors(prev => ({...prev, startDate: undefined})); }}
                    className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none text-lg ${errors.startDate ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                    aria-required="true"
                    aria-invalid={!!errors.startDate}
                    aria-describedby={errors.startDate ? 'start-date-error' : undefined}
                  />
                  {errors.startDate && (<p id="start-date-error" className="text-red-600 text-sm mt-1" role="alert">{errors.startDate}</p>)}
                </div>
                <div className="space-y-3">
                  <label htmlFor="start-time" className="block text-xl font-semibold text-gray-700">
                    Start Time
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => { setStartTime(e.target.value); if (errors.startTime) setErrors(prev => ({...prev, startTime: undefined})); }}
                    className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none text-lg ${errors.startTime ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                    aria-required="true"
                    aria-invalid={!!errors.startTime}
                    aria-describedby={errors.startTime ? 'start-time-error' : undefined}
                  />
                  {errors.startTime && (<p id="start-time-error" className="text-red-600 text-sm mt-1" role="alert">{errors.startTime}</p>)}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="end-date" className="block text-xl font-semibold text-gray-700">
                    End Date
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); if (errors.endDate) setErrors(prev => ({...prev, endDate: undefined})); }}
                    className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none text-lg ${errors.endDate ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                    aria-required="true"
                    aria-invalid={!!errors.endDate}
                    aria-describedby={errors.endDate ? 'end-date-error' : 'end-date-hint'}
                  />
                  <p id="end-date-hint" className="text-xs text-gray-500 sr-only">Automatically calculated as 10 hours after start time</p>
                  {errors.endDate && (<p id="end-date-error" className="text-red-600 text-sm mt-1" role="alert">{errors.endDate}</p>)}
                </div>
                <div className="space-y-3">
                  <label htmlFor="end-time" className="block text-xl font-semibold text-gray-700">
                    End Time
                  </label>
                  <input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => { setEndTime(e.target.value); if (errors.endTime) setErrors(prev => ({...prev, endTime: undefined})); }}
                    className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none text-lg ${errors.endTime ? 'border-red-500 focus:border-red-600' : 'border-purple-400 focus:border-purple-600'}`}
                    aria-required="true"
                    aria-invalid={!!errors.endTime}
                    aria-describedby={errors.endTime ? 'end-time-error' : undefined}
                  />
                  {errors.endTime && (<p id="end-time-error" className="text-red-600 text-sm mt-1" role="alert">{errors.endTime}</p>)}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8" role="group" aria-label="Form actions">
              <button
                type="submit"
                disabled={created}
                className={`text-white font-semibold text-xl px-12 py-4 rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none ${created ? 'bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:ring-lime-300 cursor-default' : 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300'}`}
                aria-label={created ? 'Poll created successfully' : 'Create poll'}
                aria-disabled={created}
              >
                {created ? 'Created' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold text-xl px-12 py-4 rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
                aria-label="Share poll link"
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}