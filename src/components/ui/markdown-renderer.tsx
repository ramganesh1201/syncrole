import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert max-w-none break-words prose-pre:bg-transparent prose-pre:p-0", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isBlock = !inline && match;

            if (isBlock) {
              return (
                <CodeBlock language={language} value={String(children).replace(/\n$/, "")} {...props} />
              );
            }

            return (
              <code
                className={cn(
                  "bg-white/10 px-1.5 py-0.5 rounded-md text-[13px] font-mono text-aurora/90 border border-white/5",
                  className
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ className, ...props }: any) => (
            <h1 className={cn("mt-8 scroll-m-20 text-2xl font-bold tracking-tight text-white mb-6", className)} {...props} />
          ),
          h2: ({ className, ...props }: any) => (
            <h2 className={cn("mt-8 scroll-m-20 border-b border-white/10 pb-3 text-xl font-semibold tracking-tight text-white first:mt-0 mb-5", className)} {...props} />
          ),
          h3: ({ className, ...props }: any) => (
            <h3 className={cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-white mb-4", className)} {...props} />
          ),
          p: ({ className, ...props }: any) => (
            <p className={cn("leading-7 [&:not(:first-child)]:mt-5 mb-5 text-slate-300", className)} {...props} />
          ),
          ul: ({ className, ...props }: any) => (
            <ul className={cn("my-5 ml-6 list-disc space-y-2 marker:text-slate-500", className)} {...props} />
          ),
          ol: ({ className, ...props }: any) => (
            <ol className={cn("my-5 ml-6 list-decimal space-y-2 marker:text-slate-500", className)} {...props} />
          ),
          li: ({ className, ...props }: any) => (
            <li className={cn("text-slate-300 leading-relaxed", className)} {...props} />
          ),
          strong: ({ className, ...props }: any) => (
            <strong className={cn("font-semibold text-white", className)} {...props} />
          ),
          table: ({ className, ...props }: any) => (
            <div className="my-6 w-full overflow-y-auto rounded-lg border border-white/10 bg-black/20">
              <table className={cn("w-full border-collapse text-sm text-left", className)} {...props} />
            </div>
          ),
          tr: ({ className, ...props }: any) => (
            <tr className={cn("m-0 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors", className)} {...props} />
          ),
          th: ({ className, ...props }: any) => (
            <th
              className={cn(
                "px-4 py-3 font-semibold text-white bg-white/5",
                className
              )}
              {...props}
            />
          ),
          td: ({ className, ...props }: any) => (
            <td
              className={cn(
                "px-4 py-3 text-slate-300",
                className
              )}
              {...props}
            />
          ),
          blockquote: ({ className, ...props }: any) => (
            <blockquote
              className={cn(
                "mt-6 mb-6 border-l-4 border-aurora/50 bg-aurora/5 px-6 py-4 rounded-r-lg italic text-slate-300",
                className
              )}
              {...props}
            />
          ),
          hr: ({ className, ...props }: any) => (
            <hr className={cn("my-8 border-white/10", className)} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ language, value, ...props }: { language: string; value: string; [key: string]: any }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border bg-background text-sm">
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2.5 border-b border-white/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase ml-2">{language || "Code"}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors focus:outline-none bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md"
          title="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            backgroundColor: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
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
