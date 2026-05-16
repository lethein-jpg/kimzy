'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createGuestbookTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS guestbook (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Failed to create guestbook table:', error);
  }
}

export async function getGuestbookEntries() {
  try {
    // Ensure table exists first (optional, but good for first run)
    await createGuestbookTable();
    
    const { rows } = await sql`
      SELECT * FROM guestbook 
      ORDER BY created_at DESC 
      LIMIT 50;
    `;
    return rows;
  } catch (error) {
    console.error('Failed to fetch guestbook entries:', error);
    return [];
  }
}

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

  if (!name || !message) return { error: '이름과 메시지를 입력해주세요.' };

  try {
    await sql`
      INSERT INTO guestbook (name, message)
      VALUES (${name}, ${message});
    `;
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to add guestbook entry:', error);
    return { error: '방명록 저장에 실패했습니다.' };
  }
}
