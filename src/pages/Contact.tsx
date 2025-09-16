import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation className="border-b border-border bg-surface/50 backdrop-blur" />

      <main className="container mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-rubik font-bold text-text-primary">We're here to help</h1>
          <p className="text-text-secondary mt-2">Tell us what you're facing — we'll listen.</p>
        </header>

        <div className="max-w-xl mx-auto">
          <Card className="p-6 bg-surface border-border">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Your name</label>
                <input className="w-full rounded-md bg-elevated border border-border px-3 py-2 text-sm" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input type="email" className="w-full rounded-md bg-elevated border border-border px-3 py-2 text-sm" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">How can we help?</label>
                <textarea className="w-full rounded-md bg-elevated border border-border px-3 py-2 text-sm min-h-28" placeholder="Share your situation — a medical bill, timing issue, or general question." />
              </div>
              <Button type="submit" className="w-full">Send message</Button>
              <p className="text-xs text-text-muted text-center">This is a mock form for the demo. No messages are sent.</p>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contact;
