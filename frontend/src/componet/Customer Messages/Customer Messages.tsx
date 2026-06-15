import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Search } from "lucide-react";

interface EmailMessage {
_id: string;
senderName: string;
senderEmail: string;
subject: string;
message: string;
isRead: boolean;
createdAt: string;
}

export default function CustomerMessages() {

const [emails, setEmails] = useState<EmailMessage[]>([]);
const [searchQuery, setSearchQuery] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchMessages();
}, []);

const fetchMessages = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/emails"
);


  setEmails(res.data.data || []);
} catch (error) {
  console.error("Error fetching messages:", error);
} finally {
  setLoading(false);
}

};

const filteredEmails = emails.filter((email) => {
const query = searchQuery.toLowerCase();


return (
  email.senderName?.toLowerCase().includes(query) ||
  email.senderEmail?.toLowerCase().includes(query) ||
  email.subject?.toLowerCase().includes(query) ||
  email.message?.toLowerCase().includes(query)
);


});

if (loading) {
return ( <div className="text-white p-6">
Loading messages... </div>
);
}

return ( <div className="p-6 text-white"> <div className="flex items-center justify-between mb-6"> <div> <h1 className="text-3xl font-bold">
Contact Messages </h1>


      <p className="text-slate-400">
        Messages received from website visitors
      </p>
    </div>

    <div className="bg-purple-600 px-4 py-2 rounded-xl">
      {emails.length} Messages
    </div>
  </div>

  <div className="relative mb-6">
    <Search
      size={18}
      className="absolute left-3 top-3 text-slate-400"
    />

    <input
      type="text"
      placeholder="Search messages..."
      value={searchQuery}
      onChange={(e) =>
        setSearchQuery(e.target.value)
      }
      className="w-full pl-10 p-3 rounded-xl bg-[#071633] border border-slate-700 text-white"
    />
  </div>

  {filteredEmails.length === 0 ? (
    <div className="bg-[#071633] p-8 rounded-2xl text-center text-slate-400">
      No messages found.
    </div>
  ) : (
    <div className="space-y-4">
      {filteredEmails.map((email) => (
        <div
          key={email._id}
          className="bg-[#071633] border border-slate-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <Mail
              size={18}
              className="text-purple-400"
            />

            <div>
              <h2 className="font-semibold">
                {email.senderName}
              </h2>

              <p className="text-sm text-slate-400">
                {email.senderEmail}
              </p>
            </div>
          </div>

          <h3 className="font-bold mb-2">
            {email.subject}
          </h3>

          <p className="text-slate-300">
            {email.message}
          </p>

          <p className="text-xs text-slate-500 mt-3">
            {new Date(
              email.createdAt
            ).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )}
</div>


);
}
