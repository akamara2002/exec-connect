import Link from "next/link";

export default function CFOPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI-CFO</h1>
      <p className="text-gray-600 mb-8">Financial diagnostics and advisory for your business.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/cfo/diagnostic"
          className="block p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Run Diagnostic</h2>
          <p className="text-gray-600">Assess your financial health</p>
        </Link>
        
        <Link
          href="/cfo/chat"
          className="block p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Chat with AI-CFO</h2>
          <p className="text-gray-600">Ask financial questions</p>
        </Link>
        
        <Link
          href="/cfo/history"
          className="block p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">View History</h2>
          <p className="text-gray-600">See past analyses</p>
        </Link>
      </div>
    </div>
  );
}

