import api from "./api";

const CHAT_KEY = "pdh_chat_threads";
const DESIGN_CHAT_KEY = "pdh_design_chat_history";

function sanitizeLegacyThreads(threads) {
  return threads.map((thread) => {
    const participant = { ...thread.participant };

    if (participant.name === "Northwind Packaging") {
      participant.name = "Manufacturing Company";
    }

    return {
      ...thread,
      participant
    };
  });
}

const starterThreads = [
  {
    id: "thread-olivia-northwind",
    participant: {
      id: "company-northwind",
      name: "Manufacturing Company",
      role: "Company",
      avatar: "NP",
      status: "online"
    },
    listing: {
      id: "pdh-004",
      title: "Cold Brew Can System"
    },
    messages: [
      {
        id: "msg-1",
        senderType: "participant",
        text: "Hi, can you adapt this label system for a 250ml can run?",
        timestamp: "2026-03-16T09:15:00.000Z"
      },
      {
        id: "msg-2",
        senderType: "me",
        text: "Yes. I can provide an alternate dieline-ready version for that format.",
        timestamp: "2026-03-16T09:18:00.000Z"
      }
    ]
  },
  {
    id: "thread-olivia-verde",
    participant: {
      id: "company-verde",
      name: "Verde Labs",
      role: "Company",
      avatar: "VL",
      status: "away"
    },
    listing: {
      id: "pdh-002",
      title: "Clinical Serum Sleeve"
    },
    messages: [
      {
        id: "msg-3",
        senderType: "participant",
        text: "We shortlisted your serum sleeve. Is exclusive usage available?",
        timestamp: "2026-03-15T14:42:00.000Z"
      }
    ]
  },
  {
    id: "thread-northwind-ava",
    participant: {
      id: "designer-ava",
      name: "Ava Morgan",
      role: "Designer",
      avatar: "AM",
      status: "online"
    },
    listing: {
      id: "pdh-001",
      title: "Artisan Honey Jar Label"
    },
    messages: [
      {
        id: "msg-4",
        senderType: "participant",
        text: "Thanks for saving the concept. Let me know if your team needs print specs.",
        timestamp: "2026-03-14T11:20:00.000Z"
      }
    ]
  }
];

export function loadChatThreads(role = "designer") {
  const stored = localStorage.getItem(CHAT_KEY);
  const threads = sanitizeLegacyThreads(stored ? JSON.parse(stored) : starterThreads);
  localStorage.setItem(CHAT_KEY, JSON.stringify(threads));

  return role === "company"
    ? threads.filter((thread) => thread.participant.role === "Designer")
    : threads.filter((thread) => thread.participant.role === "Company");
}

export function persistChatThreads(threads) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(threads));
}

export async function sendChatMessage(payload) {
  try {
    const { data } = await api.post("/chat/send", {
      receiver: payload.receiver,
      message: payload.message
    });

    return data.newMessage || data;
  } catch (error) {
    return {
      _id: `local-${Date.now()}`,
      sender: payload.sender,
      receiver: payload.receiver,
      message: payload.message,
      createdAt: new Date().toISOString()
    };
  }
}

function loadDesignChatMap() {
  const stored = localStorage.getItem(DESIGN_CHAT_KEY);
  return stored ? JSON.parse(stored) : {};
}

function persistDesignChatMap(map) {
  localStorage.setItem(DESIGN_CHAT_KEY, JSON.stringify(map));
}

function buildThreadKey(designId, userId, designerId) {
  return [designId, userId, designerId].join(":");
}

export async function getDesignChatHistory({ designId, userId, designerId, designerName, designerAvatar }) {
  try {
    const { data } = await api.get(`/chat/${designId}/${userId}`);
    return data.messages || [];
  } catch (error) {
    const historyMap = loadDesignChatMap();
    const key = buildThreadKey(designId, userId, designerId);

    return (
      historyMap[key] || [
        {
          id: `welcome-${key}`,
          senderType: "receiver",
          text: `Hello, this is ${designerName}. Ask anything about this label design.`,
          timestamp: new Date().toISOString(),
          designerAvatar
        }
      ]
    );
  }
}

export async function sendDesignChatMessage({
  senderId,
  receiverId,
  designId,
  message,
  userId,
  designerId,
  senderType
}) {
  const timestamp = new Date().toISOString();
  const fallbackMessage = {
    id: `local-${Date.now()}`,
    senderType,
    text: message,
    timestamp
  };

  try {
    const { data } = await api.post("/chat/send", {
      senderId,
      receiverId,
      designId,
      message
    });

    return {
      id: data.newMessage?._id || fallbackMessage.id,
      senderType,
      text: data.newMessage?.message || message,
      timestamp: data.newMessage?.createdAt || timestamp
    };
  } catch (error) {
    const historyMap = loadDesignChatMap();
    const key = buildThreadKey(designId, userId, designerId);
    const current = historyMap[key] || [];
    historyMap[key] = [...current, fallbackMessage];
    persistDesignChatMap(historyMap);
    return fallbackMessage;
  }
}
