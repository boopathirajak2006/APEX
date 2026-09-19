import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Ensure data directory exists
const dataDir = path.resolve(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'coderealm.db')
export const db = new Database(dbPath)

// Enable WAL mode for high concurrent performance
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password_hash TEXT,
      username TEXT NOT NULL,
      display_name TEXT NOT NULL,
      avatar_url TEXT,
      auth_provider TEXT NOT NULL,
      experience_level TEXT DEFAULT 'just_starting',
      selected_path TEXT DEFAULT 'code_journey',
      path_reason TEXT,
      selected_language TEXT DEFAULT 'python',
      selected_field TEXT DEFAULT 'data_analytics',
      intro_completed INTEGER DEFAULT 0,
      total_xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      current_streak INTEGER DEFAULT 1,
      max_streak INTEGER DEFAULT 1,
      last_active_date TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS user_onboarding (
      user_id TEXT PRIMARY KEY,
      selected_path TEXT NOT NULL,
      path_reason TEXT,
      experience_level TEXT DEFAULT 'just_starting',
      intro_completed INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS skill_check_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      language TEXT NOT NULL,
      overall_score REAL NOT NULL,
      quiz_score REAL NOT NULL,
      coding_score REAL NOT NULL,
      current_level TEXT NOT NULL,
      strengths_json TEXT NOT NULL,
      improvements_json TEXT NOT NULL,
      assessed_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS career_path_progress (
      user_id TEXT NOT NULL,
      field_id TEXT NOT NULL,
      current_skill_index INTEGER DEFAULT 0,
      completed_skills_json TEXT DEFAULT '[]',
      readiness_score REAL DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, field_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS field_test_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      field_id TEXT NOT NULL,
      overall_score REAL NOT NULL,
      topic_scores_json TEXT NOT NULL,
      strong_areas_json TEXT NOT NULL,
      weak_areas_json TEXT NOT NULL,
      recommendations_json TEXT NOT NULL,
      assessed_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS soft_skills_progress (
      user_id TEXT NOT NULL,
      topic_id TEXT NOT NULL,
      lesson_completed INTEGER DEFAULT 0,
      quiz_score INTEGER DEFAULT 0,
      completed_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, topic_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS soft_skill_check_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      overall_score REAL NOT NULL,
      level TEXT NOT NULL,
      strong_skills_json TEXT NOT NULL,
      improve_skills_json TEXT NOT NULL,
      assessed_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_language_progress (
      user_id TEXT NOT NULL,
      language TEXT NOT NULL,
      learning_progress_percent REAL DEFAULT 0,
      game_progress_percent REAL DEFAULT 0,
      quiz_accuracy_percent REAL DEFAULT 100,
      coding_accuracy_percent REAL DEFAULT 100,
      overall_skill_score REAL DEFAULT 50,
      completed_lessons_count INTEGER DEFAULT 0,
      completed_levels_count INTEGER DEFAULT 0,
      current_level INTEGER DEFAULT 1,
      current_difficulty TEXT DEFAULT 'beginner',
      xp_earned INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, language),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lesson_progress (
      user_id TEXT NOT NULL,
      language TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      quiz_score INTEGER DEFAULT 0,
      code_passed INTEGER DEFAULT 0,
      mini_game_completed INTEGER DEFAULT 0,
      completed_at TEXT,
      PRIMARY KEY (user_id, language, lesson_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS game_level_progress (
      user_id TEXT NOT NULL,
      language TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      level_number INTEGER NOT NULL,
      unlocked INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0,
      stars INTEGER DEFAULT 0,
      best_quiz_score INTEGER DEFAULT 0,
      coding_passed INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      best_time_seconds INTEGER DEFAULT 0,
      completed_at TEXT,
      PRIMARY KEY (user_id, language, difficulty, level_number),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_achievements (
      user_id TEXT NOT NULL,
      achievement_id TEXT NOT NULL,
      unlocked_at TEXT DEFAULT (datetime('now')),
      xp_rewarded INTEGER DEFAULT 0,
      PRIMARY KEY (user_id, achievement_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `)

  // Ensure all columns exist on users table
  try {
    const tableInfo = db.prepare('PRAGMA table_info(users)').all() as { name: string }[]
    const existingCols = new Set(tableInfo.map(c => c.name))
    const userColumns = [
      { name: 'experience_level', type: "TEXT DEFAULT 'just_starting'" },
      { name: 'selected_path', type: "TEXT DEFAULT 'code_journey'" },
      { name: 'path_reason', type: 'TEXT' },
      { name: 'selected_language', type: "TEXT DEFAULT 'python'" },
      { name: 'selected_field', type: "TEXT DEFAULT 'data_analytics'" },
      { name: 'intro_completed', type: 'INTEGER DEFAULT 0' },
    ]
    for (const col of userColumns) {
      if (!existingCols.has(col.name)) {
        db.exec(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type}`)
      }
    }
  } catch (colErr) {
    console.warn('Column check warning:', colErr)
  }

  console.log('📦 Database initialized and 6-Path tables verified at', dbPath)
}
