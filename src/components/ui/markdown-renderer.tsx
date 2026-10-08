import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Check,
  Copy,
  Code2,
  Lightbulb,
  Zap,
  AlertCircle,
  HelpCircle,
  Activity,
  Clock,
  Database,
  Sparkles,
  Bookmark,
  Trophy,
  Target,
  Brain,
  GitBranch,
  Workflow,
  CheckCircle2,
  Layers,
  ArrowRight,
  FileCode,
  Compass,
  AlertTriangle,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: "light" | "dark";
}

// Map language aliases to clean display titles
const LANGUAGE_TITLES: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  py: "Python",
  python: "Python",
  cpp: "C++",
  "c++": "C++",
  c: "C",
  cs: "C#",
  csharp: "C#",
  java: "Java",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  bash: "Bash",
  sh: "Shell",
  zsh: "Shell",
  go: "Go",
  rs: "Rust",
  rust: "Rust",
  rb: "Ruby",
  ruby: "Ruby",
  php: "PHP",
  kt: "Kotlin",
  kotlin: "Kotlin",
  swift: "Swift",
};

/**
 * Enhanced Code Block for SyncRole Developer UI
 * - REMOVED Mac traffic-light dots
 * - Developer code editor header (Language / Filename + Copy action)
 * - Copy feedback with checkmark state
 * - Selectable text with high contrast syntax highlighting
 * - Mobile responsive horizontal scrolling container
 */
export function AICodeBlock({
  language,
  value,
  ...props
}: {
  language: string;
  value: string;
  [key: string]: any;
}) {
  const [isCopied, setIsCopied] = useState(false);

  // Extract filename if provided in syntax like `javascript:filename.js`
  let fileName = "";
  let rawLang = (language || "").toLowerCase().trim();
  if (rawLang.includes(":")) {
    const parts = rawLang.split(":");
    rawLang = parts[0];
    fileName = parts[1];
  }

  const displayLang = LANGUAGE_TITLES[rawLang] || rawLang.toUpperCase() || "CODE";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative my-5 rounded-xl border border-slate-700/80 bg-[#0B1120] text-slate-100 shadow-md overflow-hidden text-xs md:text-sm">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between bg-[#131C31] px-4 py-2.5 border-b border-slate-700/60 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400">
            <FileCode className="w-3 h-3" />
          </div>
          <span className="font-mono text-xs font-semibold text-slate-200 tracking-wider">
            {fileName ? (
              <span className="flex items-center gap-1.5">
                <span className="text-purple-300 font-bold">{fileName}</span>
                <span className="text-slate-500">({displayLang})</span>
              </span>
            ) : (
              displayLang
            )}
          </span>
        </div>

        <button
          onClick={copyToClipboard}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-400",
            isCopied
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
          )}
          title="Copy code to clipboard"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400 animate-in zoom-in-50" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighting Container with Horizontal Scroll */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <SyntaxHighlighter
          language={rawLang || "javascript"}
          style={vscDarkPlus}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "2.4em",
            paddingRight: "1em",
            color: "#475569",
            textAlign: "right",
            userSelect: "none",
            fontSize: "0.8rem",
          }}
          customStyle={{
            margin: 0,
            padding: "1rem 1.25rem",
            backgroundColor: "transparent",
            fontSize: "0.84rem",
            lineHeight: "1.6",
            fontFamily:
              'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
          PreTag="div"
          {...props}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

/**
 * Visual Heading Helper with Intent Resolution
 */
function getHeadingMeta(text: string) {
  const t = text.toLowerCase();

  if (t.includes("problem") || t.includes("understanding") || t.includes("overview")) {
    return {
      badge: "PROBLEM UNDERSTANDING",
      icon: Target,
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      accentColor: "border-l-indigo-500",
    };
  }
  if (t.includes("naive") || t.includes("brute force") || t.includes("basic approach")) {
    return {
      badge: "NAIVE APPROACH",
      icon: Layers,
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      accentColor: "border-l-amber-500",
    };
  }
  if (t.includes("optimal") || t.includes("efficient") || t.includes("best solution")) {
    return {
      badge: "OPTIMAL APPROACH",
      icon: Zap,
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      accentColor: "border-l-emerald-500",
    };
  }
  if (t.includes("step") || t.includes("algorithm") || t.includes("procedure")) {
    return {
      badge: "ALGORITHM STEPS",
      icon: GitBranch,
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      accentColor: "border-l-blue-500",
    };
  }
  if (t.includes("complexity") || t.includes("time") || t.includes("space")) {
    return {
      badge: "COMPLEXITY ANALYSIS",
      icon: Activity,
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      accentColor: "border-l-purple-500",
    };
  }
  if (t.includes("takeaway") || t.includes("key idea") || t.includes("summary") || t.includes("conclusion")) {
    return {
      badge: "KEY TAKEAWAY",
      icon: Bookmark,
      badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
      accentColor: "border-l-violet-500",
    };
  }
  if (t.includes("code") || t.includes("implementation") || t.includes("solution")) {
    return {
      badge: "CODE IMPLEMENTATION",
      icon: Code2,
      badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
      accentColor: "border-l-slate-700",
    };
  }

  return {
    badge: null,
    icon: Sparkles,
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    accentColor: "border-l-purple-500",
  };
}

/**
 * Visual Heading Component
 */
export function AIHeading({ level, children, className }: { level: 1 | 2 | 3 | 4; children: React.ReactNode; className?: string }) {
  const textContent = React.Children.toArray(children).join("");
  const meta = getHeadingMeta(textContent);
  const IconComp = meta.icon;

  if (level === 1) {
    return (
      <div className="mt-7 mb-4 space-y-1.5 first:mt-0">
        {meta.badge && (
          <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border shadow-xs uppercase", meta.badgeBg)}>
            <IconComp className="w-3 h-3" />
            <span>{meta.badge}</span>
          </div>
        )}
        <h1 className={cn("text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2", className)}>
          {!meta.badge && <IconComp className="w-5 h-5 text-purple-600 shrink-0" />}
          <span>{children}</span>
        </h1>
      </div>
    );
  }

  if (level === 2) {
    return (
      <div className="mt-6 mb-3 space-y-1 first:mt-0">
        {meta.badge && (
          <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border shadow-xs uppercase mb-1", meta.badgeBg)}>
            <IconComp className="w-3 h-3" />
            <span>{meta.badge}</span>
          </div>
        )}
        <h2 className={cn("text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 pb-1.5 border-b border-slate-200/70", className)}>
          {!meta.badge && <IconComp className="w-4 h-4 text-purple-600 shrink-0" />}
          <span>{children}</span>
        </h2>
      </div>
    );
  }

  return (
    <h3 className={cn("mt-5 mb-2 text-base font-semibold tracking-tight text-slate-900 flex items-center gap-2", className)}>
      <IconComp className="w-4 h-4 text-purple-600 shrink-0" />
      <span>{children}</span>
    </h3>
  );
}

/**
 * Visual Callout Component
 */
export function AICallout({
  type = "note",
  title,
  children,
}: {
  type?: "key-idea" | "tip" | "warning" | "why" | "complexity" | "note";
  title?: string;
  children: React.ReactNode;
}) {
  const configs = {
    "key-idea": {
      icon: Lightbulb,
      defaultTitle: "KEY IDEA",
      bg: "bg-amber-50/90 border-amber-200/90 text-amber-950",
      accent: "bg-amber-500",
      titleColor: "text-amber-800",
      iconColor: "text-amber-600",
    },
    tip: {
      icon: Zap,
      defaultTitle: "PRO TIP",
      bg: "bg-emerald-50/90 border-emerald-200/90 text-emerald-950",
      accent: "bg-emerald-500",
      titleColor: "text-emerald-800",
      iconColor: "text-emerald-600",
    },
    warning: {
      icon: AlertCircle,
      defaultTitle: "WATCH OUT",
      bg: "bg-rose-50/90 border-rose-200/90 text-rose-950",
      accent: "bg-rose-500",
      titleColor: "text-rose-800",
      iconColor: "text-rose-600",
    },
    why: {
      icon: HelpCircle,
      defaultTitle: "WHY IT MATTERS",
      bg: "bg-indigo-50/90 border-indigo-200/90 text-indigo-950",
      accent: "bg-indigo-500",
      titleColor: "text-indigo-800",
      iconColor: "text-indigo-600",
    },
    complexity: {
      icon: Activity,
      defaultTitle: "COMPLEXITY",
      bg: "bg-cyan-50/90 border-cyan-200/90 text-cyan-950",
      accent: "bg-cyan-500",
      titleColor: "text-cyan-800",
      iconColor: "text-cyan-600",
    },
    note: {
      icon: Sparkles,
      defaultTitle: "NOTE",
      bg: "bg-slate-100/90 border-slate-200/90 text-slate-900",
      accent: "bg-purple-500",
      titleColor: "text-purple-800",
      iconColor: "text-purple-600",
    },
  };

  const cfg = configs[type] || configs.note;
  const IconComponent = cfg.icon;

  return (
    <div className={cn("relative my-4 rounded-xl border p-4 shadow-xs overflow-hidden", cfg.bg)}>
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", cfg.accent)} />
      <div className="flex items-start gap-3">
        <div className={cn("p-1.5 rounded-lg bg-white/80 shrink-0 shadow-2xs mt-0.5", cfg.iconColor)}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <div className={cn("font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5", cfg.titleColor)}>
            <span>{title || cfg.defaultTitle}</span>
          </div>
          <div className="text-xs md:text-sm leading-relaxed font-normal space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Complexity Display Component
 */
export function AIComplexityBlock({ text }: { text: string }) {
  // Regex to extract time and space complexity values if available
  const timeMatch = text.match(/(?:time|time complexity)[:\s]+(O\([^)]+\)|[O0-9A-Za-z^\/*+ -]+)/i);
  const spaceMatch = text.match(/(?:space|space complexity)[:\s]+(O\([^)]+\)|[O0-9A-Za-z^\/*+ -]+)/i);

  const timeVal = timeMatch ? timeMatch[1].trim() : null;
  const spaceVal = spaceMatch ? spaceMatch[1].trim() : null;

  if (!timeVal && !spaceVal) return null;

  return (
    <div className="my-4 p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-2.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
        <Activity className="w-3.5 h-3.5 text-purple-400" />
        <span>Complexity Analysis</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {timeVal && (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Time Complexity</span>
            </div>
            <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
              {timeVal}
            </span>
          </div>
        )}
        {spaceVal && (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Space Complexity</span>
            </div>
            <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/60">
              {spaceVal}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Main Markdown Renderer Component
 */
export function MarkdownRenderer({ content, className, variant = "light" }: MarkdownRendererProps) {
  const processedContent = useMemo(() => {
    if (!content) return "";
    return content;
  }, [content]);

  return (
    <div
      className={cn(
        "prose max-w-none break-words text-slate-800 text-xs md:text-sm leading-relaxed space-y-3",
        "prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0",
        variant === "dark" && "prose-invert text-slate-200",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code blocks & inline code
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isBlock = !inline && (match || String(children).includes("\n"));

            if (isBlock) {
              return (
                <AICodeBlock
                  language={language}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            }

            return (
              <code
                className={cn(
                  "bg-purple-50/90 text-purple-800 border border-purple-200/70 px-1.5 py-0.5 rounded-md text-[12px] font-mono font-medium",
                  variant === "dark" && "bg-slate-800 text-purple-300 border-slate-700",
                  className
                )}
                {...props}
              >
                {children}
              </code>
            );
          },

          // Headings
          h1: ({ children, className }: any) => <AIHeading level={1} className={className}>{children}</AIHeading>,
          h2: ({ children, className }: any) => <AIHeading level={2} className={className}>{children}</AIHeading>,
          h3: ({ children, className }: any) => <AIHeading level={3} className={className}>{children}</AIHeading>,
          h4: ({ children }: any) => (
            <h4 className="mt-4 mb-2 text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{children}</span>
            </h4>
          ),

          // Paragraphs & callouts
          p: ({ children, className }: any) => {
            const textStr = React.Children.toArray(children).join("");
            const lowerStr = textStr.toLowerCase();

            // Check if paragraph is Key Takeaway
            if (lowerStr.startsWith("key takeaway:") || lowerStr.startsWith("**key takeaway:**")) {
              const cleanText = textStr.replace(/^(\*\*)?key takeaway:(\*\*)?\s*/i, "");
              return (
                <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 shadow-xs flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-purple-600 text-white shrink-0 shadow-xs mt-0.5">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] font-bold text-purple-800 uppercase tracking-wider">
                      KEY TAKEAWAY
                    </div>
                    <div className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {cleanText}
                    </div>
                  </div>
                </div>
              );
            }

            // Check if paragraph is Complexity analysis block
            if (
              (lowerStr.includes("time complexity:") || lowerStr.includes("time:")) &&
              (lowerStr.includes("space complexity:") || lowerStr.includes("space:")) &&
              lowerStr.length < 200
            ) {
              return <AIComplexityBlock text={textStr} />;
            }

            // Check for inline callout triggers
            if (lowerStr.startsWith("key idea:") || lowerStr.startsWith("**key idea:**")) {
              return (
                <AICallout type="key-idea">
                  {textStr.replace(/^(\*\*)?key idea:(\*\*)?\s*/i, "")}
                </AICallout>
              );
            }

            if (lowerStr.startsWith("watch out:") || lowerStr.startsWith("**watch out:**") || lowerStr.startsWith("warning:")) {
              return (
                <AICallout type="warning">
                  {textStr.replace(/^(\*\*)?(watch out|warning):(\*\*)?\s*/i, "")}
                </AICallout>
              );
            }

            if (lowerStr.startsWith("pro tip:") || lowerStr.startsWith("tip:") || lowerStr.startsWith("**tip:**")) {
              return (
                <AICallout type="tip">
                  {textStr.replace(/^(\*\*)?(pro tip|tip):(\*\*)?\s*/i, "")}
                </AICallout>
              );
            }

            return (
              <p className={cn("leading-relaxed text-slate-800 mb-3.5 font-normal text-xs md:text-sm", className)}>
                {children}
              </p>
            );
          },

          // Step list progression for ordered lists
          ol: ({ children, className }: any) => (
            <ol className={cn("my-4 space-y-3.5 pl-1", className)}>
              {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child;
                const stepNum = String(index + 1).padStart(2, "0");
                return (
                  <li className="flex items-start gap-3 text-xs md:text-sm text-slate-800">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-purple-100 border border-purple-200/80 text-purple-700 font-mono font-bold text-[11px] flex items-center justify-center shadow-2xs mt-0.5">
                      {stepNum}
                    </span>
                    <div className="flex-1 pt-0.5 leading-relaxed">
                      {(child as any).props?.children}
                    </div>
                  </li>
                );
              })}
            </ol>
          ),

          // Unordered lists
          ul: ({ children, className }: any) => (
            <ul className={cn("my-3 space-y-2 pl-1", className)}>
              {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                return (
                  <li className="flex items-start gap-2.5 text-xs md:text-sm text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-2" />
                    <div className="flex-1 leading-relaxed">
                      {(child as any).props?.children}
                    </div>
                  </li>
                );
              })}
            </ul>
          ),

          li: ({ children }: any) => <div>{children}</div>,

          // Blockquotes as callout cards
          blockquote: ({ children }: any) => {
            const rawText = React.Children.toArray(children).map(c => typeof c === 'string' ? c : '').join('');
            const lower = rawText.toLowerCase();

            if (lower.includes("[!key idea]") || lower.includes("key idea")) {
              return <AICallout type="key-idea">{children}</AICallout>;
            }
            if (lower.includes("[!tip]") || lower.includes("tip")) {
              return <AICallout type="tip">{children}</AICallout>;
            }
            if (lower.includes("[!warning]") || lower.includes("watch out")) {
              return <AICallout type="warning">{children}</AICallout>;
            }
            if (lower.includes("[!why]") || lower.includes("why")) {
              return <AICallout type="why">{children}</AICallout>;
            }

            return (
              <blockquote className="my-4 border-l-4 border-purple-400 bg-purple-50/60 pl-4 py-3 pr-3 rounded-r-xl text-slate-700 italic text-xs md:text-sm">
                {children}
              </blockquote>
            );
          },

          // Tables
          table: ({ className, ...props }: any) => (
            <div className="my-5 w-full overflow-x-auto rounded-xl border border-slate-200/90 shadow-xs bg-white">
              <table className={cn("w-full border-collapse text-xs text-left", className)} {...props} />
            </div>
          ),
          tr: ({ className, ...props }: any) => (
            <tr className={cn("border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors", className)} {...props} />
          ),
          th: ({ className, ...props }: any) => (
            <th
              className={cn(
                "px-4 py-3 font-semibold text-slate-900 bg-slate-100/70 border-b border-slate-200/80 uppercase font-mono text-[10px] tracking-wider",
                className
              )}
              {...props}
            />
          ),
          td: ({ className, ...props }: any) => (
            <td className={cn("px-4 py-3 text-slate-700 leading-normal", className)} {...props} />
          ),

          // Horizontal rule
          hr: () => <hr className="my-6 border-slate-200/80" />,

          // Links
          a: ({ href, children }: any) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 underline underline-offset-2 font-medium transition-colors"
            >
              {children}
            </a>
          ),

          // Bold text
          strong: ({ children }: any) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
