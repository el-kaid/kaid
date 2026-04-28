"use client";

import { useState } from "react";

export default function BookDemoForm() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    teamSize: "",
    useCase: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${apiBase}/api/contact/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          preferredDate: formData.preferredDate || new Date().toISOString().slice(0, 10),
          preferredTime: formData.preferredTime || "11:00 AM",
          timezone: "Asia/Kolkata",
          subject: `Demo Request - ${formData.useCase || "General"}`,
        }),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        teamSize: "",
        useCase: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
      <h2 className="text-2xl font-semibold mb-4">Request your session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {["name", "email", "company", "phone"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              required={field === "name" || field === "email"}
              className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl focus:outline-none focus:border-white/40"
            />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl focus:outline-none focus:border-white/40"
          >
            <option value="">Team size</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="200+">200+</option>
          </select>
          <select
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl focus:outline-none focus:border-white/40"
          >
            <option value="">Primary use case</option>
            <option value="ERP">ERP modernization</option>
            <option value="Data Center">Data center reliability</option>
            <option value="Disaster Recovery">Disaster recovery planning</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl focus:outline-none focus:border-white/40"
          />
          <input
            type="text"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            placeholder="Preferred time (e.g. 11:00 AM)"
            className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl focus:outline-none focus:border-white/40"
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Your current challenge"
          className="w-full px-4 py-3 bg-black border border-white/15 rounded-xl focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Submitting..." : "Book Demo"}
        </button>
        <p className="text-xs text-gray-400">
          We usually respond within one business day. Your details are used only to schedule your demo.
        </p>
        {status === "success" && <p className="text-green-400 text-sm">Thanks! We will contact you soon.</p>}
        {status === "error" && <p className="text-red-400 text-sm">Could not submit. Please try again.</p>}
      </form>
    </div>
  );
}
