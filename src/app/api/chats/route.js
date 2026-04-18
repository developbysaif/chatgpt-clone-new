import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'chats.json');

async function getChats() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveChats(chats) {
  await fs.writeFile(filePath, JSON.stringify(chats, null, 2));
}

export async function GET() {
  const chats = await getChats();
  return new Response(JSON.stringify(chats), { status: 200 });
}

export async function POST(req) {
  const updatedChat = await req.json();
  let chats = await getChats();
  
  const index = chats.findIndex(c => c.id === updatedChat.id);
  if (index !== -1) {
    chats[index] = updatedChat;
  } else {
    chats.unshift(updatedChat);
  }
  
  await saveChats(chats);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  let chats = await getChats();
  chats = chats.filter(c => c.id !== id);
  await saveChats(chats);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
