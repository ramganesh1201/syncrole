import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { RotateCcw, Save } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onReset: () => void;
  isLoading?: boolean;
  hasDraft?: boolean;
  lastSaved?: Date | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onLanguageChange,
  onReset,
  isLoading,
  hasDraft,
  lastSaved
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lines, setLines] = useState<number[]>([]);

  useEffect(() => {
    const lineCount = code.split('\n').length;
    setLines(Array.from({ length: Math.max(1, lineCount) }, (_, i) => i + 1));
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className="flex flex-col h-full glass rounded-xl border-white/10 overflow-hidden">
      <div className="flex-none h-12 flex items-center justify-between px-4 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <select 
            value={language} 
            onChange={(e) => onLanguageChange(e.target.value)}
            disabled={isLoading}
            className="bg-white/5 border border-white/10 text-white text-xs rounded px-2 py-1 outline-none focus:border-aurora/50 transition-colors cursor-pointer disabled:opacity-50"
          >
            <option value="javascript">JavaScript</option>
            {/* Additional languages can be added here */}
          </select>
          {hasDraft && (
            <span className="text-[10px] text-yellow-500/90 bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 rounded">Draft</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Save className="w-3 h-3" />
              Saved {formatLastSaved(lastSaved)}
            </span>
          )}
          <button 
            onClick={onReset}
            disabled={isLoading}
            className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/5 hover:border-white/10"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex min-h-[400px] bg-[#0d0d0d]/80 overflow-hidden relative">
        <div className="flex-none w-12 bg-black/40 border-r border-white/5 py-4 flex flex-col items-end pr-2 overflow-hidden text-right select-none">
          {lines.map(line => (
            <div key={line} className="text-[13px] font-mono leading-[21px] text-aurora/40 opacity-70">
              {line}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto relative custom-scrollbar">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            spellCheck={false}
            className="w-full h-full min-h-full resize-none bg-transparent outline-none p-4 text-[13px] leading-[21px] text-gray-300 whitespace-pre"
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
              tabSize: 4 
            }}
          />
        </div>
      </div>
    </div>
  );
};
