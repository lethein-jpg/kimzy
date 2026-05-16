'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createAssignmentsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS assignments (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL,
        image_data TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Failed to create assignments table:', error);
  }
}

export async function getAssignments() {
  try {
    await createAssignmentsTable();
    const { rows } = await sql`
      SELECT * FROM assignments 
      ORDER BY submitted_at DESC;
    `;
    return rows;
  } catch (error) {
    console.error('Failed to fetch assignments:', error);
    return [];
  }
}

export async function submitAssignment(formData: FormData) {
  const name = formData.get('student_name') as string;
  const imageData = formData.get('image_data') as string; // Base64 string

  if (!name || !imageData) {
    return { error: '이름과 사진을 모두 등록해주세요.' };
  }

  try {
    await sql`
      INSERT INTO assignments (student_name, image_data)
      VALUES (${name}, ${imageData});
    `;
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to submit assignment:', error);
    return { error: '과제 제출에 실패했습니다.' };
  }
}
