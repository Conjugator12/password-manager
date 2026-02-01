import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { generatePassword } from '../../utils/passwordGenerator';
import PasswordStrengthIndicator from '../common/PasswordStrengthIndicator';

const PasswordGenerator = ({ onUsePassword }) => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true, lowercase: true,
numbers: true,
symbols: true,
});
const [copied, setCopied] = useState(false);
useEffect(() => {
handleGenerate();
}, []);
const handleGenerate = () => {
const password = generatePassword(length, options);
setGeneratedPassword(password);
setCopied(false);
};
const handleCopy = () => {
navigator.clipboard.writeText(generatedPassword);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};
const handleUse = () => {
if (onUsePassword) {
onUsePassword(generatedPassword);
}
};
return (
<div className="space-y-6">
<div className="bg-gray-100 p-4 rounded-lg">
<div className="flex items-center justify-between mb-2">
<span className="text-sm font-medium text-gray-600">Generated Password</span>
<div className="flex gap-2">
<button
           onClick={handleCopy}
           className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
         >
{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
{copied ? 'Copied!' : 'Copy'}
</button>
<button
           onClick={handleGenerate}
           className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
         >
<RefreshCw className="w-4 h-4" />
Regenerate
</button>
</div>
</div>
<div className="bg-white p-3 rounded border border-gray-300 font-mono text-lg break-all">
{generatedPassword}
</div>
<PasswordStrengthIndicator password={generatedPassword} />
</div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Length: {length}
    </label>
    <input
      type="range"
      min="8"
      max="64"
      value={length}
      onChange={(e) => setLength(parseInt(e.target.value))}
      className="w-full"
    />
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>8</span>
      <span>64</span>
    </div>
  </div>

  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">Options</label>
    {[
      { key: 'uppercase', label: 'Uppercase (A-Z)' },
      { key: 'lowercase', label: 'Lowercase (a-z)' },
      { key: 'numbers', label: 'Numbers (0-9)' },
      { key: 'symbols', label: 'Symbols (!@#$...)' },
    ].map(({ key, label }) => (
      <label key={key} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={options[key]}
          onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    ))}
  </div>

  {onUsePassword && (
    <button
      onClick={handleUse}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
    >
      Use This Password
    </button>
  )}
</div>
);
};
export default PasswordGenerator;