import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Edit, Trash2, Check } from 'lucide-react';

const PasswordCard = ({ password, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{password.website}</h3>
          {password.username && (
            <p className="text-sm text-gray-600 mt-1">{password.username}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(password)}
            className="text-blue-600 hover:text-blue-700 p-1"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(password.id)}
            className="text-red-600 hover:text-red-700 p-1"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 px-3 py-2 rounded font-mono text-sm">
            {showPassword ? password.password : '••••••••••••'}
          </div>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600 hover:text-gray-800 p-2"
            title={showPassword ? 'Hide' : 'Show'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleCopy(password.password)}
            className="text-gray-600 hover:text-gray-800 p-2"
            title="Copy"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {password.notes && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{password.notes}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordCard;