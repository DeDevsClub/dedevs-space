import React from 'react';

export function ProfileCard() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white p-4">
      <img className="w-24 h-24 rounded-full mx-auto" src="/path/to/profile.jpg" alt="Profile" />
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">Buns Dev</h2>
        <p className="text-gray-400">Blockchain & AI Developer</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-neutral-950 font-bold py-2 px-4 rounded">
          Portfolio
        </button>
      </div>
    </div>
  );
}
