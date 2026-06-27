"use client";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/atom-one-dark.css';

export default function DocumentViewer({ docId }: { docId: string }) {
    const [doc, setDoc] = useState<any>(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/research/document?id=${docId}`)
            .then(res => res.json())
            .then(d => setDoc(d));
    }, [docId]);

    if (!doc) return <div className="p-8 text-slate-500 text-sm">Loading document...</div>;

    // Custom renderers for TerraLattice specific blocks (admonitions, etc.)
    const components = {
        blockquote: ({node, ...props}: any) => {
            const str = props.children[1]?.props?.children || "";
            if (str.includes("[!NOTE]") || str.includes("[!IMPORTANT]") || str.includes("[!WARNING]")) {
                let type = "note";
                let color = "bg-blue-900/30 border-blue-500 text-blue-300";
                if (str.includes("[!IMPORTANT]")) color = "bg-emerald-900/30 border-emerald-500 text-emerald-300";
                if (str.includes("[!WARNING]")) color = "bg-amber-900/30 border-amber-500 text-amber-300";
                
                return (
                    <div className={`p-4 my-4 border-l-4 rounded ${color}`}>
                        {props.children}
                    </div>
                );
            }
            return <blockquote className="border-l-4 border-slate-600 pl-4 my-4 italic text-slate-400" {...props} />;
        },
        h1: ({node, ...props}: any) => <h1 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2" {...props} />,
        h2: ({node, ...props}: any) => <h2 className="text-xl font-bold text-emerald-400 mt-8 mb-4" {...props} />,
        h3: ({node, ...props}: any) => <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3" {...props} />,
        p: ({node, ...props}: any) => <p className="mb-4 leading-relaxed text-slate-300 text-sm" {...props} />,
        a: ({node, ...props}: any) => <a className="text-blue-400 hover:underline" {...props} />
    };

    return (
        <div className="flex flex-col h-full bg-slate-950">
            <div className="px-6 py-3 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                <h3 className="text-sm font-mono text-slate-400">/{doc.id}.md</h3>
                <div className="text-[10px] uppercase tracking-widest text-emerald-500 border border-emerald-500/50 bg-emerald-950 px-2 py-0.5 rounded">Verified</div>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
                <article className="max-w-4xl mx-auto prose prose-invert prose-emerald">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeHighlight]}
                        components={components as any}
                    >
                        {doc.content}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
