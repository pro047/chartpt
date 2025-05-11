import { db } from '@db/database';
import { ResultSetHeader } from 'mysql2';

interface UserData {
  name: string;
  gender: string;
  age: number;
  firstVisit: Date;
  occupation: string;
}

export const saveChart = async (data: UserData): Promise<number> => {
  try {
    const sql = `INSERT INTO patients (name, age, gender, firstVisit, occupation) VALUES (?, ?, ?, ?, ?)`;

    const values = [
      data.name,
      data.age,
      data.gender,
      formatDateForMySQL(data.firstVisit),
      data.occupation,
    ];
    const [result] = (await db.execute(sql, values)) as [ResultSetHeader, any];

    if (result.affectedRows !== 1) {
      throw new Error('Failed to insert patient record.');
    }

    return result.insertId;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

function formatDateForMySQL(date: Date): string {
  return date.toISOString().split('T')[0];
}
