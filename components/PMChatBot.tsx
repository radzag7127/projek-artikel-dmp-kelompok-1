"use client";

import { useState, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import remarkGfm from "remark-gfm";

export default function PMChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content:
          "Halo, saya chatbot milik Kelompok 1 DMP, siap membantu project management. Apa yang bisa saya bantu?",
      },
    ]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResponse = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `API responded with status ${response.status}: ${errorData}`
        );
      }

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || "No response";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botResponse },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    fetchResponse(userInput);
    setUserInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 p-0 bg-black hover:bg-black/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="w-[450px] h-[700px] bg-background border rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-black text-white">
            <h3 className="font-semibold">Project Manager Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user" ? "bg-black text-white" : "bg-muted"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="text-sm prose dark:prose-invert"
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-muted-foreground">
                Asisten sedang mengetik...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Tanyakan tentang manajemen proyek..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-black/90"
              >
                Kirim
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
