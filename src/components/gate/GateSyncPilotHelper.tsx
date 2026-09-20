import { useSyncPilot } from '@/hooks/useSyncPilot';
import { HelpCircle, Sparkles } from 'lucide-react';

interface GateSyncPilotHelperProps {
  topicName: string;
  paperCode: string;
}

export default function GateSyncPilotHelper({ topicName, paperCode }: GateSyncPilotHelperProps) {
  const { openSyncPilot } = useSyncPilot();

  const prompts = [
    `Explain ${topicName} simply for GATE ${paperCode}`,
    `Why is ${topicName} important in GATE ${paperCode}?`,
    `What are common traps or mistakes in ${topicName}?`,
  ];

  function handlePromptClick(promptText: string) {
    // Open SyncPilot with contextual prompt
    openSyncPilot({
      mode: 'career_twin',
      initialPrompt: `[GATE ${paperCode} Context: ${topicName}] ${promptText}`,
    });
  }

  return (
    <div className="rounded-2xl glass border border-accent/20 p-4 space-y-3 bg-accent/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>SyncPilot AI Context Helper — {topicName}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">Optional Guidance</span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        Need quick clarification or concept breakdown? Click a prompt to open SyncPilot with this exact topic context:
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePromptClick(prompt)}
            className="inline-flex items-center gap-1.5 rounded-full glass border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition active:scale-95"
          >
            <HelpCircle className="h-3.5 w-3.5 text-accent" />
            <span>"{prompt}"</span>
          </button>
        ))}
      </div>
    </div>
  );
}
