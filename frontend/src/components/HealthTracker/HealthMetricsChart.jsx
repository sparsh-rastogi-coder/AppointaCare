import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthMetricsChart = ({ entries }) => {
  // Prepare data for the chart
  const data = entries.map(entry => ({
    date: new Date(entry.createdAt).toLocaleDateString(),
    systolic: Number(entry.metrics?.bloodPressure?.systolic),
    diastolic: Number(entry.metrics?.bloodPressure?.diastolic),
    glucose: Number(entry.metrics?.bloodGlucose),
    weight: Number(entry.metrics?.weight),
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-primary">Health Metrics Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="systolic" stroke="#5F6FFF" name="Systolic BP" />
          <Line type="monotone" dataKey="diastolic" stroke="#43E6B0" name="Diastolic BP" />
          <Line type="monotone" dataKey="glucose" stroke="#FFB86F" name="Glucose" />
          <Line type="monotone" dataKey="weight" stroke="#FF5F56" name="Weight" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthMetricsChart; 